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


function getFileName(filePath) {
  var startIndex = filePath.lastIndexOf("/");
  if (startIndex != -1)
    return filePath.substring(startIndex + 1, filePath.length).toLowerCase();
  else return "";
}

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
