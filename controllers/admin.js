const passport = require('passport');

module.exports = {
    login: (req, res) => {
        if(req.isAuthenticated()) return res.redirect('/admin');
        res.sendFile('login.html', { root: './public/html' });
    },
    plogin: (req, res) => {
        passport.authenticate('local', (err, user) => {
            if(err) return res.redirect('/login?error=0');
            if(!user) return res.redirect('/login?error=1');
            req.login(user, (err) => {
                if(err) return res.redirect('/login?error=0');
                return res.redirect('/admin');
            });
        })(req, res);
    },
    home: (req, res) => {
        res.render('admin', {});
    },
    logout: (req, res) => {
        req.logout((err) => {
            if(err) logger.error(`User logout error`);
        });
        res.redirect('/login');
    }
};