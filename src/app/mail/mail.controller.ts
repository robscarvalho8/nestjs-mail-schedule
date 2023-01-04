import { Body, Controller, Post } from '@nestjs/common';
import { SaveMailDTO } from './dto/save-mail.dto';
import { MailService } from './mail.service';

@Controller('api/v1/mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Post()
  async save(@Body() body: SaveMailDTO) {
    return this.mailService.save(body);
  }
}
