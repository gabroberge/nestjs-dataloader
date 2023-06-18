import {
	createParamDecorator,
	ExecutionContext,
	InternalServerErrorException,
} from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';

import { NEST_LOADER_CONTEXT_KEY } from './constants';
import { NestDataLoaderInterceptor } from './nest-loader.interceptor';
import { InjectionContext, LoaderData } from './types';

export const Loader = createParamDecorator(
	async (data: LoaderData, context: ExecutionContext) => {
		const gqlExecutionContext = GqlExecutionContext.create(context);
		const injectionContext = gqlExecutionContext.getContext<InjectionContext>();
		const loaderContext = injectionContext[NEST_LOADER_CONTEXT_KEY];

		if (loaderContext !== undefined) return loaderContext.getLoader(data);

		throw new InternalServerErrorException(
			`You should provide interceptor ${NestDataLoaderInterceptor.name} globally with ${APP_INTERCEPTOR}`,
		);
	},
);
