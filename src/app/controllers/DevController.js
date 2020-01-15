const axios = require('axios');
const Dev = require('../models/Dev');
const parseStringAsArray = require('../../utils/parseStringAsArray');

class DevController {
  async store (req, res) {
    const { github_username, techs, longitude, latitude } = req.body;
  
    const doesExist = await Dev.findOne({ github_username });

    if (doesExist) {
      return res.json({ error: 'This github user is already regitered' });
    };

    const response = await axios.get(`https://api.github.com/users/${github_username}`);
    
    const { name = login, avatar_url, bio } = response.data;
    
    const techsArray = parseStringAsArray(techs)
  
    const location = {
      type: 'Point',
      coordinates: [longitude, latitude]
    };
  
    const dev = await Dev.create({
      github_username,
      name,
      avatar_url,
      bio,
      techs: techsArray,
      location
    })
    
    res.json(dev);
  }

  async index (req, res) {
    const dev = await Dev.find();

    return res.json(dev);
  }
};

module.exports = new DevController();