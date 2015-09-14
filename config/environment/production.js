'use strict';

// Development specific configuration
// ==================================
module.exports = {
    // Server IP
    //ip:  "127.0.0.1",

    // Server port
    //port: 9000,
    api_url_prefix: "http://localhost:9000/",
    api_url_header: {
        term_id: '_MANAGER_',
        "Pragma": "no-cache",
        "Expires": 0,
        "Cache-Control": "no-cache, no-store, must-revalidate"
    },
    session: {
        secret: 'sdfdswerwerweskdjfhksdfnsdf234234 B2015',
        cookie: {maxAge: 1000 * 60 * 30},  //设置maxAge是30m后session和相应的cookie失效过期
        resave: false,
        saveUninitialized: true
    }
};
