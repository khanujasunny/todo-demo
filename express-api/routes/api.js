var express = require('express'); 
var router = express.Router();

const todoList = [
  {name: "Withdraw cash", addedDate: (new Date()).getTime()},
  {name: "Buy chicken", addedDate: (new Date()).getTime()},
  {name: "Get curd", addedDate: (new Date()).getTime()},
  {name: "Cook biryani", addedDate: (new Date()).getTime()},
  {name: "Have lunch", addedDate: (new Date()).getTime()}
];

Array.prototype.deleteObject = function(obj){
  for(let i=0;i<this.length;i++){
    if(this[i].name === obj.name && this[i].addedDate === obj.addedDate){
      this.splice(i,1);
      return true;
      break;
    }
  }
 return false; 
}

router.get('/', function(req, res, next) {
  res.send({ success: true, data: "API is running!" });
});

router.get('/todo', function(req, res, next) {
  res.send({ success: true, data: todoList });
});

router.post('/todo', function(req, res, next) {
  let response = { success: false, data: null };
  if(req.body && req.body.todo) {
    let todo = { name: req.body.todo, addedDate: (new Date()).getTime()};
    todoList.push(todo);
    response.success = true;
    response.data = todo;
    res.send(response);
  } else {
    response.data = "Sorry, no todo to add!";
    res.send(response);
  }
});

router.delete('/todo', function(req, res, next) {
  let response = { success: false, data: null };
  response.success = false;
  if(req.body && req.body.name && req.body.addedDate) {
    if(todoList.deleteObject(req.body)){
      response.success = true;
      response.data = req.body;
      res.send(response);
    }else{
      response.data = `Todo '${req.body.name}' not found!`;
      res.send(response);
    }
  } else {
    response.data = "Sorry, no todo to delete!";
    res.send(response);
  }
});


module.exports = router;
