import Ajv, { Schema } from 'ajv';

const ajv = new Ajv({ allErrors: true });

/** Validates `data` against a JSON schema.*/
export function validateSchema(json: unknown, schema: Schema): void {
  const validate = ajv.compile(schema);
  if (!validate(json)) {
    throw new Error(`Schema validation failed: ${JSON.stringify(validate.errors, null, 2)}`);
  }
}
