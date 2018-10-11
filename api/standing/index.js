'use strict';

const express = require('express');
const router = express.Router();
const controller = require('./standing.controller');

router.route('/')
.get(controller.index)

module.exports = router;