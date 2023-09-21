const express = require('express');

const { PORT } = require('./config/server-config');

const db = require('./models/index');
const bodyParser = require('body-parser');

const apiRoutes = require('./routes/index')
const app = express();

const {User ,Role} = require('./models/index')
// const UserRepository = require('./repository/user-repository');

const prepareAndStartServer = () => {


    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));

    app.use('/api', apiRoutes)



    app.listen(PORT, async () => {
        console.log(`Server Started on Port: ${PORT}`);
        if(process.env.DB_SYNC) {
            db.sequelize.sync({alter: true});
        }
        // for checking that the users and roles association
        const u1 = await User.findByPk(5);
        const r1 = await Role.findByPk(1);
        // u1.addRole(r1);
        const response=  await r1.hasUser(u1);
        console.log(response);




        
        // const incomingpassword = '24680890';
        // const user = await User.findByPk(6);
        // const response = bcrypt.compareSync(incomingpassword, user.password);
        // console.log(response);

        // const repo = new UserRepository();
        // const response = await repo.getById(1);
        // console.log(response);
        //creating the token
        //
        // const newToken = service.createToken({email: 'noor@gmail.com', id: 1});
        // console.log("new token is", newToken)

        //verifying token
            
    });
}   

prepareAndStartServer();