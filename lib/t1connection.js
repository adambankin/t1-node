var RequestPromise = require('request-promise');
var QueryString = require('querystring');
var Config = require('./common/config');
var BPromise = require('bluebird');

var T1Connection = function (t1config) {
    this.loggedIn = false;
    this.t1config = t1config;
    this.acceptHeaders = {'accept': 'application/vnd.mediamath.v1+json'};
    
    if (!t1config.apiUrl) {
        this.t1config.apiUrl = Config.apiUrl;
    }
};

T1Connection.prototype.logIn = function () {
    var that = this;
    return BPromise.try(function () {
        if (!this.loggedIn) {
            return RequestPromise.post({
                jar: true,
                url: that.t1config.apiUrl + "login",
                headers: that.acceptHeaders,
                withCredentials: true,
                form: {
                    user: that.t1config.user,
                    password: that.t1config.password,
                    api_key: that.t1config.api_key
                }
            }).then(that.loggedIn = true);
        } else {
            return undefined;
        }
    });
};

T1Connection.prototype.copyHeaders = function (source, sink) {
    Object.keys(source).forEach(function (key) {
        sink[key] = source[key];
    });
};

T1Connection.prototype.get = function (endpoint) {
    var options = {
        jar: true,
        headers: this.acceptHeaders,
        url: this.t1config.apiUrl + endpoint,
        withCredentials: true
    };
    return this.logIn()
        .then(function () {
            return RequestPromise.get(options);
        });
};

T1Connection.prototype.getSession = function () {
    return this.get('session');
};

T1Connection.prototype.post = function (endpoint, form) {
    var that = this;
    var formData = QueryString.stringify(form);
    var contentLength = formData.length;
    var postHeaders = {
        'Content-Length': contentLength,
        'Content-Type': 'application/x-www-form-urlencoded'
    };
    this.copyHeaders(this.acceptHeaders, postHeaders);
    return this.logIn()
        .then(function () {
            return RequestPromise.post({
                    jar: true,
                    withCredentials: true,
                    headers: postHeaders,
                    url: that.t1config.apiUrl + endpoint,
                    body: formData
                }
            );
        });
};

T1Connection.buildQueryString = function (baseUrl, userParams) {
    var endpoint = baseUrl;
    if (userParams) {
        var str = [];
        if (userParams.limit !== undefined) {
            var entity = Object.keys(userParams.limit)[0];
            endpoint += ('/limit/' + entity +
            '=' + userParams.limit[entity]);
        }
        for (var p in userParams) {
            if (!userParams.hasOwnProperty(p)) {
                continue;
            }
            if (p === 'limit') {
                //skip
            }
            else if (p === 'with') {
                str.push(userParams[p].map(function (i) {
                    return 'with=' + i;
                }).join('&'));
            }
            else {
                str.push(encodeURIComponent(p) + "=" + encodeURIComponent(userParams[p]));
            }
        }

        if (Object.keys(userParams).length > 0) {
            endpoint += '?' + str.join("&");
        }
    }
    return endpoint;
};


module.exports = T1Connection;
