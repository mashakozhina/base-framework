import type { Config } from 'jest';
import 'dotenv/config';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/tests/**/*.test.ts'],
  testTimeout: 15000,
  reporters: [
    'default',
    ['jest-html-reporters', { publicPath: './jest-report', filename: 'index.html' }],
  ],
};

export default config;
