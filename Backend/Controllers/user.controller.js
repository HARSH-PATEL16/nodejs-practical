const user = require('../Database/Models/user.model');
const userToken = require('../Database/Models/user_token.model');
const { MESSAGES, STATUS } = require('../status_messages');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

class userController {

    // Signup
    async signUp(req, res) {
        try {
            let bodyData = req?.body;
            let checkEmail = await user.findOne({
                where: {
                    email: bodyData?.email
                }
            })

            if (checkEmail) {
                res.status(403).send({ Message: MESSAGES.VALIDATION_MESSAGES.EMAIL });
            }

            if (!bodyData?.password) {
                res.status(403).send({ Message: MESSAGES.VALIDATION_MESSAGES.PASSWORD })
            }

            if (!bodyData?.confirm_password) {
                res.status(403).send({ Message: MESSAGES.VALIDATION_MESSAGES.CONFIRM_PASSWORD })
            }

            if (bodyData?.password !== bodyData?.confirm_password) {
                res.status(403).send({ Message: MESSAGES.VALIDATION_MESSAGES.NOT_SAME });
            }

            bodyData.password = await bcrypt.hash(bodyData?.password, 10);

            let userData = await user.create(bodyData);
            res.status(200).send({ Message: MESSAGES.USER.SIGN_UP, data: userData });
        } catch (error) {
            if (error) {
                res.status(422).send(error);
            }
        }
    }

    // Signin
    async signIn(req, res) {
        try {
            let bodyData = req?.body

            let checkUser = await user.findOne({
                where: {
                    email: bodyData?.email
                }
            })

            if (!checkUser) {
                res.status(403).send({ Message: MESSAGES.USER.NOT_REGISTERED })
            }

            let checkPassword = await bcrypt.compare(bodyData?.password, checkUser?.password);

            if (!checkPassword) {
                res.status(403).send({ Message: MESSAGES.VALIDATION_MESSAGES.INCORRECT })
            }

            let token = await jwt.sign({ email: bodyData?.email }, process.env.SECRET_KEY);

            let userTkn = await userToken.create({ user_id: checkUser?.id, access_token: token });

            checkUser.dataValues.token = token

            res.status(200).send({ Message: MESSAGES.USER.SIGN_IN, data: checkUser });
        } catch (error) {
            if (error) {
                res.status(422).send(error);
            }
        }
    }

    // Get user details
    async getUserDetails(req, res) {
        try {
            let authToken = req?.headers?.authorization

            let getUserId = await userToken.findOne({
                where: {
                    access_token: authToken
                }
            });

            let userDetails = await user.findOne({
                attributes: { exclude: ['createdAt', 'updatedAt', 'password'] },
                where: {
                    id: getUserId?.user_id
                }
            });

            res.status(200).send(userDetails)
        } catch (error) {
            if (error) {
                res.status(422).send(error);
            }
        }
    }

    // Change password
    async changePassword(req, res) {
        try {
            let authToken = req?.headers?.authorization
            let bodyData = req.body

            let getUserId = await userToken.findOne({
                where: {
                    access_token: authToken
                }
            });

            let checkPassword = await user.findOne({
                where: {
                    id: getUserId.user_id
                }
            })

            let matchPassword = await bcrypt.compare(bodyData?.old_password, checkPassword?.password);
            if (!matchPassword) {
                res.status(403).send({ Message: MESSAGES.PASSWORD.OLDINCORRECT })
            }

            if (bodyData.new_password !== bodyData.confirm_new_password) {
                res.status(403).send({ Message: MESSAGES.PASSWORD.NOT_SAME })
            }

            let hashPassword = await bcrypt.hash(bodyData?.new_password, 10)

            let updatePassword = await user.update({ password: hashPassword }, {
                where: {
                    id: getUserId.user_id
                }
            });

            res.status(200).send({ Message: MESSAGES.PASSWORD.CHANGED })
        } catch (error) {
            if (error) {
                res.status(422).send(error);
            }
        }
    }

    // Signout
    async signOut(req, res) {
        let token = req?.headers?.authorization

        let deleteToken = await userToken.destroy({
            where: {
                access_token: token
            }
        });

        res.status(200).send({ Message: MESSAGES.USER.SIGN_OUT })
    }
}

module.exports = userController;