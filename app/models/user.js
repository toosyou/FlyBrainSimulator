// app/models/user.js
// ���J�ݭn���F��
var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

// �w�q���
var userSchema = mongoose.Schema({

    local            : {
        email        : String,
        password     : String,
    },
    facebook         : {
        id           : String,
        token        : String,
        email        : String,
        name         : String
    }
});

// methods ======================
// �[�K
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// �ֹ�K�X
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};


module.exports = mongoose.model('User', userSchema);