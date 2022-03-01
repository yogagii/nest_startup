import { Body, Controller, Get } from '@nestjs/common';
import { EmailService } from './email.service';
// import { sendCard } from 'src/common/email/email.service';

@Controller('email')
export class EmailController {
  constructor(private emailService: EmailService) {}

  @Get('/sendCode')
  async sendEmailCode(@Body() data) {
    // sendCard();
    return this.emailService.sendEmailCode(data);
  }
}
