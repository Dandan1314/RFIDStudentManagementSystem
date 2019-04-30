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

// 获取学生列表
export const getStudentList = () => {
  return fetch({
    url: Student.getStudentList,
  })
}

// 删除学生
export const delStudent = id => {
  return fetch({
    url: Student.delStudent + `/${id}`,
    method: 'delete'
  })
}

// 编辑学生信息
export const editStudent = data => {
  return fetch({
    url: Student.editStudent,
    method: 'patch',
    data
  })
}