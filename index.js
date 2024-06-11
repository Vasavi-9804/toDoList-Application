const express = require('express'); 
const bodyParser = require('body-parser');
const app = express();

const PORT =3000;

taskList = ["Intern Case study meet","Intern daily meet","DSA notes revise","SOC videos"]; //default to do
app.use(bodyParser.text());                    //to parse the incoming request into a text format (while adding a new todo)
app.get('/todos',(request,response)=>{
    // console.log("ping received");
    response.set('Content-Type','text/plain'); //set the type of response received by the client
    response.send(taskList.join('\n'));
}); //sending all todos 


app.get('/todos/:id',(request,response) => {
    let param  = request.params;
    let id = parseInt(param.id,String);         //converting to int format to use as index in the array
    response.set('Content-Type','text/plain');  //set the type of response received by the client
    response.send(taskList[id]);
}); // sending the required todo



app.post('/todos',(request,response)=>{
    let body = request.body;
    // console.log(body);
    taskList.push(body);
    console.log(taskList);
    response.set('Content-Type','text/plain');
    response.send('New todo added');
})  // getting the text from the post request to add a new todo

app.delete('/todos/:id',(request,response)=>{
    let params = request.params;
    const id = parseInt(params["id"],String);
    response.set('Content-Type','text/plain');
    if(id >= taskList.length || id<0){
        response.send('Element with this id does not exist');
    }else{
        taskList.splice(id,1);
        response.send('Required todo deleted');
        // console.log(taskList);
    } // checking edge cases of requested  id
}) // delete the required todo (id mentioned)

// to update a todo we require its id and string to be replaced 
// it can be done through the query params or again using body-param (sending as a json )
// doing with query params
app.patch('/todos',(request,response)=>{
    let queryparams = request.query;
    for(let id in queryparams){
        taskList[parseInt(id,String)]=queryparams[id];
    }
    response.set('Content-Type','text/plain');
    response.send('Required todos UPDATED');
    console.log(taskList);

})
//updates the taskList with required changes
app.listen(PORT, ()=>{
    console.log(
        'server started at port 3000'
    )
});

