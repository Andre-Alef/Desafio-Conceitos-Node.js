const express = require("express");
const cors = require("cors");
//const { uuid } = require("uuid")
 const { v4: uuid, validate: isUuid } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  // TODO
  
  return response.status(200).json(repositories);


});

app.post("/repositories", (request, response) => {
  
  const {title, url, techs} = request.body
  
  const repository = {
    id: uuid(),
    title: title,
    url: url,
    techs: techs,
    likes: 0,
  } 

  repositories.push(repository)

  return response.json(repository)

});

app.put("/repositories/:id", (request, response) => {
      const {id} = request.params;
      const {title, url, techs} = request.body;
      
      const repositoryIndex = repositories.findIndex(repository => repository.id === id);

      if(repositoryIndex < 0){
        return response.status(400).json({error:'Repository not found'})
      }
      const likes = repositories[repositoryIndex].likes
      const Repository = {
        id,
        title,
        url,
        techs,
        likes
      }  

      repositories[repositoryIndex] = Repository;

      return response.json(Repository);
});

app.delete("/repositories/:id", (request, response) => {

  const {id} = request.params;

  const repositoryIndex = repositories.findIndex(repository => repository.id === id)
  
  if(repositoryIndex < 0){
    return response.status(400).json({error:'Repository not found'})
  }

  repositories.splice(repositoryIndex, 1)

  return response.status(204).send()
});

app.post("/repositories/:id/like", (request, response) => {
  
      const {id} = request.params;
      const {method} = request;
      const body = request.body;
     


      const repositoryIndex = repositories.findIndex(repository => repository.id === id);
      const Repository = repositories.find(repository => repository.id === id);
      if(repositoryIndex < 0){
        return response.status(400).json({error:'Repository not found'})
      }
      
     console.log(method)
      if(method !== 'POST'){
        return response.status(400).json({error:'should not be able to update repository likes manually'})
      }
      
      
      
      if(body.constructor === Object && Object.keys(body).length === 0) {
       
      Repository.likes = Repository.likes + 1;
            
      repositories[repositoryIndex] = Repository;
      }


      return response.json(Repository);

});

module.exports = app;
