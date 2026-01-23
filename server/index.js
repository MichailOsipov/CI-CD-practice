const express = require('express');
const bodyParser = require('body-parser');

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

const STUDENTS = {
  'Andrey': {
    name: 'Andrey',
  },
  'Lesha': {
    name: 'Lesha',
  },
};

const DEFAULT_STUDENT = {
  name: 'Default',
};

app.get('/api/student/:studentId', (req, res) => {
  const studentId = req.params.studentId;

  const student = STUDENTS[studentId] || DEFAULT_STUDENT;

  return res.status(200).json({ student });
});

const encodeLoginToToken = (login) => {
  const encodedHeader = btoa(JSON.stringify({
    alg: 'RS256',
    typ: 'JWT',
  }));

  const encodedData = btoa(JSON.stringify({ login }));

  const jwt = `${encodedHeader}.${encodedData}.signature`;

  return { token: jwt };
};

const parseToken = (authorizationToken) => {
  const jwt = authorizationToken.split(' ');
  const encodedData = jwt[1].split('.')[1];

  const parsedData = JSON.parse(atob(encodedData));

  return parsedData;
};

const getLoginFromToken = (req) => {
  const authorizationToken = req.headers.authorization || '';

  const { login = '' } = parseToken(authorizationToken) || {};

  return login;
}

app.post('/oauth/token', (req, res) => {
  const { login } = req.body;

  const tokenData = encodeLoginToToken(login);
 
  setTimeout(() => {
    res.status(200).send(tokenData);
  }, 1000);
});

app.post('/oauth/logout', (req, res) => {
  // Here is the logic, which deletes auth tokens

  setTimeout(() => {
    res.sendStatus(200);    
  }, 1000);
});

const USERS = {
  '001': '001',
  '002': '002',
  '003': '003',
  '401': '401',
};

app.get('/private/client/status', (req, res) => {
  const user = getLoginFromToken(req);

  let userStatus;

  if (user === '001') {
    userStatus = 'REGISTERED';
  } else if (user === '401') {
    userStatus = undefined;
  } else {
    userStatus = 'NOT_REGISTERED';
  }

  const code = user === '401' ? 401 : 200;
  
  setTimeout(() => {
    res.status(code).send({ status: userStatus });
  }, 1000);
});

app.listen(PORT, () => {
  console.info('JSON Server is running on port:', PORT);
});
