import { HttpService } from '@nestjs/axios';
import { HttpStatus, Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import { SendEmailInterface } from '../interface/send-email.interface';

@Injectable()
export class SendgridService {
  private readonly SENDRIG_API_URL = process.env.SENDRIG_API_URL;
  private readonly SENDRIG_API_KEY = process.env.SENDRIG_API_KEY;

  constructor(private readonly httpService: HttpService) {}

  async sendEmail(data: SendEmailInterface): Promise<boolean> {
    const url = `${this.SENDRIG_API_URL}/mail/send`;
    const config = {
      headers: {
        Authorization: `Bearer ${this.SENDRIG_API_KEY}`,
      },
    };
    const response = await lastValueFrom(this.httpService.post(url, data, config));
    return response.status == HttpStatus.ACCEPTED;
  }
}
