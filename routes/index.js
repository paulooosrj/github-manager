var express = require('express');
var router = express.Router();
var axios = require('axios');
var key = "4378a1b38de9e9354c1f73320abcb313d4971b7e";

/* GET - CHECK LIST USERS */
router.get('/:id?', async (req, res) => {
  const id = req.params['id'] ? (() => {
      let i = parseInt(req.params['id']);
      console.log(i);
      return i * 46;
  })() : 0;
  const url = "https://api.github.com/users?since=";
  const raw = await axios.get(url + id, {
      headers: {
          'Authorization': 'Bearer ' + key
      }
  }).catch(err => console.error(err));
  res.json(raw.data);
});

/* GET - CHECK LIST USERS */
router.get('/user/:id', async (req, res) => {
  const id = req.params['id'];
  const url = "https://api.github.com/users/" + id;
  console.log(url);
  const raw = await axios.get(url, {
      headers: {
          'Authorization': 'Bearer ' + key
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
          'Authorization': 'Bearer ' + key
      }
  }).catch(err => console.error(err));
  res.json(raw.data);
});

module.exports = router;
