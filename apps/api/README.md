# api

NestJS 12 (`--strict`) test app that consumes the local `@gabroberge/nestjs-dataloader` workspace package.

It exposes a GraphQL API used to verify:

- `@Loader` + `NestDataLoader` on a `accounts(ids)` query (`loadMany`)
- N+1 batching on `posts { author }` field resolvers

```bash
bun run start:dev
```

GraphQL playground: `http://localhost:3000/graphql`
