import type { Config } from 'jest';

const config: Config = {
  displayName: 'Record Store',
  coverageThreshold: {
    global: {
      statements: 80,
      branches: 80,
      functions: 80,
      lines: 80
    }
  },
  verbose: true,
};

export default config;
