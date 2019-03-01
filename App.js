/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import HttpDns from './libraries/index';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class App extends Component<Props> {

  componentDidMount(): void {

    //预加载域名
    const hosts = ["http://www.baidu.com", "http://www.aliyun.com"];

    //配置HTTPDNS解析
    HttpDns.getService("139450")
        .setPreResolveHosts(hosts)
        .setCachedIPEnabled(true)
        .setHTTPSRequestEnabled(true)
        .setLogEnabled(false)
        .setExpiredIPEnabled(false)
        .setPreResolveAfterNetworkChanged(false);

    HttpDns.getIpByHostAsyncInURLFormat("http://www.aliyun.com")
        .then(res => {
          console.log("当前域名的IP地址："+res);
          alert(res);
        }).catch(error => {
      alert(res);
    });

  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to React Native!</Text>
        <Text style={styles.instructions}>To get started, edit App.js</Text>
        <Text style={styles.instructions}>{instructions}</Text>
      </View>
    );
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
  },
});
