const express = require("express");
const bodyParser = require("body-parser");
const nationController = require("../controllers/nationController");
const nationsRouter = express.Router();
nationsRouter.use(bodyParser.json());
nationsRouter
//   /nations
    .route("/")
    .get(nationController.index)
    .post(nationController.create);

nationsRouter.get("/:id", nationController.getNation);
nationsRouter.post("/:id", nationController.update);

nationsRouter.get("/delete/:id", nationController.delete);
module.exports = nationsRouter;