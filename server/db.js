const mongoose = require('mongoose')
const connectUrl = 'mongodb://127.0.0.1:12345/RFIDStudentManagement'

mongoose.connect(connectUrl, { useNewUrlParser: true })

// 数据库状态
const db = mongoose.connection;
db.on('connected', err => {
    if (err) {
        console.log('连接数据库失败：' + err);
    } else {
        console.log('连接数据库成功！');
    }
})
db.on('error', console.error.bind(console, 'connection error:'));

// 接下来开始定义数据库的一些东西
const Schema = mongoose.Schema;

const teacherSchema = new Schema({
    card_ID: String,
    name: String,
    role: { type: Number, default: 2 },
    status: { type: Boolean, default: true }
})
const Teacher = mongoose.model('Teacher', teacherSchema)

const collageMajorClassSchema = new Schema({
    name: String,
    parent_id: Number,
    status: { type: Boolean, default: true }
})
const CollageMajorClass = mongoose.model('CollageMajorClass', collageMajorClassSchema)

const studentSchema = new Schema({
    card_ID: String,
    student_Num: String,
    name: String,
    sex: Number,
    email: String,
    phone: String,
    collage_ID: Number,
    majorClass_ID: Number,
    status: { type: Boolean, default: true }
})
const Student = mongoose.model('Student', studentSchema)

const subjectSchema = new Schema({
    name: String,
    status: { type: Boolean, default: true }
})
const Subject = mongoose.model('Subject', subjectSchema)

const scoreSchema = new Schema({
    student_ID: Number,
    subject_ID: Number,
    score: Number,
    exam_Category: Number,
    status: { type: Boolean, default: true }
})
const Score = mongoose.model('Score', scoreSchema)

module.exports = {
    Teacher,
    CollageMajorClass,
    Student,
    Subject,
    Score
}