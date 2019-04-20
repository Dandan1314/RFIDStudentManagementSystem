const teacher_C = require('../controllers/teacher')

module.exports = [
    // 教师表操作
    {
        method: 'PUT',
        path: '/addTeacher',
        handler: teacher_C.addTeacher
    },
    {
        method: 'DELETE',
        path: '/delTeacher/{id}',
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
        path: '/getTeacherInfo/{id}',
        handler: teacher_C.getTeacherInfo
    }
]