const express = require('express');
const router = express.Router();
const cors=require('cors');
const mongoose = require('mongoose');
router.use(express.json());
const db = "mongodb+srv://shrawanigaikwad5:h9Lz1DXVVHsa1CZo@project.p9zw7sy.mongodb.net/test?retryWrites=true&w=majority&appName=Project";
const app=express();
app.use(cors());
mongoose.connect(db).then(() => {
    console.log('Connected to MongoDB');
}).catch((error) => {
    console.error('Error connecting to MongoDB:', error);
});

const helpSchema = new mongoose.Schema({
    Name: String,
    Phone: String,
    Email: String,
    CompanyName: String,
    Query: String
});

const contactSchema = new mongoose.Schema({
    Name: String,
    Email: String,
    Phone: String,
    Subject : String,
    Message : String
});

const Help = mongoose.model('help', helpSchema, 'help');
const Contact = mongoose.model('contact',contactSchema , 'contact');

router.post('/help', async (req, res) => {
    try {
        console.log(req.body);
        const newHelp = new Help(req.body);
        const savedHelp = await newHelp.save();
        console.log('Help data saved successfully:', savedHelp);
        res.json({ message: 'Help data added successfully', newHelp: savedHelp });
    } catch (error) {
        console.error('Error saving help data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.post('/contact', async (req, res) => {
    try {
        console.log(req.body);
        const newContact = new Contact(req.body);
        const savedContact = await newContact.save();
        console.log('Contact data saved successfully:', savedContact);
        res.json({ message: 'Contact data added successfully', newContact: savedContact });
    } catch (error) {
        console.error('Error saving contact data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

const PORT = process.env.PORT || 3000;
app.use(router);

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on http://0.0.0.0:${PORT}`);
});
