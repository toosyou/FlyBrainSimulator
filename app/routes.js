// app/routes.js

var fs = require('fs');
var express = require('express');
var request = require('request'); 
module.exports = function(app, passport) {

    // ���� ===============================

	app.get('/main', isLoggedIn, function(request, response){ //�ڭ̭n�B�zURL�� "/" ��HTTP GET�ШD
		var path = '/../index.html';
		
		 response.render("index.ejs", { name: request.user.local.email });
		/*
		fs.readFile(__dirname + path, function(error, data){
			response.writeHead(200, {"Content-Type": "text/html"});
			response.write(data, "utf8");
			response.send('<p id="c">' + request.user.local.email + '</p>');
			console.log(request.user.local.email);
			//socket.emit('user_id',request.user.local.email);
			response.end();
		});*/
		
	});

    // �n�J��
    app.get('/', function(request, response) {
	
		response.render('index.ejs'); 
	/*
		var path = '/../login.html';
		fs.readFile(__dirname + path, function(error, data){
			response.writeHead(200, {"Content-Type": "text/html"});
			response.write(data, "utf8");
	response.end();
	});*/
    });

    // �B�z�n�J
    app.post('/', passport.authenticate('local-login', {
        successRedirect : '/main', // ���\�h�ɤJmain
        failureRedirect : '/',   // ���ѫh��^�n�J�� 
        failureFlash : true // ���\ flash �T��
    }));

    // �n�X��
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });
	
	//--------��L���}---------------------
	app.get('/node_modules/*',function(request, response){ 
		var path = '/..'+request.url;
		fs.readFile(__dirname + path, function(error, data){
			//response.writeHead(200, {"Content-Type": "text/html"});
			response.write(data, "utf8");
			response.end();
		});
		
	});

  // �j�w���a�b�� --------------------------------
	app.get('/connect/local', isLoggedIn, function(req, res) {
		res.render('connect-local.ejs', { message: req.flash('loginMessage') });
	});
	app.post('/connect/local', isLoggedIn, passport.authenticate('local-connect', {
		successRedirect : '/profile', // redirect to the secure profile section
		failureRedirect : '/connect/local', // redirect back to the signup page if there is an error
		failureFlash 	: true // allow flash messages
	}));

    // ���U���
    app.get('/signup', function(request, response) {
		response.render('signup.ejs',{ message: request.flash('signupMessage') }); 
    });

    // �B�z���U
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/main', // redirect to the secure profile section
        failureRedirect : '/signup', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

    // PROFILE =====================
    // �ݭn�v���~��y�X�������ڭ̴N�� isLoggedIn function �ӳB�z
    app.get('/profile', isLoggedIn, function(req, res) {
        res.render('profile.ejs', {
            user : req.user 
        });
    });
	// �b���Ѱ��j�w =============================================================
	// ���s�b��, �u����token�H��K���n���s�j�w
	// ���a�b���h�|����email & password
	
    // ���a�b�� -----------------------------------
    app.get('/unlink/local', function(req, res) {
        var user            = req.user;
        user.local.email    = undefined;
        user.local.password = undefined;
        user.save(function(err) {
            res.redirect('/profile');
        });
    });

    // facebook -------------------------------
    app.get('/unlink/facebook', function(req, res) {
        var user            = req.user;
        user.facebook.token = undefined;
        user.save(function(err) {
            res.redirect('/profile');
        });
    });

   
    // �n�X ==============================
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });
};

// �B�z�v��
function isLoggedIn(req, res, next) {
	  if (req.isAuthenticated())
        return next();
    res.redirect('/');
}

function loggedInRedirect(req, res, next) {
	  if (!req.isAuthenticated())
        return next();
    res.redirect('/main');
}