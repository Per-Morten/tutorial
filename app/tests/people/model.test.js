import test from 'ava';

const db = require('../database');
const mongoose = require('mongoose');
const PersonModel = require('../../models/Person');

const person = {
    firstname: 'Bjarte',
    lastname: 'Larsen',
    address: 'Prost bloms gate 38',
    postcode: 2819,
};

test.cb.before((t) => {
    db('person-model-test')
        .then(() => t.end())
        .catch(err => t.fail(err));
});
test.cb.after((t) => {
    mongoose.connection.db.dropDatabase(() => {
        mongoose.connection.close();
        t.end();
    })
});


test.cb.beforeEach((t) => {
    PersonModel.remove({}, () => t.end());
});

test.serial('Create a new user', async (t) => {
    t.plan(2);
    const p = await PersonModel.create(Object.assign({}, person));
    if(p) {
        t.pass();
    } else {
        t.fail('Could not create the user');
    }

    const p2 = await PersonModel.find({_id: p._id}).exec();
    if(p2) {
        t.pass();
    } else {
        t.fail('Could not find the created person');
    }
});
