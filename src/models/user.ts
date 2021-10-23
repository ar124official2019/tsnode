import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
const round = 10;

const UserSchema = new mongoose.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true }
});

UserSchema.pre('save', async function (next) {
    if (this.isModified('password') || this.isNew()) {
        const hash = await bcrypt.hash(this.password, round);
        this.password = hash;
    }

    next();
});

UserSchema.methods.validatePassword = function (password): Promise<boolean> {
    return bcrypt.compare(password, this.password);
};

const User = mongoose.model('user', UserSchema);
export default User;