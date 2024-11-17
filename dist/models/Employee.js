import mongoose, { Schema } from 'mongoose';
const EmployeeSchema = new Schema({
    name: { type: String, required: true },
    age: { type: Number, required: true },
    class: { type: String, required: true },
    subjects: { type: [String], default: [] },
    attendance: { type: [Date], default: [] },
}, { timestamps: true });
export default mongoose.model('Employee', EmployeeSchema);
