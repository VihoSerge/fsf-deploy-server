'use strict';
/*
*   All api routes
*/
module.exports.default =  function(app) {
    app.use('/api/teams', require('./api/team'));
    app.use('/api/matchs', require('./api/match'));
    app.use('/api/standings', require('./api/standing'));
}