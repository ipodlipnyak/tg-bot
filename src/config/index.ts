// import { isDev } from './environment';

import db from './db.config';
import rabbitmq from './rabbitmq.config';

export default {
  db,
  rabbitmq,
};

export const load = [db, rabbitmq];
