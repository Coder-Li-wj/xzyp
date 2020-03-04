import axios from '@/framework/http/axios'
const model = 'photo';
let findByAlbumIdAndNameUrl = `api/${model}/findByAlbumIdAndName`;
let countByAlbumIdAndNameUrl = `api/${model}/countByAlbumIdAndName`;
let saveUrl = `api/${model}/save`;
let disableByIdUrl = `api/${model}/disableById`;
let enableByIdUrl = `api/${model}/enableById`;

export function findByAlbumIdAndName(param, callback) {
  axios.post(findByAlbumIdAndNameUrl, param).then(data => {
    if (data !== undefined && data !== '' && data !== null) {
      // callback when data is exist
      callback(data)
    }
  })
}

export function countByAlbumIdAndName(param, callback) {
  axios.post(countByAlbumIdAndNameUrl, param).then(data => {
    if (data !== undefined && data !== '' && data !== null) {
      // callback when data is exist
      callback(data)
    }
  })
}

export function save(param, callback) {
  axios.post(saveUrl, param).then(data => {
    if (data !== undefined && data !== '' && data !== null) {
      // callback when data is exist
      callback(data)
    }
  })
}

export function enableById(param, callback) {
  axios.post(enableByIdUrl, param).then(data => {
    if (data !== undefined && data !== '' && data !== null) {
      // callback when data is exist
      callback(data)
    }
  })
}

export function disableById(param, callback) {
  axios.post(disableByIdUrl, param).then(data => {
    if (data !== undefined && data !== '' && data !== null) {
      // callback when data is exist
      callback(data)
    }
  })
}


