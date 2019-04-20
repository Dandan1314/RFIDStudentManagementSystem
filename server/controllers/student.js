const db = require('../db')

const addStudent = async (r, h) => {
    try {
        // 先检查有没有这个卡
        const searchTeacherRes = await db.Student.findOne({
            card_ID: r.payload.card_ID,
            status: true
        })
        if (searchTeacherRes) {
            return {
                code: 403301,
                msg: '添加失败，卡片重复！'
            }
        }
        // 没有使用这个卡  进行添加操作
        const saveRes = await db.Student.create(r.payload)
        if (saveRes) {
            return {
                code: 200301,
                msg: '添加成功！'
            }
        }
    } catch (e) {
        return {
            code: 500301,
            msg: '添加失败，服务器错误！'
        }
    }
}

const delStudent = async (r, h) => {
    try {
        await db.Student.findOneAndUpdate(r.params, {
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

const editStudent = async (r, h) => {
    try {
        await db.Student.findOneAndUpdate({
            _id: r.payload._id
        }, r.payload)
        return {
            code: 200303,
            msg: "编辑成功！"
        }
    } catch (error) {
        return {
            code: 500303,
            msg: '编辑失败！'
        }
    }
}

const getStudentList = async (r, h) => {
    try {
        const getStudentInfoListRes = await db.Student.find({
            status: true
        })
        const getStudentList = await Promise.all(getStudentInfoListRes.map(item => {
            return db.CollageMajorClass
                        .findOne({ _id: item.collage_ID })
                        .then(collageRes => {
                            item._doc.collageName = collageRes['name']
                            return db.CollageMajorClass.findOne({ _id : item.majorClass_ID })
                        })
                        .then(majorClassRes => {
                            item._doc.majorClassName = majorClassRes['name']
                            return item
                        })
        }))
        return {
            code: 200304,
            msg: '获取成功！',
            getStudentList
        }
    } catch (error) {
        console.log('err => ', error)
        return {
            code: 500304,
            msg: '获取失败！'
        }
    }
}

module.exports = {
    addStudent,
    delStudent,
    editStudent,
    getStudentList
}