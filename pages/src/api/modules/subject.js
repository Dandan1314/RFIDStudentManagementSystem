import fetch from 'src/fetch'
import * as subject from '../constant/subject'

// 新增学科
export const addSubject = data => {
    return fetch({
        url: subject.addSubject,
        method: 'put',
        data
    })
}

// 获取学科列表
export const getSubjectList = () => {
    return fetch({
        url: subject.getSubjectList
    })
}

// 删除学科
export const delSubject = id => {
    return fetch({
        url: subject.delSubject + `/${id}`,
        method: 'delete'
    })
}