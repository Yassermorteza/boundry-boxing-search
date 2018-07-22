const Koa = require("koa");
const http = require("http");
const mongoose = require("mongoose");
const bodyParser = require("koa-bodyparser");

const log = console.log;

const router = require("./routers/routers");

const app = new Koa();

const port = process.env.PORT || 5000;
const db = "mongodb://127.0.0.1:27017/sport";

mongoose.Promise = global.Promise;
mongoose.connect(db, {useNewUrlParser: true })
        .then(response=> 
            log("mongo connection created")
        )
        .catch(err => {
            log("Error connecting to Mongo: ", err);
        });

app.use(bodyParser())
    .use(router.routes())
    .use(router.allowedMethods())

// app.on('error', (err, ctx) => {
//     log.error('server error', err, ctx)
// });

http.createServer(app.callback()).listen(port, ()=>console.log(`Server is running on port ${port}`));