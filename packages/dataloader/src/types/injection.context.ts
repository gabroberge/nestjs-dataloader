import type DataLoader from "dataloader";

import type { NEST_LOADER_CONTEXT_KEY } from "../constants";
import type { LoaderContext } from "./loader.context";

export interface InjectionContext {
	[key: string]: DataLoader<number | string, unknown> | LoaderContext | undefined;
	[NEST_LOADER_CONTEXT_KEY]?: LoaderContext;
}
