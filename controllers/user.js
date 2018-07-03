import User from '../models/User.js'
import mongoose  from 'mongoose';
import bcrypt from 'bcrypt';

export default {
    create(req,h) {
        const {lastName, firstName, password, userName} = req.payload
        return User.find({'userName': userName}).exec().then(user => {
            if(user.length != 0) {
                return h.response({
                    success: false,
                    message: 'username already exists'
                }).code(400)
            } else {
                const hash = bcrypt.hashSync(password, 10);
                if(hash){
                    const newUser = new User({
                        _id: new mongoose.Types.ObjectId(),
                        name: {
                            firstName,
                            lastName
                        },
                        password: hash,
                        userName
                    });
                    return newUser.save().then(result => {
                        return h.response({
                            success: true,
                            message: 'User created successfully',
                            data: result
                        }).code(400);
                    })

                }
            }
        })
        .catch(err => {
            return h.response({
                success: false,
                message: 'error occurred: ' + err
            }).code(400);
        })
    },
    list(req, h) {
        return User.find();
    }
}