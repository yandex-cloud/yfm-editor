import yfmPlugin from '@doc-tools/transform/lib/plugins/monospace';
import type {Action, ExtensionAuto} from '../../../core';
import {markTypeFactory} from '../../../utils/schema';
import {createToggleMarkAction} from '../../../utils/actions';
import {markInputRule} from '../../../utils/inputrules';
import log from '@doc-tools/transform/lib/log';

export const monospace = 'monospace';
const monoAction = 'mono';
const monoType = markTypeFactory(monospace);

export const Monospace: ExtensionAuto = (builder) => {
    builder
        .configureMd((md) => md.use(yfmPlugin, {log}))
        .addMark(monospace, () => ({
            spec: {
                parseDOM: [{tag: 'samp'}],
                toDOM() {
                    return ['samp'];
                },
            },
            fromYfm: {
                tokenSpec: {
                    name: monospace,
                    type: 'mark',
                },
            },
            toYfm: {
                open: '##',
                close: '##',
                mixable: true,
                expelEnclosingWhitespace: true,
            },
        }))
        .addAction(monoAction, ({schema}) => createToggleMarkAction(monoType(schema)))
        .addInputRules(({schema}) => ({
            rules: [markInputRule({open: '##', close: '##', ignoreBetween: '#'}, monoType(schema))],
        }));
};

declare global {
    namespace YfmEditor {
        interface Actions {
            [monoAction]: Action;
        }
    }
}
