const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        firstName: String,
        lastName: String,
    },
    userName: String,
    password: String,
    profilePicture: Buffer,
    created: {
        type: Date,
        default:Date.now
    }
});


module.exports = mongoose.model('User', UserSchema);