var express = require('express');
var router = express.Router();
var axios = require('axios');
var key = require('../key');

/* GET - CHECK LIST USERS */
router.get('/:id?', async (req, res) => {
  var id = req.params['id'] ? (() => {
      let i = parseInt(req.params['id']);
      console.log(i);
      return i * 46;
  })() : 0;
  id = isNaN(id) ? 0 : id;
  const url = "https://api.github.com/users?since=";
  var raw;
  try{
     raw = await axios.get(url + id, {
      headers: {
          'Authorization': 'token ' + key
      }
    });
  }catch(e){
    console.error(e.response);
  }
  res.json(raw.data);
});

/* GET - CHECK LIST USERS */
router.get('/user/:id', async (req, res) => {
  const id = req.params['id'];
  const url = "https://api.github.com/users/" + id;
  console.log(url);
  const raw = await axios.get(url, {
      headers: {
          'Authorization': 'token ' + key
      }
  }).catch(err => console.error(err));
  res.json(raw.data);
});

/* GET - CHECK LIST USER REPOSITORIES */
router.get('/user/:id/repos', async (req, res) => {
  const id = req.params['id'];
  const url = "https://api.github.com/users/" + id + "/repos";
  const raw = await axios.get(url, {
      headers: {
          'Authorization': 'token ' + key
      }
  }).catch(err => console.error(err));
  res.json(raw.data);
});

module.exports = router;
