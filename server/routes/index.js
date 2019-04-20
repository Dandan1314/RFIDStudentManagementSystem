const teacher_C = require('../controllers/teacher')
const collageMajorClass_C = require('../controllers/collageMajorClass')

module.exports = [
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
    {
        method: 'GET',
        path: '/getTeacherInfo/{_id}',
        handler: teacher_C.getTeacherInfo
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
        path: '/getCMCList/{parent_id}',
        handler: collageMajorClass_C.getCMCList
    }
]