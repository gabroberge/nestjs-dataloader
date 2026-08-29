# @gabroberge/nestjs-dataloader

## 4.0.0

### Major Changes

- [#58](https://github.com/gabroberge/nestjs-dataloader/pull/58) [`f1af94d`](https://github.com/gabroberge/nestjs-dataloader/commit/f1af94de346480527bde11dd21a6cea104b2051c) Thanks [@gabroberge](https://github.com/gabroberge)! - Raise peer dependencies to **NestJS 12** (`@nestjs/common`, `@nestjs/core`) and **`@nestjs/graphql` 14**. Applications still on NestJS 11 or `@nestjs/graphql` 13 must upgrade before installing this release.

    The package build was also modernized: the library now ships from a workspace package built with **tsdown** instead of tsup.

## 3.0.0

### Major Changes

- 41e83ac: Raise peer dependencies to **NestJS 11** (`@nestjs/common`, `@nestjs/core`), **`@nestjs/graphql` 13**, and patch bumps for `dataloader` and `rxjs`. Applications still on NestJS 10 or `@nestjs/graphql` 12 must upgrade before installing this release.

## 2.0.0

### Major Changes

- 42bae25: remove mapFromArrayToObject and mapFromArrayToArray functions from NestDataLoader

## 1.3.1

### Patch Changes

- dce19ad: fix issue with dataloader being generated twice

## 1.3.0

### Minor Changes

- a135b75: fix workflows
- a135b75: upgrade dependencies

## 1.2.1

### Patch Changes

- a62cfc0: fix typings

## 1.2.0

### Minor Changes

- 57a8404: fix decorator metadata not being emitted

## 1.1.2

### Patch Changes

- 42e8273: update readme

## 1.1.1

### Patch Changes

- d41793f: update readme

## 1.1.0

### Minor Changes

- 5d1400f: add dataloader decorator

## 1.0.0

### Major Changes

- 6cfb2ae: implemented dataloader library for nestjs

## 0.0.2

### Patch Changes

- 20b4a79: update readme

## 0.0.1

### Patch Changes

- db3832c: initial commit
