import mongoose from 'mongoose';
import grades from './gradesModel.js'
const db = {};
db.mongoose = mongoose;
db.url = process.env.MONGODB;
db.Grades = grades(mongoose)

export { db };
