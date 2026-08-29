import { Loader } from "@gabroberge/nestjs-dataloader";
import { Args, Query, Resolver } from "@nestjs/graphql";
import DataLoader from "dataloader";

import { AccountLoader } from "../loaders/account.loader.js";
import { Account } from "../models/account.model.js";

@Resolver(() => Account)
export class AccountResolver {
	@Query(() => [Account])
	public async accounts(
		@Args({ name: "ids", type: () => [String] }) ids: string[],
		@Loader(AccountLoader) accountLoader: DataLoader<string, Account>
	): Promise<(Account | Error)[]> {
		return accountLoader.loadMany(ids);
	}
}
