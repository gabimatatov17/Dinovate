const User = require('../models/customers');

async function login(email, password){
    const user = await User.findOne({
        email: email, 
        password: password
    });
}