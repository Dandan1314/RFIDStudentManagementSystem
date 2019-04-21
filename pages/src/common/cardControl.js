const KaiSa = (str, addNum) => {
  var charCodeForA = 'AZ'.charCodeAt(0)
  var charCodeForZ = 'AZ'.charCodeAt(1)
  var sArr = str.split('')
  var result = ''
  for (var i = 0; i < sArr.length; i++) {
    sArr[i] = sArr[i].charCodeAt(0)
    if (sArr[i] >= charCodeForA && sArr[i] <= charCodeForZ) {
      var tempCharCode = sArr[i] + addNum
      if (tempCharCode > charCodeForZ) {
        tempCharCode = charCodeForA + (tempCharCode - charCodeForZ) - 1
      }
      sArr[i] = tempCharCode
    }

    result += String.fromCharCode(sArr[i])
  }
  return result
}

const changeString = CardNo => {
  const strKS10 = KaiSa(CardNo, 10).split('')
  const strKS13 = KaiSa(CardNo, 13).split('')
  const newArr = []
  for (let i = 0; i < CardNo.length; i++) {
    if (parseInt(CardNo[i])) {
      newArr.push(CardNo[i])
    } else {
      newArr.push(CardNo[i])
      newArr.push(strKS10[i])
      newArr.push(strKS13[i])
    }
  }
  return newArr.join('')
}

export const cardId = () => {
  const OpenDeviceRes = LotusCardDriver.OpenDevice('', 0, 0, 0)
  if (OpenDeviceRes <= 0) {
    console.log('设备打开失败！')
    return false
  }
  // console.log('设备打开状态 => ', OpenDeviceRes)
  // const DeviceNo = LotusCardDriver.GetDeviceNo(OpenDeviceRes)
  // console.log('设备号 => ', DeviceNo)
  const setCardTypeRes = LotusCardDriver.SetCardType(OpenDeviceRes, 'A')
  // console.log('设备类型设置为A => ', setCardTypeRes)
  if (setCardTypeRes <= 0) {
    console.log('设备卡类型失败！')
    LotusCardDriver.CloseDevice(OpenDeviceRes)
    return false
  }

  const GetCardRes = LotusCardDriver.GetCardNo(OpenDeviceRes, 38)
  if (GetCardRes !== 1) {
    // console.log('寻卡失败！')
    LotusCardDriver.CloseDevice(OpenDeviceRes)
    return false
  }
  // console.log('寻卡成功 => ', GetCardRes)
  LotusCardDriver.Beep(OpenDeviceRes, 10)
  const CardNo = LotusCardDriver.CardNo
  return changeString(CardNo)
}
