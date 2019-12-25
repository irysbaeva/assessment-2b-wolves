const mongoose = require('mongoose');


const partySchema = new mongoose.Schema({
    name: {type: String, required: true},
    location: { type: String, required: true },
    createdAt: Date,
    startsAt: { type: Date, required: true },
    host: { type: mongoose.Types.ObjectId, ref: 'User' },
 
});

partySchema.statics.mostRecent = async function () {
    return this.find().sort('startsAt').limit(5).exec();
}

module.exports = mongoose.model('Party', partySchema);