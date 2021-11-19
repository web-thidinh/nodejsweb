const express = require('express')
const path = require('path')
const morgan = require('morgan')
const passport = require('passport')
var flash = require('connect-flash')
var session = require('express-session')
// Require Framework Express
const database = require('./mongodb')
const handlebars = require('express-handlebars')
const UserRoutes = require('./routes/UserRoutes/userroutes')
const AdminRoutes = require('./routes/AdminRouter/adminroutes')
const Authentication = require('./controllers/Authenticate') 
const app = express()
const port = 3001
const bodyParser = require('body-parser')


//connect to database
database.connect()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
//use passport to login authentication
app.use(session({
  secret : "secret",
  saveUninitialized: true,
  resave: true,
}))
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
//End passport to  login authentication

app.use(express.static(path.join(__dirname,'public')))
app.use(morgan('combined'))
Authentication(passport)

app.engine(
  'handlebars',
   handlebars({
     helpers:{
       sum:function(a,b){
         return a + b
       },
       sums:function(a,b,c,d){ 
        return a + b + c + d
        },
       formatmoney:function(value){
        value = value.toString()
        return(
          value.split('').reverse().reduce(function(totalValue,nextValue,currentIndex){
            if(currentIndex % 3){
              return nextValue + totalValue
            }
            else{
              return (nextValue + '.') + totalValue
            }
          })) + ' đ'
       },
       formatDate:function(value){
         value = value.toLocaleString()
         return(
           value
           .split(',').reverse()
          //  .replace(/\..+/,' ')
          //  .slice(0,-4).split(' ').reduce(function(String,nextString,currentIndex){
          //     return (String.split('-').reverse().join().replace(/,/g,'-') + ' ' + nextString).split(' ').reverse().join().replace(/,/,' | ')
          //  })
         )
       },
       sumArr:function(a,b){
        var  arr = []
        arr.push(a)
        arr.push(b)
        return arr
       }
     }
     
   })
   )
app.set('view engine', 'handlebars')
app.set('views',path.join(__dirname,'views'))

//Routes for user
UserRoutes(app)
//Routes for admin
AdminRoutes(app)
require('./middleware/CheckIsAdmin')

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`)
})

