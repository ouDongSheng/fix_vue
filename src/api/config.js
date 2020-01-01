
const url = 'http://localhost:8087/ende/';
const WX_APP_ID = 'wx1eb341844faf9f84';
const LOGIN_TIMEOUT = 2; //登陆超时时间,2天,当超过1天请求接口的时候就需要刷新token
const myIp = 'http://localhost/'

export default {
    url,
    WX_APP_ID,
    LOGIN_TIMEOUT,
    myIp
}
