const db = require('../db')

const addStudent = async (r, h) => {
    try {
        // 先检查有没有这个卡
        const searchTeacherRes = await db.Student.findOne({
            card_ID: r.payload.card_ID,
            status: true
        })
        console.log(searchTeacherRes)
        if (searchTeacherRes) {
            return {
                code: 403201,
                msg: '添加失败，卡片重复！'
            }
        }
        // 没有使用这个卡  进行添加操作
        const saveRes = await db.Student.create(r.payload)
        if (saveRes) {
            return {
                code: 200201,
                msg: '添加成功！'
            }
        }
    } catch (e) {
        return {
            code: 500201,
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
            code: 200202,
            msg: "删除成功！"
        }
    } catch (e) {
        return {
            code: 500202,
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
            code: 200203,
            msg: "编辑成功！"
        }
    } catch (error) {
        return {
            code: 500203,
            msg: '编辑失败！'
        }
    }
}

const getStudentList = async (r, h) => {
    try {
        const getStudentInfoListRes = await db.Student.find({
            status: true
        })
        return {
            code: 200204,
            msg: '获取成功！',
            getStudentList: await Promise.all(getStudentInfoListRes.map(item => {
                return db.CollageMajorClass
                    .findOne({ _id: item.collage_ID })
                    .then(collageRes => {
                        if (collageRes) {
                            item._doc.collageName = collageRes['name']
                            item._doc.majorClassName = collageRes.children.find(cItem => {
                                return cItem._id = item['majorClass_ID']
                            })['name']
                        } 
                        delete item._doc.status
                        return item
                    })
            }))
        }
    } catch (error) {
        console.log('err => ', error)
        return {
            code: 500204,
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