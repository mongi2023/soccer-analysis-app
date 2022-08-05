const mongoose = require('mongoose')



const ActionCategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide the name of the action category'],
        unique: true
    },
    description: {
        type: String,
        minlength: 20
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'UserApp',
        required: () => this.user ? true : false
    }
}, {timestamps: true, toJSON: {virtuals: true}, toObject: {virtuals: true}});

ActionCategorySchema.virtual('actionSubCategories', {
    ref: 'ActionSubCategory',
    localField: '_id',
    foreignField: 'category',
    justOne: false
})

module.exports = mongoose.model('ActionCategory', ActionCategorySchema)