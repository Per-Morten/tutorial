const PersonModel = require('../models/Person');
const errors = require('../helpers/error');
module.exports = (api) => {
    api.route('/person/:id')
        .get((req, res) => {
            let id = req.params.id;
            PersonModel.findOne({_id: id}).exec()
                .then(user => res.json(user))
                .catch(err => res.status(500).json(errors.ERROR_500))
        })
}