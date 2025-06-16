import User from "../Model/UserModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { request, response } from "express";

export const normaltest = async (request, response) => {
    response.send("Working Correctly without any errors..");
};

export const create = async (request, response) => {
    try {
        const { email, password } = request.body;
        const userexist = await User.findOne({ email });
        if (userexist) {
            return response.status(409).json({ Message: "User Already Exists" });
        }
        const hashedpassword = await bcrypt.hash(password, 10);
        const newUser = new User({ ...request.body, password: hashedpassword });
        const savedUser = await newUser.save();
        response.status(200).json(savedUser);
    } catch (error) {
        response.status(500).json({ Message: "Internal Server Error" });
    }
};

export const login = async (request, response) => {
    try {
        const { email, password } = request.body;
        const user = await User.findOne({ email });
        if (!user) {
            return response.status(404).json({ Message: "User Not Found" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return response.status(401).json({ Message: "Invalid Credentials" });
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        response.status(200).json({ token });
    } catch (error) {
        response.status(500).json({ Message: "Internal Server Error" });
    }
};

export const getallusers = async (request, response) => {
    try {
        const users = await User.find();
        if (users.length === 0) {
            return response.status(404).json({ Message: "No Users Found" });
        }
        response.status(200).json({ users });
    } catch (error) {
        response.status(500).json({ Message: "Internal Server Error" });
    }
};

export const getuserbyid = async (request, response) => {
    try {
        const id = request.params.id;
        const user = await User.findById(id);
        if (!user) {
            return response.status(404).json({ Message: "User Not Found" });
        }
        response.status(200).json(user);
    } catch (error) {
        response.status(500).json({ Message: "Internal Server Error" });
    }
};

export const updatebyid = async (request, response) => {
    try {
        const id = request.params.id;
        const userexist = await User.findById(id);
        if (!userexist) {
            return response.status(404).json({ Message: "User Not Found" });
        }
        const updatedUser = await User.findByIdAndUpdate(id, request.body, { new: true });
        response.status(200).json(updatedUser);
    } catch (error) {
        response.status(500).json({ Message: "Internal Server Error" });
    }
};

export const deletebyid = async (request, response) => {
    try {
        const id = request.params.id;
        const userexist = await User.findById(id);
        if (!userexist) {
            return response.status(404).json({ Message: "User Not Found" });
        }
        await User.findByIdAndDelete(id);
        response.status(200).json({ Message: "User Deleted Successfully" });
    } catch (error) {
        response.status(500).json({ Message: "Internal Server Error" });
    }
};
