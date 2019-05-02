import fetch from 'src/fetch'
import * as score from '../constant/score'

// 获取学生成绩
export const getScoreInfo = id => {
    return fetch({
        url: score.getStudentScore + `/${id}`
    })
}

// 添加学生成绩
export const addScore = data => {
    return fetch({
        url: score.addScore,
        method: 'put',
        data
    })
}

// 删除学生成绩
export const delScore = id => {
    return fetch({
        url: score.delScore + `/${id}`,
        method: 'delete'
    })
}