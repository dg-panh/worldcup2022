const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongoose = require("mongoose");

// var indexRouter = require("./routes/index");
// var usersRouter = require("./routes/users");
const playerRouter = require("./routes/playerRouter");
const nationRouter = require("./routes/nationRouter");
const userRouter = require('./routes/users');
const session = require("express-session");
const SECRET = require('./constant/secret');
const parseToken = require('./guard/parseToken');
const FileStore = require('session-file-store')(session);

const url = 'mongodb://127.0.0.1:27017/worldcup2022';
const connect = mongoose.connect(url);

connect.then(
    (db) => {
        console.log("Connected correctly to server");
    },
    (err) => {
        console.log(err);
    }
);

const app = express();

app.use(
    session({
        name: 'session-id',
        secret: SECRET,
        saveUninitialized: false,
        resave: false,
        store: new FileStore()
    })
)

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(SECRET));
app.use(express.static(path.join(__dirname, "public")));

app.use(parseToken);
app.use("/", playerRouter);
app.use("/nations", nationRouter);
app.use('/user', userRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render("error");
});

module.exports = app;