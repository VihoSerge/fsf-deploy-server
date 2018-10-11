const mongoose = require('mongoose');

const MatchSchema = new mongoose.Schema({
    team1: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Team'
    },
    team2: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Team'
    },
    score1: {
        type: String,
        required: true
    },
    score2: {
        type: String,
        required: true
    },
});

module.exports = mongoose.model('Match', MatchSchema);