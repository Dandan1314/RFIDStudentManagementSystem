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
    teacher_Num: String,
    role: { type: Number, default: 2 },
    status: { type: Boolean, default: true }
})
const Teacher = mongoose.model('Teacher', teacherSchema)

const collageMajorClassSchema = new Schema({
    name: String,
    children: [{
        name: String,
        status: { type: Boolean, default: true }
    }],
    status: { type: Boolean, default: true }
})
const CollageMajorClass = mongoose.model('CollageMajorClass', collageMajorClassSchema)

const studentSchema = new Schema({
    card_ID: String,
    student_Num: String,
    name: String,
    // sex: Number,
    // email: String,
    // phone: String,
    collage_ID: String,
    majorClass_ID: String,
    status: { type: Boolean, default: true }
})
const Student = mongoose.model('Student', studentSchema)

const subjectSchema = new Schema({
    name: String,
    status: { type: Boolean, default: true }
})
const Subject = mongoose.model('Subject', subjectSchema)

const scoreSchema = new Schema({
    student_ID: String,
    subject_ID: String,
    dailyScroll: Number,
    examScroll: Number,
    resScroll: Number,
    result: Number,
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