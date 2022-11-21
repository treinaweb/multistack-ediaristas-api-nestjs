import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { join } from 'path';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { MailService } from './mail.service';

@Module({
  imports: [
    MailerModule.forRootAsync({
      useFactory: async () => ({
        transport: {
          host: 'smtp.mailgun.org',
          secure: false,
          port: 587,
          auth: {
            user: 'postmaster@sandbox589b4d7661234274b3e5000276b5837a.mailgun.org',
            pass: '81b6054b808c7d6d7696382c3b809d03-48c092ba-f0ee22a5',
          },
          ignoreTLS: true,
        },
        defaults: {
          from: '"No Reply" <noreply@ediaristas.com>',
        },
        template: {
          dir: join(__dirname, 'templates'),
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
      }),
    }),
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
