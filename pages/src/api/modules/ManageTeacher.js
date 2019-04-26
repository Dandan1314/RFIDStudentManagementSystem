import fetch from 'src/fetch'
import * as Teacher from '../constant/ManageTeacher'

// 获取教师列表
export const getTeacherList = () => {
  return fetch({
    url: Teacher.getTeacherList,
    method: 'get'
  })
}

// 添加教师
export const addTeacher = (data) => {
  return fetch({
    url: Teacher.addTeacher,
    method: 'put',
    data
  })
}

// 删除教师
export const delTeacher = id => {
  return fetch({
    url: Teacher.delTeacher + '/' + id,
    method: 'delete'
  })
}

// 编辑教师
export const editTeacher = data => {
  return fetch({
    url: Teacher.editTeacherInfo,
    method: 'patch',
    data
  })
}