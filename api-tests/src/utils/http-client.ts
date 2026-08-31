import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { ParsedResponse, ResponseParser } from './response-parser';
import { ICookieHolder } from '../controllers/cookie-holder';
import { SimpleCookieHolder } from '../controllers/simple-cookie-holder';

/**
 * Thin wrapper around axios. Headers are passed in per call, and cookies are carried
 * across calls via an injected ICookieHolder: any Set-Cookie on a
 * response is added to the Cookie header of the next request on
 * this client.
 */
export class HttpClient {
  private readonly axiosInstance: AxiosInstance;
  private readonly responseParser: ResponseParser;
  private readonly cookies: ICookieHolder;

  constructor(baseUrl: string | undefined, cookies: ICookieHolder = new SimpleCookieHolder()) {
    this.axiosInstance = axios.create({
      baseURL: baseUrl,
      validateStatus: () => true, // let tests assert on status codes themselves
    });
    this.responseParser = new ResponseParser();
    this.cookies = cookies;
  }

  async get(path: string, header: Record<string, string> = {}): Promise<ParsedResponse> {
    const headers = this.setCookiesToRequestHeaders(header);
    const response = await this.axiosInstance.get(path, { headers });
    const parsedResponse = this.responseParser.parse(response);
    this.setCookiesFromResponse(response);
    return parsedResponse;
  }

  async post(
    path: string,
    body: object = {},
    header: Record<string, string> = {},
  ): Promise<ParsedResponse> {
    const headers = this.setCookiesToRequestHeaders(header);
    const response = await this.axiosInstance.post(path, body, { headers });
    const parsedResponse = this.responseParser.parse(response);
    this.setCookiesFromResponse(response);
    return parsedResponse;
  }

  async put(
    path: string,
    body: object = {},
    header: Record<string, string> = {},
  ): Promise<ParsedResponse> {
    const headers = this.setCookiesToRequestHeaders(header);
    const response = await this.axiosInstance.put(path, body, { headers });
    const parsedResponse = this.responseParser.parse(response);
    this.setCookiesFromResponse(response);
    return parsedResponse;
  }

  async patch(
    path: string,
    body: object = {},
    header: Record<string, string> = {},
  ): Promise<ParsedResponse> {
    const headers = this.setCookiesToRequestHeaders(header);
    const response = await this.axiosInstance.patch(path, body, { headers });
    const parsedResponse = this.responseParser.parse(response);
    this.setCookiesFromResponse(response);
    return parsedResponse;
  }

  async delete(path: string, header: Record<string, string> = {}): Promise<ParsedResponse> {
    const headers = this.setCookiesToRequestHeaders(header);
    const response = await this.axiosInstance.delete(path, { headers });
    const parsedResponse = this.responseParser.parse(response);
    this.setCookiesFromResponse(response);
    return parsedResponse;
  }

  private setCookiesToRequestHeaders(header: Record<string, string>) {
    return {
      ...header,
      cookie: this.cookies.getCookiesToAdd(),
    };
  }

  private setCookiesFromResponse(response: AxiosResponse): void {
    const setCookie = response.headers['set-cookie'];
    if (setCookie) {
      this.cookies.setCookies(setCookie);
    }
  }
}
