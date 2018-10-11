const mongoose = require('mongoose');

const StandingSchema = new mongoose.Schema({
    played: {
        type: Number,
        default: 0
    },
    won: {
        type: Number,
        default: 0
    },
    lost: {
        type: Number,
        default: 0
    },
    drawn: {
        type: Number,
        default: 0
    },
    goalsFor: {
        type: Number,
        default: 0
    },
    goalsAgainst: {
        type: Number,
        default: 0
    },
    goalDifference: {
        type: Number,
        default: 0
    },
    points: {
        type: Number,
        default: 0
    },
    team: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Team',
    },
    rank: {
        type: Number,
    },
});

module.exports = mongoose.model('Standing', StandingSchema);