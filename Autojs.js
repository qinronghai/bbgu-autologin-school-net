const axios = require("axios");
// 登录地址
let url = "http://10.0.9.35:801/eportal/";

let get_headers = {
  Accept: "*/*",
  "Accept-Encoding": "gzip,deflate",
  "Accept-Language": "zh-CN,zh;q=0.9,en;q=0.8",
  Connection: "keep-alive",
  Cookie: "PHPSESSID=k7dm30pk48gacbjs2s7uk27ms8",
  Host: "10.0.9.35:801",
  Referer: "http://10.0.9.35/",
  "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36",
};

let userData = {
  c: "Portal",
  a: "login",
  callback: "dr1004",
  login_method: "1",
  user_account: ",0,1804421304@telecom",
  user_password: "110979",
  wlan_user_ip: "10.208.28.166",
  wlan_user_ipv6: "",
  wlan_user_mac: "000000000000",
  wlan_ac_ip: "10.0.9.33",
  wlan_ac_name: "ME60",
  jsVersion: "3.3.3",
};

/* let GET = http.request(url, {
  method: "GET",
  headers: get_headers,
  contentType: "application/x-www-form-urlencoded; charset=UTF-8",
  body: userData,
}); */

axios
  .get(url, {
    params: userData,
    headers: get_headers,
  })
  .then(function (response) {
    // 处理成功情况
    console.log(response, "成功");
  })
  .catch(function (error) {
    // 处理错误情况
    console.log(error);
  });

// GET.body.string; // TODO 回学校再完善吧
