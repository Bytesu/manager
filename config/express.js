/**
 * Express configuration
 */

'use strict';
//var favicon = require('serve-favicon');
var express = require('express');
var morgan = require('morgan');
var compression = require('compression');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var cookieParser = require('cookie-parser');
var errorHandler = require('errorhandler');
var path = require('path');
var config = require('./environment');
var session = require('cookie-session');

var COOKIE_SECRET = "manager-2015";


var csrfValue = function (req) {
    var token = (req.body && req.body._csrf)
        || (req.query && req.query._csrf)
        || (req.headers['x-csrf-token'])
        || (req.headers['x-xsrf-token']);
    return token;
};

module.exports = function (app) {
    var env = app.get('env');


    app.set('views', config.root + '/views');
    app.engine('html', require('ejs-mate'));
    app.set('view engine', 'html');
    app.locals._layoutFile = 'tmpl.html';
    //app.use(favicon(config.root + '/favicon.ico'));
    app.use(compression());

    app.use(express.static(path.join(config.root, '/public')));
    app.use(express.static(path.join(config.root, '/bower_components')));
    //app.use(multer({ dest: '/upload/temp'}));

    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());
    app.use(methodOverride());
    app.use(cookieParser(COOKIE_SECRET));
    app.use(session(config.session));

    // app.use(csrf({value: csrfValue}));

    // app.use(bodyParser({
    //   keepExtensions: true,
    //   uploadDir: "/upload/temp"
    //   }));

    //app.use(express.static(__dirname + "/fonts"));
    //app.use(express.static(__dirname + "/assets"));


    if ('production' === env) {
        //app.use(favicon(path.join(config.root, 'public', 'favicon.ico')));
        //app.use(express.static(path.join(config.root, '/public')));
        //app.set('appPath', config.root + '/public');
        //app.use(morgan('dev'));
    }
    //console.log(path.join(config.root, '/public'));
    if ('development' === env) {
        //app.use(require('connect-livereload')());
        //app.use(express.static(path.join(config.root, '.tmp')));
        //app.use(express.static(path.join(config.root, 'client')));
        //app.use(express.static("../../public/"));
        //app.set('appPath', 'client');
        app.use(morgan('dev'));
        app.use(errorHandler()); // Error handler - has to be last
    }
};