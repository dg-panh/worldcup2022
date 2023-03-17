const express = require("express");
const bodyParser = require("body-parser");
const playerController = require("../controllers/playerController");
const adminGuard = require('../guard/adminGuard');
const playersRouter = express.Router();
playersRouter.use(bodyParser.json());
playersRouter
    .route("/")
    .get(playerController.index)
    .post(adminGuard, playerController.create);

playersRouter.get("/player/:id", playerController.getPlayer);
playersRouter.post("/player/:id", adminGuard, playerController.update);


playersRouter.get("/delete/:id", adminGuard, playerController.delete);
module.exports = playersRouter;