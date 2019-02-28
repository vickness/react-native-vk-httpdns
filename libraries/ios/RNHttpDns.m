
#import "RNHttpDns.h"
#import "AlicloudHttpDNS.h"

@interface RNHttpDns ()
@property(strong,nonatomic)HttpDnsService *httpDnsService;
@end

@implementation RNHttpDns

/** 导出模块名*/
RCT_EXPORT_MODULE()

/** 导出SET方法*/
RCT_EXPORT_METHOD(getService:(int)accountID secretKey:(NSString *)secretKey) {
    self.httpDnsService = [[HttpDnsService alloc] initWithAccountID:accountID secretKey:secretKey];
}

RCT_EXPORT_METHOD(setAuthCurrentTime:(NSUInteger)authCurrentTime) {
    [self.httpDnsService setAuthCurrentTime:authCurrentTime];
}

RCT_EXPORT_METHOD(setCachedIPEnabled:(BOOL)enable) {
    [self.httpDnsService setCachedIPEnabled:enable];
}

RCT_EXPORT_METHOD(setPreResolveHosts:(NSArray *)hosts) {
    [self.httpDnsService setPreResolveHosts:hosts];
}

RCT_EXPORT_METHOD(setHTTPSRequestEnabled:(BOOL)enable) {
    [self.httpDnsService setHTTPSRequestEnabled:enable];
}

RCT_EXPORT_METHOD(setExpiredIPEnabled:(BOOL)enable) {
    [self.httpDnsService setExpiredIPEnabled:enable];
}

RCT_EXPORT_METHOD(setLogEnabled:(BOOL)enable) {
    [self.httpDnsService setLogEnabled:enable];
}

RCT_EXPORT_METHOD(setPreResolveAfterNetworkChanged:(BOOL)enable) {
    [self.httpDnsService setPreResolveAfterNetworkChanged:enable];
}

/** 异步获取格式化IP，使用Promises封装*/
RCT_EXPORT_METHOD(getIpByHostAsyncInURLFormat:(NSString *)host
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject) {

    //开启异步操作
    dispatch_async(dispatch_get_global_queue(DISPATCH_QUEUE_PRIORITY_DEFAULT, 0), ^{
        
        //创建请求URL
        NSURL *url = [NSURL URLWithString:host];
        
        //异步解析接口，首先查询缓存，若存在则返回结果，若不存在返回空对象并且进行异步域名解析更新缓存
        NSString *ip = [self.httpDnsService getIpByHostAsyncInURLFormat:url.host];
        //地址存在，直接返回
        if (ip) { resolve(ip); return; }
    
        //如果IP地址不存在，创建同步请求获取
        NSURLRequest *request = [NSURLRequest requestWithURL:url];
        [NSURLConnection sendSynchronousRequest:request returningResponse:NULL error:NULL];
        
        //请求完成，再获取一次IP，并返回结果
        ip = [self.httpDnsService getIpByHostAsyncInURLFormat:url.host];
        ip ? resolve(ip) : reject(@"0", @"Get IP failed!", [NSError new]);
    });
}

@end

