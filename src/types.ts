import type { Type } from '@nestjs/common';
import type { ContextId } from '@nestjs/core';
import type DataLoader from 'dataloader';

import { NEST_LOADER_CONTEXT_KEY } from './constants';
import { NestDataLoader } from './nest-dataloader';

export type LoaderContext = {
	contextId: ContextId;
	getLoader(data: LoaderData | string): Promise<DataLoader<any, any>>;
};

export type LoaderData = Type<NestDataLoader<any, any>>;

export type InjectionContext = {
	[key: string]: DataLoader<any, any> | LoaderContext | undefined;
	[NEST_LOADER_CONTEXT_KEY]?: LoaderContext;
};
