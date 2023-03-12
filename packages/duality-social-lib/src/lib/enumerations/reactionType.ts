export const ReactionTypes = ['BuiltIn', 'Emoji', 'FontAwesome', 'Material'] as const;
export type ReactionType = typeof ReactionTypes[number];

export const enum ReactionTypeEnum {
    BuiltIn = 'BuiltIn',
    Emoji = 'Emoji',
    FontAwesome = 'FontAwesome',
    Material = 'Material',
}