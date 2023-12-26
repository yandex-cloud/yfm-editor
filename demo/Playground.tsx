import React from 'react';

import {Button, RadioButton, TextArea} from '@gravity-ui/uikit';
import block from 'bem-cn-lite'; // eslint-disable-line import/no-extraneous-dependencies
import {useUpdate} from 'react-use';

import {
    BaseNode,
    BasePreset,
    BehaviorPreset,
    Extension,
    FlexToolbar,
    MarkdownBlocksPreset,
    MarkdownMarksPreset,
    MarkupString,
    ReactRenderStorage,
    ReactRendererComponent,
    YfmEditorComponent,
    YfmPreset,
    logger,
    useYfmEditor,
} from '../src';
import {wHiddenData, wToolbarConfig} from '../src/toolbar/config/wysiwyg';

import {PlaygroundHtmlPreview} from './HtmlPreview';
import {PMSelection} from './PMSelection';
import {ProseMirrorDevTools} from './ProseMirrorDevTools';
import {keys} from './keys';

import './Playground.scss';

const b = block('playground');

export type PlaygroundProps = {
    initial?: MarkupString;
    allowHTML?: boolean;
    breaks?: boolean;
    linkify?: boolean;
    linkifyTlds?: string | string[];
};

const enum PreviewType {
    Markup = 'markup',
    Html = 'html',
}

logger.setLogger({
    metrics: console.info,
    action: console.info,
    ...console,
});

const Playground = React.memo<PlaygroundProps>((props) => {
    const {initial, allowHTML, breaks, linkify, linkifyTlds} = props;
    const [previewType, setPreviewType] = React.useState<string>(PreviewType.Markup);
    const [yfmRaw, setYfmRaw] = React.useState<MarkupString>(initial || '');
    const rerender = useUpdate();

    const renderStorage = React.useMemo(() => new ReactRenderStorage(), []);
    const extensions = React.useMemo<Extension>(
        () => (builder) =>
            builder
                .use(BasePreset, {
                    baseSchema: {
                        paragraphPlaceholder(_node, parent) {
                            return parent?.type.name === BaseNode.Doc && parent.childCount === 1
                                ? 'Now... start typing'
                                : null;
                        },
                    },
                })
                .use(BehaviorPreset, {
                    history: {
                        undoKey: keys.undo,
                        redoKey: keys.redo,
                    },
                    reactRenderer: renderStorage,
                })
                .use(MarkdownBlocksPreset, {
                    image: false,
                    heading: false,
                    lists: {
                        ulKey: keys.ulist,
                        olKey: keys.olist,
                    },
                    breaks: {preferredBreak: breaks ? 'soft' : 'hard'},
                })
                .use(MarkdownMarksPreset, {
                    bold: {boldKey: keys.bold},
                    italic: {italicKey: keys.italic},
                    strike: {strikeKey: keys.strike},
                    underline: {underlineKey: keys.underline},
                    code: {codeKey: keys.code},
                })
                .use(YfmPreset, {}),
        [breaks, renderStorage],
    );

    const editor = useYfmEditor({
        linkify,
        linkifyTlds,
        allowHTML,
        extensions,
        initialContent: yfmRaw,
        onChange: () => rerender(),
        onDocChange: (e) => setYfmRaw(e.getValue()),
    });

    return (
        <div className={b()}>
            <div className={b('header')}>
                YFM Editor Playground
                <span className={b('preview-type')}>
                    <RadioButton size="s" value={previewType} onUpdate={setPreviewType}>
                        <RadioButton.Option value={PreviewType.Markup}>Markup</RadioButton.Option>
                        <RadioButton.Option value={PreviewType.Html}>HTML</RadioButton.Option>
                    </RadioButton>
                </span>
            </div>
            <div className={b('controls')}>
                <p>isEmpty: {String(editor.isEmpty())}</p>
                <Button
                    size="s"
                    onClick={() => {
                        editor.clear();
                        editor.focus();
                    }}
                >
                    Clear
                </Button>
                <Button
                    size="s"
                    onClick={() => {
                        editor.append('> append');
                        editor.focus();
                    }}
                >
                    Append
                </Button>
                <Button
                    size="s"
                    onClick={() => {
                        editor.prepend('> prepend');
                        editor.focus();
                    }}
                >
                    Prepend
                </Button>
                <Button
                    size="s"
                    onClick={() => {
                        editor.replace('> replace');
                        editor.focus();
                    }}
                >
                    Replace
                </Button>
                <Button
                    size="s"
                    onClick={() => {
                        editor.moveCursor('start');
                        editor.focus();
                    }}
                >
                    Move cursor to start
                </Button>
                <Button
                    size="s"
                    onClick={() => {
                        editor.moveCursor('end');
                        editor.focus();
                    }}
                >
                    Move cursor to end
                </Button>
            </div>
            <hr />
            <div className={b('editor')}>
                <FlexToolbar
                    editor={editor}
                    dotsTitle={'More action'}
                    focus={() => editor.focus()}
                    data={wToolbarConfig}
                    hiddenActions={wHiddenData}
                />
                <YfmEditorComponent editor={editor} autofocus className={b('editor-view')}>
                    <ReactRendererComponent storage={renderStorage} />
                </YfmEditorComponent>
                <ProseMirrorDevTools view={editor.view} />
                <PMSelection view={editor.view} className={b('pm-selection')} />
            </div>

            <hr />

            <div className={b('preview')}>
                {previewType === PreviewType.Markup && (
                    <TextArea
                        size="s"
                        minRows={10}
                        value={yfmRaw}
                        onUpdate={(value) => {
                            editor.replace(value);
                            setYfmRaw(value);
                        }}
                        className={b('markup')}
                    />
                )}

                {previewType === PreviewType.Html && (
                    <PlaygroundHtmlPreview
                        className={b('html', 'yfm yfm_no-list-reset')}
                        allowHTML={allowHTML}
                        breaks={breaks}
                        linkify={linkify}
                        linkifyTlds={linkifyTlds}
                        value={yfmRaw}
                    />
                )}
            </div>
        </div>
    );
});
Playground.displayName = 'Playground';

const PlaygroundStrict: React.FC<PlaygroundProps> = (props) => (
    <React.StrictMode>
        <Playground {...props} />
    </React.StrictMode>
);
PlaygroundStrict.displayName = 'PlaygroundStrict';

export {PlaygroundStrict as Playground};

// const fileUploadHandler: FileUploadHandler = async (file) => {
//     console.info('[Playground] Uploading file: ' + file.name);
//     await randomDelay(1000, 3000);
//     return {url: URL.createObjectURL(file)};
// };
