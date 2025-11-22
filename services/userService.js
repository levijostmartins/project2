const User = require('../models/User');


exports.findOrCreateFromProfile = async (profile) => {
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
return user;
};