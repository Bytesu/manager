/**
 * Created by bytesu on 15/9/8.
 */
/**
 * 简单权限验证
 */
function isLogined(req, res, next) {
    if (req.session.user || req.path == '/login') {
        next();
    } else {
        res.redirect('/login');
    }
}

module.exports = isLogined;