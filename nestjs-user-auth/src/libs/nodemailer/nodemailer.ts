/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { logInfo } from '@/libs/winston/logger';
import * as nodemailer from 'nodemailer';

export class NodeMailerImplementation {
  private static instance: NodeMailerImplementation;
  private transporter: nodemailer.Transporter;

  // private constructor để chặn new trực tiếp
  private constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.NODEMAILER_USERNAME || 'nguyenphamhoangvu852004@gmail.com',
        pass: process.env.NODEMAILER_PASSWORD || 'vifq nmtl qnmm pzpx',
      },
    });
  }

  // chỉ khởi tạo duy nhất 1 instance
  public static getInstance(): NodeMailerImplementation {
    if (!NodeMailerImplementation.instance) {
      NodeMailerImplementation.instance = new NodeMailerImplementation();
    }
    logInfo('Nodemailer instance created', { isSuccess: true });
    return NodeMailerImplementation.instance;
  }

  public async sendMail(to: string, subject: string, text: string) {
    try {
      const info = await this.transporter.sendMail({
        from: `"Ticket4U" <${process.env.NODEMAILER_USERNAME || 'nguyenphamhoangvu852004@gmail.com'}>`,
        to,
        subject,
        html: text,
      });
      console.log('✅ Email sent:', info.messageId);
    } catch (error) {
      console.error('❌ Error sending mail:', error);
    }
  }
}
