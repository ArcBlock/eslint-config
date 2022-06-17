import crypto from 'crypto';

export const md5 = (x: $TSFixMe) => crypto.createHash('md5').update(x).digest('hex');
