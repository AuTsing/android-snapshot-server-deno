import { serveFile } from 'jsr:@std/http/file-server';

Deno.serve({ port: 5052, hostname: '0.0.0.0' }, req => {
    const cmdAdb = 'adb';
    const cmdSnapshotArgs = ['shell', 'screencap', '-p', '/data/local/tmp/snapshot.png'];
    const cmdPullArgs = ['pull', '/data/local/tmp/snapshot.png', './snapshot.png'];

    new Deno.Command(cmdAdb, { args: cmdSnapshotArgs }).outputSync();
    new Deno.Command(cmdAdb, { args: cmdPullArgs }).outputSync();

    return serveFile(req, './snapshot.png');
});
