import { Field, ID, ObjectType } from "@nestjs/graphql";

import { Account } from "../../accounts/models/account.model.js";

@ObjectType()
export class Post {
	@Field(() => Account)
	public readonly author: Account;

	public readonly authorId: string;

	@Field(() => ID)
	public readonly id: string;

	@Field()
	public readonly title: string;
}
