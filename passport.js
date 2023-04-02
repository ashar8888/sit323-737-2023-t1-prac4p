const passport = require('passport');
const passportJWT = require('passport-jwt');
const ExtractJWT = passportJWT.ExtractJwt;
const JWTStrategy = passportJWT.Strategy;
const jwtSecret = 'your_jwt_secret';

passport.use(new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey   : jwtSecret
}, function (jwtPayload, done) {
    // validate the JWT payload and check if the user is authorized to access the resource
    return done(null, jwtPayload);
}));

const token = jwt.sign({ username: 'user' }, jwtSecret);
fetch('http://localhost:3000/protected', {
    headers: { Authorization: `Bearer ${token}` }
})
.then(res => res.json())
.then(data => console.log(data))
.catch(err => console.error(err));