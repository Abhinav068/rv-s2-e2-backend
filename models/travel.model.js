let { model, Schema } = require('mongoose');

const TravelModel = model('travel', Schema({
    name: String,
    email: String,
    destination: String,
    no_of_travelers: Number,
    Budget_Per_Person: Number
}))

module.exports = { TravelModel };

let travel = {
    "name": "aman",
    "email": "aman@gmail.com",
    "destination": "India",
    "no_of_travelers": 10,
    "Budget_Per_Person": 500
}