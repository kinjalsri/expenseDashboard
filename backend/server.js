const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./Models/db');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./Routes/auth');
const productRoutes = require('./Routes/product');
const expenseRoutes = require('./Routes/expense');
const ensureAuth = require('./Middlewares/Auth');

const app = express(); 
dotenv.config(); 
require('./Models/User');
const PORT = process.env.PORT || 3000;

app.get('/',(req, res) => {
    res.send('Server working'); 
});

app.use(bodyParser.json());
app.use(cors());
connectDB();

//routes 
app.use('/auth', authRoutes); 
app.use('/products', productRoutes);
app.use('/expenses', ensureAuth, expenseRoutes);




app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});

