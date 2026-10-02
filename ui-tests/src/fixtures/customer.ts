export interface Customer {
  username: string;
  password: string;
}

const standardCustomer: Customer = {
  username: 'standard_user',
  password: 'secret_sauce',
};

export function createCustomer(overrides: Partial<Customer> = {}): Customer {
  return { ...standardCustomer, ...overrides };
}

export const customers = {
  standard: standardCustomer,
  lockedOut: createCustomer({ username: 'locked_out_user' }),
  invalidPassword: createCustomer({ password: 'invalid_password' }),
} as const;
