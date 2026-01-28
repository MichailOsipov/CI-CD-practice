const express = require('express');
const bodyParser = require('body-parser');

const smzRouter = require('./smzRoutes');

const PORT = Number(process.env.PORT) || 2999;

const app = express();
app.use(bodyParser.json());

const cats = [];

app.get('/api/cats', (req, res) => {
  return res.status(200).json({ cats: cats });
});

app.post('/api/cat', (req, res) => {
  const cat = req.body.cat;
  cats.push(cat);

  return res.sendStatus(200);
});

app.get('/api/student/:studentId', (req, res) => {
  const studentId = req.params.studentId;

  const STUDENTS = {
    'Andrey': { name: 'Andrey' },
    'Lesha': { name: 'Lesha' },
  };

  const student = STUDENTS[studentId] || { name: 'Default' };

  return res.status(200).json({ student });
});

app.use(smzRouter);

app.listen(PORT, () => {
  console.info('JSON Server is running on port:', PORT);
});
