const routes = require('express').Router();
const contactsController = require('./contacts'); 

routes.use('/', require('./swagger'));
routes.use('/contacts', contactsController); 

routes.use('/', (req, res, next) => {
    req.docData = {
        documentationURL: 'https://github.com/sterlingt22/contacts_project.git',
    };
    next();
});

module.exports = routes;
