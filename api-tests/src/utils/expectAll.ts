/**
 * Runs each assertion and, if any throw, reports all of their failures
 * together instead of stopping at the first one. Useful when checking
 * several fields of one response
 *
 * @example
 * expectAll(
 *   () => expect(user.first_name).toBe('Janet'),
 *   () => expect(user.last_name).toBe('Weaver'),
 * );
 */
export function expectAll(...assertions: Array<() => void>): void {
  const errors: Error[] = [];

  for (const assertion of assertions) {
    try {
      assertion();
    } catch (error) {
      errors.push(error as Error);
    }
  }

  if (errors.length > 0) {
    const message = errors.map((error, index) => `${index + 1}) ${error.message}`).join('\n\n');
    throw new Error(`${errors.length} assertion(s) failed:\n\n${message}`);
  }
}
