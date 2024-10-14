// // Temp file
// const mongoose = require('mongoose');
// const Customer = require('./customers');
// const Order = require('./orders');

// async function migrateOrdersToUseObjectId() {
//     try {
//         // Connect to your MongoDB database
//         await mongoose.connect('mongodb://localhost:27017/Dinovate', {
//             useNewUrlParser: true,
//             useUnifiedTopology: true,
//         });

//         // Find all orders
//         const orders = await Order.find();
// asd
//         for (const order of orders) {
//             // Find the customer using the numerical `customerId` (this is what we're migrating)
//             const customer = await Customer.findOne({ id: order.customerId });

//             if (customer) {
//                 // Update the customerId in the order to use the `ObjectId` instead of the numerical ID
//                 order.customerId = customer._id;  // Set customerId to the `ObjectId`
//                 await order.save();  // Save the updated order
//                 console.log(`Order ${order.orderId} updated successfully!`);
//             } else {
//                 console.log(`No customer found for order ${order.orderId}`);
//             }
//         }

//         console.log('Migration completed successfully!');
//         mongoose.disconnect();  // Disconnect after migration is complete
//     } catch (error) {
//         console.error('Error during migration:', error);
//         mongoose.disconnect();  // Ensure we disconnect on error
//     }
// }

// migrateOrdersToUseObjectId();
