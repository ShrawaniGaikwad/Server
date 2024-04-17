const express = require('express');
const router= express.Router();
const mongoose=require('mongoose');
router.use(express.json());
const db="mongodb+srv://shrawanigaikwad5:h9Lz1DXVVHsa1CZo@project.p9zw7sy.mongodb.net/?retryWrites=true&w=majority&appName=Project";

mongoose.connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
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

const Help = mongoose.model('help', helpSchema,'help');

async function insert()
{
    await Help.create(
        {
            Name:'Shrawani',
            Phone:'9822289375',
            Email:'shrawanigaikwad@gmail.com',
            CompanyName:'abc',
            Query:'hello'
        }
    )
}
insert();
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

module.exports= router;
