import type DataLoader from "dataloader";

export abstract class NestDataLoader<Key extends number | string = number | string, Item = unknown> {
	public abstract generateDataLoader(): DataLoader<Key, Item | Item[]>;
}
