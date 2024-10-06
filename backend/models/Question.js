const mongoose = require('mongoose')

const questionSchema = new mongoose.Schema({
    question:{
        type:String,
        required:true
    },
    categoryId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Category'
    }
})

module.exports = mongoose.model('Question',questionSchema);