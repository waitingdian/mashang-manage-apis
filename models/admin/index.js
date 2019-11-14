'use strict';

const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const adminSchema = new Schema({
    nick_name: String,
    user_name: String,
    password: String,
    id: Number,
    create_time: String,
    admin: {type: String, default: '管理员'},
    role: {type: Number, 2: 1}, // 1 管理员 2.成员
    status:{type: Number, default: 1},  // 1使用中 0 停用
    avatar: {type: String,default: 'default.jpg'}
})
adminSchema.index({id: 1})

const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;