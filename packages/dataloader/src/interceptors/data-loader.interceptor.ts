import type { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
import { Injectable } from "@nestjs/common";
import { ContextIdFactory, ModuleRef } from "@nestjs/core";
import { GqlExecutionContext } from "@nestjs/graphql";
import type DataLoader from "dataloader";
import type { Observable } from "rxjs";

import { NEST_LOADER_CONTEXT_KEY } from "../constants";
import { NestDataLoader } from "../dataloader/data-loader";
import type { InjectionContext } from "../types/injection.context";

@Injectable()
export class NestDataLoaderInterceptor implements NestInterceptor {
	constructor(private readonly moduleRef: ModuleRef) {}

	public intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
		const gqlExecutionContext = GqlExecutionContext.create(context);
		const injectionContext = gqlExecutionContext.getContext<InjectionContext>();

		injectionContext[NEST_LOADER_CONTEXT_KEY] ??= {
			contextId: ContextIdFactory.create(),
			getLoader: this.getLoader.bind(this, injectionContext)
		};

		return next.handle();
	}

	private async getLoader(
		injectionContext: InjectionContext,
		type: string
	): Promise<DataLoader<number | string, unknown>> {
		if (injectionContext[type] === undefined) {
			await this.moduleRef
				.resolve<NestDataLoader>(type, injectionContext[NEST_LOADER_CONTEXT_KEY]?.contextId, {
					strict: false
				})
				.then((nestLoader) => {
					injectionContext[type] = nestLoader.generateDataLoader();
				});
		}

		return injectionContext[type] as DataLoader<number | string, unknown>;
	}
}
