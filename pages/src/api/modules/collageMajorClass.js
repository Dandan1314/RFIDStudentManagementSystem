import fetch from 'src/fetch'
import * as CMC from '../constant/collageMajorClass'

// 添加学院专业班级
export const addCMC = (data) => {
  return fetch({
    url: CMC.addCMC,
    method: 'put',
    data
  })
}

// 获取学院专业班级列表
export const getCMCList = () => {
  return fetch({
    url: CMC.getCMCList,
    method: 'get'
  })
}

// 删除学院专业班级
export const delCMC = (pid, cid) => {
  return fetch({
    url: CMC.delCMC + pid + '_' + cid,
    method: 'delete'
  })
}
