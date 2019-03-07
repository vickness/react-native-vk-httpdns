
<div align="center">
<img src="./assets/httpdns_logo.png">
</div>

# react-native-vk-httpdns

阿里云HTTPDNS使用HTTP协议进行域名解析，代替现有基于UDP的DNS协议，域名解析请求直接发送到阿里云的HTTPDNS服务器，从而绕过运营商的Local DNS，能够避免Local DNS造成的域名劫持问题和调度不精准问题。

- iOS_Demo对应目录：[httpdns_ios_demo](https://github.com/aliyun/alicloud-ios-demo/tree/master/httpdns_ios_demo)
- Android_Demo对应目录：[httpdns_android_demo](https://github.com/aliyun/alicloud-android-demo/tree/master/httpdns_android_demo)
- 产品官网：[地址](https://www.aliyun.com/product/httpdns)

## 安装

```
$ npm install react-native-vk-httpdns --save

$ yarn add react-native-vk-httpdns
```


### 自动配置

`$ react-native link react-native-vk-httpdns`

### 手动配置


#### iOS

1. In XCode, in the project navigator, right click `Libraries` ➜ `Add Files to [your project's name]`
2. Go to `node_modules` ➜ `react-native-vk-httpdns` and add `RNHttpDns.xcodeproj`
3. In XCode, in the project navigator, select your project. Add `libRNHttpDns.a` to your project's `Build Phases` ➜ `Link Binary With Libraries`
4. Run your project (`Cmd+R`)<

#### Android

1. Open up `android/app/src/main/java/[...]/MainActivity.java`
  - Add `import com.reactlibrary.RNHttpDnsPackage;` to the imports at the top of the file
  - Add `new RNHttpDnsPackage()` to the list returned by the `getPackages()` method
2. Append the following lines to `android/settings.gradle`:
  	```
  	include ':react-native-vk-httpdns'
  	project(':react-native-vk-httpdns').projectDir = new File(rootProject.projectDir, 	'../node_modules/react-native-vk-httpdns/android')
  	```
3. Insert the following lines inside the dependencies block in `android/app/build.gradle`:
  	```
      compile project(':react-native-vk-httpdns')
  	```
  	
### 其他配置

1. iOS add the following libraries to your "Link Binary with Libraries":

- [x] `SystemConfiguration.framework`
- [x] `CoreTelephony.framework`
- [x] `libsqlite3.0`
- [x] `libresolv`

2. Android append the following lines to android/build.gradle:
    ```
    allprojects {
        repositories {
            maven {
                url 'http://maven.aliyun.com/nexus/content/repositories/releases/'
            }
        }
    }
    ```


## Usage
```javascript
import RNHttpDns from 'react-native-vk-httpdns';
```
```javascript
const host = "http://www.aliyun.com";

//配置HttpDns
HttpDns.getService("139450")
        .setPreResolveHosts([host])
        .setCachedIPEnabled(true)
        .setHTTPSRequestEnabled(true)
        .setLogEnabled(false)
        .setExpiredIPEnabled(false)
        .setPreResolveAfterNetworkChanged(false);

//获取IP地址
HttpDns.getIpByHostAsyncInURLFormat(host)
        .then(res => {
            
            console.log("当前域名的IP地址："+res);
          
        }).catch(error => {
            
            console.log(error);
          
        });
```


## License

MIT
