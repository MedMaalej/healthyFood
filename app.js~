var express  = require('express'),
    path     = require('path'),
    routes = require('./routes'),
    multer  =   require('multer'),
    bodyParser = require('body-parser'),
    app = express(),
    http = require('http'),
    foods = require('./routes/foods'),
    users = require('./routes/users'),
    restaurants = require('./routes/restaurants'),
    foods_restaurants = require('./routes/foods_restaurants'),
    sports = require('./routes/sports'),		
    expressValidator = require('express-validator');

/*Set EJS template Engine*/
app.set('views','./views');
app.set('view engine','ejs');
app.set('port', process.env.PORT || 4300);
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true })); //support x-www-form-urlencoded
app.use(bodyParser.json());
app.use(expressValidator());

/*MySql connection*/
var connection  = require('express-myconnection'),
    mysql = require('mysql');

app.use(

    connection(mysql,{
        host     : 'localhost',
        user     : 'root',
        password : 'root',
        database : 'foodCalories',
        debug    : false //set true if you wanna see debug logger
    },'request')

);

/* app.get('/',function(req,res){
    res.send('Welcome');
});*/


//RESTful route
var router = express.Router();



router.use(function(req, res, next) {
    console.log(req.method, req.url);
    next();
});


//app.get('/', routes.index);
//Foods
app.get('/foods', foods.list);
app.get('/foods/add', foods.add);
app.post('/foods/add', foods.save);
app.get('/foods/delete/:id', foods.delete_food);
app.get('/foods/edit/:id', foods.edit);
app.post('/foods/edit/:id',foods.save_edit);


//Restaurants
app.get('/restaurants', restaurants.list);
app.get('/restaurants/add', restaurants.add);
app.post('/restaurants/add', restaurants.save);
app.get('/restaurants/delete/:id', restaurants.delete_food);
app.get('/restaurants/edit/:id', restaurants.edit);
app.post('/restaurants/edit/:id',restaurants.save_edit);



//Sports

app.get('/sports', sports.list);
app.get('/sports/add', sports.add);
app.post('/sports/add', sports.save);
app.get('/sports/delete/:id', sports.delete_food);
app.get('/sports/edit/:id', sports.edit);
app.post('/sports/edit/:id',sports.save_edit);


//Food-restaurant

app.get('/foods_restaurants', foods_restaurants.list);
app.get('/foods_restaurants/add', foods_restaurants.add);
app.post('/foods_restaurants/add', foods_restaurants.save);
app.get('/foods_restaurants/delete/:id', foods_restaurants.delete_food);
app.get('/foods_restaurants/edit/:id', foods_restaurants.edit);
app.post('/foods_restaurants/edit/:id',foods_restaurants.save_edit);

//app.use(app.router);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
