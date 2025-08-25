import bcrypt from "bcryptjs";
import db from '../models/index';

const salt = bcrypt.genSaltSync(10);

let createNewUser = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPasswordFromBcrypt = await hashUserPassword(data.password);
            await db.User.create({    // db là database trên server đã được import ở trên, User là tên bảng được viết trong model
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
module.exports = {
    createNewUser: createNewUser
};