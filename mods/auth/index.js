/**
 * Created by Jacky on 15/8/2.
 */
/**
 * authorization
 */

'use strict';


var authCheck = function (req, res, next) {

    //console.log(req.headers);
    /*
     var termId = req.headers.term_id;
     if(termId && sourceMap[termId]){
     req._sourceType = sourceMap[termId].sourceType;
     next();

     }else{
     res.send({code:1,msg:"SOURCE AUTHORIZATION ERROR."});
     }
     */
    next();
}


exports.authCheck = authCheck;
