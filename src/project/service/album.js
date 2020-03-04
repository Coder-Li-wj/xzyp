import axios from '@/framework/http/axios'
const model = 'album';
let searchUrl = `api/${model}/search`;
let countUrl = `api/${model}/count`;
let saveAndUpdateUrl = `api/${model}/saveAndUpdate`;
let disableAlbumByIdsUrl = `api/${model}/disableAlbumByIds`;
let enableAlbumByIdsUrl = `api/${model}/enableAlbumByIds`;
let findByIdUrl = `api/${model}/findById`;

export function search(param, callback) {
  axios.post(searchUrl, param).then(data => {
    if (data !== undefined && data !== '' && data !== null) {
      // callback when data is exist
      callback(data)
    }
  })
}

export function saveAndUpdate(param, callback) {
  axios.post(saveAndUpdateUrl, param).then(data => {
    if (data !== undefined && data !== '' && data !== null) {
      // callback when data is exist
      callback(data)
    }
  })
}

export function count(param, callback) {
  axios.post(countUrl, param).then(data => {
    if (data !== undefined && data !== '' && data !== null) {
      // callback when data is exist
      callback(data)
    }
  })
}

export function disableAlbumByIds(param, callback) {
  axios.post(disableAlbumByIdsUrl, param).then(data => {
    if (data !== undefined && data !== '' && data !== null) {
      // callback when data is exist
      callback(data)
    }
  })
}

export function enableAlbumByIds(param, callback) {
  axios.post(enableAlbumByIdsUrl, param).then(data => {
    if (data !== undefined && data !== '' && data !== null) {
      // callback when data is exist
      callback(data)
    }
  })
}

export function findById(param, callback) {
  axios.post(findByIdUrl, param).then(data => {
    if (data !== undefined && data !== '' && data !== null) {
      // callback when data is exist
      callback(data)
    }
  })
}
