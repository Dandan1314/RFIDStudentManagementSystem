import fetch from 'src/fetch'
import * as Student from '../constant/student'

// 添加学院专业班级
export const addStudent = (data) => {
  return fetch({
    url: Student.addStudent,
    method: 'put',
    data
  })
}