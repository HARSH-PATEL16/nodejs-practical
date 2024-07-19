const User = require('../Database/Models/user.model');

class userController {
    async signUp(req, res) {
        let abc = {
            first_name:"harsh",
            last_name:"C",
            username:"hc",
            email:"abc",
            password:"dfdf"
        }

        await User.create(abc)
    }
}

module.exports = userController;