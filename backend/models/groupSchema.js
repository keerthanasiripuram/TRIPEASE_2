const mongoose = require('mongoose');

// Define the schema for the group
const groupSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    members: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user' // Assuming you have a User schema defined
    }],
    created_at: {
        type: Date,
        default: Date.now
    }
});

// Create the Group model
const Group = mongoose.model('Group', groupSchema);

module.exports = Group;
