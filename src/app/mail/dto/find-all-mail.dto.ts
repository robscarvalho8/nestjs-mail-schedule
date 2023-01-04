import { MailStatusEnum } from '../mail-status.enum';

export class FindAllMailDTO {
  dueDateLte: string;
  status: MailStatusEnum.WAITING;
}
