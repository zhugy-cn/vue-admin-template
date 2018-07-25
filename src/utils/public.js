// 返回随机数
export const randomNum = (minNum, maxNum, float) => {
    let ranNum;
    if (float) {
        ranNum = (minNum + Math.random()).toFixed(2)
        if (ranNum > maxNum) {
            ranNum = maxNum
        }
    } else {
        ranNum = parseInt(Math.random() * (maxNum - minNum + 1) + minNum)
    }
    return ranNum
}
// 返回随机颜色
export const randomColor = (opacity = 0) => `rgba(${randomNum(0, 255)},${randomNum(0, 255)},${randomNum(0, 255)},${opacity || randomNum(0.4, 1, true)})`
