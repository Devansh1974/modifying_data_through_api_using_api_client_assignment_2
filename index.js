require('dotenv').config();
console.log("MongoDB URI:", process.env.MONGO_URI);

const express = require('express'); // Require express *outside* nextTick
const mongoose = require('mongoose'); // Require mongoose *outside* nextTick
const bodyParser = require('body-parser');
const MenuItem = require('./models/MenuItem');

const app = express();
const port = process.env.PORT || 3010;

app.use(express.static('static'));
app.use(bodyParser.json());

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            // useNewUrlParser: true,  // No longer needed in Mongoose 6+
            // useUnifiedTopology: true, // No longer needed in Mongoose 6+
        });
        console.log('Connected to MongoDB Atlas');

        // Express app setup (routes and app.listen) *INSIDE* connectDB after successful connection
        app.get('/', (req, res) => {
            res.sendFile(require('path').resolve(__dirname, 'pages/index.html'));
        });

        // ... (your PUT and DELETE route handlers)

        app.listen(port, () => {
            console.log(`Example app listening at http://localhost:${port}`);
        });

    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
};

connectDB(); // Call the connection function to initiate the connection