//Import 
let express = require('express');
let bodyParser = require('body-parser');
let http = require('http');
let mongoose = require('mongoose');

let cors = require('cors');

// Configure mongoose to use promise
mongoose.Promise = require('bluebird');

let resgisRoutes = require('./routes').default;

var originsWhitelist = [
  'http://localhost:4200',  
  'https://fsf-app.herokuapp.com'
];

var corsOptions = {
  origin: function(origin, callback){
        var isWhitelisted = originsWhitelist.indexOf(origin) !== -1;
        callback(null, isWhitelisted);
  },
  credentials:true
}

const app = express();

app.use(cors(corsOptions));

// Connect to the database before starting the application server.
mongoose.connect(process.env.MONGODB_ADDON_URI || 'mongodb://localhost/fsfapp').then(
    () => { console.log('Connexion a la base mongo etablie') },
    err => { console.log(err) }
);

// Create server
let server = http.createServer(app);

// Body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

resgisRoutes(app);

// Initialize the app.
server.listen(process.env.PORT || 3000, () => {
    console.log(`Serveur demarrer avec suc0ces au port :${3000}`);
});