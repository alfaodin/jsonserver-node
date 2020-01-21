// const app = express();
  
// app.use('/api', jsonServer.router('db.json'));

// app.use('/', function(req, res){
//   res.send('Hello world');
// });

// app.post('/login', (req, res) => {
// jsonServer.router
// });
  
  
// app.listen(8080, ()=>console.log('Server inicado en el puerto'));
const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('./db.json');
const middlewares = jsonServer.defaults();
const port = process.env.PORT || 3000;
var db = require('./db.json');

server.use(middlewares);

server.get('/get/user', (req, res) => {
  if (req.method === 'GET') {
    let userId = req.query['userId'];
    if (userId != null && userId >= 0) {
      let result = db.comments.find(user => {
        return user.id == userId;
      })

      if (result) {
        let {id, ...user} = result;
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
server.listen(port);

