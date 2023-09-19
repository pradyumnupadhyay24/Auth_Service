const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const UserRepository = require('../repository/user-repository');

const { JWT_KEY } = require('../config/server-config');

class UserService {
    constructor() {
        this.userRepository = new UserRepository();
    }

    async create(data) {
        try {
            const user = await this.userRepository.create(data);
            return user;
        } catch (error) {
            console.log("Something went wrong in the service layer");
            throw error;
        }
    }

    async signIn(email ,plainpassword) {
        try{
             // step 1 => fetchimng the user using the email 
             const user = await this.userRepository.getByEmail(email);
             
             //step 2 => Camparing the plainpasswordwith the storedencrypted password
             const passwordMatch = this.checkPassword(plainpassword, user.password);

             if (! passwordMatch) {
                console.log('password mismatch');
                throw  {error :'password mismatc'};
             }         
             //step3 => If password matches create the token

             const newJwt = this .createToken({email:user.email, id:user.id});
             return newJwt;
            
        } catch (error) {
            console.log("Something went wrong in the service layer");
            throw error;
        }




    }        
    createToken(user) {
        try {
            const result = jwt.sign(user, JWT_KEY, {expiresIn: '1d'});
            return result;
        } catch (error) {
            console.log("Something went wrong in token creation");
            throw error;
        }
        
    }
    verifyToken(token) {
    try {
            const response = jwt.verify(token, JWT_KEY);
            return response;
        } catch (error) {
             console.log("Something went wrong in token validation", error);
             throw error;
         }
    }
    checkPassword(userInputPlainPassword, encryptedPassword) {
        try {
            return bcrypt.compareSync(userInputPlainPassword, encryptedPassword);
        } catch (error) {
            console.log("Something went wrong in password comparison");
            throw error;
        }
    }
}

module.exports = UserService;