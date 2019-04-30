import fetch from 'src/fetch'
import * as score from '../constant/score'

// 获取学生成绩
export const getScoreInfo = id => {
    return fetch({
        url: score.getStudentScore + `/${id}`
    })
}