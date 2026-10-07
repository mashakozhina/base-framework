export const errorMessageType = {
  invalidCredentials: 'invalidCredentials',
  lockedOutUser: 'lockedOutUser',
} as const;

export const errorMessageText = {
  invalidCredentials: 'Epic sadface: Username and password do not match any user in this service',
  lockedOutUser: 'Epic sadface: Sorry, this user has been locked out.',
} as const;
