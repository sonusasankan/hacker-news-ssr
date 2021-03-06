
import 'babel-polyfill';
import express from 'express';
import renderer from './helpers/renderer';
import createStore from './helpers/createStore';
import { matchRoutes } from 'react-router-config';
import Routes from './client/Routes';

const port = process.env.PORT || 3000;

const app = express();

app.use(express.static('public'))
app.get('*', (req, res) => {

  const store = createStore()

   const promises = matchRoutes(Routes, req.path).map(({route}) => {
     return route.loadData ? route.loadData(store) : null;
   });

   Promise.all(promises).then(()=>{
     res.send(renderer(req, store))
   })

})

app.listen(port, ()=>{
    console.log('Listening on port 3000')
})