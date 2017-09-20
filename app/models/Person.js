const mongoose = require('mongoose');

const PersonSchema = mongoose.Schema({
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    postcode: {
        type: Number,
        required: true,
    },
});


PersonSchema.statics.findByName = function(firstname) {
    return new Promise((resolve, reject) => {
        this.findOne({firstname}).exec()
            .then(person => resolve(person))
            .catch(err => reject(err));
    });
}

PersonSchema.statics.getAll = function() {
    return new Promise((resolve, reject) => {
        this.find({}).exec()
            .then(people => resolve(people))
            .catch(err => reject(err));
    });
}


module.exports = mongoose.model('PersonModel', PersonSchema, 'people');