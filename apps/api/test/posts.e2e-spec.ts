import type { INestApplication } from "@nestjs/common";
import type { App } from "supertest/types.js";
import { afterEach, beforeEach, describe, expect, it } from "vitest";

import { AccountService } from "../src/accounts/services/account.service.js";
import { PostResolver } from "../src/posts/resolvers/post.resolver.js";
import { createTestApp } from "./create-test-app.js";
import { graphql } from "./graphql.js";

describe(PostResolver, () => {
	let app: INestApplication<App>;
	let accountService: AccountService;

	beforeEach(async () => {
		app = await createTestApp();
		accountService = app.get(AccountService);
	});

	afterEach(async () => {
		await app.close();
	});

	it("batches N+1 author field resolvers into one load", async () => {
		expect.assertions(2);

		const data = await graphql(
			app,
			`
				query {
					posts {
						id
						title
						author {
							id
							name
						}
					}
				}
			`
		);

		expect(accountService.findByIdsCalls).toStrictEqual([["1", "2", "3"]]);
		expect(data).toStrictEqual({
			posts: [
				{
					author: { id: "1", name: "Ada Lovelace" },
					id: "101",
					title: "Notes on the Analytical Engine"
				},
				{
					author: { id: "2", name: "Linus Torvalds" },
					id: "102",
					title: "On Linux"
				},
				{
					author: { id: "3", name: "Grace Hopper" },
					id: "103",
					title: "COBOL and compilers"
				},
				{
					author: { id: "1", name: "Ada Lovelace" },
					id: "104",
					title: "More notes on Lovelace"
				}
			]
		});
	});
});
