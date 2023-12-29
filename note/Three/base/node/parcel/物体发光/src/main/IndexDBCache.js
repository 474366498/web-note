// https://blog.csdn.net/weiCong_Ling/article/details/131437456
const DB = window.indexedDB || window.webkitIndexedDB || window.mozIndexedDB
class IndexDBCache {
  constructor(params = {
    dbName: 'test',  // 数据库名
    cacheTableName: 'imageCache', // 表名
    keyPath: 'imageName', // 设置主键(需要为添加对象内的key 否则新增或获取都会失败)
    indexs: []  // 索引
  }) {
    this._db = null // 数据库
    this._transaction = null // 事务
    this._request = null  // 打开数据库返回的事务
    this._dbName = params.dbName //  数据库名
    this._cacheTableName = params.cacheTableName  // 表名  
    this._version = 1  // 自定义版本号
    this._keyPath = params.keyPath  // 设置主键 
    this._indexs = params.indexs   // 设置索引

    this.initDB()
  }

  initDB() {
    return new Promise((resolve, reject) => {
      // 打开数据库
      this._request = DB.open(this._dbName, this._version)
      // 数据库初始化成功
      this._request.onsuccess = event => {
        console.log('init success', this._request)
        this._db = this._request.result
        resolve(event)
      }
      // 数据库初始化失败
      this._request.onerror = error => {
        console.log('init error')
        reject(error)
      }
      // 数据库更新 (创建或更新)

      this._request.onupgradeneeded = event => {
        console.log('update ')
        const db = event.target.result

        if (!db.objectStoreNames.contains(this._cacheTableName)) {
          const objectStore = db.createObjectStore(this._cacheTableName, {
            keyPath: this._keyPath
          })

          this._indexs.forEach(el => {
            objectStore.createIndex(el.name, el.name, { unique: el.unique })
          })

        }
        resolve(event)

      }

    })
  }

  addData(params) {
    return new Promise((resolve, reject) => {

      const transaction = this._db.transaction(this._cacheTableName, 'readwrite')
      const store = transaction.objectStore(this._cacheTableName)
      const response = store.add(params)

      response.onsuccess = event => {
        resolve(event)
      }

      response.onerror = error => {
        reject(error)
      }

    })
  }

  remove(key) {
    const transaction = this._db.transaction(this._cacheTableName, 'readwrite')
    const response = transaction.objectStore(this._cacheTableName).delete(key)

    response.onsuccess = event => {
      console.log('remove success')
    }

    response.onerror = error => {
      console.log('remove error')
    }

  }

  clear() {
    return new Promise((resolve, reject) => {
      const transaction = this._db.transaction(this._cacheTableName, 'readwrite')

      const store = transaction.objectStore(this._cacheTableName)

      const response = store.clear()

      response.onsuccess = event => {
        resolve(event)
      }
      response.onerror = error => {
        reject(error)
      }
    })
  }
  // 通过key 读取数据 
  getDataByKey(key) {
    return new Promise((resolve, reject) => {
      const transaction = this._db.transaction(this._cacheTableName)
      const store = transaction.objectStore(this._cacheTableName)

      const request = store.getAll(key)

      request.onsuccess = event => {
        resolve(event)
      }

      request.onerror = error => {
        reject(error)
      }

    })
  }

  // 通过params 读取数据 
  getDataByIndex(params) {
    const transaction = this._db.transaction(this._cacheTableName)
    const store = transaction.objectStore(this._cacheTableName)

    const index = store.index(params.index),
      request = index.get(params.value)

    request.onsuccess = event => {
      let result = event.target.result
      console.log(result)
    }

  }

  // 遍历数据
  readAll() {
    const objectStore = this._db.transaction(this._cacheTableName, 'readwrite').objectStore(this._cacheTableName)

    objectStore.openCursor().onsuccess = event => {
      console.log(147, event)
      const result = event.target.result
      if (result) {
        console.log(149, result.key, result.value)
        result.continue()
      } else {
        console.log('暂无数据 ！')
      }
    }

  }

  update(params) {
    console.log(params)
    let request = this._db.transaction(this._cacheTableName, 'readwrite').objectStore(this._cacheTableName).put(params)
    console.log(request)
    request.onsuccess = event => {
      console.log('update success')
    }

    request.onerror = error => {
      console.log('update error')
    }

  }

  close() {
    this._db.close()
  }

  delete() {
    let request = DB.deleteDatabase(this._dbName)

    request.onsuccess = event => {
      console.log('delete success')
    }

    request.onerror = error => {
      console.log('delete error')
    }

  }
}





const params = {
  dbName: 'test',
  cacheTableName: 'imageCache',
  keyPath: 'imageName',
  indexs: [
    { name: 'imageData', unique: false },
    { name: 'imageFile', unique: true }

  ]
}


let imageDB = new IndexDBCache(params)

console.log(imageDB)
setTimeout(() => {
  // addDBData()
  // removeDBData()
  // updateDBData()
  // getDBAll()
  // getDataByKey()
  getDataByIndex()
}, 4e2);

function addDBData() {
  for (let i = 0; i < 1e1; i++) {
    let data = {
      imageName: `uploadImage ${i + 1}`,
      imageData: `uploadImgUrl ${i + 1}`,
      imageFile: `uploadFile ${i + 1}`
    }
    imageDB.addData(data).then(res => {
      console.log('success', res)
    }).catch(error => {
      console.log('error', error)
    })
  }
}

function removeDBData() {
  imageDB.remove('uploadImage 2')
}

function updateDBData() {
  let data = {
    imageName: `uploadImage 9`,
    imageData: `uploadImgUrl 99`,
    imageFile: `uploadFile 99`
  }
  imageDB.update(data)
}

function getDBAll() {
  imageDB.readAll()
}

function getDataByKey() {
  // imageDB.getDataByKey().then(res => {
  //   console.log('getDataByKey', res)
  // }).catch(error => {
  //   console.log('getDataByKey', error)
  // })

  imageDB.getDataByKey('uploadImage 1').then(res => {
    console.log('getDataByKey', res)
  }).catch(error => {
    console.log('getDataByKey', error)
  })
}

function getDataByIndex() {
  imageDB.getDataByIndex({
    index: 'imageFile',
    value: 'uploadFile 1'
  })
}





