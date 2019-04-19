const teacher_C = require('../controllers/teacher')

module.exports = [
    {
        method: 'PUT',
        path: '/addTeacher',
        handler: teacher_C.addTeacher
    },
    {
        method: 'DELETE',
        path: '/delAdmin',
        handler: (request, h) => {
            return {
                message: '/'
            };
        }
    }
]