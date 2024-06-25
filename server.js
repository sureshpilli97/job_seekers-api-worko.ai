const express = require('express');
const dotenv = require('dotenv');
const basicAuth = require('express-basic-auth');
const userController = require('./src/controllers/UserController');

dotenv.config();

const app = express();

app.use(express.json());

app.use(basicAuth({
    users: { 'admin': 'Admin123' },
}));

app.use('/worko/user', userController);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
