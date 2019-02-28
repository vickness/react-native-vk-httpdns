
import { NativeModules } from 'react-native';

const { RNHttpDns } = NativeModules;

export default class HttpDns {


    /**
     * 注册服务
     * @param accountID 账户ID，数字
     * @param secretKey 密钥，字符串
     * */
    static getService(accountID, secretKey) {
        RNHttpDns.getService(accountID, secretKey);
        return this;
    }


    /**
     * 是否允许启用持久化缓存功能
     * 该功能旨在提升首屏加载速度，但持久化缓存会将上一次解析到的结果保存到本地持久层，
     * app重启后，如果启动持久化缓存会优先从持久层加载解析结果。
     * 所以存在第一次使用的ip为过期ip（ttl过期，大多数情况下该ip依然可以正常使用）的可能性。
     * 如果业务服务器ip变化较频繁，建议谨慎接入该功能，以免对业务造成影响。
     * 另外，持久化缓存影响 首次启动 / 网络切换 后域名解析结果，后续解析仍会请求httpdns服务器，并更新本地缓存。
     * */
    static setCachedIPEnabled(enable) {
        RNHttpDns.setCachedIPEnabled(enable);
        return this;
    }


    /**
     * 将app使用到的域名预设进来，以便于HTTPDNS 进行预解析
     * */
    static setPreResolveHosts(hosts) {
        RNHttpDns.setPreResolveHosts(hosts);
        return this;
    }


    /**
     * 设置是否通过HTTPS协议解析域名，默认通过HTTP协议解析
     * */
    static setHTTPSRequestEnabled(enable) {
        RNHttpDns.setHTTPSRequestEnabled(enable);
        return this;
    }


    /**
     * 是否允许HTTPDNS返回TTL过期的域名
     * 当您允许返回TTL过期的IP时，SDK在实时返回过期IP的同时依然会进行异步更新以获取最新的IP信息
     * */
    static setExpiredIPEnabled(enable) {
        RNHttpDns.setExpiredIPEnabled(enable);
        return this;
    }


    /**
     * 是否允许HTTPDNS打印Log
     * */
    static setLogEnabled(enable) {
        RNHttpDns.setLogEnabled(enable);
        return this;
    }


    /**
     * 校正App签名时间
     * @param time time为epoch时间戳，1970年1月1日以来的秒数
     * */
    static setAuthCurrentTime(time) {
        RNHttpDns.setAuthCurrentTime(time);
        return this;
    }


    /**
     * 设置网络切换时是否自动刷新所有域名解析结果，
     * 如果打开此开关，在网络切换时，会自动刷新所有域名的解析结果，但会产生一定流量消耗
     * */
    static setPreResolveAfterNetworkChanged(enable) {
        RNHttpDns.setPreResolveAfterNetworkChanged(enable);
        return this;
    }


    /**
     * 异步解析接口, 获取ip列表，首先查询缓存，若存在则返回结果，若不存在返回长度为0 的String 数组并且进行异步域名解析更新缓存。
     * */
    static getIpByHostAsyncInURLFormat(host) {
        return RNHttpDns.getIpByHostAsyncInURLFormat(host);
    }
}
