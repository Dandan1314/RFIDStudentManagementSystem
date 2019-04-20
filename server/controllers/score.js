const db = require('../db')

const addScore = async (r, h) => {
    try {
        await db.Score.create(r.payload)
        return {
            code: 200401,
            msg: '添加成功！'
        }
    } catch (error) {
        return {
            code: 500401,
            msg: '获取失败！'
        }
    }
}

const delScore = async (r, h) => {
    try {
        await db.Score.findOneAndUpdate(r.params, {
            status: false
        })
        return {
            code: 200402,
            msg: "删除成功！"
        }
    } catch (e) {
        return {
            code: 500402,
            msg: "删除成功！"
        }
    }
}

const getScoreInfo = async (r, h) => {
    try {
        const scoreInfoResList = await db.Score.find({
            student_ID: r.params.student_ID,
            status: true
        })

        return {
            code: 200402,
            msg: "列表获取成功！",
            getScoreInfo: await Promise.all(scoreInfoResList.map(item => {
                return db.Subject.findOne({ _id: item.subject_ID })
                        .then(subjectRes => {
                            item._doc.subjectName = subjectRes['name']
                            return item
                        })
            }))
        }
    } catch (e) {
        return {
            code: 500404,
            msg: "获取成功！"
        }
    }
}

module.exports = {
    addScore,
    delScore,
    getScoreInfo
}