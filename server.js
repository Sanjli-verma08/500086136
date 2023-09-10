const express = require('express');
const fs = require('fs');
const axios = require('axios');

const app = express();
const port = 8008;

app.use(express.json());
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.get('/numbers', (req, res) => {
  res.sendFile(__dirname + '/public/numbers.html');
});

app.get('/processNumbers', async (req, res) => {
  try {
    // Read the JSON file and parse its contents
    const jsonData = JSON.parse(fs.readFileSync('your_data.json', 'utf-8'));

    // Extract the "numbers" array from the JSON data
    const numbersArray = jsonData.numbers;

    // Process the numbers
    const processedNumbers = processData(numbersArray);

    res.json({ message: 'Numbers processed successfully', result: processedNumbers });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred', error: error.message });
  }
});

function processData(numbersArray) {
  return numbersArray.map((number) => number * 2);
}

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
