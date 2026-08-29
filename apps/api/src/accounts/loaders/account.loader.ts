import { NestDataLoader } from "@gabroberge/nestjs-dataloader";
import { Injectable } from "@nestjs/common";
import DataLoader from "dataloader";

import { Account } from "../models/account.model.js";
import { AccountService } from "../services/account.service.js";

@Injectable()
export class AccountLoader extends NestDataLoader<string, Account> {
	constructor(private readonly accountService: AccountService) {
		super();
	}

	public override generateDataLoader(): DataLoader<string, Account> {
		return new DataLoader<string, Account>(this.accountService.findByIds.bind(this.accountService));
	}
}
