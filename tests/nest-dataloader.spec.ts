import DataLoader from 'dataloader';
import { beforeEach, describe, expect, it } from 'vitest';

import { NestDataLoader } from '~/nest-dataloader';

type TestObject = {
	id: string;
};

class TestNestLoader extends NestDataLoader<TestObject['id'], TestObject> {
	generateDataLoader(): DataLoader<string, TestObject, string> {
		return new DataLoader(
			async testObjectIds =>
				new Promise(resolve =>
					resolve(testObjectIds.map(testObjectId => ({ id: testObjectId }))),
				),
		);
	}
}

describe('NestDataLoader', () => {
	let loader: NestDataLoader<TestObject['id'], TestObject>;

	beforeEach(() => {
		loader = new TestNestLoader();
	});

	it('should return a dataloader', () => {
		const actual = loader.generateDataLoader();

		expect(actual).toBeInstanceOf(DataLoader);
	});

	it('should map from an array of object and map to an array of objects by key', () => {
		const actual = loader.mapFromArrayToArray(
			[{ id: 'testObject' }, { id: 'testObject2' }, { id: 'testObject' }],
			testObject => testObject.id,
		);

		expect(actual).toBeInstanceOf(Map);
		expect([...actual.entries()]).toEqual([
			['testObject', [{ id: 'testObject' }, { id: 'testObject' }]],
			['testObject2', [{ id: 'testObject2' }]],
		]);
	});

	it('should map from an array of object and map to objects by key', () => {
		const actual = loader.mapFromArrayToObject(
			[{ id: 'testObject' }, { id: 'testObject2' }, { id: 'testObject3' }],
			testObject => testObject.id,
		);

		expect(actual).toBeInstanceOf(Map);
		expect([...actual.entries()]).toEqual([
			['testObject', { id: 'testObject' }],
			['testObject2', { id: 'testObject2' }],
			['testObject3', { id: 'testObject3' }],
		]);
	});
});
