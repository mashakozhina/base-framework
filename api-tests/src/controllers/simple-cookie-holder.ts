import { ICookieHolder } from './cookie-holder';

export class SimpleCookieHolder implements ICookieHolder {
  private cookies: string[];

  constructor(cookies: string[] = []) {
    this.cookies = cookies;
  }

  getCookiesToAdd(): string[] {
    return this.cookies;
  }

  setCookies(cookies: string[]): void {
    this.cookies = cookies;
  }
}
