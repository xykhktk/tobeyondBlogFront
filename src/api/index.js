// import request from '../utils/request';

// export const fetchData = (query) => {
//     return request({
//         url: '/ms/table/list',
//         method: 'post',
//         data: query
//     })
// }

const baseApiURL = 'http://127.0.0.1:8080/';
const baseWebSocketUrl = 'ws://127.0.0.1:8080/';
// const baseApiURL = 'http://129.204.35.90/';

export default {
  baseApiURL,baseWebSocketUrl
}