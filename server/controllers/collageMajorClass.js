const db = require('../db')

const addCMC = async (r, h) => {
    try {
        const addCMCRes = !r.payload.parent_id
            ? await db.CollageMajorClass.create(r.payload)
            : await (async () => {
                const findCRes = await db.CollageMajorClass.findOne({ _id: r.payload.parent_id })
                if (!findCRes) {
                    return {
                        code: 500101,
                        msg: '添加失败'
                    }
                }
                findCRes.children.push({ name: r.payload.name })
                return await findCRes.save()
            })()
 
        if (addCMCRes) {
            return {
                code: 200101,
                msg: '添加成功！',
                addCMCRes
            }
        }
    } catch (error) {
        console.log(error)
        return {
            code: 500102,
            msg: '添加失败'
        }
    }
}

const delCMC = async (r, h) => {
    try {
        await db.CollageMajorClass.findOneAndUpdate(r.params, {
            status: false
        })
        return {
            code: 200102,
            msg: "删除成功！"
        }
    } catch (e) {
        return {
            code: 500102,
            msg: "删除成功！"
        }
    }
}

const getCMCList = async (r, h) => {
    try {
        const getCListRes = await db.CollageMajorClass.find({ status: true })
        return {
            code: 200103,
            msg: '获取成功！',
            getCListRes
        }
    } catch (error) {
        return {
            code: 500103,
            msg: '获取失败！'
        }
    }
}

module.exports = {
    addCMC,
    delCMC,
    getCMCList
}