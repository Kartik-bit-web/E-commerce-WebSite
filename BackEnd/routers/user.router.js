import { Router } from "express";
import connections from "../index.js";
import registeration_user from "../controllers/users_Authentication/registeration_user.controller.js";
import login_user from "../controllers/users_Authentication/login_user.controllers.js";
import code from "../controllers/users_Authentication/code_confirmation.js";
// import AuthGoogle from "../controllers/users_Authentication/Auth_google.js";

// import session from "express-session";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import{ Strategy as GithubStrategy} from 'passport-github';

const route = Router();


passport.use(new GoogleStrategy({
    clientID: '',
    clientSecret: '',
    callbackURL: 'http://127.0.0.1:3000/google'
}, async (accessToken, refreshToken, profile, done) => {
    // console.log("app.js: ", profile._json.picture)
    await connections.query(`SELECT userId, name FROM authgoogleuser WHERE userId = '${profile._json.sub}' `, 
    async (err, result) => {
        if(err){
            return err;
        }
        if(result.length > 0){
            return console.log("Logged In From here: ", result[0])
        }
        else{
            let sql = `INSERT INTO authgoogleuser (name, userId, avatar) values(?, ?, ?)`
            let values = [profile._json.name, profile._json.sub, profile._json.picture]
            await connections.query(sql, values, (err)=> {
                if(err){
                    return console.log(err);
                }
                return console.log('Inserted New User')
            })
        }
    })
    done(null, profile);
}))

//GitHub Passport 
passport.use(new GithubStrategy({
    clientID: '',
    clientSecret: '',
    callbackURL: 'http://127.0.0.1:3000/github'
}, async (accessToken, refreshToken, profile, done) => {
    await connections.query(`SELECT userId, name FROM authgithub_user WHERE userId = '${profile._json.id}' `, 
    async (err, result) => {
        if(err){
            return err;
        }
        if(result.length > 0){
            return console.log("Logged In From here: ", result[0])
        }
        else{
            let sql = `INSERT INTO authgithub_user (name, userId, avatar) values(?, ?, ?)`
            let values = [profile._json.name, profile._json.id, profile._json.avatar_url]
            await connections.query(sql, values, (err)=> {
                if(err){
                    return console.log(err);
                }
                return console.log('Inserted New User')
            })
        }
    })
    done(null, profile)
}))

passport.serializeUser((user, done) => {
    done(null, user)
});
passport.deserializeUser((user, done) => {
    done(null, user)
})

//Using classic and JWT Token base Registeration
route.route('/registeration').post(registeration_user);
route.route('/login').post(login_user);
route.route('/code_confirmation').post(code);

// Aur Login As Auth
route.route('/login_google').get(passport.authenticate("google", {scope: ['profile']}))
route.route('/google').get(passport.authenticate("google", {
    successRedirect: '/main',
    failureRedirect: '/login'
}));

//Auth GitHub 
route.route('/login_github').get(passport.authenticate("github", {scope: ['profile']}));
route.route('/github').get(passport.authenticate("github", {
    successRedirect: '/main',
    failureRedirect: '/login'
}))

export default route;