const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
let users = [{ id: 1, username: 'moderator', password: 'hello' }, { id: 2, username: 'admin', password: 'admin' }]; // Example user

passport.use(new LocalStrategy((username, password, done) => {
    const user = users.find(u => u.username === username);
    if (!user) return done(null, false, { message: 'Incorrect username.' });
    if (password == user.password) return done(null, user);
    return done(null, false, { message: 'Incorrect password.' });
}));
passport.serializeUser((user, done) => {
    done(null, user.id);
});
passport.deserializeUser((id, done) => {
    const user = users.find(u => u.id === id);
    done(null, user);
});

module.exports = passport;