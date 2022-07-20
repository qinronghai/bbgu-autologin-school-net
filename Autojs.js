// 登录地址
let url = "http://10.0.9.35:801/eportal/";

let get_headers = {
  Accept: "*/*",
  Connection: "keep-alive",
  Cookie: "xxxxxxxxxxxxxxx",
  Host: "10.0.9.35:801",
  Referer: "xxxxxxxx",
  "Accept-Language": "zh-CN,zh;q=0.9,en;q=0.8",
  "Accept-Encoding": "gzip,deflate",
  "User-Agent": "xxxxxxxxxxxxxxxxxxxxxxxx",
};

let userData = {
  c: "Portal",
  a: "login",
  callback: "dr1004",
  login_method: "1",
  user_account: ",0,1804421304@telecom",
  user_password: "110979",
  wlan_user_ipv6: "",
  wlan_user_mac: "000000000000",
  wlan_user_ip: "xxxxxxxxxxx", // TODO
  wlan_ac_ip: "xxxxxxxxxx",
  wlan_ac_name: "ME60",
  jsVersion: "3.3.3",
};

let GET = http.request(url, {
  method: "GET",
  headers: get_headers,
  contentType: "application/x-www-form-urlencoded; charset=UTF-8",
  body: userData,
});

GET.body.string; // TODO 回学校再完善吧
