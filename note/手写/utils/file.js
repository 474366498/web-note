import axios from 'axios'
import FileSaver from 'file-saver'
import JSZIP from 'JSZIP'
var imgsSrc = ['https://img-home.csdnimg.cn/images/20201124032511.png', 'https://csdnimg.cn/medal/qixiebiaobing4@240.png']; // 这里可以替换为自己的逻辑，比如从哪里获取之类的

/**
 * 通过文件列表 合并打包下载文件
 * @param {*} files [{path,name}]
 */
export function packageImages(files) {
  var promises = []
  const zip = new JSZIP();
  for (let item of files) {
    let axios = getFile(item).then(({ data }) => {
      let fileName = getFileName(item) //文件名
      zip.file(fileName, data, { binary: true });
    })
    promises.push(axios)
  }


  Promise.all(promises).then(() => {
    if (Object.keys(zip.files).length > 0) {
      zip.generateAsync({ type: 'blob' }).then((blob) => {
        saveAs(blob, 'files.zip');
        console.log('批量下载成功')
      });
    } else {
      console.log('下载全部失败')
    }
  });
}

// 文件名
function getFileName(filePath) {
  var startIndex = filePath.lastIndexOf("/");
  if (startIndex != -1)
    return filePath.substring(startIndex + 1, filePath.length).toLowerCase();
  else return "";
}

// axios get 下载文件
function getFile(url) {
  return new Promise((resolve, reject) => {
    axios({
      url,
      method: 'GET',
      responseType: 'blob',
    })
      .then((data) => {
        resolve(data);
      })
      .catch((err) => {
        reject(err.toString());
      });
  })
}


// js中file、blob、base64的相互转换，前端图片压缩、裁剪、文件格式转换  https://blog.csdn.net/qq846294282/article/details/108580073
// JS 文件base64、File、Blob、ArrayBuffer互转 https://blog.csdn.net/qq_46051205/article/details/124252245?spm=1001.2101.3001.6661.1&utm_medium=distribute.pc_relevant_t0.none-task-blog-2%7Edefault%7ECTRLIST%7ERate-1-124252245-blog-108580073.pc_relevant_3mothn_strategy_recovery&depth_1-utm_source=distribute.pc_relevant_t0.none-task-blog-2%7Edefault%7ECTRLIST%7ERate-1-124252245-blog-108580073.pc_relevant_3mothn_strategy_recovery&utm_relevant_index=1
// 更多 https://www.cnblogs.com/panwudi/p/16901169.html
/**
 *  blob 、file 转 base64
 * @param {*} file 
 * @param {*} callback 
 */
function fileToBase64(file, callback) {
  let fileReader = new FileReader()
  fileReader.readAsDataURL(file)
  fileReader.onload = function () {
    callback(this.result)
  }
}

/**
 * base64 转 blob 
 * @param {*} dataURL base64字符串
 * @param {*} mimeType 文件类型 默认base64
 */
function base64ToBlob(dataURL, mimeType = null) {
  const arr = dataURL.split(','),
    defaultMimeType = arr[0].match(/:(.*?);/)[1],
    bStr = atob(arr[1]),
    n = bStr.length,
    u8arr = new Uint8Array(n)
  while (n--) {
    u8arr[n] = bStr.charCodeAt(n)
  }
  return new Blob([u8arr], { type: mimeType || defaultMimeType })
}
/**
 * blob 转 file 
 * @param {*} blob blob 
 * @param {*} fileName 文件名
 * @param {*} mimeType 文件类型
 * @returns 
 */
function blobToFile(blob, fileName, mimeType) {
  return new File([blob], fileName, { type: mimeType })
}
/**
 * blob 转 arrayBuffer
 * @param {*} blob blob
 * @param {*} callback 回调方法
 */
function blobToBuffer(blob, callback) {
  let fileReader = new FileReader()
  fileReader.onload = function (result) {
    callback(result)
  }
  fileReader.readAsArrayBuffer(blob)
}

/**
 * base64转文件
 * @param {*} dataUrl base64
 * @param {*} fileName  文件名
 * @param {*} mimeType 文件类型
 */
function base64ToFile(dataUrl, fileName, mimeType = null) {
  let arr = dataUrl.split(','),
    defaultMimeType = arr[0].match(/:(.*?);/)[1],
    bStr = atob(arr[1]),
    n = bStr.length,
    u8arr = new Uint8Array(n)
  while (n--) {
    u8arr[n] = bStr.charCodeAt(n)
  }
  return new File([u8arr], fileName, { type: mimeType || defaultMimeType })
}

/**
 * 图片压缩裁剪
 * @param {*} file 图片文件 
 * @param {*} quality 生成后的质量
 * @param {*} callback 回调方法
 * @param {*} sizeThreshold 大小阀值
 * @param {*} targetWidth 生成图片宽度
 * @param {*} targetHeight 生成图片高度 按宽度自适应
 * @returns 
 */
function pressImg(file, quality = .8, callback = (e) => { console.log(e) }, sizeThreshold = 5.12E5, targetWidth = 800, targetHeight = null) {
  if (!file || !file.type.includes('image')) {
    return new Error(!file ? '未传入文件' : '文件不是图片')
  }
  fileToBase64(file, function (base64) {
    if (base64) {
      const image = new Image()
      image.src = base64
      image.onload = function () {
        if (file.size <= sizeThreshold && this.width <= targetWidth) {
          return callback(file)
        }
        const canvas = document.createElement('canvas')
        const context = canvas.getContext('2d')
        const scale = this.width / this.height
        canvas.width = targetWidth
        canvas.height = targetHeight || (targetWidth / scale)
        context.drawImage(image, 0, 0, canvas.width, canvas, height)
        const dataURL = canvas.toDataURL(file.type, quality)
        const newFile = base64ToFile(dataURL, file.name)
        callback(newFile)
      }
    }
  })
}
// blob base64 file base64 end


/** 
 * 大文件分片下载 类
 * @param {string} url 文件下载地址
 * @param {string} fileName 文件名
 * @param {number} chunkSize 分片每片大小
 * @returns {class} {start : fn ,pause:fn , restart:fn ,cancel:fn } 
 */
class FileDownloader {
  constructor(url, fileName, chunkSize = 2 * 1024 * 1024) {
    this.url = url
    this.fileName = fileName
    this.chunkSize = chunkSize
    this.fileSize = 0
    this.totalChunks = 0
    this.currentChunk = 0
    this.downloadedSize = 0
    this.chunks = []
    this.abortController = new AbortController()
    this.paused = false

  }
  // 获取文件大小 分片数量 
  async getFileSize() {
    let { url, abortController } = this
    let abort = new AbortController()
    const response = await fetch(url, { signal: abort.signal })
    const contentLength = response.headers.get('content-length')
    console.log('contentLength:', contentLength)
    this.fileSize = Number(contentLength)
    this.totalChunks = Math.ceil(this.fileSize / this.chunkSize)
    abort.abort()
  }

  async downloadChunk(index) {
    let start = index * this.chunkSize, end = Math.min(this.fileSize, (index + 1) * this.chunkSize - 1)
    const response = await fetch(this.url, {
      signal: this.abortController.signal,
      headers: { Range: `bytes=${start}-${end}` }
    })
    const blob = await response.blob()
    this.chunks[index] = blob
    this.downloadedSize += blob.size

    if (!this.paused && this.currentChunk < this.totalChunks - 1) {
      this.currentChunk++
      this.downloadChunk(this.currentChunk)
    } else if (this.currentChunk === this.totalChunks - 1) {
      console.log('下载完成 合并')
      this.mergeChunks()
    }
  }

  async mergeChunks() {
    const blob = new Blob(this.chunks, { type: 'application/octet-stream' })
    const url = window.URL.createObjectURL(blob)
    let link = document.createElement('a')
    link.href = url
    link.download = this.fileName
    document.body.appendChild(link)
    link.click()
    setTimeout(() => {
      document.body.removeChild(link)
      window.URL.revokeObjectURL(url)
    }, 10);
  }
  // 开始下载
  async start() {
    if (this.chunks.length === 0) {
      await this.getFileSize()
    }
    this.downloadChunk(this.currentChunk)
  }
  // 暂停下载
  pause() {
    this.paused = true
  }
  // 重新下载
  restart() {
    this.paused = false
    this.downloadChunk(this.currentChunk)
  }
  // 清空下载信息
  cancel() {
    this.abortController.abort()
    this.chunks = []
    this.currentChunk = 0
    this.downloadedSize = 0
  }

}

let url = 'https://zcfile.cdxyun.cn/UploadFilesZCJD/UploadFiles/officepublicfiles/2020-10-16/560e068c1eed4e588c42f08a1ea7cce8.mp4' // 600M
const fileName = "cce8.mp4";
const downloader = new FileDownloader(url, fileName)





















