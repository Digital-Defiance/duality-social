import { HumanityTypeEnum } from "./humanity-type";
/** What kind entity created the viewpoint content */
export const ViewpointTypes = ['Human-Source','AI-Rendered','AI-Translation'] as const;
/** What kind entity created the viewpoint content */
export type ViewpointType = typeof ViewpointTypes[number];
/** What kind entity created the viewpoint content */
export enum ViewpointTypeEnum {
    /**
     * The viewpoint is from a human source
     */
    AISource = 'AI-Response',
    AITranslationRendered = 'AI-Translation',
    HumanSource = 'Human-Source',
}
export const ViewpointHumanityMap: { [key: string]: HumanityTypeEnum } = {
    [ViewpointTypeEnum.AISource]: HumanityTypeEnum.Ai,
    [ViewpointTypeEnum.AITranslationRendered]: HumanityTypeEnum.Ai,
    [ViewpointTypeEnum.HumanSource]: HumanityTypeEnum.Human,
};