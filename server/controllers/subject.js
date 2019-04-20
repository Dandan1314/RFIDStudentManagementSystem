const db = require('../db')

const addSubject = async (r, h) => {
    try {
        await db.Subject.create(r.payload)
        return {
            code: 200301,
            msg: '添加成功！'
        }
    } catch (error) {
        return {
            code: 500301,
            msg: '添加失败！'
        }
    }
}

const delSubject = async (r, h) => {
    try {
        await db.Subject.findOneAndUpdate(r.params, {
            status: false
        })
        return {
            code: 200302,
            msg: "删除成功！"
        }
    } catch (error) {
        return {
            code: 500302,
            msg: '删除失败！'
        }
    }
}

const getSubjectList = async (r, h) => {
    try {
        return {
            code: 200303,
            msg: '获取成功！',
            subjectList: await db.Subject.find({ status: true })
        }
    } catch (error) {
        return {
            code: 500303,
            msg: '获取失败！'
        }
    }
}

module.exports = {
    addSubject,
    delSubject,
    getSubjectList
}