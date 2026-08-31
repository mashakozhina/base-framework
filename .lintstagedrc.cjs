module.exports = {
  'ui-tests/**/*.ts': [
    'eslint --fix',
    'prettier --write',
    () => 'tsc --noEmit -p ui-tests/tsconfig.json',
  ],
  'api-tests/**/*.ts': [
    'eslint --fix',
    'prettier --write',
    () => 'tsc --noEmit -p api-tests/tsconfig.json',
  ],
  '*.{json,md,yml,yaml}': ['prettier --write'],
};
