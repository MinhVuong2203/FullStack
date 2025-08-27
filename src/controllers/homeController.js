import db from '../models/index';
import CRUDService from '../services/CRUDService';

let getHomePage = async (req, res) => {
    try {
        let data = await db.User.findAll();
        return res.render('homepage.ejs', {
            data: JSON.stringify(data)
        });
    } catch (e) {
        console.log(e);
    }
};

let getCrudPage = async (req, res) => {
    try {
        return res.render('crud.ejs');
    } catch (e) {
        console.log(e);
    }
};

let postCrudPage = async (req, res) => {
    let message = await CRUDService.createNewUser(req.body);
    console.log(message);
    return res.send('post crud from server');
}

let displayGetCrud = async (req, res) => {
    let data = await CRUDService.getAllUsers();
    return res.render('displayCRUD.ejs', {
        dataTable: data  // đây là cách truyền biến
    });
}

let getEditCrud = async (req, res) => {
    // req.query lấy thông tin từ url
    let userId = req.query.id;
    if (userId) {
        let userData = await CRUDService.getUserInfoById(userId); // lấy thông tin của người dùng thông qua id
        return res.render('editCRUD.ejs', {
            user: userData
        });
    } else {
        res.send('User not found!');
    }
}

let putCrud = async (req, res) => {
    await CRUDService.updateUser(req.body);  // Gọi hàm trong CRUDService
    let userAll = await CRUDService.getAllUsers();
    return res.render('displayCRUD.ejs', {  // để chuyển hướng trang và cập nhật lại danh sách
        dataTable: userAll
    });
}

// Do file này nhiều controller khác
// module.exports ra một object điểm khác biệt so với blog là sử dụng class, này thì không
module.exports = {
    getHomePage: getHomePage,
    getCrudPage: getCrudPage,
    postCrudPage: postCrudPage,
    displayGetCrud: displayGetCrud,
    getEditCrud: getEditCrud,
    putCrud: putCrud
};
