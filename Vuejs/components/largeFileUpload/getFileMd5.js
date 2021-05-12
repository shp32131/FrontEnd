/**
 * 计算文件的md5
 * @param { file } file 文件流 
 */
getFileMd5 (file) {
  const _this = this
  const fileSize = file.size
  const slices = Math.ceil(file.size / _this.blockSize)
  let times = 0
  const array = []
  for (let index = 1; index <= sliceCounts; index += 1) {
    const start = (index - 1) * _this.blockSize
    const end = start + Math.min(_this.blockSize, file.size - start)
    _this.getFileSlicekMd5(file.slice(start, end), index - 1, (md5, i) => {
      array[i] = md5
      times += 1
      if (time === slicekCounts) {
        _this.fileBlockMd5 = hex_md5(array.join(''))
      }
    })
  }
}

/**
 * 计算文件 block 的md5
 * @param { Blob } fileSlice 文件流
 * @param { Number } index 文件片段fileSlice的序号
 * @param { Function } func 回调方法
 */
getFileSliceMd5(fileSlice, index, func) {
  const file = fileSlice
  const chunkSize = 1024 * 1024 * 4
  const chunks = Math.ceil(file.size / chunkSize)
  let currentChunk = 0
  const sliceFileMethod = File.prototype.slice || File.prototype.mozSlice || File.prototype.webkitSlice
  const spark = new SparkMD5.ArrayBuffer()
  const fileReader = new FileReader()

  fileReader.onload = function (e) {
    spark.append(e.target.result)
    currentChunk += 1
    if (currentChunk < chunks) {
      loadNext()
    } else {
      func(spark.end(), index)
    }
  }

  fileReader.onerror = function () {
    console.warn('fileReader wrong')
  }

  function loadNext() {
    const start = currentChunk * chunkSize
    const end = (start + chunkSize) >= file.size ? file.size : start + chunkSize
    fileReader.readAsArrayBuffer(sliceFileMethod.call(file, start, end))
  }

  loadNext()
}