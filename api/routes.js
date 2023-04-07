const express = require("express");
const daily = require("./daily");
const router = express.Router();

router.route('/daily')
    .get(daily.apiGetAll)
    .post(daily.apiPostNew)
    .delete(daily.apiDelete)


module.exports = router