import { Injectable } from "@nestjs/common";

import { Post } from "../models/post.model.js";

@Injectable()
export class PostService {
	private readonly posts: Omit<Post, "author">[] = [
		{ authorId: "1", id: "101", title: "Notes on the Analytical Engine" },
		{ authorId: "2", id: "102", title: "On Linux" },
		{ authorId: "3", id: "103", title: "COBOL and compilers" },
		{ authorId: "1", id: "104", title: "More notes on Lovelace" }
	];

	public findAll(): Omit<Post, "author">[] {
		return this.posts;
	}
}
