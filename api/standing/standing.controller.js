'use strict';

const Standing = require('./standing.model');

const httpHandle = require('../../helper/httpHandle');

exports.index = function(req, res) {
    return Standing.find({}).populate({path: 'team', select:'name -_id'}).exec()
        .then(completeInfo(res))
        .catch(httpHandle.handleError(res));
}

exports.create = function(res, team) {
    const data = {'played' : 0, 'won': 0, 'lost': 0, 'drawn': 0, 'team': team._id};    
    return Standing.create(data)
        .then(httpHandle.respondWithResult(res));
}

exports.update = function(res, match) {
    const score1 = Number.parseInt(match.score1);
    const score2 = Number.parseInt(match.score2);
    

    Standing.findOne({'team': match.team1}).exec((err, result) => {
        result.played += 1 ;
        result.goalsFor += score1;
        result.goalsAgainst += score2;
        if(score1 > score2)
            result.won += 1;
        else if(score1 == score2)
            result.drawn += 1;
            
        else 
            result.lost += 1;
        
            result.save();
    });

    Standing.findOne({'team': match.team2}).exec((err, result) => {
        result.played += 1 ;
        result.goalsFor += score2;
        result.goalsAgainst += score1;
        if(score2 > score1)
            result.won += 1;
        else if(score1 == score2)
            result.drawn += 1;
        else 
            result.lost += 1;
        
            result.save();
    });
    

    return res.status(201).end();
}

function completeInfo(res, statusCode) {
    statusCode = statusCode || 200;
    return  function(entity) {
        if(entity) {   
            var i;
            var j;  
            var tmp;    
            for(i = 0; i < entity.length; i++) {
                entity[i].points = entity[i].won * 3 + entity[i].drawn;
                entity[i].goalDifference = entity[i].goalsFor - entity[i].goalsAgainst;
            }

            for (i = 0; i < entity.length; ++i) {                
                for (j = i + 1; j < entity.length; ++j) {
                    if (entity[i].points < entity[j].points || (entity[i].points == entity[j].points && entity[i].goalDifference < entity[j].goalDifference)) {
                        tmp =  entity[i];
                        entity[i] = entity[j];
                        entity[j] = tmp;
                    }
                }
            }    
                
            return res.status(statusCode).json(entity);
        }
        return null;
    }
}