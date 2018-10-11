'use strict';

// Send result
exports.respondWithResult = function (res, statusCode) {
    statusCode = statusCode || 200;
    return  function(entity) {
        if(entity) {
            return res.status(statusCode).json(entity);
        }
        return null;
    }
}

// Remove entity in database
exports.removeEntity = function(res) {
    return function(entity) {
        if(entity) {
          return entity.remove()
            .then(() => res.status(204).end());
        }
    };
}

// Check inxisting of entity
exports.handleEntityNotFound = function(res) {
    return function(entity) {
        if(!entity) {
            res.status(404).end();
            return null;
        }
        return entity;
    };
}

// Handle error
exports.handleError = function(res, statusCode) {
    statusCode = statusCode || 500;
    return function(err) {
        res.status(statusCode).send(err);
    };
}