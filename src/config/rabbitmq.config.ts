import { registerAs } from '@nestjs/config';
import { env } from './environment';

export default registerAs('rabbitmq', () => {
  return {
    url: env.RABBITMQ_URL || '',
  };
});
