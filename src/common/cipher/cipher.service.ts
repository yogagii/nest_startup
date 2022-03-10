import { Injectable } from '@nestjs/common';
import { createCipheriv, createDecipheriv } from 'crypto';

@Injectable()
export class CipherService {
  encryptAES128ECB(data: string, key: string) {
    const cipher = createCipheriv('aes-128-ecb', key, null);
    cipher.setAutoPadding(true);
    const encrypted = cipher.update(data, 'utf8', 'base64');
    return encrypted + cipher.final('base64');
  }

  decryptAES128ECB(data: string, key: string) {
    const cipher = createDecipheriv('aes-128-ecb', key, null);
    cipher.setAutoPadding(true);
    const receivedPlaintext = cipher.update(data, 'base64', 'utf8');
    return receivedPlaintext + cipher.final('utf8');
  }
}
