import mongoose from 'mongoose';
import { Friends, Aliens } from './dbConnectors';
import { rejects } from 'assert';

class Friend {
    constructor(id, {firstName, lastName, gender, age, language, email, contacts}) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.gender = gender;
        this.age = age;
        this.language = language;
        this.email = email;
        this.contacts = contacts;
    }
}

const friendDB = {};

// resolver map
export const resolvers = {
    Query: {
        getOneFriend: (root, { id }) => {
            return new Promise((resolve, object) => {
                Friends.findById(id, (err, friend) => {
                    if (err) rejects(err)
                    else resolve(friend)
                })
            })
        },
        getAliens: () => {
            return Aliens.findAll();
        }
    },
    Mutation: {
        createFriend: (root, { input }) => {
            const newFriend = new Friends({
                firstName: input.firstName,
                lastName: input.lastName,
                gender: input.gender,
                age: input.age,
                language: input.language,
                email: input.email,
                contacts: input.contacts
            });

            newFriend.id = newFriend._id;

            return new Promise((resolve, object) => {
                newFriend.save((err) => {
                    if (err) rejects(err)
                    else resolve(newFriend)
                })
            })
        },
        updateFriend: (root, { input }) => {
            return new Promise((resolve, object) => {
                Friends.findOneAndUpdate({ _id: input.id}, input, { new: true }, (err, friend) => {
                    if (err) rejects(err)
                    else resolve(friend)
                })
            })
        },
        deleteFriend: (root, { id }) => {
            return new Promise((resolve, object) => {
                Friends.remove({_id: id}, (err) => {
                    if (err) reject(err)
                    else resolve('Successfully deleted friend')
                })
            })
        }
    },
};

export default resolvers;