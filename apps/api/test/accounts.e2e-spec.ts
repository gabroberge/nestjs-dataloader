import type { INestApplication } from "@nestjs/common";
import type { App } from "supertest/types.js";
import { afterEach, beforeEach, describe, expect, it } from "vitest";

import { AccountResolver } from "../src/accounts/resolvers/account.resolver.js";
import { AccountService } from "../src/accounts/services/account.service.js";
import { createTestApp } from "./create-test-app.js";
import { graphql } from "./graphql.js";

describe(AccountResolver, () => {
	let app: INestApplication<App>;
	let accountService: AccountService;

	beforeEach(async () => {
		app = await createTestApp();
		accountService = app.get(AccountService);
	});

	afterEach(async () => {
		await app.close();
	});

	it("batches loadMany into a single findByIds call", async () => {
		expect.assertions(2);

		const data = await graphql(
			app,
			`
				query {
					accounts(ids: ["1", "2"]) {
						id
						name
					}
				}
			`
		);

		expect(accountService.findByIdsCalls).toStrictEqual([["1", "2"]]);
		expect(data).toStrictEqual({
			accounts: [
				{ id: "1", name: "Ada Lovelace" },
				{ id: "2", name: "Linus Torvalds" }
			]
		});
	});
});
