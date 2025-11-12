require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const contactsRouter = require('./routes/route-contacts');

const app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');

app.use(cors());
app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

// Routes
app.use('/contacts', contactsRouter);

// Port
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
