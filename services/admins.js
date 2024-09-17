const Admin = require('../models/admins'); 

async function getAdminByEmail(email) {
    try {
        const admin = await Admin.findOne({ email: email }).exec(); 
        return admin;
    } catch (error) {
        console.error('Error finding customer by email:', error);
        return null;
    }
}

module.exports = {
    getAdminByEmail
}