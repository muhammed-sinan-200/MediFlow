import mongoose from 'mongoose'

const appointmentScheme = new mongoose.Schema({
    userId: { type: String, required: true },
    docId: { type: String, required: true },
    slotDate: { type: String, required: true },
    slotTime: { type: String, required: true },
    userData: { type: Object, required: true },
    docData: { type: Object, required: true },
    amount: { type: Number, required: true },
    date: { type: Number, required: true },
    cancelled: { type: Boolean, default: false },
    payment: { type: Boolean, default: false },
    isComplete: { type: Boolean, default: false }
})

// Only one active booking per doctor/date/time; cancelled rows can be rebooked
appointmentScheme.index(
    { docId: 1, slotDate: 1, slotTime: 1 },
    { unique: true, partialFilterExpression: { cancelled: false } }
)

const appointmentModel = mongoose.model('appointment', appointmentScheme)

export default appointmentModel;