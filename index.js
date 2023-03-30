const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const winston = require('winston'); //using winston logger

const app = express(); //using express for defining apis

app.use(cors()); //using cors for reading data 

app.use(bodyParser.json()); // uisng body parser to parse text to json

// adding logger  

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { service: 'calculator-microservice' },
    transports: [
    new winston.transports.Console({
    format: winston.format.simple(),
    }),
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'logs/combined.log' }),
    ],
   });

// Addition endpoint
app.post('/add', (req, res) => {
     const { num1, num2 } = req.body;
     logger.log({
        level: 'info',
        message: `New add operation requested: ${num1} + ${num2}`,
      });
    if (num1 == null|| num2 == null) {
      res.status(400).json({ error: 'Invalid input parameters' });
    } else {
      const result = num1 + num2;
      res.json({ result });
    }
  });

// Subtraction endpoint
app.post('/subtract', (req, res) => {
  const { num1, num2 } = req.body;
  logger.log({
    level: 'info',
    message: `New add operation requested: ${num1} + ${num2}`,
  });
  if (num1 == null|| num2 == null) {
    res.status(400).json({ error: 'Invalid input parameters' });
  } else {
    const result = num1 - num2;
    res.json({ result });
  }
});

// Multiplication endpoint
app.post('/multiply', (req, res) => {
  const { num1, num2 } = req.body;
  logger.log({
    level: 'info',
    message: `New add operation requested: ${num1} + ${num2}`,
  });
  if (num1 == null|| num2 == null) {
    res.status(400).json({ error: 'Invalid input parameters' });
  } else {
    const result = num1 * num2;
    res.json({ result });
  }
});

// Division endpoint
app.post('/divide', (req, res) => {
  const { num1, num2 } = req.body;
  logger.log({
    level: 'info',
    message: `New add operation requested: ${num1} + ${num2}`,
  });
  if (num1 == null|| num2 == null) {
    res.status(400).json({ error: 'Invalid input parameters' });
  } else if (num2 === 0) {
    res.status(400).json({ error: 'Division by zero is not allowed' });
  } else {
    const result = num1 / num2;
    res.json({ result });
  }
});

const port = 3000; //defining port

app.listen(port, () => {
  console.log(`Calculator microservice listening at http://localhost:${port}`);
});

