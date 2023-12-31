# NestJS Dataloader

NestJS dataloader simplifies adding [graphql/dataloader](https://github.com/graphql/dataloader) to your NestJS project. DataLoader aims to solve the common N+1 loading problem.

## Installation

Install with pnpm

```bash
pnpm add @gabroberge/nestjs-dataloader
```

Install with yarn

```bash
yarn add @gabroberge/nestjs-dataloader
```

Install with npm

```bash
npm install --save @gabroberge/nestjs-dataloader
```

## Usage

### NestDataLoader Creation

We start by extends the `NestDataLoader` abstract class. This tells `DataLoader` how to load our objects.

```typescript
import  DataLoader from 'dataloader';
import { Injectable } from '@nestjs/common';
import { NestDataLoader } from '@gabroberge/nestjs-dataloader';
...

@Injectable()
export class AccountLoader extends NestDataLoader<string, Account> {
  constructor(private readonly accountService: AccountService) { }

  generateDataLoader(): DataLoader<string, Account> {
    return new DataLoader<string, Account>(keys => this.accountService.findByIds(keys));
  }
}
```

The first generic of the interface is the type of ID the datastore uses. The second generic is the type of object that will be returned. In the above instance, we want `DataLoader` to return instances of the `Account` class.

### Providing the NestDataLoader

For each NestDataLoader we create, we need to provide it to our module.

```typescript
import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { NestDataLoaderInterceptor } from '@gabroberge/nestjs-dataloader'
...

@Module({
  providers: [
    AccountResolver,
    AccountLoader,
    {
      provide: APP_INTERCEPTOR,
      useClass: NestDataLoaderInterceptor,
    },
  ],

})
export class ResolversModule { }
```

### Using the NestDataLoader

Now that we have a dataloader and our module is aware of it, we need to pass it as a parameter to an endpoint in our graphQL resolver.

```typescript
import DataLoader from 'dataloader';
import { Loader } from '@gabroberge/nestjs-dataloader';
...

@Resolver(Account)
export class AccountResolver {

    @Query(() => [Account])
    public getAccounts(
        @Args({ name: 'ids', type: () => [String] }) ids: string[],
        @Loader(AccountLoader) accountLoader: DataLoader<Account['id'], Account>): Promise<Account[]> {
        return accountLoader.loadMany(ids);
    }
}
```

The important thing to note is that the parameter of the `@Loader` decorator is the entity/class of the `NestDataLoader` we want to be injected to the method. The DataLoader library will handle bulk retrieval and caching of our requests. Note that the caching is stored on a per-request basis.

## Contributing

Pull requests are always welcome. For major changes, please open an issue first to discuss what you would like to change.