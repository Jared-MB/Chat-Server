# Chat Server with NestJS

A simple chat server built with NestJS using Socket.IO.

## Installation

```bash
$ pnpm install
```

## Running the app

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run dev

# production mode
$ pnpm run start:prod
```

## Database

The database is managed by [Drizzle](https://drizzle.org/) using [Cloudflare D1](https://www.cloudflare.com/products/d1/).

To create a database, you need to create a Cloudflare account, go to Workers and Pages, click on "D1 SQL Database" in the left menu and create a new database.

Then, you need to create a Cloudflare API token, go to the "API Tokens" section and create a new token with D1 access and edit permissions.

Create a file named `wrangler.toml` in the root of the project and add the following content:

```toml
name = "Chat-Server"
compatibility_date = "2022-11-07"
main = "src/db/connection.ts"
node_compat = true

[[ d1_databases ]]
binding = "DB"
database_name = "YOUR DB NAME"
database_id = "YOUR DB ID"
migrations_dir = "drizzle"
```

Add to your `.env` file the following variables:

```toml
CLOUDFLARE_ACCOUNT_ID=your-account-id
CLOUDFLARE_DATABASE_ID=your-database-id
CLOUDFLARE_D1_TOKEN=your-api-token
```

Now you can generate the migrations and apply them to your database:

```bash
npx drizzle-kit push
```

Or run the following commands:

To generate the migrations, run:

```bash
npx drizzle-kit generate
```

And to apply the migrations with:

```bash
npx drizzle-kit migrate
```

You can check this resources for more information:

- [Drizzle D1 Configuration](https://orm.drizzle.team/docs/guides/d1-http-with-drizzle-kit)
- [Cloudflare D1 SQL Database](https://developers.cloudflare.com/d1/get-started/)

## TODO

- [ ] Add DB models
  - [ ] User
    - username
    - name
    - id
  - [ ] Message
    - message
    - owner_id
    - receptor_id
    - id
- [ ] Create a user service to handle user creation and retrieval
- [ ] Create a message service to handle message creation and retrieval
- [ ] Create a chat service to handle chat functionality
- [ ] Improve the chat gateway to handle messages creation and retrieval

## License

Nest is [MIT licensed](LICENSE).
