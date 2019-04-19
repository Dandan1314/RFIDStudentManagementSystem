const Hapi = require('hapi');
const routes = require('./routes')

const server = new Hapi.Server({
    port: 3000,
    host: 'localhost',
    routes: {
        cors: true
    }
})

server.route(routes)
server.start()

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});