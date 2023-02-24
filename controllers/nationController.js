const Nations = require("../models/nation");
class nationController {
  index(req, res, next) {
    Nations.find({})
      .then((nations) => {
        res.render("nations", {
          title: "The Nations",
          nations: nations,
        });
      })
      .catch(next);
  }
  getNation(req, res, next) {
    Nations.findById(req.params.id)
      .then((nation) => {
        res.render("updateNation", {
          title: "The Nation",
          nation: nation,
        });
      })
      .catch(next);
  }
  create(req, res, next) {
    const nation = new Nations(req.body);
    nation
      .save()
      .then(() => res.redirect("/nations"))
      .catch((error) => {});
  }
  update(req, res, next) {
    Nations.findByIdAndUpdate(req.params.id, req.body, function (err, result) {
      if (err) {
        console.log(err);
      } else {
        res.redirect("/nations");
      }
    });
  }
  delete(req, res, next) {
    Nations.findByIdAndRemove(req.params.id, function (err, nation) {
      if (err) throw err;
      console.log("Success");
    });
    res.redirect("/nations");
  }
}
module.exports = new nationController();
