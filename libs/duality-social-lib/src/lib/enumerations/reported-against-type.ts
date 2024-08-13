export const ReportedAgainstTypes = ['HumanContent', 'AiContent'] as const;
export type ReportedAgainstType = typeof ReportedAgainstTypes[number];

export enum ReportedAgainstTypeEnum {
    /**
     * A report against content that was created by a human.
     */
    HumanContent = 'HumanContent',
    /**
     * A report against content that was created by an AI.
     */
    AiContent = 'AiContent',
}