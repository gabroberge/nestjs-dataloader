import type { ContextId } from "@nestjs/core";
import type DataLoader from "dataloader";

import type { LoaderData } from "./loader.data";

export interface LoaderContext {
	contextId: ContextId;
	getLoader(data: LoaderData | string): Promise<DataLoader<number | string, unknown>>;
}
