// import { isDev } from './environment';

import db from './db.config';
import rabbitmq from './rabbitmq.config';
import telegram from './telegram.config';

export default {
  db,
  rabbitmq,
  telegram,
};

export const load = [db, rabbitmq, telegram];
