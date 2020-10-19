const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const User = require('../models/userSchema');
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
// const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(
  new LocalStrategy(
    { usernameField: 'email', passwordField: 'password', session: false },
    (email, password, done) => {
      User.findOne({ 'userInfo.email': email }, (err, user) => {
        if (err) {
          return done(err);
        }

        if (!user) {
          return done(null, false, { message: 'Incorrect username.' });
        }

        console.log(user);

        bcrypt.compare(password, user.userInfo.password).then((res) => {
          if (res) return done(null, user);

          return done(null, false, { message: 'Incorrect password.' });
        });
      });
      // done(null, email);
    }
  )
);

passport.use(
  new JWTstrategy(
    {
      secretOrKey: process.env.JWT_SECRET,
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    },
    async (token, done) => {
      try {
        // console.log('token:', token.user.email);
        // console.log(token);
        User.findOne({ 'userInfo.email': token.user.email }, (err, user) => {
          if (err) {
            console.log(err);
            return done(null, false, { message: err.message });
          }

          return done(null, user);
        });
      } catch (error) {
        done(error);
      }
    }
  )
);

// passport.use(
//   new GoogleStrategy(
//     {
//       clientID: oAuthKeys.web.client_id,
//       clientSecret: oAuthKeys.web.client_secret,
//       callbackURL: '/real-estate-281401/us-central1/app/auth/google/redirect',
//     },
//     (accessToken, refreshToken, profile, done) => {
//       // console.log('access token: ', accessToken);
//       // console.log(profile);
//       db.collection('users')
//         .where('googleID', '==', profile._json.sub)
//         .get()
//         .then((snapshot) => {
//           // check if user exists
//           if (!snapshot.empty) {
//             let user = { id: snapshot.docs[0].id, ...snapshot.docs[0].data() };
//             console.log('user exists:', user);
//             done(null, user);
//           } else {
//             let user = {
//               username: '',
//               password: '',
//               googleID: profile._json.sub,
//               firstName: profile._json.given_name,
//               lastName: profile._json.family_name,
//               email: profile._json.email,
//               picURL: profile._json.picture,
//             };
//             // add new user
//             db.collection('users')
//               .add(user, { merge: true })
//               .then((data) => {
//                 console.log('new user created:', data);
//                 user.id = data.id;
//                 done(null, user);
//               });
//           }
//         });
//     }
//   )
// );
