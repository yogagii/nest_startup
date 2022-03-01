import * as nodemailer from 'nodemailer';
import * as fs from 'fs';
import { join, resolve } from 'path';
import * as template from './template.json';

const transporter = nodemailer.createTransport({
  host: 'smtp.na.jnj.com',
  port: 25,
  secure: false,
  tls: {
    rejectUnauthorized: false,
  },
  pool: true,
});

async function sendMail(options) {
  console.log(`options: `, options);

  const mailObject = {
    from: 'jyu36@its.jnj.com',
    to: options.to,
    cc: options.cc,
    subject: options.subject,
    html: options.html,
  };

  const info = await transporter.sendMail(mailObject);
  return info;
}

export function sendCard() {
  // join(resolve(), 'public', 'template.json');
  // const card = fs.readFileSync(template, {
  //   encoding: 'utf8',
  // });
  const options = {
    to: 'JYu36@its.jnj.com',
    subject: `test apply course`,
    html: template,
  };
  sendMail(options);
}
