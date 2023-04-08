const express = require("express");
const daily = require("./daily");
const longterm =require("./longterm")
const router = express.Router();

router.route('/daily')
    .get(daily.apiGetAll)
    .post(daily.apiPostNew)
    .delete(daily.apiDelete)

router.route('/longterm')
    .get(longterm.apiGetAll)
   .post(longterm.apiPostNew)
    .delete(longterm.apiDelete)
    .put(longterm.apihide)

 router.route('/longterm/update').put(longterm.batchupdate)
module.exports = router