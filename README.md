# WebRTC Dial In Server
Please note:

This project is highly in development. Key feature is working, but a plenty of todos are waiting to be done.

This is the server for WebRTC Dial In project.

### What it does:
* socket service for signalling

### Configuration
Please set the port for the socket endpoint. **config/config.json**.

```js
{
  "port": "localhost:3050"
}
```

### Running the application
```sh
npm install
npm run build
npm start
```

### Running for development
```sh
npm install
npm run dev
```

### Version
0.0.1
