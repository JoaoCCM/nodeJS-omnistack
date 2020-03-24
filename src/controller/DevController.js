const axios = require("axios");
const parseStringAsArray = require("../utils/parseStringAsArray");

const mongoose = require("mongoose");
require("../models/Dev");
const Dev = mongoose.model("Dev");

/** funções controller - store, index, show, destroy, update */

module.exports = {
  async index(req, res) {
    const devs = await Dev.find();

    return res.json(devs);
  },

  async store(req, res) {
    const { github_username, techs, latitude, longitude } = req.body;

    let dev = Dev.findOne({ github_username });
    if (!dev) {
      const Apiresponse = await axios.get(
        `https://api.github.com/users/${github_username}`
      );
      //se "name" não existir, irá assumir o valor de "login"
      const { name = login, bio, avatar_url } = Apiresponse.data;

      const techsArray = parseStringAsArray(techs);

      const location = {
        type: "Point",
        coordinates: [longitude, latitude]
      };

      dev = await Dev.create({
        github_username,
        name,
        avatar_url,
        bio,
        techs: techsArray,
        location
      })
        .then(d => {
          return res.json(d);
        })
        .catch(err => console.log(err));
    }
    return res.json(dev);
  }
};
