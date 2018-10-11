'use strict';

const express = require('express');
const router = express.Router();
const controller = require('./team.controller');

router.route('/')
.get(controller.index)
.post(controller.create);

module.exports = router;