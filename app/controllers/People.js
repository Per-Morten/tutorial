const PersonModel = require('../models/Person');
const errors = require('../helpers/error');
module.exports = (api) => {
    api.route('/people')
        .get((req, res) => {
            res.send('Return all people! <:) 3===D~~~');
        })
        .post((req, res) => {
            let body = req.body;
            if(body.firstname && body.lastname && body.address && body.postcode) {
                
                PersonModel.create(body)
                    .then(user => res.send(user))
                    .catch(err => res.json(errors.ERROR_500));

            } else {
                return res.json(errors.INVALID_INPUT);
            }
        })
};