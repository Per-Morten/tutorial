const Person = require('../models/Person');

module.exports = (api) => {
    api.route('/person/:id')
        .get((req, res) => {
            res.send(`Getting person with id: ${req.params.id}`);
        })
        .post((req, res) => {
            res.send('Create a person');
        })
        .put((req, res) => {
            res.send('Update a person');
        })
        .delete((req, res) => {
            res.send('Delete a person');
        })
};