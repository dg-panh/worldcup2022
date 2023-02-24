const express = require("express");
const bodyParser = require("body-parser");
const playerController = require("../controllers/playerController");
const playersRouter = express.Router();
playersRouter.use(bodyParser.json());
playersRouter
    .route("/")
    .get(playerController.index)
    .post(playerController.create);

playersRouter.get("/player/:id", playerController.getPlayer);
playersRouter.post("/player/:id", playerController.update);


playersRouter.get("/delete/:id", playerController.delete);
module.exports = playersRouter;