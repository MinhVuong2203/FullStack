import db from '../models/index';

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

// Do file này nhiều controller khác
// module.exports ra một object điểm khác biệt so với blog là sử dụng class, này thì không
module.exports = {
    getHomePage: getHomePage,
};
