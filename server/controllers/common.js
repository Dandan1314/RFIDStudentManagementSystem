const db = require('../db')

const login = async (r, h) => {
    try {
        // 教师和管理员比较少  所以先查是不是教师或者管理员
        const checkIfTeacherRes = await db.Teacher.findOne({
            card_ID: r.payload.card_ID,
            status: true
        })
        if (checkIfTeacherRes) {
            delete checkIfTeacherRes.status
            delete checkIfTeacherRes.card_ID
            delete checkIfTeacherRes.__v
            return {
                code: 2005011,
                msg: '登录成功！',
                data: checkIfTeacherRes
            }
        }
        // 不是教师管理员 查询是不是学生
        const checkIfStudentRes = await db.Student.findOne({
            card_ID: r.payload.card_ID,
            status: true
        })
        if (checkIfStudentRes) {
            delete checkIfStudentRes.status
            delete checkIfStudentRes.card_ID
            delete checkIfStudentRes.__v
            delete checkIfStudentRes.collage_ID
            delete checkIfStudentRes.majorClass_ID
            return {
                code: 2005012,
                msg: '登录成功！',
                data: checkIfStudentRes
            }
        }

        return {
            code: 401501,
            msg: '登录失败！'
        }

    } catch (error) {
        return {
            code: 500501,
            msg: '系统错误！'
        }
    }

}

module.exports = {
    login
}