
package com.reactlibrary;

import android.util.Log;
import com.facebook.react.bridge.*;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.ArrayList;
import com.alibaba.sdk.android.httpdns.HttpDns;
import com.alibaba.sdk.android.httpdns.HttpDnsService;
import java.io.IOException;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;

public class RNHttpDnsModule extends ReactContextBaseJavaModule {

  private final ReactApplicationContext reactContext;

  private static HttpDnsService httpDnsService;

  public RNHttpDnsModule(ReactApplicationContext reactContext) {
    super(reactContext);
    this.reactContext = reactContext;
  }

  @Override
  public String getName() {
    return "RNHttpDns";
  }


  @ReactMethod
  public void getService(String accountID, String secretKey) {
    httpDnsService = HttpDns.getService(reactContext, accountID, secretKey);
  }

  @ReactMethod
  public void setCachedIPEnabled(boolean enabled) {
    httpDnsService.setCachedIPEnabled(enabled);
  }

  @ReactMethod
  public void setLogEnabled(boolean var1) {
    httpDnsService.setLogEnabled(var1);
  }

  @ReactMethod
  public void setExpiredIPEnabled(boolean var1) {
    httpDnsService.setExpiredIPEnabled(var1);
  }

  @SuppressWarnings("unchecked")
  @ReactMethod
  public void setPreResolveHosts(ReadableArray var1) {

    ArrayList arrayList = var1.toArrayList();
    httpDnsService.setPreResolveHosts(arrayList);
  }

  @ReactMethod
  public void setTimeoutInterval(int var1) {
    httpDnsService.setTimeoutInterval(var1);
  }

  @ReactMethod
  public void setHTTPSRequestEnabled(boolean var1) {
    httpDnsService.setHTTPSRequestEnabled(var1);
  }

  @ReactMethod
  public void setPreResolveAfterNetworkChanged(boolean var1) {
    httpDnsService.setPreResolveAfterNetworkChanged(var1);
  }

  @ReactMethod
  public void getIpByHostAsyncInURLFormat(final String var1, final Promise promise) {

    //创建异步线程
    new Thread(new Runnable() {

      @Override
      public void run() {

        try {

          //创建URL地址
          URL url = new URL(var1);

          //异步获取IP地址
          String ip = httpDnsService.getIpByHostAsync(url.getHost());
          if (ip != null) {
            promise.resolve(ip);
            return;
          }

          //如果没有地址，发送请求获取
          HttpURLConnection connection = (HttpURLConnection) url.openConnection();
          connection.connect();
          connection.getInputStream();
          connection.disconnect();

          //暂停1秒
          //Thread.sleep(1000);

          //再次获取IP地址
          ip = httpDnsService.getIpByHostAsync(url.getHost());
          if (ip != null) {
            promise.resolve(ip);
          } else {
            promise.reject("0", "Get IP failed");
          }

        } catch (IOException e) {
          promise.reject("0", "Get IP failed");
        }
      }
    }).start();

  }
}
