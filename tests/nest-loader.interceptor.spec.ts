import { ModuleRef } from '@nestjs/core';
import { Test } from '@nestjs/testing';
import { beforeEach, describe, expect, it } from 'vitest';
import { NestDataLoaderInterceptor } from '~/nest-loader.interceptor';

describe('NestDataLoaderInterceptor', () => {
	let interceptor: NestDataLoaderInterceptor;

	beforeEach(async () => {
		const module = await Test.createTestingModule({}).compile();
		const moduleRef = module.get(ModuleRef);
		interceptor = new NestDataLoaderInterceptor(moduleRef);
	});

	it('should create the interceptor', () => {
		expect(interceptor).toBeDefined();
	});
});
