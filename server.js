const express = require('express');
const jsonServer = require('json-server');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const axios = require('axios');

const app = express();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

const secretKey = 'your-secret-key';

app.use(express.json());
app.use(cors());
app.use(middlewares);

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) {
    return res.sendStatus(401);
  }

  jwt.verify(token, secretKey, (err, user) => {
    if (err) {
      return res.sendStatus(403);
    }
    req.user = user;
    next();
  });
}


app.post('/login', (req, res) => {
  const { username, password } = req.body;

  const user = users.find(user => user.username === username);

  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  bcrypt.compare(password, user.password, (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    if (!result) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ username: user.username }, secretKey);
    res.json({ token });
  });
});

app.post('/register', (req, res) => {
  const { username, password } = req.body;

  const existingUser = users.find(user => user.username === username);

  if (existingUser) {
    return res.status(409).json({ error: 'Username already exists' });
  }

  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) {
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    const newUser = {
      username: username,
      password: hashedPassword
    };

    users.push(newUser);

    res.status(201).json({ message: 'User created successfully' });
  });
});

app.get('/articles', (req, res) => {
  axios.get('http://localhost:3000/articles')
    .then(response => {
      const articles = response.data;


      if (!req.user) {
        const filteredArticles = articles.filter(article => article.published);
        res.json(filteredArticles);
      } else {
        res.json(articles);
      }
    })
    .catch(error => res.status(500).json({ error: 'Internal Server Error' }));
});

app.post('/articles', authenticateToken, (req, res) => {
  const { title, content, author, published, publicationDate } = req.body;

  const newArticle = {
    title,
    content,
    author,
    published,
    publicationDate
  };

  axios.post('http://localhost:3000/articles', newArticle)
    .then(response => res.json(response.data))
    .catch(error => res.status(500).json({ error: 'Internal Server Error' }));
});

app.post('/comments', authenticateToken, (req, res) => {
  const { articleId, comment, author } = req.body;

  const newComment = {
    articleId,
    comment,
    author
  };

  axios.post('http://localhost:3000/comments', newComment)
    .then(response => res.json(response.data))
    .catch(error => res.status(500).json({ error: 'Internal Server Error' }));
});


app.use('/api', router);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
