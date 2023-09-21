const express = require('express');

const { PORT } = require('./config/server-config');

const db = require('./models/index');
const bodyParser = require('body-parser');

const apiRoutes = require('./routes/index')
const app = express();

const prepareAndStartServer = () => {

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));

    app.use('/api', apiRoutes)

    app.listen(PORT, async () => {
        console.log(`Server Started on Port: ${PORT}`);
        if(process.env.DB_SYNC) {
            db.sequelize.sync({alter: true});
        }

    
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