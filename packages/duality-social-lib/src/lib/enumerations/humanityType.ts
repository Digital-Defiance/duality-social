export enum HumanityType {
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
    AI = 'Ai',
}