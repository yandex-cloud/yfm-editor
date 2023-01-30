import {Node, ResolvedPos} from 'prosemirror-model';
import type {Command, NodeSelection, Transaction} from 'prosemirror-state';

import {isCodeBlock} from '../../../utils/nodes';
import {get$Cursor, isNodeSelection} from '../../../utils/selection';

import {GapCursorSelection, isGapCursorSelection} from '../Cursor/GapCursorSelection';

export type Direction = 'before' | 'after';
type ArrowDirection = 'up' | 'right' | 'down' | 'left';

type TextSelectionFinder = ($cursor: ResolvedPos, dir: Direction) => ResolvedPos | null;
type NodeSelectionFinder = (selection: NodeSelection, dir: Direction) => ResolvedPos | null;
type GapCursorSelectionFinder = (
    selection: GapCursorSelection,
    dir: Direction,
) => ResolvedPos | null;

type GapCursorMeta = {direction: Direction};

const isUp = (dir: ArrowDirection) => dir === 'left' || dir === 'up';

function isTextblock(node: Node): boolean {
    return node.isTextblock && !isCodeBlock(node);
}

function isEdgeTextblock($cursor: ResolvedPos, dir: Direction): boolean {
    const index = $cursor.index($cursor.depth - 1);
    if (dir === 'before') return index === 0;
    if (dir === 'after') return index === $cursor.node($cursor.depth - 1).childCount - 1;
    return false;
}

const findNextFakeParaPosForGapCursorSelection: GapCursorSelectionFinder = ({$pos}, dir) => {
    return findFakeParaPosClosestToPos($pos, $pos.depth, dir);
};

export const findFakeParaPosForNodeSelection: NodeSelectionFinder = (selection, dir) => {
    const selectedNode = selection.node;
    if (selectedNode.isInline || isTextblock(selectedNode)) return null;

    const {$from} = selection;
    const index = $from.index();
    const parentNode = $from.parent;
    if (dir === 'before') {
        if (parentNode.firstChild === selectedNode || !isTextblock(parentNode.child(index - 1))) {
            return $from;
        }
    } else if (dir === 'after') {
        if (parentNode.lastChild === selectedNode || !isTextblock(parentNode.child(index + 1))) {
            return selection.$to;
        }
    }

    return null;
};

export const findFakeParaPosForCodeBlock: TextSelectionFinder = ($cursor, dir) => {
    if (!isCodeBlock($cursor.parent)) return null;

    let foundPos = -1;
    const index = $cursor.index($cursor.depth - 1);
    const parent = $cursor.node($cursor.depth - 1);
    if (dir === 'before') {
        if (index === 0 || !isTextblock(parent.child(index - 1))) {
            foundPos = $cursor.before();
        }
    } else if (dir === 'after') {
        if (index === parent.childCount - 1 || !isTextblock(parent.child(index + 1))) {
            foundPos = $cursor.after();
        }
    }

    return foundPos !== -1 ? $cursor.doc.resolve(foundPos) : null;
};

export const findFakeParaPosForTextSelection: TextSelectionFinder = ($cursor, dir) => {
    if ($cursor.parent.isInline) return null;

    const $pos = findFakeParaPosForCodeBlock($cursor, dir);
    if ($pos) return $pos;

    if (!isEdgeTextblock($cursor, dir)) return null;

    return findFakeParaPosClosestToPos($cursor, $cursor.depth - 1, dir);
};

function findFakeParaPosClosestToPos(
    $pos: ResolvedPos,
    depth: number,
    dir: Direction,
): ResolvedPos | null {
    depth++;
    while (--depth > 0) {
        const node = $pos.node(depth);
        const index = $pos.index(depth - 1);
        const parent = $pos.node(depth - 1);

        if (parent.type.spec.gapcursor === false) continue;

        if (node.type.spec.complex === 'inner' || node.type.spec.complex === 'leaf') {
            if (dir === 'before' && index === 0) continue;
            if (dir === 'after' && index === parent.childCount - 1) continue;
            return null;
        }

        if (dir === 'before') {
            if (index === 0 || !isTextblock(parent.child(index - 1))) {
                return $pos.doc.resolve($pos.before(depth));
            }
        } else if (dir === 'after') {
            if (index === parent.childCount - 1 || !isTextblock(parent.child(index + 1))) {
                return $pos.doc.resolve($pos.after(depth));
            }
        }
    }
    return null;
}

const arrow =
    (dir: ArrowDirection): Command =>
    (state, dispatch, view) => {
        const {selection} = state;
        const direction: Direction = isUp(dir) ? 'before' : 'after';
        let $pos: ResolvedPos | null = null;

        if (isGapCursorSelection<GapCursorMeta>(selection)) {
            if (selection.meta?.direction !== direction) {
                return false;
            }

            // if gap selection is at start or end of doc
            if (dir === 'up' && selection.pos === 0) return true;
            if (dir === 'down' && selection.pos === state.doc.nodeSize - 2) return true;

            $pos = findNextFakeParaPosForGapCursorSelection(selection, direction);
        }

        if (isNodeSelection(selection)) {
            $pos = findFakeParaPosForNodeSelection(selection, direction);
        }

        const $cursor = get$Cursor(selection);
        if ($cursor && view?.endOfTextblock(dir)) {
            $pos = findFakeParaPosForTextSelection($cursor, direction);
        }

        if ($pos) {
            dispatch?.(createFakeParagraph(state.tr, $pos, direction).scrollIntoView());
            return true;
        }

        return false;
    };

export function createFakeParagraph(
    tr: Transaction,
    $pos: ResolvedPos,
    direction: Direction,
): Transaction {
    return tr.setSelection(new GapCursorSelection<GapCursorMeta>($pos, {meta: {direction}}));
}

export const arrowLeft = arrow('left');
export const arrowDown = arrow('down');
export const arrowUp = arrow('up');
export const arrowRight = arrow('right');
