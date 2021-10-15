import 'reflect-metadata'
import './database'
import { app } from './app'

app.listen(3333, ()=> {
    console.log("!!Live on http://localhost:3333!!")
})