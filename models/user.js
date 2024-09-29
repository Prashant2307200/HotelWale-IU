import {mongoose, passportLocalMongoose} from '../index.js';

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    }, 
});

userSchema.plugin(passportLocalMongoose);

export default mongoose.model("User", userSchema);