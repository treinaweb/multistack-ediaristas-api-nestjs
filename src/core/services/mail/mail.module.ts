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
            user: 'postmaster@sandbox0e28a0cb8d6e41ada1b1b839eb54ae64.mailgun.org',
            pass: '3abdf660f2ba2ce890399b147e0f80d0-52d193a0-29ddd387',
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
