const common_C = require('./controllers/common')
const teacher_C = require('./controllers/teacher')
const collageMajorClass_C = require('./controllers/collageMajorClass')
const student_C = require('./controllers/student')
const subject_C = require('./controllers/subject')
const score_C = require('./controllers/score')

module.exports = [
    // 登录
    {
        method: 'POST',
        path: '/login',
        handler: common_C.login
    },
    // 教师表操作
    {
        method: 'PUT',
        path: '/addTeacher',
        handler: teacher_C.addTeacher
    },
    {
        method: 'DELETE',
        path: '/delTeacher/{_id}',
        handler: teacher_C.delTeacher
    },
    {
        method: 'GET',
        path: '/getTeacherList',
        handler: teacher_C.getTeacherList
    },
    {
        method: 'PATCH',
        path: '/editTeacherInfo',
        handler: teacher_C.editTeacher
    },
    // 学院专业班级
    {
        method: 'PUT',
        path: '/addCMC',
        handler: collageMajorClass_C.addCMC
    },
    {
        method: 'DELETE',
        path: '/delCMC/{_id}',
        handler: collageMajorClass_C.delCMC
    },
    {
        method: 'GET',
        path: '/getCMCList',
        handler: collageMajorClass_C.getCMCList
    },
    // 学生信息管理
    {
        method: 'PUT',
        path: '/addStudent',
        handler: student_C.addStudent
    },
    {
        method: 'DELETE',
        path: '/delStudent/{_id}',
        handler: student_C.delStudent
    },
    {
        method: 'PATCH',
        path: '/editStudent',
        handler: student_C.editStudent
    },
    {
        method: 'GET',
        path: '/getStudentList',
        handler: student_C.getStudentList
    },
    // 学科管理
    {
        method: 'PUT',
        path: '/addSubject',
        handler: subject_C.addSubject
    },
    {
        method: 'DELETE',
        path: '/delSubject/{_id}',
        handler: subject_C.delSubject
    },
    {
        method: 'GET',
        path: '/getSubjectList',
        handler: subject_C.getSubjectList
    },
    // 成绩管理
    {
        method: 'PUT',
        path: '/addScore',
        handler: score_C.addScore
    },
    {
        method: 'DELETE',
        path: '/delScore/{_id}',
        handler: score_C.delScore
    },
    {
        method: "GET",
        path: '/getScoreInfo/{student_ID}',
        handler: score_C.getScoreInfo
    }
]