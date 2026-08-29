import type { INestApplication } from "@nestjs/common";
import { type } from "arktype";
import request from "supertest";
import type { App } from "supertest/types.js";

const GraphqlBody = type({
	data: "unknown",
	"errors?": "undefined"
});

export async function graphql(app: INestApplication<App>, query: string): Promise<unknown> {
	const response = await request(app.getHttpServer()).post("/graphql").send({ query }).expect(200);
	return GraphqlBody.assert(response.body).data;
}
