import type {
	CallHandler,
	ExecutionContext,
	NestInterceptor,
} from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { ContextIdFactory, ModuleRef } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import type DataLoader from 'dataloader';
import type { Observable } from 'rxjs';

import { InjectionContext } from './types';
import { NEST_LOADER_CONTEXT_KEY } from './constants';
import { NestDataLoader } from './nest-dataloader';

@Injectable()
export class NestDataLoaderInterceptor implements NestInterceptor {
	public constructor(private readonly moduleRef: ModuleRef) {}

	public intercept(
		context: ExecutionContext,
		next: CallHandler,
	): Observable<unknown> {
		const gqlExecutionContext = GqlExecutionContext.create(context);
		const injectionContext = gqlExecutionContext.getContext<InjectionContext>();

		if (injectionContext[NEST_LOADER_CONTEXT_KEY] === undefined) {
			injectionContext[NEST_LOADER_CONTEXT_KEY] = {
				contextId: ContextIdFactory.create(),
				getLoader: this.getLoader.bind(this, injectionContext),
			};
		}

		return next.handle();
	}

	private async getLoader(
		injectionContext: InjectionContext,
		type: string,
	): Promise<DataLoader<any, any>> {
		if (injectionContext[type] === undefined) {
			const nestLoader = await this.moduleRef.resolve<NestDataLoader<any, any>>(
				type,
				injectionContext[NEST_LOADER_CONTEXT_KEY]?.contextId,
				{
					strict: false,
				},
			);

			injectionContext[type] = nestLoader.generateDataLoader();
		}

		return injectionContext[type] as DataLoader<any, any>;
	}
}
