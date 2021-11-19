const passport = require('passport')
const bcrypt = require('bcrypt')
const LocalStrategy = require('passport-local').Strategy
const Admins = require('../models/AdminArea/Admins')
const Users = require('../models/UserArea/Users')
var flash = require("connect-flash")

function Authenticate(passport){
    
    passport.use('Admin',new LocalStrategy({usernameField:'adminname'},function(adminname,password,done){ 
        Admins.findOne({adminname:adminname},function(err,admin){
            if(err){
                return done(err)
            }
            if(!admin){
                return done(null,false)
            }
            else{
                bcrypt.compare(password,admin.password,function(err,result){
                    if(err) return done(err)
                    if(!result){
                        return done(null,false)
                    }
                    return done(null,admin)
                })
            }
        })
    }))
    passport.use('User',new LocalStrategy({
        passReqToCallback : true
    },function(req,username,password,done){ 
        Users.findOne({username:username},function(err,user){
            if(err){
                return done(err)
            }
            if(!user){
                return done(null,false,
                    req.flash('errUsername','Tên đăng nhập không tồn tại !'),
                    req.flash('userinput',req.body.username),
                    req.flash('passinput',req.body.password)
                )
            }
            else{
                bcrypt.compare(password,user.password,function(err,result){
                    if(err) return done(err)
                    if(!result){
                        return done(null,false,
                            req.flash('errPassword','Mật khẩu không chính xác !'),
                            req.flash('userinput',req.body.username),
                            req.flash('passinput',req.body.password)
                        )
                    } 
                    return done(null,user)
                })
            }
        })
    }))

    passport.serializeUser(function(user, done){
        done(null, { 
            id: user.id, 
            name: user.adminname || user.username, 
            type: user.type 
        })

    });

    passport.deserializeUser(function(user,done){
        switch(user.type){
            case 'Admin':
                Admins.findById(user.id)
                .then(function(user){
                    done(null, user);
                })
                .catch(function(err){
                    done(new Error('Admin id not found:' + user.id, null));
                })  
                break
            case 'User':
                Users.findById(user.id)
                .then(function(user){
                    done(null, user);
                })
                .catch(function(err){
                    done(new Error('Admin id not found:' + user.id, null));
                })  
            break
            default:
                done(new Error('No type:', user.type), null);
                break;
        }
    })

}

module.exports = Authenticate