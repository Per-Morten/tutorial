const mongoose = require('mongoose');



const PersonSchema = mongoose.Schema({
    fisrtname: {
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

PersonSchema.statics.findPersonSync = async function(firstname) {
    const person = await this.findOne({firstname}).exec();
    if(!person) {
        return {
            error: 'Could not find the user',
        };
    } else {
        return person;
    }
}

module.exports = mongoose.model('PersonModel', PersonSchema, 'people');