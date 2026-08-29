import { Field, ID, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class Account {
	@Field(() => ID)
	public readonly id: string;

	@Field()
	public readonly name: string;
}
