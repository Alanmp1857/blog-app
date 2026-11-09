const {Schema, model} = require('mongoose');
const {randomBytes, createHmac} = require('crypto');
const {createTokenForUser} = require('../services/authentication');

const userSchema = new Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    salt: {
        type: String
    },
    password: {
        type: String,
        required: true
    },
    profileImageURL: {
        type: String,
        default: '/images/default-profile.png'
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    }
}, {timestamps: true});

userSchema.pre('save', function() {
    const user = this;
    if (!user.isModified("password")) return next();

    const salt = randomBytes(16).toString();
    const hashedPassword = createHmac('sha256', salt).update(user.password).digest('hex');
    user.salt = salt;
    user.password = hashedPassword;
});

userSchema.static("matchPasswordAndGenerateToken", async function(email, password) {
    const user = await this.findOne({email});
    if (!user) throw new Error("User not found");

    const salt = user.salt;
    const hashedPassword = user.password;

    const userProvidedHash = createHmac('sha256', salt).update(password).digest('hex');

    if (userProvidedHash !== hashedPassword) throw new Error("Invalid password");
    const token = createTokenForUser(user);
    return token;
})

const User = model('user', userSchema);

module.exports = { User };