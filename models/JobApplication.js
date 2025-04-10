const mongoose=require('mongoose');

const jobApplicationSchema=new mongoose.Schema({
    company: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['Applied', 'Interview', 'Offer', 'Rejected'],
        default: 'Applied'
    },
    appliedDate: {
        type: Date,
        default: Date.now
    },
    link: {
        type: String,
        required: true
    },
})

module.exports=mongoose.model('JobApplication', jobApplicationSchema);
