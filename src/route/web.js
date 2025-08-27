import express from "express";
import homeController from "../controllers/homeController";

let router = express.Router();

let initWebRoute = (app) => {
    router.get("/", homeController.getHomePage);
    router.get("/crud", homeController.getCrudPage);
    router.post("/post-crud", homeController.postCrudPage);
    router.get("/get-crud", homeController.displayGetCrud);
    router.get("/edit-crud", homeController.getEditCrud);
    router.post("/put-crud", homeController.putCrud);
    router.get("/delete-crud", homeController.deleteCrud);
    return app.use("/", router);
}

module.exports = initWebRoute;