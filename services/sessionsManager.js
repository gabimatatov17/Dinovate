
async function setCustomerSession(req, customerUser) {
    try {
        req.session.customer = {
            _id: customerUser._id,  
            id: customerUser.id,
            firstName: customerUser.firstName,
            lastName: customerUser.lastName,
            email: customerUser.email,
            gender: customerUser.gender,
            birthDate: customerUser.birthDate,
            isAdmin: customerUser.isAdmin
        };
        console.log('Session set for user:', req.session.customer);
    } catch (error) {
        console.error('Error setting session:', error);
    }
}

module.exports = {
    setCustomerSession
};
