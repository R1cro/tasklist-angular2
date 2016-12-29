var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('mongodb://r1cro:12345qazWSX@ds161295.mlab.com:61295/mytasklist_r1cro', ['tasks']);

//GET ALL
router.get('/tasks', function(req, res, next){
    db.tasks.find(function(err, tasks){
        if(err){
            res.send(err);
            console.log(err);
        }
        res.json(tasks);
    });
});

//GET SINGLE
router.get('/task/:id', function(req, res, next){
    db.tasks.findOne({_id: mongojs.ObjectId(req.params.id)}, function(err, task){
        if(err){
            res.send(err);
            console.log(err);
        }
        res.json(task);
    });
});

//POST task
router.post('/task', function(req,res,next){
    var task = req.body;
    if(!task.title || !(task.completed + '')){
        res.status(400);
        res.json({
            "error": "Bad Data!"
        });
    } 
    else {
        db.tasks.save(task, function(err, task){
            if(err){
                res.send(err);
                console.log(err);
            }
            res.json(task);
        });
    }

});

//DELETE task
router.delete('/task/:id', function(req, res, next){
    db.tasks.remove({_id: mongojs.ObjectId(req.params.id)}, function(err, task){
        if(err){
            res.send(err);
            console.log(err);
        }
        res.json(task);
    });
});

//UPDATE task
router.put('/task/:id', function(req, res, next){
    var task = req.body;
    var updTask = {};
    
    if(task.completed){
        updTask.completed = task.completed;
    }
    
    if(task.title){
        updTask.title = task.title;
    }
    
    if(!updTask){
        res.status(400);
        res.json({
            "error":"Bad Data"
        });
    } else {
        db.tasks.update({_id: mongojs.ObjectId(req.params.id)},updTask, {}, function(err, task){
        if(err){
            res.send(err);
        }
        res.json(task);
    });
    }
});

module.exports = router;