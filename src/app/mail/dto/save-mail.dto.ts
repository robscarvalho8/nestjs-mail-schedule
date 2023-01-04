import { IsEmail, IsISO8601, IsNotEmpty } from 'class-validator';

export class SaveMailDTO {
  @IsEmail()
  destinationAddress: string;

  @IsNotEmpty()
  destinationName: string;

  @IsISO8601()
  dueDate: string;

  @IsNotEmpty()
  subject: string;

  @IsNotEmpty()
  body: string;
}
