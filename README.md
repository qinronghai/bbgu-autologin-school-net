# python实现校园网自动登录

## 本小项目的由来

因为我们学校每天晚上11点都会断网，所以第二天想用网络必须手动登录一下校园网。有时候早上起来没开电脑，就没有登录校园网，然后就没有wifi可以使用。

而且很懒得每天都要点击那么几下登录校园网，所以立了这小项目。

## 我想要的需求

1. 每天早上6点30左右电脑自动开机。（晚上可以不用关机，使用待机应该也可以）
2. 电脑每天定时自动登录校园网----windows自带的任务计划实现。

## 如何实现电脑定点开机

常见的实现方法：

1. `bios`中的电源管理实现

    忙活查了一些教程，笔记本实现不了自动定时开机，没有`Resume by Alarm`功能。

2. 智能插座通电后自动开机

    这是打了联想的人工（小哥人很好），得知的另一种方法。但是我这台联想小新也实现不了 。

一般到这，基本上没什么别的方法了，是不是改放弃了？不是的，既然笔记本电脑无法定时开机，只能退一步另想别的方法了。

## 登录原理

只需要模拟登录操作，即发送请求即可。我们学校只需要发送一个get请求（我记得去年还是post）即可。是很简单的，大佬勿笑。

## 如何查看自己的登录信息

这部分是必须。

打开[湾大校园网络认证系统](http://10.0.9.35/a79.htm?wlanuserip=10.208.28.190&wlanacname=ME60&wlanacip=10.0.9.33)，未登录状态下按下`F12`打开调试工具，找到Network选项卡。
![image.png](https://pic.rmb.bdstatic.com/bjh/892caaaf15974f61d967a8308d2cfe7d.png)
随后输入密码，点击下面这个查看Payload对应代码部分的个人登录信息
![image.png](https://pic.rmb.bdstatic.com/bjh/e686a7e0775a8770fa3067ba0e436dfb.jpeg)
查看Headers对应代码部分的填充请求头信息
![image.png](https://pic.rmb.bdstatic.com/bjh/0445077b2fa5a33b0bb24a01f607147d.jpeg)

按照上面的部分修改代码即可

## 代码部分

- 需要能运行python的环境

```python
import base64 #.bat文件需要引入
import requests

# 登录地址url
url = "http://10.0.9.35:801/eportal/"

# 填充请求头信息
get_headers = {
    'Accept': '*/*',
    'Accept-Encoding': 'gzip,deflate',
    'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8',
    'Connection': 'keep-alive',
    'Cookie': 'xxxxxxxxxxxxxxx',
    'Host': '10.0.9.35:801',
    'Referer': 'xxxxxxxx',
    'User-Agent': 'xxxxxxxxxxxxxxxxxxxxxxxx',
}

# 个人登录数据
person_data = {
    'c': 'Portal',
    'a': 'login',
    'callback': 'dr1004',
    'login_method': '1',
    'user_account': ',0,xxxxxxxxxx@telecom',
    'user_password': 'xxxxxxx',
    'wlan_user_ip': 'xxxxxxxxxxx',
    'wlan_user_ipv6': '',
    'wlan_user_mac': '000000000000',
    'wlan_ac_ip': 'xxxxxxxxxx',
    'wlan_ac_name': 'ME60',
    'jsVersion': '3.3.3',
}

# 解决了“[WinError 10061] 由于目标计算机积极拒绝，无法连接。”的问题--在这个问题上花了很长的时间。
# 禁用代理 ***
proxies = {"http": None, "https": None}

# 发送get请求登录网页
res = requests.get(url=url, headers=get_headers,
                    params=person_data, proxies=proxies)

response = res.status_code
if response == 200:
    print("连接成功 响应码为{}".format(response))
else:
    print("连接失败 响应码为{}".format(response))
```

基于这python的代码脚本，本次小项目的核心部分完成了。那么可以有多少种实现方案呢？

## 准自动化实现登录

### 批处理.bat运行Python脚本

新建后缀名为`.bat`的文件，放入与上面autologin.py文件相同的目录，输入以下内容即可。

```bat
  @echo off
  python autologin.py
```

把图中的文件放到桌面点击就行，或者右键创建快捷方式。

![image.png](https://pic.rmb.bdstatic.com/bjh/aee8fba820e5ef61f84effa0bd9ff8aa.jpeg)

### Windows任务计划程序

给一篇参考，前面的基本操作都一样，不一样的我都在下面放图了。
<https://blog.csdn.net/sinat_37967865/article/details/81838113>

![image.png](https://pic.rmb.bdstatic.com/bjh/c57652369a8f8c3c902b51a2ece3bee8.jpeg)

![image.png](https://pic.rmb.bdstatic.com/bjh/2842e0af876d3e79a00c6d62564dfb31.jpeg)

### Quicker快捷实现

首先你的电脑得下载Quicker这个软件，然后看看它的使用教程，网上有很多，这里不在赘述。

Quicker官网：<https://getquicker.net/>

#### 添加到动作库

![image.png](https://pic.rmb.bdstatic.com/bjh/6e0d6fe080b5094fc64b9f1208e0ae7a.jpeg)
![image.png](https://pic.rmb.bdstatic.com/bjh/b13a1be7c530394f62db8c9a46bbd54c.jpeg)
添加好之后就可以中建点击动作启动了
![image.png](https://pic.rmb.bdstatic.com/bjh/8b6cba6b24fb679439c7755badbbde3d.jpeg)

## 最后

目前到这只完成了准自动化，也就是还要双击一下的。看了很多文章，可以用手机等实现，但是时间成本太高，懒得学了，以后再说吧。

此小项目已上传GitHub，下载之后修改一下就可以用了。

## 参考

1. [python requests 由于目标计算机积极拒绝，无法连接](https://codeantenna.com/a/at2eaS6i4D) 感谢这篇文章：解决了困扰我很久的“[WinError 10061] 由于目标计算机积极拒绝，无法连接。”的问题
2. [校园网自动登录全平台解决方案](https://zhuanlan.zhihu.com/p/364016452)
3. [实现校园网自动化登录 ——Python/cURL 脚本 + 任务计划 / Tasker&Termux（Windows/Android)/Selenium](https://yharea.com/421)
