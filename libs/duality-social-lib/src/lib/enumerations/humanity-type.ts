export const HumanityTypes = ['Ai', 'Bot', 'Human'] as const;
export type HumanityType = typeof HumanityTypes[number];

export enum HumanityTypeEnum {
    /**
     * The viewpoint is from an AI
     */
    Ai = 'Ai',
    /**
     * The viewpoint is from a bot
     * (e.g. an account run by a 3rd party bot/outside actor)
     */
    Bot = 'Bot',
    /**
     * The viewpoint is from a human
     */
    Human = 'Human',
}