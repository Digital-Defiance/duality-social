import { IconName } from "@fortawesome/fontawesome-common-types";
import { DefaultReactionsIcons } from "./enumerations/default-reactions-icons";
import { DefaultReactionsTypeEnum } from "./enumerations/default-reactions-type";
import { IDefaultReactions } from "./interfaces/default-reactions";

export const DefaultReactions: IDefaultReactions = {
    Angry: {
        reaction: DefaultReactionsTypeEnum.Angry,
        icon: DefaultReactionsIcons.Angry,
    },
    Celebrate: {
        reaction: DefaultReactionsTypeEnum.Celebrate,
        icon: DefaultReactionsIcons.Celebrate,
    },
    Hug: {
        reaction: DefaultReactionsTypeEnum.Hug,
        icon: DefaultReactionsIcons.Hug,
    },
    Huh: {
        reaction: DefaultReactionsTypeEnum.Huh,
        icon: DefaultReactionsIcons.Huh,
    },
    Laugh: {
        reaction: DefaultReactionsTypeEnum.Laugh,
        icon: DefaultReactionsIcons.Laugh,
    },
    Like: {
        reaction: DefaultReactionsTypeEnum.Like,
        icon: DefaultReactionsIcons.Like,
    },
    Love: {
        reaction: DefaultReactionsTypeEnum.Love,
        icon: DefaultReactionsIcons.Love,
    },
    Sad: {
        reaction: DefaultReactionsTypeEnum.Sad,
        icon: DefaultReactionsIcons.Sad,
    },
    Wow: {
        reaction: DefaultReactionsTypeEnum.Wow,
        icon: DefaultReactionsIcons.Wow,
    },
};

export type DefaultReactionsType = keyof typeof DefaultReactions;

export const DefaultReactionsIconMap: Map<DefaultReactionsTypeEnum, IconName> = new Map([
    [DefaultReactionsTypeEnum.Angry, DefaultReactionsIcons.Angry],
    [DefaultReactionsTypeEnum.Celebrate, DefaultReactionsIcons.Celebrate],
    [DefaultReactionsTypeEnum.Hug, DefaultReactionsIcons.Hug],
    [DefaultReactionsTypeEnum.Huh, DefaultReactionsIcons.Huh],
    [DefaultReactionsTypeEnum.Laugh, DefaultReactionsIcons.Laugh],
    [DefaultReactionsTypeEnum.Like, DefaultReactionsIcons.Like],
    [DefaultReactionsTypeEnum.Love, DefaultReactionsIcons.Love],
    [DefaultReactionsTypeEnum.Sad, DefaultReactionsIcons.Sad],
    [DefaultReactionsTypeEnum.Wow, DefaultReactionsIcons.Wow],
]);

export function findIconByIconName(iconName: IconName): DefaultReactionsTypeEnum {
    for (const [key, value] of DefaultReactionsIconMap.entries()) {
        if (value === iconName) {
            return key;
        }
    }
    throw new Error(`Unknown icon name: ${iconName}`);
}