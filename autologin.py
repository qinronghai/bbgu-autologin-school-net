import base64
import requests


# 登录地址url
url = "http://10.0.9.35:801/eportal/"

# 填充头部信息
get_headers = {
    'Accept': '*/*',
    'Accept-Encoding': 'gzip,deflate',
    'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8',
    'Connection': 'keep-alive',
    'Cookie': 'PHPSESSID=k7dm30pk48gacbjs2s7uk27ms8',
    'Host': '10.0.9.35:801',
    'Referer': 'http://10.0.9.35/',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) '
    'Chrome/99.0.4844.51 Safari/537.36',
}

# 个人登录数据
person_data = {
    'c': 'Portal',
    'a': 'login',
    'callback': 'dr1004',
    'login_method': '1',
    'user_account': ',0,1804421304@telecom',
    'user_password': '110979',
    'wlan_user_ip': '10.208.28.166',
    'wlan_user_ipv6': '',
    'wlan_user_mac': '000000000000',
    'wlan_ac_ip': '10.0.9.33',
    'wlan_ac_name': 'ME60',
    'jsVersion': '3.3.3',


}

# 解决了“[WinError 10061] 由于目标计算机积极拒绝，无法连接。”的问题--在这个问题上花了很长的时间。
proxies = {"http": None, "https": None}

# 发送post请求登录网页
res = requests.get(url=url, headers=get_headers,
                   params=person_data, proxies=proxies)
# print(res.json())
response = res.status_code
if response == 200:
    print("连接成功 响应码为{}".format(response))
else:
    print("连接失败 响应码为{}".format(response))
