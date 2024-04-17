const express = require('express');
const router= express.Router();
const mongoose=require('mongoose');
router.use(express.json());
const db="mongodb+srv://shrawanigaikwad5:h9Lz1DXVVHsa1CZo@project.p9zw7sy.mongodb.net/?retryWrites=true&w=majority&appName=Project";

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
