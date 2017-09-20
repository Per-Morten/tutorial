import test from 'ava';

const request = require('supertest');
const PersonModel = require('../../models/Person');
const db = require('../database');
const mongoose = require('mongoose');


const person = {
    firstname: 'Bjarte',
    lastname: 'Larsen',
    address: 'Prost bloms gate 38',
    postcode: 2819,
};


test.cb.before((t) => {
    db('person-api-test')
        .then(() => t.end())
        .catch(err => t.fail(err));
});
test.cb.after((t) => {
    mongoose.connection.db.dropDatabase(() => {
        mongoose.connection.close();
        t.end();
    })
});

let newUser = null;

test.cb.beforeEach((t) => {
   PersonModel.remove({}, () => {
        PersonModel.create(Object.assign({}, person))
        .then(user => {
            if(user) {
                newUser = user;
                t.end();
            }
        })
        .catch(err => t.fail(`Failed beforeeach with error ${err}`));
   }) ;
});


const server = require('../../classes/App');


test.serial('Should Return a person', async (t) => {
    if(!newUser) t.fail('No new user');

    const retObject = ['firstname', 'lastname', 'address', 'postcode', '_id', '__v'];
    t.plan(retObject.length + 1);

    await request(server)
        .get('/person/' + newUser._id)
        .expect(200)
        .then(response => {
            Object.entries(response.body).forEach(
                ([key, value]) => {
                    if(retObject.indexOf(key) === -1 || value === '') {
                        t.fail(`Person returned invalid object name ${key} value ${value}`);
                    }else {
                        t.pass();
                    }
                }
            )
        })
        .catch(err => t.fail(err));

    t.pass();
});



test.serial('Should Not Return a person', async (t) => {
    const retObject = ['code', 'message'];
    t.plan(retObject.length + 1);

    await request(server)
        .get('/person/sdgsadgasdgsdagadsg')
        .expect(500)
        .then(response => {
            Object.entries(response.body).forEach(
                ([key, value]) => {
                    if(retObject.indexOf(key) === -1 || value === '') {
                        t.fail(`Person returned invalid object name ${key} value ${value}`);
                    }else {
                        t.pass();
                    }
                }
            )
        })
        .catch(err => t.fail(err));

    t.pass();
});