import { Module } from "@nestjs/common";

import { AccountLoader } from "./loaders/account.loader.js";
import { AccountResolver } from "./resolvers/account.resolver.js";
import { AccountService } from "./services/account.service.js";

@Module({
	providers: [AccountLoader, AccountResolver, AccountService]
})
export class AccountsModule {}
