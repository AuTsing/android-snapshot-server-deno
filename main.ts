import { Application } from 'jsr:@oak/oak/application';
import { oakCors } from 'jsr:@tajpouria/cors';

const app = new Application();

app.use(oakCors());

app.use(ctx => {
    const cmdAdb = 'adb';
    const cmdSnapshotArgs = ['shell', 'screencap', '-p', '/data/local/tmp/snapshot.png'];
    const cmdPullArgs = ['pull', '/data/local/tmp/snapshot.png', './snapshot.png'];

    new Deno.Command(cmdAdb, { args: cmdSnapshotArgs }).outputSync();
    new Deno.Command(cmdAdb, { args: cmdPullArgs }).outputSync();

    return ctx.send({
        root: Deno.cwd(),
        path: './snapshot.png',
    });
});

app.listen({ port: 5052, hostname: '0.0.0.0' });
console.log('Listening on http://127.0.0.1:5052/');
