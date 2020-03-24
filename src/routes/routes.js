const { Router } = require("express");
const routes = Router();
const DevController = require("../controller/DevController");
const SearchController = require("../controller/SearchController");

routes.post("/devs", DevController.store);
routes.get("/devs", DevController.index); //lista os devs

routes.get("/search", SearchController.index);
module.exports = routes;
