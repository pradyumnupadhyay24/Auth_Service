const express = require('express');

const { PORT } = require('./config/server-config');

const bodyParser = require('body-parser');

const apiRoutes = require('./routes/index')
const app = express();

// const {User} = require('./models/index');
// const bcrypt = require('bcrypt');

// const UserRepository = require('./repository/user-repository');

const prepareAndStartServer = () => {


    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));

    app.use('/api', apiRoutes)



    app.listen(PORT, async () => {
        console.log(`Server Started on Port: ${PORT}`);


        // const incomingpassword = '24680890';
        // const user = await User.findByPk(6);
        // const response = bcrypt.compareSync(incomingpassword, user.password);
        // console.log(response);

        // const repo = new UserRepository();
        // const response = await repo.getById(1);
        // console.log(response);
    });
}   

prepareAndStartServer();