const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User');


module.exports = function(passport) {
passport.use(new GoogleStrategy({
clientID: process.env.GOOGLE_CLIENT_ID || '',
clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
callbackURL: process.env.GOOGLE_CALLBACK_URL || '/api/users/auth/google/callback'
},
async (accessToken, refreshToken, profile, done) => {
try {
let user = await User.findOne({ oauthId: profile.id });
if (!user) {
user = await User.create({
oauthId: profile.id,
provider: profile.provider,
email: profile.emails && profile.emails[0] ? profile.emails[0].value : undefined,
name: profile.displayName,
roles: ['user']
});
}
return done(null, user);
} catch (err) {
return done(err, null);
}
}));


passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (id, done) => {
try {
const user = await User.findById(id).select('-__v');
done(null, user);
} catch (err) {
done(err, null);
}
});
};