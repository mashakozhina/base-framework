export interface ICookieHolder {
  getCookiesToAdd(): string[];

  setCookies(header: string[]): void;
}
