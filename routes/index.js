var express = require('express');
var router = express.Router();
var axios = require('axios');

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
          'Authorization': 'Bearer c057cc2f47ae9b8ecdf818fee9d0c122a92af138'
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
          'Authorization': 'Bearer c057cc2f47ae9b8ecdf818fee9d0c122a92af138'
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
          'Authorization': 'Bearer c057cc2f47ae9b8ecdf818fee9d0c122a92af138'
      }
  }).catch(err => console.error(err));
  res.json(raw.data);
});

module.exports = router;
