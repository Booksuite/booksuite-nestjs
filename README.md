# BookSuite Backend

Project developed on top of NestJS.

## Project setup

### 1. Setup env vars

Duplicate file `.env.example` and rename it to `.env` (This file must not be commited to the repository)

#### Postgress URL

- DATABASE_URL: By default the `.env.example` file has the local database URL. To run the local DB on docker [check this DOC](#3-run-local-postgress-on-docker-optional).

#### Cloudflare R2

If you want to use your own account for testing purposes, go to this [link](https://dash.cloudflare.com/4903889f143f92e2df3226cb15db4eab/api-tokens). If you want to use the dev version, reach out to the project's admin to get this data.

- CLOUDFLARE_ACCESS_KEY_ID: Use the Cloudflare account ID
- CLOUDFLARE_SECRET_ACCESS_KEY: Secret key
- CLOUDFLARE_UPLOAD_PROVIDER_BASE_URL: https://{ACCOUNT_ID}.r2.cloudflarestorage.com
- CLOUDFLARE_FILE_BASE_URL: Base URl for access file. If you're using your own account, you may need to use R2 Dev URL, which must be manually enabled in the R2 bucket settings.

### 2. Clone the repo and install dependencies

```bash
$ yarn install
```

This should also generate the prisma types. If you still have some problems with it run `yarn db:gen`

### 3. Run local Postgress on Docker (optional)

Inside of the folder `docker` there's a `docker-compose` file with all the necessary configurations.

```
cd docker

docker compose up -d
```

Run the migration on local DB

```
yarn prisma db push
```

### Compile and run the project

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Run tests

TODO

## Deployment

TODO
