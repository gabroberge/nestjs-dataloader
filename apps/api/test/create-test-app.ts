import type { INestApplication } from "@nestjs/common";
import { ExpressAdapter } from "@nestjs/platform-express";
import { Test } from "@nestjs/testing";
import type { App } from "supertest/types.js";

import { AppModule } from "../src/app.module.js";

export async function createTestApp(): Promise<INestApplication<App>> {
	const module = await Test.createTestingModule({
		imports: [AppModule]
	}).compile();

	const app = module.createNestApplication(new ExpressAdapter());
	await app.init();
	return app;
}
