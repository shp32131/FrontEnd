
// 封装函数库
function getImgColor(img) {

  /**
   * @ param 传入的图片 
   * @ this.progress 解析图片的进度 实时
   * @ this.canvas canvas元素
   * @ this.cvs context对象
   * @ this.accuracy Number 解析图片颜色的精确度 1 - 7 数字选择 
   * 
   */

  this.canvas = document.createElement("canvas")
  this.canvas.width = img.width
  this.canvas.height = img.height
  this.cvs = this.canvas.getContext("2d")
  this.cvs.drawImage(img, 0, 0)
  this.accuracy = 5
  this.progress = ''
}
getImgColor.prototype.getColorXY = function(x, y) {

  /**
   * @param x Number x坐标起点
   * @param y Number y坐标起点
   * @return color Object 包含颜色的rgba #16进制颜色
   */

  let obj = this.cvs.getImageData(x, y, 1, 1)
  let arr = obj.data.toString().split(",")

  let first = parseInt(arr[0]).toString(16)
  first = first.length === 2 ? first : first + first

  let second = parseInt(arr[1]).toString(16)
  second = second.length === 2 ? second : second + second

  let third = parseInt(arr[2]).toString(16)
  third = third.length === 2 ? third : third + third

  let last = parseInt(arr.pop()) / 255
  last = last.toFixed(0)

  let color = {}
  color['rgba'] = 'rgba(' + arr.join(',') + ',' + last + ')'
  color['#'] = '#' + first + second + third

  return color
}
getImgColor.prototype.getColors = function() {

  /**
   * 避免图片过大，阻塞卡死
   * 每加载一行像素，延迟20毫秒加载下一行
   * return Promise 
   * promise resolve 解析完成后，返回颜色的总计数组，降序排列
   * promise reject none
   */

  return (new Promise((resolve, reject) => {

      let arr = []
      let getY = (i) => {
          for(let j = 0; j < this.canvas.height; j++) {
              let obj = {}
              obj = this.getColorXY(i, j)
              obj.index = 1
              let is = true

              arr.forEach((item) => {
                  if (item['#'] === obj['#']) {
                      is = false
                      item.index += 1
                  }

                  let l = []

                  for (let i = 0; i < obj['#'].length; i++) {

                      if (item['#'].indexOf(obj['#'][i]) > -1) {
                          l.push('1')
                      }
                  }

                  let acc = (this.accuracy > 7) ? 7 : this.accuracy
                  acc = (this.accuracy < 1) ? 2 : this.accuracy
                  if (l.length > acc) {
                      is = false
                      item.index += 1
                  }
              })

              if (is) {
                  arr.push(obj)
              }
          }
      };

      let getX = (i) => {
          if (i < this.canvas.width) {

              getY(i)
              this.progress = (i / this.canvas.width * 100).toFixed(2) + '%'
              console.log(this.progress)
              setTimeout(() => {
                  getX(++i)
              }, 20)

          } else {

              this.progress = '100%'
              console.log( this.progress )

              resolve(arr.sort(function(a, b) {
                  return a.index < b.index ? 1 : (a.index > b.index ? -1 : 0)
              }))
          }
      };

      getX(0)

  }))
}

/*-----------无视这条分割线----------*/

// 实例代码

let input = document.querySelector("#file")

input.addEventListener("change", (event) => {
  /**
   * 上传图片之后
   * 替换图片
   * 执行方法
   */
  let img = document.querySelector("#img")
  let file = event.target.files[0]
  let fr = new FileReader()

  fr.onload = (e) => {
      let n_img = new Image()
      n_img.src = e.target.result
      n_img.onload = (e) => {
          n_img.id = 'img'
          n_img.width = n_img.width
          n_img.height = n_img.height
          document.body.replaceChild(n_img, img)
          getImg()
      }
  }

  fr.readAsDataURL(file)
})

function getImg() {
  /**
   * 获取图片，实例化图片
   * 执行方法
   * 解析完成，获得数组，操作回调函数
   * 
   */
  let img = document.querySelector("#img")
  let a = new getImgColor(img)
  
  // 获取 坐标 0 0 点的颜色值
  console.log(a.getColorXY(0, 0))

  a.getColors().then((arr) => {

      let ul = document.querySelector("#ul")
      let text = document.querySelector("#text")
          text.innerText = '共有' + arr.length + '个颜色';
      let str = ''

      arr.forEach((obj, index) => {
          str += `<li style="background-color:${obj['#']}">${obj['#']} - ${obj['index']}次</li>`;
      })

      ul.innerHTML = str
  })
}