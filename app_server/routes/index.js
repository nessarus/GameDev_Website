var express = require('express');
var ctrlProjects = require('../controllers/projects');
var ctrlAcc = require('../controllers/account');
var ctrlChat = require('../controllers/chat');
var router = express.Router();

/* GET home page. */
router.get('/', ctrlAcc.welcome);
router.get('/register', ctrlAcc.register);
router.post('/register', ctrlAcc.regist);
router.get('/profile', ctrlAcc.profile);
router.post('/profile', ctrlAcc.prof);
router.get('/projects', ctrlProjects.prjList);
router.get('/chat', ctrlAcc.chat);
router.get('/about', ctrlAcc.about);


router.get('/projects', ctrlProjects.prjList);
router.get('/new_project', ctrlProjects.prjCreate);

router.get('/delete/:id', ctrlProjects.delPrj);
//router.get('/:id/', ctrlProjects.taskList);
router.post('/:id/new', ctrlProjects.newTask);
router.get('/:pid/delete/:tid', ctrlProjects.delTask);

//router.get('/register', ctrlAcc.register);

router.get('/login', ctrlAcc.loginForm);
router.post('/login', ctrlAcc.login);
router.get('/logout', ctrlAcc.logout);

module.exports = router;
