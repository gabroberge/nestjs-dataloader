import { Module } from "@nestjs/common";

import { PostResolver } from "./resolvers/post.resolver.js";
import { PostService } from "./services/post.service.js";

@Module({
	providers: [PostResolver, PostService]
})
export class PostsModule {}
