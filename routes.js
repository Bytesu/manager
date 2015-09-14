/**
 * Main application routes
 */

'use strict';

//var url = require('url');
//var fs = require("fs");
//var showdown = require("showdown");
var authCheck = require('./mods/auth').authCheck;
var curl = require('./mods/curl');
var admin = require('./mods/admin');
var isLogined = require('./mods/auth/logined');


module.exports = function (app) {
    //app.use(authCheck);
    app.use(curl);
    //app.use(isLogined);

    app.get('/', function (req, res, next) {
        res.render('index');
    });
    app.get('/login', function (req, res, next) {
        res.render('login', {
            LOGIN: true,
            msg: null
        });
    });
    app.post('/login', function (req, res, next) {
        var user = req.body;
        if (admin.validateUser(user)) {
            req.session.user = user.name;
            res.redirect('/');
        } else {
            res.render('login', {
                pageTitle: '登录',
                LOGIN: true,
                msg: '用户名或密码错误！'
            });
        }
    });
    app.get('/loginout', function (req, res, next) {
        delete req.session.user;
        res.render('login', {
            LOGIN: true
        });
    });

    app.get('/teacher_manager', function (req, res, next) {
        res.render('teacher');
    });
    app.get('/recommended_manager', function (req, res, next) {
        res.render('recommended');
    });

    app.get('/teacher_detail/:user_id', function (req, res, next) {
        res.render('teacher_detail');
    });
    app.get('/order_manager', function (req, res, next) {
        res.render('order');
    });
    app.get('/order_detail/:order_id', function (req, res, next) {
        res.render('order_detail');
    });
    app.get('/message_manager', function (req, res, next) {
        res.render('message');
    });
    app.get('/stat', function (req, res, next) {
        res.render('stat');
    });
    app.get('/wechat_banner_manager', function (req, res, next) {
        res.render('wechat_banner_manager');
    });
    /**
     * 此处中间件可浏览器直接访问views后的文件名［不带后缀］
     */
    app.use(function (req, res, next) {
        var path = req.originalUrl.substr(1);
        return res.render(path);
    });
    app.use(function (err, req, res, next) {
        console.log("error handle here: " + err);
        console.log(err.stack);
        res.status(500).send({error: err.message || err});
    });
    app.route('/*').get(function (req, res) {
        res.status(404).send("Sorry, Not Found.");
    });
};
