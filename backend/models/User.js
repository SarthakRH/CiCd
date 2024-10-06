const mongoose = require('mongoose');
const ROLES = require('../config/roles')
const branches = require('../config/branch')

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  roll: {
    type: String,
  },
  yearOfPassing:{
    type:String
  },
  branch:{
    type:String,
    enum:branches
  },
  role: {
    type: String,
    enum: [ROLES.ADMIN, ROLES.USER, ROLES.ICO, ROLES.PCO],
    default: ROLES.USER,
  },
  status:{
    type:String,
    enum:['placed','interned','none','others'],
    default:'none'
  },
  avatar:{
    type:String,
  },
  categories:{
    type:[{
      type:mongoose.Schema.Types.ObjectId,
      ref:'Category'
    }],
    default:[]
  }
});

module.exports = mongoose.model('User', userSchema);