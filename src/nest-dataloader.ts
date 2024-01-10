import DataLoader from 'dataloader';

export abstract class NestDataLoader<Key extends string | number, Item> {
	public abstract generateDataLoader(): DataLoader<Key, Item | Item[]>;
}
