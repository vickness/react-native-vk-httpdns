/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import HttpDns from './libraries/index';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

const host1 = "http://www.aliyun.com";
const host2 = "http://gw.alicdn.com";
const host3 = "http://www.taobao.com";

type Props = {};
export default class App extends Component<Props> {

  componentDidMount(): void {

    //配置HTTPDNS解析
    HttpDns.getService("139450")
        .setPreResolveHosts([host1, host2, host3])
        .setCachedIPEnabled(true)
        .setHTTPSRequestEnabled(true)
        .setLogEnabled(false)
        .setExpiredIPEnabled(false)
        .setPreResolveAfterNetworkChanged(false);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>阿里云HttpDns测试Demo</Text>

        <TouchableOpacity onPress={() => {this._onPressGetIP(host1)}}>
          <Text style={styles.instructions}>{`域名：${host1} -- 点击获取IP地址`}</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => {this._onPressGetIP(host2)}}>
          <Text style={styles.instructions}>{`域名：${host2} -- 点击获取IP地址`}</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => {this._onPressGetIP(host3)}}>
          <Text style={styles.instructions}>{`域名：${host3} -- 点击获取IP地址`}</Text>
        </TouchableOpacity>
      </View>
    );
  }

  //获取IP地址
  _onPressGetIP = (host) => {

    HttpDns.getIpByHostAsyncInURLFormat(host)
        .then(res => {

          alert(res);

        }).catch(error => {

          alert("ip地址获取失败");

    });
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
      marginVertical: 20
  },
});
