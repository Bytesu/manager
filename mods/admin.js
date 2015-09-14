/**
 * Created by bytesu on 15/8/10.
 */
var admins = {
    test: 'test',
    manager: 'manager'
};

module.exports.validateUser = function(user){
    return admins[user.name]&& admins[user.name]==user.pass;
};