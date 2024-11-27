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
