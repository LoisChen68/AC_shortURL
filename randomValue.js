function randomValue() {
  const letterAndNumber = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890'
  let randomValue = ''
  for (let i = 0; i < 5; i++) {
    const randomGroup = Math.floor(Math.random() * (letterAndNumber.length - 1))
    randomValue += letterAndNumber[randomGroup]
  }
  console.log(randomValue)
}

randomValue()