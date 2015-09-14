/**
 * Created by bytesu on 15/8/6.

 */
var config = require('./../config/environment/');
var request = require('request');
var _ = require('lodash');


var options = {
    baseUrl: config.api_url_prefix,
    uri: '/',
    headers: config.api_url_header,
    method: 'GET'
};

function curl(opt, cb) {
    var options_ = _.merge({}, options, opt || {});
    var _cb = cb;
    request(options_, _cb);
}


module.exports = function (req, res, next) {
    var url = req.url;
    if (/\/v1\//.test(url) || /\/common\//.test(url)) {
        var opt = {
            method: req.method,
            uri: url
        };
        if (req.method.toUpperCase() !== 'GET') {
            opt.form = req.body;
            opt.body = JSON.stringify(req.body);
        }
        curl(opt, function (err, response, body) {
            if (err) {
                res.status(500).send(err);
            } else if (!err) {
                res.status(200).send(body);
            }
        })
    } else {
        next()
    }
};