import { Loader } from "@gabroberge/nestjs-dataloader";
import { Parent, Query, ResolveField, Resolver } from "@nestjs/graphql";
import DataLoader from "dataloader";

import { AccountLoader } from "../../accounts/loaders/account.loader.js";
import { Account } from "../../accounts/models/account.model.js";
import { Post } from "../models/post.model.js";
import { PostService } from "../services/post.service.js";

@Resolver(() => Post)
export class PostResolver {
	constructor(private readonly postService: PostService) {}

	@ResolveField(() => Account)
	public async author(
		@Parent() post: Omit<Post, "author">,
		@Loader(AccountLoader) accountLoader: DataLoader<string, Account>
	): Promise<Account | Error> {
		return accountLoader.load(post.authorId);
	}

	@Query(() => [Post])
	public posts(): Omit<Post, "author">[] {
		return this.postService.findAll();
	}
}
