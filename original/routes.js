var express = require('express')
var router = express.Router()

// middleware that is specific to this router
router.use(function timeLog (req, res, next) {
  console.log('Time: ', Date.now())
  next()
})

router.get('/login', function (req, res) {
    res.json({"csrf": req.csrfToken ? req.csrfToken() : "" });
})

router.post('/login', function (req, res) {
    req.session.username = req.body.username;
    res.json({"done":"done"})
})

router.post('/sendmemoney', function (req, res){

    if (req.session.username === null){
        res.sendStatus(403)
    }

    res.sendStatus(200)
})

module.exports = router