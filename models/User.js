const mongoose = require('mongoose');


const UserSchema = new mongoose.Schema({
oauthId: { type: String, index: true },
provider: { type: String },
email: { type: String, index: true, sparse: true },
name: { type: String },
roles: { type: [String], default: ['user'] },
createdAt: { type: Date, default: Date.now },
updatedAt: { type: Date, default: Date.now }
});


UserSchema.pre('save', function(next) {
this.updatedAt = Date.now();
next();
});


module.exports = mongoose.model('User', UserSchema);