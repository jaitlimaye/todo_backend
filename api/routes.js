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
 /*    .delete(longterm.apiDelete)

router.route('/longterm/:id').put(longterm.apiupdate)
*/
module.exports = router