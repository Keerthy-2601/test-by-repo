import mongoose from "mongoose";

const userschema = new mongoose.Schema({
    Name: { type: String, required: true },
    RollNo: { type: String, required: true },
    Age: { type: String, required: true },
    College: { type: String, required: true },
    Department: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

export default mongoose.model("students", userschema);
