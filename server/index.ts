import * as Koa from 'koa';
import { router } from './routes';
import * as cors from 'kcors';
import koaBody = require('koa-body');
var sqlite3 = require('sqlite3').verbose(); // create a Database object:
let db = new sqlite3.Database('./db.sqlite');
db.run('CREATE TABLE if not exists users (id TEXT PRIMARY KEY NOT NULL, email text NOT NULL, password text NOT NULL, token text NOT NULL)');

const app = new Koa();
const PORT = '3000';

app
    .use(
        cors({
            credentials: true,
            allowHeaders: ['Content-Type', 'Authorization', 'email']            
        }),
    )
    .use(router.routes()).use(router.allowedMethods())
    .use(koaBody({ multipart: true }))

app.listen(PORT, () => console.log(`Listening on port ${PORT}.`));

function cleanup() {
  console.log('Closing....');
  process.exit(1);
}

process.on('SIGINT', cleanup);
process.on('SIGTERM', cleanup);