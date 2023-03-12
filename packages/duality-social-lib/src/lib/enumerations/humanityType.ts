export const HumanityTypes = ['Bot', 'Human', 'AI'] as const;
export type HumanityType = typeof HumanityTypes[number];

export const enum HumanityTypeEnum {
    /**
     * The viewpoint seems to be from a bot
     * (e.g. an account run by a 3rd party bot/outside actor)
     */
    Bot = 'Bot',
    /**
     * The viewpoint seems to be from a human
     */
    Human = 'Human',
    /**
     * The viewpoint seems to be from an AI
     */
    AI = 'AI',
}