'use strict';

const Match = require('./match.model');

const httpHandle = require('../../helper/httpHandle');

const standingController = require('../standing/standing.controller');

exports.index = function(req, res) {
    return Match.find({}).populate({path: 'team1 team2', select:'name -_id'}).exec()
        .then(httpHandle.respondWithResult(res))
        .catch(httpHandle.handleError(res));
}

exports.create = function(req, res) {
    if(req.body.team1 != req.body.team2)
        return Match.create(req.body)
            .then(updateStanding(res))
            .catch(httpHandle.handleError(res))
}

function updateStanding(res) {
    return  function(entity) {
        if(entity) {
            standingController.update(res, entity);            
        }
        return null;
    }
}

