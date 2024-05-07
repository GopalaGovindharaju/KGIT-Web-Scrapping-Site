import mongoose from "mongoose";
const Schema = mongoose.Schema;

const ambitionBoxSchema = new Schema({
    companyName: String,
    email: {
        type: String,
        required: true,
        match: [/.+\@.+\..+/, 'Please enter a valid email address'],
    },
    date_time: String,
    data: mongoose.Schema.Types.Mixed,
});

const AmbitionBox = mongoose.model('AmbitionBox', ambitionBoxSchema);
export default AmbitionBox;