import bcrypt from "bcryptjs";
import db from '../models/index';
import e from "express";

const salt = bcrypt.genSaltSync(10);

let createNewUser = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPasswordFromBcrypt = await hashUserPassword(data.password);
            await db.User.create({    // db là database trên server đã được import ở trên, User là tên bảng được viết trong model, đây là cú pháp ORM (Object Relational Mapping) thuộc trên Modal Instance của thư viện Sequelize
                email: data.email,
                password: hashPasswordFromBcrypt,
                firstName: data.firstName,
                lastName: data.lastName,
                address: data.address,
                phonenumber: data.phonenumber,
                gender: data.gender === '1' ? true : false,
                // image: data.image,
                roleId: data.roleId,
                // positionId: data.positionId
            })
            resolve('ok create a new user succeed');
        } catch (e) {
            reject(e);
        }
    })
}

let hashUserPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPassword = await bcrypt.hashSync("B4c0/\/", salt);
            resolve(hashPassword); // tương đương return
        } catch (e) {
            reject(e);
        }
    })
}

let getAllUsers = () =>{
    return new Promise((resolve, reject) => {
        try {
            let users = db.User.findAll( { raw: true }); // raw: true để hiển thị trên console đẹp thôi
            resolve(users);
        } catch (e) {
            reject(e)
        }
    })
}

let getUserInfoById = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({ where: {id: userId}, raw: true});
            user ? resolve(user) : reject({});
        } catch (e) {
            reject(e);
        }
    })
}

let updateUser = (data) => {
    return new Promise(async (resolve, reject) =>{
        try {
            let user = await db.User.findOne({ // user này là user cũ dưới database, data là user mới trên FE
                where: {id: data.id}
            })
            if (user){
                user.firstName = data.firstName;
                user.lastName = data.lastName;
                user.address = data.address;
                user.phonenumber = data.phonenumber;
                await user.save();
                resolve(user);
            } else {
                resolve();
            }
        } catch (error) {
            reject(error);
        }
    })
}

let deleteUserById = (userId) =>{
    return new Promise(async (resolve, reject) => {
        try {
            await db.User.destroy({ where: { id: userId } });
            resolve();
        } catch (error) {
            reject(error);  // Thực tế tất cả những gì try catch khi có lỗi thì sẽ thông báo lỗi ra cho người dùng biết, bài học này đơn giản nên chỉ như này thôi
        }
    })
}
module.exports = {
    createNewUser: createNewUser,
    getAllUsers: getAllUsers,
    getUserInfoById: getUserInfoById,
    updateUser: updateUser,
    deleteUserById: deleteUserById
};