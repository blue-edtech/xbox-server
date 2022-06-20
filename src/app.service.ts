import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getStatus(baseUrl: string) {
    return {
      status: 'Xbox Server is running! 🚀',
      docs: baseUrl + '/api',
    };
  }
}
