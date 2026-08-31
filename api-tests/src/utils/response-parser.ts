import { AxiosResponse } from 'axios';

export interface ParsedResponse {
  status: number;
  headers: Record<string, unknown>;
  body: any;
}

/** Reduces an AxiosResponse to the shape tests actually need */
export class ResponseParser {
  parse(response: AxiosResponse): ParsedResponse {
    return {
      status: response.status,
      headers: response.headers,
      body: response.data,
    };
  }
}
