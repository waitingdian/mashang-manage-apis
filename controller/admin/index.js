'use strict'
const AdminModel = require('../../models/admin/')
const BaseComponent = require('../../prototype/baseComponent')
const formidable = require('formidable')
const crypto = require('crypto');
const ErrorCode = require('../../utils/errorCode');
const baseResp = require('../../utils/baseResp');
const dtime = require('time-formater')

class Admin extends BaseComponent{
    constructor(){
        super()
        this.login = this.login.bind(this)
        this.addAdmin = this.addAdmin.bind(this)
        // this.register = this.register.bind(this)
        this.encryption = this.encryption.bind(this)
        // this.updateAvatar = this.updateAvatar.bind(this)
    }
    async login(req, res, next) {
        let query = req.body
        try{
            if (!query.user_name) {
                throw new Error('用户名不能为空')
            } else if(!query.password){
                throw new Error('密码参数错误')
            }
        } catch(err){
            console.log(err.message, err);
            res.send(baseResp.error(ErrorCode.PARAMS_ERROR, {} , err.message))
            return
        }
        const admin = await AdminModel.findOne({user_name: query.user_name})

        //  md5加密
        // const newpassword = this.encryption(password);
        if (!admin) {
            res.send(baseResp.error(ErrorCode.TOKEN_ERROR, {}, '未找到当前管理员'))
        } else {
            if (query.password != admin.password) {
                res.send(baseResp.error(ErrorCode.TOKEN_ERROR, {}, '用户登录密码错误'))
            } else {
                console.log(req)
                req.session.admin_id = admin.id;
                res.send(baseResp.success(admin , '登录成功'))
            }
        }
    }

    async singout(req, res, next){
        try{
            delete req.session.admin_id
            res.send(baseResp.success({} , '退出成功'))
        } catch (e) {
            res.send(baseResp.error(ErrorCode.SYSTEM_ERROR, {}, '退出失败'))
        }
    }

    async getAllAdmin(req, res, next) {
        const {pageSize = 20, pageNum = 1, role = null, name = ''} = req.query
        try {
            var _filter={
                $or: [  // 多字段同时匹配
                    {user_name: {$regex: name}},
                    {nick_name: {$regex: name}}
                ]
            }
            if (Number(role)) {
                _filter.role = Number(role)
            }
            const allAdmin = await AdminModel.find(_filter).sort({id: -1}).skip(Number(pageNum - 1)).limit(Number(pageSize))
            // const allAdmin = await AdminModel.find({},  '-_id -password').sort({id: -1}).skip(Number(pageNum)).limit(Number(pageSize))
            const totalCount = await AdminModel.count(_filter)
            let pageInfo = {
                pageNum: Number(pageNum),
                pageSize: Number(pageSize),
                totalCount:  Number(totalCount)
            }
            res.send(baseResp.success({ list: allAdmin, pageInfo }))

        } catch (e) {
            console.log('获取超级管理列表失败', err);
            res.send(baseResp.error(ErrorCode.SYSTEM_ERROR, {}, '获取超级管理列表失败'))
        }
    }

    async getAdminCount(req, res, next) {
        try{
            const count = await AdminModel.count()
            res.send(baseResp.success(count))
        } catch (e) {
            console.log('获取管理员数量失败', err);
            res.send(baseResp.error(ErrorCode.SYSTEM_ERROR, {}, '获取管理员数量失败'))
        }
    }

    async getAdminInfo(req, res, next) {
        const admin_id = req.session.admin_id
        if (!admin_id || !Number(admin_id)) {
            console.log('获取管理员信息失败', err);
            res.send(baseResp.error(ErrorCode.SYSTEM_ERROR, {}, '获取管理员信息失败'))
            return
        }
        try {
            const info = await AdminModel.findOne({id: admin_id}, '-_id -__v -password')
            if (!info) {
                throw new Error('未找到当前管理员')
            }else{
                res.send(baseResp.success({ content: info}))
            }
        } catch (e) {
            console.log('获取管理员信息失败');
            res.send(baseResp.error(ErrorCode.SYSTEM_ERROR, {}, '获取管理员信息失败'))
        }
    }

    async addAdmin(req, res, next) {
        let query = req.body

        try{
            if (!query.user_name) {
                throw new Error('用户名不能为空')
            } else if(!query.password){
                throw new Error('密码参数错误')
            }
        } catch(err){
            console.log(err.message, err);
            res.send(baseResp.error(ErrorCode.PARAMS_ERROR, {} , err.message))
            return
        }

        const info = await AdminModel.findOne({user_name: query.user_name})

        if (info && !query.id) {
            res.send(baseResp.error(ErrorCode.PARAMS_ERROR, {}, '用户名已存在'))
            return
        }

        const { nick_name, user_name, password, role = 2 } = query;

        const adminTip = role == 1 ? '管理员' : '成员'
        const admin_id = await this.getId('admin_id');
        const newAdmin = {
            nick_name,
            user_name,
            password: password,
            id: admin_id,
            create_time: dtime().format('YYYY-MM-DD HH:mm'),
            admin: adminTip,
            role: role || 2,
            status: 1,
            avatar: 'default.jpg'
        }
        if (query.id) {
            AdminModel.findById(query.id, function (err, admin) {
                if (err) return res.send(baseResp.error(ErrorCode.PARAMS_ERROR, {}, err.message));
                admin.role = role;
                admin.nick_name = nick_name;
                admin.user_name = user_name;
                admin.password = password;
                admin.admin = adminTip;
                admin.password = password;
                admin.role = role;
                admin.save(function (err) {
                    if (err) return res.send(baseResp.error(ErrorCode.PARAMS_ERROR, {}, err.message));
                    res.send(baseResp.success({} , '编辑成功'));
                });
            });
        } else {
            await AdminModel.create(newAdmin)
            req.session.admin_id = admin_id;
            res.send(baseResp.success({} , '添加成功'))
        }
    }

    async deleteAdmin(req, res, next) {
        const {id} = req.body
        if (!id) {
            res.send(baseResp.error(ErrorCode.PARAMS_ERROR, {}, '用户不存在'))
            return
        }
        try{
            await AdminModel.findOneAndRemove({id: id});
            res.send(baseResp.success({} , '删除成功'))
        }catch(err){
            console.log('删除失败', err);
        }
    }

    async changeStatus(req, res, next) {
        const {status, id} = req.body
        console.log('~~~~~')
        console.log(id)
        console.log(status)
        if (!status) {
            res.send(baseResp.error(ErrorCode.PARAMS_ERROR, {}, '参数有误'))
            return
        }
        try {
            await AdminModel.update({ id }, { $set: { status: status }});
            res.send(baseResp.success({} , '操作成功'))
        } catch (e) {
            res.send(baseResp.success({} , '操作失败'))
        }
        // await AdminModel.update( { id }, {
        //     status
        // }, function (err,ret) {
        //     if(err) {
        //         console.log('更新失败')
        //         res.send(baseResp.error(ErrorCode.SYSTEM_ERROR, {}, '操作失败'))
        //     } else {
        //         res.send(baseResp.success({} , '操作成功'))
        //     }
        // })
    }

    encryption(password){
        const newpassword = this.Md5(this.Md5(password).substr(2, 7) + this.Md5(password));
        return newpassword
    }

    Md5(password){
        const md5 = crypto.createHash('md5');
        return md5.update(password).digest('base64');
    }
}

module.exports = new Admin()