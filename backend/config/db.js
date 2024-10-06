const mongoose = require('mongoose');
const User = require('../models/User')
const bcrypt = require('bcrypt')
const connectDB = async (url)=>{
    try {
       await mongoose.connect(url);
       console.log('Connected to MongoDB database');
        const admin = await User.findOne({email:'admin@nitk.edu.in'})
        if(!admin){
            const hashedPassword =await bcrypt.hash('admin123',10)
            await User.create({
              email: "admin@nitk.edu.in",
              name: "Admin",
              password: hashedPassword,
              roll: "",
              role: "ADMIN",
              yearOfPassing: "",
              branch: "CS",
              avatar:
                "https://avatars.dicebear.com/api/adventurer-neutral/admin.svg",
            });
        }
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}

module.exports = {connectDB}