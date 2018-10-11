'use strict';

const Team = require('./team.model');

const httpHandle = require('../../helper/httpHandle');

const standingController = require('../standing/standing.controller');

const MAX_TEAM = 10;

exports.index = function(req, res) {
    return Team.find({}).exec()
        .then(httpHandle.respondWithResult(res))
        .catch(httpHandle.handleError(res));
}

exports.create = function(req, res) {
    return Team.find().exec((err, results) => {
        if(results.length < MAX_TEAM)
            Team.find({name: req.body.name}).exec((err, results2) => {
                if(results2.length == 0)
                    return Team.create(req.body)
                        .then(createStanding(res))
                        .catch(httpHandle.handleError(res))
                else
                return res.status(404).json({err: "Cette equipe existe deja !"});
            })
        
        else
         return res.status(404).json({err: "Nombre max d'equipe atteint"});
    });
}

exports.update = function(req, res) {
    
}

exports.destroy = function(req, res) {
    return MsgObject.findById(req.params.id)
        .then(httpHandle.handleEntityNotFound(res))
        .then(httpHandle.removeEntity(res))
        .catch(httpHandle.handleError(res));
}

function createStanding(res) {
    return  function(entity) {
        if(entity) {
            standingController.create(res, entity);
        }
        return null;
    }
}