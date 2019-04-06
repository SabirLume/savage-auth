 module.exports = function(app, passport, db) {

// normal routes ===============================================================

    // show the home page (will also have our login links)
    app.get('/', function(req, res) {
        res.render('index.ejs');
    });

    // PROFILE SECTION =========================
<<<<<<< HEAD
    app.get('/notesPage', isLoggedIn, function(req, res) {
        db.collection('documents').find().toArray((err, result) => {
=======
    app.get('/profile', isLoggedIn, function(req, res) {
        db.collection('notes').find().toArray((err, result) => {
>>>>>>> e31e64d5eb37968faa5c0ddcc3a04a0439b5313b
          if (err) return console.log(err)
          res.render('notesPage.ejs', {
            user : req.user,
<<<<<<< HEAD
            translation: result
=======
            notes: result
>>>>>>> e31e64d5eb37968faa5c0ddcc3a04a0439b5313b
          })
        })
    });

    // LOGOUT ==============================
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

// message board routes ===============================================================
<<<<<<< HEAD
    //OCR software is suppose to output text into words. These words should be saved to database
    app.post('/translation', (req, res) => {
      db.collection('documents').save({ text: req.body.text}, (err, result) => {
=======

    app.post('/notes', (req, res) => {
      db.collection('notes').save({msg: req.body.msg, thumbUp: 0}, (err, result) => {
>>>>>>> e31e64d5eb37968faa5c0ddcc3a04a0439b5313b
       console.log(req.body)
        if (err) return console.log(err)
        console.log('saved to database')
        res.redirect('/profile')
      })
    })
<<<<<<< HEAD
    //able to edit text that was translated by the OCR software
    app.put('/translation', (req, res) => {
      db.collection('documents')
      .findOneAndUpdate({ text: req.body.text}, {
        $set: {
          translation:req.body.translation
=======

    app.put('/notes', (req, res) => {
      db.collection('notes')
      .findOneAndUpdate({msg: req.body.msg}, {
        $set: {
          thumbUp:req.body.thumbUp +1
>>>>>>> e31e64d5eb37968faa5c0ddcc3a04a0439b5313b
        }
      }, {
        sort: {_id: -1},
        upsert: true
      }, (err, result) => {
        if (err) return res.send(err)
        res.send(result)
      })
    })
<<<<<<< HEAD
    //delete the translations from your account.
    app.delete('/translation', (req, res) => {
      db.collection('documents').findOneAndDelete({ text: req.body.text}, (err, result) => {
=======

    app.delete('/notes', (req, res) => {
      db.collection('notes').findOneAndDelete({msg: req.body.msg}, (err, result) => {
>>>>>>> e31e64d5eb37968faa5c0ddcc3a04a0439b5313b
        if (err) return res.send(500, err)
        res.send('Message deleted!')
      })
    })

// =============================================================================
// AUTHENTICATE (FIRST LOGIN) ==================================================
// =============================================================================

    // locally --------------------------------
        // LOGIN ===============================
        // show the login form
        app.get('/login', function(req, res) {
            res.render('login.ejs', { message: req.flash('loginMessage') });
        });

        // process the login form
        app.post('/login', passport.authenticate('local-login', {
            successRedirect : '/notesPage', // redirect to the secure profile section
            failureRedirect : '/login', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
        }));

        // SIGNUP =================================
        // show the signup form
        app.get('/signup', function(req, res) {
            res.render('signup.ejs', { message: req.flash('signupMessage') });
        });

        // process the signup form
        app.post('/signup', passport.authenticate('local-signup', {
            successRedirect : '/notesPage', // redirect to the secure profile section
            failureRedirect : '/signup', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
        }));

// =============================================================================
// UNLINK ACCOUNTS =============================================================
// =============================================================================
// used to unlink accounts. for social accounts, just remove the token
// for local account, remove email and password
// user account will stay active in case they want to reconnect in the future

    // local -----------------------------------
    app.get('/unlink/local', isLoggedIn, function(req, res) {
        var user            = req.user;
        user.local.email    = undefined;
        user.local.password = undefined;
        user.save(function(err) {
            res.redirect('/profile');
        });
    });

};

// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();

    res.redirect('/');
}
