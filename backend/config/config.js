const mongoose = require('mongoose');
const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };

module.exports = { 
    connectToDB: () => {
        mongoose.connect(process.env.MONGODB_URI, clientOptions)
        .then(() => console.log('MongoDB Connected'))
        .catch(err => {
            console.log('MongoDB Connection Error:', err);
            process.exit(1);
        });
    }
}