import express from "express";
import {
    normaltest,
    create,
    getallusers,
    getuserbyid,
    updatebyid,
    deletebyid,
    login
} from "../Controller/UserController.js";
import { authenication } from "../Authenication/UserAuthenication.js";

const route = express.Router();

route.get('/normaltest', normaltest);
route.post('/create', create);
route.post('/login', login);
route.get('/getallusers', authenication, getallusers);
route.get('/getbyid/:id', authenication, getuserbyid);
route.put('/updatebyid/:id', authenication, updatebyid);
route.delete('/deletebyid/:id', authenication, deletebyid);

export default route;
