import { HttpClient } from '../utils/http-client';
import { UserFeedback } from '../interfaces/feedback';
import { appData } from '../../fixtures/wizard-world/app-data';

/** One controller per resource.*/
export class Feedback {
  private readonly hostUrl: string | undefined;
  private readonly httpClient: HttpClient;
  private readonly headers: Record<string, string>;

  constructor(headers: Record<string, string> = appData.defaultHeaders) {
    this.hostUrl = appData.endpoint;
    this.httpClient = new HttpClient(this.hostUrl);
    this.headers = headers;
  }

  sendFeedback(body: UserFeedback) {
    const path: string = '/Feedback';
    return this.httpClient.post(path, body, this.headers);
  }
}
