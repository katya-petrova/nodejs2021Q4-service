const { PORT } = require('./common/config');
const app = require('./app');

app.listen(PORT, (err, address) => {
    if (err) {
        app.log.error(err)
        process.exit(1)
    }
    app.log.info(`server listening on ${address}`)
  })
