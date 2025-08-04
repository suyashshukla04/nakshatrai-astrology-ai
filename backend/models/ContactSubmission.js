const mongoose = require('mongoose');

const contactSubmissionSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    subject: { type: String, required: true },
    message: { type: String, required: true },
    inquiryType: { 
        type: String, 
        enum: ['general', 'partnership', 'technical', 'press', 'feedback'],
        default: 'general'
    },
    submittedAt: { type: Date, default: Date.now },
    ipAddress: String,
    status: {
        type: String,
        enum: ['new', 'read', 'responded', 'archived'],
        default: 'new'
    }
}, {
    timestamps: true
});

contactSubmissionSchema.index({ submittedAt: -1 });
contactSubmissionSchema.index({ status: 1 });

module.exports = mongoose.model('ContactSubmission', contactSubmissionSchema);
