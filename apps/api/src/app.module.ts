import { NestDataLoaderInterceptor } from "@gabroberge/nestjs-dataloader";
import type { ApolloDriverConfig } from "@nestjs/apollo";
import { ApolloDriver } from "@nestjs/apollo";
import { Module } from "@nestjs/common";
import { APP_INTERCEPTOR } from "@nestjs/core";
import { GraphQLModule } from "@nestjs/graphql";

import { AccountsModule } from "./accounts/accounts.module.js";
import { PostsModule } from "./posts/posts.module.js";

@Module({
	imports: [
		GraphQLModule.forRoot<ApolloDriverConfig>({
			autoSchemaFile: true,
			driver: ApolloDriver
		}),
		AccountsModule,
		PostsModule
	],
	providers: [
		{
			provide: APP_INTERCEPTOR,
			useClass: NestDataLoaderInterceptor
		}
	]
})
export class AppModule {}
