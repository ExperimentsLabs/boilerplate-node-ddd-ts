import 'reflect-metadata';
import '@/shared/infrastructure/libs/koa.lib';
import mongoose from '@/shared/infrastructure/libs/mongoose.lib';
import { Table } from 'console-table-printer';
import { initSubscribers } from '@/shared/infrastructure/event-bus/index';


const p = new Table();

const db = async () => {
  try {
    const uri = await mongoose();

    p.addRow({ name: 'MongoDB', status: 'OK', path: uri }, { color: 'green' });
  } catch (error) {
    p.addRow({ name: 'MongoDB', status: 'FAILED', error }, { color: 'red' });
  }
};

(async () => {
  await db();

  await initSubscribers();

  p.addRow(
    { name: 'Server', status: 'OK', url: 'http://localhost:3000' },
    { color: 'green' }
  );

  p.addRow(
    {
      name: 'Swagger',
      status: 'OK',
      url: 'http://localhost:3000/swagger-html'
    },
    { color: 'green' }
  );

  p.printTable();
})();
