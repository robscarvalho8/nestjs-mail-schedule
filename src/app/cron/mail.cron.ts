import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { MailStatusEnum } from '../mail/mail-status.enum';
import { MailService } from '../mail/mail.service';
import { SendEmailInterface } from '../sendgrid/interface/send-email.interface';
import { SendgridService } from '../sendgrid/service/sendgrid.service';

@Injectable()
export class MailCron {
  private logger = new Logger(MailCron.name);

  constructor(private readonly mailService: MailService, private readonly sendGridService: SendgridService) {}

  @Cron(CronExpression.EVERY_10_SECONDS)
  async handler() {
    const mailList = await this.mailService.findAll({
      dueDateLte: new Date().toISOString(),
      status: MailStatusEnum.WAITING,
    });
    for (const mail of mailList) {
      const data: SendEmailInterface = {
        personalizations: [
          {
            to: [
              {
                name: mail.destinationName,
                email: mail.destinationAddress,
              },
            ],
          },
        ],
        from: {
          email: 'robscarvalho8@gmail.com',
          name: 'Robson',
        },
        content: [
          {
            type: 'text/html',
            value: mail.body,
          },
        ],
        reply_to: {
          email: 'desenvolvedor.robson@gmail.com',
          name: 'RME TECH',
        },
        subject: mail.subject,
      };
      await this.sendGridService.sendEmail(data);
      await this.mailService.updateStatus(mail.id, MailStatusEnum.SENT);
      this.logger.log('E-mail enviado com sucesso !');
    }
  }
}
