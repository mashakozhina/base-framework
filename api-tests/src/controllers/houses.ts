import { HttpClient } from '../utils/http-client';
import { ParsedResponse } from '../utils/response-parser';
import { appData } from '../../fixtures/wizard-world/app-data';

export class Houses {
  private readonly hostUrl: string | undefined;
  private readonly httpClient: HttpClient;
  private readonly headers: Record<string, string>;

  constructor(headers: Record<string, string> = appData.defaultHeaders) {
    this.hostUrl = appData.endpoint;
    this.httpClient = new HttpClient(this.hostUrl);
    this.headers = headers;
  }

  getHouses(): Promise<ParsedResponse> {
    const path: string = '/Houses';
    return this.httpClient.get(path, this.headers);
  }

  getHouseById(id: string): Promise<ParsedResponse> {
    const path: string = `/Houses/${id}`;
    return this.httpClient.get(path, this.headers);
  }
}
