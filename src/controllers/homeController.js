import db from '../models/index';
import CRUDService from '../services/CRUDService';

let getHomePage = async(req, res) => {
    try {
    let data = await db.User.findAll();
    return res.render('homepage.ejs', { 
        data: JSON.stringify(data) 
    });
    } catch(e) {
        console.log(e);
    }
};

let getCrudPage = async(req, res) => {
    try {
        return res.render('crud.ejs');
    } catch(e) {
        console.log(e);
    }
};

let postCrudPage =  async(req, res) => {
    let message = await CRUDService.createNewUser(req.body);
    console.log(message);
    return res.send('post crud from server');
}

// Do file này nhiều controller khác
// module.exports ra một object điểm khác biệt so với blog là sử dụng class, này thì không
module.exports = {
    getHomePage: getHomePage,
    getCrudPage: getCrudPage,
    postCrudPage: postCrudPage
};
