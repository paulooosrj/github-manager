var express = require('express');
var cookieParser = require('cookie-parser');

var indexRouter = require('./routes/index');

var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static('build'));

app.use('/api', indexRouter);

var port = process.env.PORT || '8080';
app.set('port', port);

app.listen(app.get('port'), () => {
    console.log("Server on in port: " + app.get('port'));
});

module.exports = app;