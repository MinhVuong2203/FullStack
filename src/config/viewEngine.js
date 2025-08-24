import express from 'express';  // Cái này tương đương với var express = require('express'); nhưng cái import thường dùng hơn

let configViewEngine = (app) =>{
    app.use(express.static('./src/public')); // Cái này dùng để chỉ định thư mục chứa các file tĩnh như css, js, hình ảnh
    app.set('view engine', 'ejs'); // Cái này dùng để chỉ định view engine là ejs
    app.set('views', './src/views'); // Cái này dùng để chỉ định thư mục chứa các file view (ejs)
}

module.exports = configViewEngine;