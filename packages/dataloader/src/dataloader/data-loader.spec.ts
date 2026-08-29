import DataLoader from "dataloader";
import { beforeEach, describe, expect, it } from "vitest";

import { NestDataLoader } from "./data-loader";

interface TestObject {
	id: string;
}

class TestNestLoader extends NestDataLoader<TestObject["id"], TestObject> {
	public override generateDataLoader(): DataLoader<string, TestObject, string> {
		return new DataLoader(
			async (testObjectIds) =>
				new Promise((resolve) => {
					resolve(testObjectIds.map((testObjectId) => ({ id: testObjectId })));
				})
		);
	}
}

describe(NestDataLoader, () => {
	let loader: NestDataLoader<TestObject["id"], TestObject>;

	beforeEach(() => {
		loader = new TestNestLoader();
	});

	it("should return a dataloader", () => {
		expect.assertions(1);

		expect(loader.generateDataLoader()).toBeInstanceOf(DataLoader);
	});
});
