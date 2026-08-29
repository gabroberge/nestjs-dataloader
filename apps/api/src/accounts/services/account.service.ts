import { Injectable } from "@nestjs/common";

import { Account } from "../models/account.model.js";

@Injectable()
export class AccountService {
	public readonly findByIdsCalls: string[][] = [];

	private readonly accounts: Account[] = [
		{ id: "1", name: "Ada Lovelace" },
		{ id: "2", name: "Linus Torvalds" },
		{ id: "3", name: "Grace Hopper" }
	];

	public async findByIds(ids: readonly string[]): Promise<(Account | Error)[]> {
		this.findByIdsCalls.push([...ids]);
		return Promise.resolve(
			ids.map((id) => {
				const account = this.accounts.find((item) => item.id === id);
				return account ?? new Error(`Account ${id} not found`);
			})
		);
	}
}
