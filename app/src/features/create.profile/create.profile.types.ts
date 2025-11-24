import type { Database } from "../../types/database.types";

export type userProfilesType = Database["public"]["Tables"]["profiles"]["Insert"];
export type userProfilesInsert = Omit<
	userProfilesType,
	"user_id" | "subscription_expires_at"
>;