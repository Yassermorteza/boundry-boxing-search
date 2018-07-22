const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const sportSchema = new Schema({
    sportName:{
        type: String,
        required: 'Name is required',
        lowercase: true
    },
    geometry:{
        type: { type: String, default: 'Point' },
        coordinates: [Number]
    },
    sportType:{
        type:String,
        enum: ['public', 'private']
    },
    timestamp:{
        type: Date
    }
});

sportSchema.index({ geometry: '2dsphere' });

const Sport =  mongoose.model('sport', sportSchema);

module.exports = Sport;