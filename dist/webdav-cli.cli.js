#!/usr/bin/env node
'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const chalk = require('chalk');
const figlet = require('figlet');
const minimist = require('minimist');
const webdav_cli_server_1 = require('./webdav-cli.server');
const argv = minimist(process.argv.slice(2));
console.log(
    chalk.green(figlet.textSync('webdav-cli', { horizontalLayout: 'full' })),
);
if (argv.help) {
    console.log(
        [
            'usage: webdav-cli [options]',
            '',
            'options:',
            '  --path       Path to folder [process.cwd()]',
            '  --host       Host to use [127.0.0.1]',
            '  --port       Port to use [1900]',
            '  --digest     Enable digest authentication [basic]',
            '  --username   Username for basic/digest authentication [random]',
            '  --password   Password for basic/digest authentication [random]',
            '  --directory  Show directory listings [false]',
            '  --autoIndex  Display autoIndex [false]',
            '  --ssl        Enable https [false]',
            '  --sslKey     Path to ssl key file [self-signed]',
            '  --sslCert    Path to ssl cert file [self-signed]',
            '  --help       Print this list and exit',
            '  --version    Print the version and exit.',
            '  --rights     Comma separated values without spaces [all]',
            `
    'all', 'canCreate', 'canDelete', 'canMove', 'canRename', 
    'canAppend', 'canWrite', 'canRead', 'canSource', 
    'canGetMimeType', 'canGetSize', 'canListLocks', 
    'canSetLock', 'canRemoveLock', 'canGetAvailableLocks', 
    'canGetLock', 'canAddChild', 'canRemoveChild', 
    'canGetChildren', 'canSetProperty', 'canGetProperty', 
    'canGetProperties', 'canRemoveProperty', 'canGetCreationDate', 
    'canGetLastModifiedDate', 'canGetWebName', 'canGetType'`,
            '',
            'env:',
            '  WEBDAV_CLI_PATH, WEBDAV_CLI_HOST, WEBDAV_CLI_PORT,',
            '  WEBDAV_CLI_USERNAME, WEBDAV_CLI_PASSWORD, WEBDAV_CLI_DIGEST,',
            '  WEBDAV_CLI_SSL, WEBDAV_CLI_SSL_KEY, WEBDAV_CLI_SSL_CERT,',
            '  WEBDAV_CLI_DIRECTORY, WEBDAV_CLI_AUTO_INDEX, WEBDAV_CLI_RIGHTS',
            '  WEBDAV_CLI_DISABLE_AUTHENTICATION',
            '',
        ].join('\n'),
    );
    process.exit();
}
if (argv.version) {
    console.log('Version: ' + require('../package.json').version, '\n');
    process.exit();
}
const argvRights =
    argv.rights && typeof argv.rights === 'string'
        ? argv.rights.split(',')
        : undefined;
const envRights = process.env.WEBDAV_CLI_RIGHTS
    ? process.env.WEBDAV_CLI_RIGHTS.split(',')
    : undefined;
const config = {
    path: argv.path || process.env.WEBDAV_CLI_PATH,
    host: argv.host || process.env.WEBDAV_CLI_HOST,
    port: argv.port || parseInt(String(process.env.WEBDAV_CLI_PORT)),
    digest: argv.digest || Boolean(process.env.WEBDAV_CLI_DIGEST),
    username: argv.username || process.env.WEBDAV_CLI_USERNAME,
    password: argv.password || process.env.WEBDAV_CLI_PASSWORD,
    directory: argv.directory || process.env.WEBDAV_CLI_DIRECTORY,
    autoIndex: argv.autoIndex || process.env.WEBDAV_CLI_AUTO_INDEX,
    ssl: argv.ssl || Boolean(process.env.WEBDAV_CLI_SSL),
    sslKey: argv.sslKey || process.env.WEBDAV_CLI_SSL_KEY,
    sslCert: argv.sslCert || process.env.WEBDAV_CLI_SSL_CERT,
    disableAuthentication:
        argv.disableAuthentication ||
        process.env.WEBDAV_CLI_DISABLE_AUTHENTICATION,
    rights: argvRights || envRights,
};
const run = async () => {
    const webdavCli = new webdav_cli_server_1.WebdavCli(config);
    const webdavCliServer = await webdavCli.start();
    console.log(webdavCliServer.config);
};
run();
