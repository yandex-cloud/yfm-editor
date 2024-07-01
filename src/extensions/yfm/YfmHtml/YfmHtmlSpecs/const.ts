import {nodeTypeFactory} from '../../../../utils/schema';

export enum YfmHtmlAttrs {
    class = 'class',
    frameborder = 'frameborder',
    srcdoc = 'srcdoc',
    style = 'style',
}

export const yfmHtmlNodeName = 'yfm_html_block';
export const yfmHtmlNodeType = nodeTypeFactory(yfmHtmlNodeName);

export const YfmHtml = {
    NodeName: yfmHtmlNodeName,
    NodeAttrs: YfmHtmlAttrs,
    nodeType: yfmHtmlNodeType,
} as const;
