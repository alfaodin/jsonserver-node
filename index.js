const jsonServer = require('json-server');
const port = process.env.PORT || 3010;

const server = jsonServer.create();
const router = jsonServer.router('./db.json');
const middlewares = jsonServer.defaults();

var bodyParser = require('body-parser');
server.use(bodyParser.json()); // support json encoded bodies
server.use(bodyParser.urlencoded({ extended: true }));

var db = require('./db.json');

server.use(middlewares);

server.get('/api/login', (req, res) => {
  if (req.method === 'GET') {
    let userId = req.query['userId'];
    if (userId != null && userId >= 0) {
      let result = db.comments.find(user => {
        return user.id == userId;
      })

      if (result) {
        let { id, ...user } = result;
        res.status(200).jsonp(user);
      } else {
        res.status(400).jsonp({
          error: "Bad userId"
        });
      }
    } else {
      res.status(400).jsonp({
        error: "No valid userId"
      });
    }
  }
});

server.use((req, res, next) => {
  if (req.method === 'POST') {
    //req.body.createdAt = Date.now()
  }
  // Continue to JSON Server router
  next()
});


server.post('/api/login', (req, res) => {
  if (req.method === 'POST') {
    let userId = req.body.userId;
    if (userId != null && userId >= 0) {
      let result = db.comments.find(user => {
        return user.id == userId;
      })

      if (result) {
        let { id, ...user } = result;
        res.status(200).jsonp(user);
      } else {
        res.status(400).jsonp({
          error: "Bad userId"
        });
      }
    } else {
      res.status(400).jsonp({
        error: "No valid userId"
      });
    }
  }
});


server.use(router);
server.listen(port, () => console.log(`Example app listening on port ${port}!`));
