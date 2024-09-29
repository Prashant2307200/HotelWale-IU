import {mongoose} from '../index.js';

const db = async mongoURL => {
  await mongoose.connect(mongoURL);
}

export default db;