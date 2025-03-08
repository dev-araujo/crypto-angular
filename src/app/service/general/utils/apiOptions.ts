import { environment } from '../../../../environments/environment';

interface Options {
  headers: {
    'Content-Type': string;
    'x-access-token': string;
  };
}

export class ApiOptions {
  private static readonly accessToken = environment.tokens.ACCESSTOKEN;

  static getDefaultOptions(): Options {
    return {
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': this.accessToken,
      },
    };
  }
}
