const db = require('../db')

const addTeacher = async (r, h) => {
    try {
        // 先检查有没有这个卡
        const searchTeacherRes = await db.Teacher.findOne({
            card_ID: r.payload.card_ID,
            status: true
        })
        if (searchTeacherRes) {
            return {
                code: 403001,
                msg: '添加失败，卡片重复！'
            }
        }
        // 没有使用这个卡  进行添加操作
        const saveRes = await db.Teacher.create(r.payload)
        if (saveRes) {
            return {
                code: 200001,
                msg: '添加成功！'
            }
        }
    } catch (e) {
        return {
            code: 500001,
            msg: '添加失败，服务器错误！'
        }
    }
}

const delTeacher = async (r, h) => {
    try {
        await db.Teacher.findOneAndUpdate(r.params, {
            status: false
        })
        return {
            code: 200002,
            msg: "删除成功！"
        }
    } catch (e) {
        return {
            code: 500002,
            msg: "删除成功！"
        }
    }
}

const getTeacherList = async (r, h) => {
    try {
        const getTeacherListRes = await db.Teacher.find({
            role: {
                $ne: 1
            },
            status: true
        })
        return {
            code: 200003,
            msg: '获取成功!',
            TeacherList: getTeacherListRes.map((item, index) => {
                return {
                    "id": index + 1,
                    "serverID": item._id,
                    "name": item.name,
                    "num": item.teacher_Num
                }
            })
        }
    } catch (error) {
        return {
            code: 500003,
            msg: '获取失败!'
        }
    }
}

const editTeacher = async (r, h) => {
    try {
        await db.Teacher.findOneAndUpdate({
            _id: r.payload._id
        }, r.payload)
        return {
            code: 200004,
            msg: "编辑成功！"
        }
    } catch (error) {
        return {
            code: 500004,
            msg: '编辑失败!'
        }
    }
}

const getTeacherInfo = async (r, h) => {

    try {
        const getTeacherInfoRes = await db.Teacher.findOne({
            _id: r.params.id
        })
        return getTeacherInfoRes ?
            {
                code: 200005,
                msg: '获取成功！',
                getTeacherInfoRes: getTeacherInfoRes
            } :
            {
                code: 500005,
                msg: '没有该教师！'
            }
    } catch (error) {
        return {
            code: 500005,
            msg: '获取失败!'
        }
    }
}

module.exports = {
    addTeacher,
    delTeacher,
    getTeacherList,
    editTeacher,
    getTeacherInfo
}