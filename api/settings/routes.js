'use strict'
const {upload}  = require('../multer.js');

module.exports = (app) => {
    const passport = require('passport')
    const usersController = require('../Controller/UsersController.js')


    app
        .route('/register')
        .post(usersController.signup)

    app
        .route('/login')
        .post(usersController.signin)
    
    app
        .route('/cards_add')
        .post(upload.single('image'),usersController.cards_create);
    
    app    
        .route('/cards_get')
        .get(usersController.cards_get);

    app
        .route('/cards_edit/:id')
        .post(upload.single('image'),usersController.cards_edit)

    app    
        .route('/cards_del/:id')
        .get(usersController.cards_del);
}