const Players = require("../models/player");

const clubs = [
  { id: "1", name: "Barcelona" },
  { id: "2", name: "Real Madrid" },
  { id: "3", name: "PSG" },
  { id: "4", name: "Man United" },
  { id: "5", name: "Asernal" },
  { id: "6", name: "Man City" },
  { id: "7", name: "Everton" },
];

const positions = [
  { id: "1", name: "GK" },
  { id: "2", name: "CB" },
  { id: "3", name: "DF" },
  { id: "4", name: "LM" },
  { id: "5", name: "CD" },
  { id: "6", name: "CM" },
  { id: "7", name: "RM" },
  { id: "8", name: "RF" },
  { id: "9", name: "LF" },
  { id: "10", name: "CF" },
];

class playerController {
  index(req, res, next) {
    Players.find({})
      .then((players) => {
        res.render("players", {
          title: "The list of Players",
          players: players,
          positions: positions,
          clubs: clubs,
        });
      })
      .catch(next);
  }
  getPlayer(req, res, next) {
    Players.findById(req.params.id)
      .then((player) => {
        res.render("editPlayer", {
          title: "The Player",
          player: player,
          positions: positions,
          clubs: clubs,
        });
      })
      .catch(next);
  }
  create(req, res, next) {
    const player = new Players(req.body);
    player
      .save()
      .then(() => res.redirect("/"))
      .catch((error) => {});
  }
  update(req, res, next) {
    Players.findByIdAndUpdate(req.params.id, req.body, function (err, result) {
      if (err) {
        console.log(err);
      } else {
        res.redirect("/");
      }
    });
  }
  delete(req, res, next) {
    Players.findByIdAndRemove(req.params.id, function (err, player) {
      if (err) throw err;
      console.log("Success");
    });
    res.redirect("/");
  }
}
module.exports = new playerController();
