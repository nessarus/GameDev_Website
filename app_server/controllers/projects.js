var mongoose = require("mongoose");
require("../models/db")
require("../models/Project");

var Project = mongoose.model('Project');

//Project List
module.exports.prjList = index;
function index(req, res, next){
    // if user is not logged-in redirect back to login page //
    if (req.user == null){
        res.redirect('/login');
    }
    Project.find({members:req.user.username}).exec(
        function(err, data){
            if(err){
                res.render('error', {
                    message:err.message,
                    error:err
                })
            }else{
                console.log('Find complete');

                res.render('projects', {
                    title: 'My Projects', projects:data, user:req.user});
                    
            }
        }
    )
}

//My Projects page
module.exports.myProject = function(req, res){
    if (req.user == null){
        res.redirect('/login');
    }
    Project.findOne({_id:req.params.id},
        function(err, data){
            if(err){
                res.render('error', {
                    message:err.message,
                    error:err
                })
            }else{
                console.log('Find complete');
                res.render('template_project.pug', { 
                    user : req.user, 
                    title : data.title,
                    project : data
                });
            }
        }
    );
}

//invite new members
module.exports.invite = function(req, res, next){
    Project.update({_id:req.params.id}, {$push: {members:req.body.member}}, function(err,data){
        if(err){
            console.log(err);
            res.status(500);
            res.render('error',{
                message:err.message,
                error:err
            });
        }else{
            console.log(data, 'invited');
            res.redirect('/projects/'+req.params.id);
        }
    });   
}

//New Project page
module.exports.prjCreate = pCreate;
function pCreate(req, res, next){
    if (req.user == null){
        res.redirect('/login');
    }
    res.render('new_project', {
        title: 'Create New Project', user:req.user
    });
}
module.exports.prjCre = function(req, res, next){
    var newProject = new Project({
        title: req.body.title,
        description: req.body.description, 
        leader: req.user.username,
        members: [req.user.username]
    });
    newProject.save(function(err,data){
        if(err){
            console.log(err);
            res.status(500);
            res.render('error',{
                message:err.message,
                error:err
            });
        }else{
            console.log(data, ' saved');
            res.redirect('/projects');
        }
    });
}
module.exports.delPrj = function(req, res, next){    
    Project.remove({_id:req.params.id}, function(err,data){
        if(err){
            console.log(err);
            res.status(500);
            res.render('error',{
                message:err.message,
                error:err
            });
        }else{
            console.log(req.params.id, ' removed');
            res.redirect('/projects');
        }
    });   
}

// Edit project page
module.exports.editProject = function(req, res, next){
    if (req.user == null){
        res.redirect('/login');
    }
    Project.findOne({_id:req.params.id},
        function(err, data){
            if(err){
                res.render('error', {
                    message:err.message,
                    error:err
                })
            }else{
                console.log('Find complete');
                res.render('edit_project_details', {
                    title: 'Edit Project Details',  
                    user : req.user, 
                    project : data
                });
            }
        }
    );
}
module.exports.editPrj = function(req, res, next){    
    Project.update({_id:req.params.id}, 
        {
            $set: {
                title: req.body.title,
                description: req.body.description, 
            }
        },
        function(err,data){
            if(err){
                console.log(err);
                res.status(500);
                res.render('error',{
                    message:err.message,
                    error:err
                });
            }else{
                console.log(req.params.id, ' set');
                res.redirect('/projects');
            }
        }
    );   
}

// Tasks
module.exports.newTask = function(req, res, next){
    var newTask = {
        title: req.body.title,
        description: req.body.description,
        importance: req.body.importance,
        deadline: req.body.deadline
    };
    Project.update({_id:req.params.id}, {$push: {tasks:newTask}}, function(err,data){
        if(err){
            console.log(err);
            res.status(500);
            res.render('error',{
                message:err.message,
                error:err
            });
        }else{
            console.log(data, ' saved');
            res.redirect('/projects/'+req.params.id);
            index(req,res,next);
        }
    });   
}
module.exports.delTask = function(req, res, next){
    Project.findOne({_id: req.params.pid}, function(err, data){
        if(err){
            console.log(err);
            res.status(500);
            res.render('error',{
                message:err.message,
                error:err
            });
        }else{
            //console.log(data.tasks);
            data.tasks.id(req.params.tid).remove();
            data.save( function(err,data){
                if(err){
                    console.log(err);
                    res.status(500);
                    res.render('error',{
                        message:err.message,
                        error:err
                    });
                }else{
                    //data.tasks.id(req.params.tid).remove();
                    console.log(req.params.tid, 'of', req.params.pid, ' removed');
                    res.redirect('/projects/'+req.params.pid);
                }
            });   

        }
    });
}
