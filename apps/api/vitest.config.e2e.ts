import type { ViteUserConfig } from "vitest/config";
import { defineConfig, mergeConfig } from "vitest/config";

import rootConfig from "../../vitest.config.js";

const config: ViteUserConfig = mergeConfig(
	rootConfig,
	defineConfig({
		test: {
			include: ["test/**/*.e2e-spec.ts"]
		}
	})
);

export default config;
