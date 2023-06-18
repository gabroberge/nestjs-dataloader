import DataLoader from 'dataloader';

export abstract class NestDataLoader<
	Key extends string | number,
	Item extends Record<string, unknown>,
> {
	public abstract generateDataLoader(): DataLoader<Key, Item>;

	public mapFromArrayToArray<KeyStrategy extends (item: Item) => Key>(
		array: Item[],
		keyStrategy: KeyStrategy,
	): Map<Key, Item[]> {
		return array.reduce((map, item) => {
			const key = keyStrategy(item);
			const existingGroup = map.get(key);

			if (existingGroup) {
				existingGroup.push(item);
			} else {
				map.set(key, [item]);
			}

			return map;
		}, new Map<Key, Item[]>());
	}

	public mapFromArrayToObject<KeyStrategy extends (item: Item) => Key>(
		array: Item[],
		keyStrategy: KeyStrategy,
	): Map<Key, Item> {
		return array.reduce((map, item) => {
			map.set(keyStrategy(item), item);
			return map;
		}, new Map<Key, Item>());
	}
}
