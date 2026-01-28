const express = require('express');
const smzRouter = express.Router();

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

smzRouter.post('/oauth/token', (req, res) => {
  const { login } = req.body;

  const tokenData = encodeLoginToToken(login);
 
  setTimeout(() => {
    res.status(200).send(tokenData);
  }, 1000);
});

smzRouter.post('/oauth/logout', (req, res) => {
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

smzRouter.get('/private/client/status', (req, res) => {
  const user = getLoginFromToken(req);

  let userStatus;

  if (user === USERS['001']) {
    userStatus = 'NOT_REGISTERED';
  } else if (user === USERS['401']) {
    userStatus = undefined;
  } else {
    userStatus = 'REGISTERED';
  }

  const code = user === '401' ? 401 : 200;
  
  setTimeout(() => {
    res.status(code).send({ status: userStatus });
  }, 1000);
});

smzRouter.get('/private/client/info', (req, res) => {
  setTimeout(() => {
    res.status(200).send({ phoneNumber: '8-800-555-35-35' });
  }, 1000);
});

smzRouter.get('/private/client/find', (req, res) => {
  setTimeout(() => {
    res.status(200).send({ inn: '773108403501' });
  }, 1000);
});

smzRouter.get('/private/client/verification', (req, res) => {
  setTimeout(() => {
    res.status(200).send({ verificationStatus: 'ALLOW' });
  }, 1000);
});

const ACTIVITIES = [
  {
    label: 'Ноготочки',
    name: 'Nails',
    groupName: 'Cosmetics',
    groupLabel: 'Косметика',
  },
  {
    label: 'Стрижки',
    name: 'Haircuts',
    groupName: 'Cosmetics',
    groupLabel: 'Косметика',
  },
  {
    label: 'Риэлтор',
    name: 'Realtor',
    groupName: 'Jurisprudence',
    groupLabel: 'Юриспруденция',
  }
];

smzRouter.get('/private/dictionary/activities', (req, res) => {
  setTimeout(() => {
    res.status(200).send({ items: ACTIVITIES });
  }, 1000);
});

const REGIONS = [
  {
    oktmo: '112233',
    name: 'Тверская область',
  },
  {
    oktmo: '223344',
    name: 'Московская область',
  },
  {
    oktmo: '334455',
    name: 'Калужская область',
  },
];

smzRouter.get('/private/dictionary/regions', (req, res) => {
  setTimeout(() => {
    res.status(200).send({ items: REGIONS });
  }, 1000);
});

smzRouter.post('/private/send-sms-code', (req, res) => {
  setTimeout(() => {
    res.status(200).send({ nextRequestTimeInSeconds: 30 });
  }, 1000);
});

smzRouter.post('/private/confirm-sms-code', (req, res) => {
  const smsCode = req.body.smsCode;

  let confirmSmsCodeStatus;

  if (smsCode === '111111') {
    confirmSmsCodeStatus = 'INVALID';
  } else {
    confirmSmsCodeStatus = 'VALID';
  }

  setTimeout(() => {
    res.status(200).send({ confirmSmsCodeStatus });
  }, 1000);
});

smzRouter.post('/private/register', (req, res) => {
  setTimeout(() => {
    res.sendStatus(200);
  }, 1000);
});

smzRouter.get('/private/lk-data', (req, res) => {
  setTimeout(() => {
    res.status(200).send({ income: 50000, taxes: 12000 });
  }, 1000);
});

module.exports = smzRouter;
