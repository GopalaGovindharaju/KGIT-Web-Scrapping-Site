import mongoose from "mongoose";
const Schema = mongoose.Schema;

const googleMapSchema = new Schema({
    companyName: String,
    email: {
        type: String,
        required: true,
        match: [/.+\@.+\..+/, 'Please enter a valid email address'],
    },
    date_time: String,
    data: mongoose.Schema.Types.Mixed,
});

const GoogleMap = mongoose.model('GoogleMap', googleMapSchema);
export default GoogleMap;