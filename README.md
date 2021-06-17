# WebDAV CLI

forked from svtslv/webdav-cli

https://github.com/svtslv/webdav-cli

Optimized a problem

https://github.com/OpenMarshal/npm-WebDAV-Server/issues/84

## Description

A simple zero-configuration command-line webdav server

给 webdav 服务器加上了 etag 头部和条件请求的功能

## Installation

#### Globally via yarn

```bash
yarn global add @masx200/webdav-cli
```

#### Running on-demand:

```bash
npx @masx200/webdav-cli [options]
```

## Examples

```bash
npx @masx200/webdav-cli --help
```

```txt
   usage: webdav-cli [options]

options:
  --path       Path to folder [process.cwd()]
  --host       Host to use [0.0.0.0]
  --port       Port to use [1900]
  --digest     Enable digest authentication [basic]
  --username   Username for basic/digest authentication [random]
  --password   Password for basic/digest authentication [random]
  --directory  Show directory listings [false]

  --ssl        Enable https [false]
  --sslKey     Path to ssl key file [self-signed]
  --sslCert    Path to ssl cert file [self-signed]
  --help       Print this list and exit
  --version    Print the version and exit.
  --rights     Comma separated values without spaces [all]

        'all', 'canCreate', 'canDelete', 'canMove', 'canRename',
        'canAppend', 'canWrite', 'canRead', 'canSource',
        'canGetMimeType', 'canGetSize', 'canListLocks',
        'canSetLock', 'canRemoveLock', 'canGetAvailableLocks',
        'canGetLock', 'canAddChild', 'canRemoveChild',
        'canGetChildren', 'canSetProperty', 'canGetProperty',
        'canGetProperties', 'canRemoveProperty', 'canGetCreationDate',
        'canGetLastModifiedDate', 'canGetWebName', 'canGetType'
env:
  WEBDAV_CLI_PATH, WEBDAV_CLI_HOST, WEBDAV_CLI_PORT,
  WEBDAV_CLI_USERNAME, WEBDAV_CLI_PASSWORD, WEBDAV_CLI_DIGEST,
  WEBDAV_CLI_SSL, WEBDAV_CLI_SSL_KEY, WEBDAV_CLI_SSL_CERT,
  WEBDAV_CLI_DIRECTORY, WEBDAV_CLI_AUTO_INDEX, WEBDAV_CLI_RIGHTS
  WEBDAV_CLI_DISABLE_AUTHENTICATION
```

## TLS/SSL

First, you need to make sure that openssl is installed correctly, and you have `key.pem` and `cert.pem` files. You can generate them using this command:

```shell
openssl req -newkey rsa:2048 -new -nodes -x509 -days 3650 -keyout key.pem -out cert.pem
```

Use `0.0.0.0` as value for `Common name` if you want to be able to install the certificate in your OS's root certificate store or browser so that it is trusted.

Then you need to run the server with `--ssl` for enabling SSL and `--sslKey=key.pem --sslCert=cert.pem` for your certificate files.

## License

MIT
