import { IHasSoftDelete } from "./has-soft-delete";
import { IHasTimestampOwners } from "./has-timestamp-owners";
import { IHasTimestamps } from "./has-timestamps";

export interface IInvitation extends IHasTimestamps, IHasSoftDelete, IHasTimestampOwners {
    email?: string;
    phone?: string;
    token?: string;
    maxUses?: number;
    metadata: {
        uses: number;
        views: number;
    };
}