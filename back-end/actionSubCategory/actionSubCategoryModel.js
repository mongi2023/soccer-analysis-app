const mongoose = require('mongoose')


const ActionSubCategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide the name of the sub-category action']
    },
    description: {
        type: String,
        minlength: 20
    },
    category: {
        type: mongoose.Types.ObjectId,
        ref: 'ActionCategory',
        required: [true, 'Please provide the category action']
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'UserApp',
        required: ()=>this.user ? true: false
    }
})


module.exports = mongoose.model('ActionSubCategory', ActionSubCategorySchema)