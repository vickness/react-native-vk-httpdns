
# react-native-http-dns

## Getting started

`$ npm install react-native-http-dns --save`

### Mostly automatic installation

`$ react-native link react-native-http-dns`

### Manual installation


#### iOS

1. In XCode, in the project navigator, right click `Libraries` ➜ `Add Files to [your project's name]`
2. Go to `node_modules` ➜ `react-native-http-dns` and add `RNHttpDns.xcodeproj`
3. In XCode, in the project navigator, select your project. Add `libRNHttpDns.a` to your project's `Build Phases` ➜ `Link Binary With Libraries`
4. Run your project (`Cmd+R`)<

#### Android

1. Open up `android/app/src/main/java/[...]/MainActivity.java`
  - Add `import com.reactlibrary.RNHttpDnsPackage;` to the imports at the top of the file
  - Add `new RNHttpDnsPackage()` to the list returned by the `getPackages()` method
2. Append the following lines to `android/settings.gradle`:
  	```
  	include ':react-native-http-dns'
  	project(':react-native-http-dns').projectDir = new File(rootProject.projectDir, 	'../node_modules/react-native-http-dns/android')
  	```
3. Insert the following lines inside the dependencies block in `android/app/build.gradle`:
  	```
      compile project(':react-native-http-dns')
  	```

#### Windows
[Read it! :D](https://github.com/ReactWindows/react-native)

1. In Visual Studio add the `RNHttpDns.sln` in `node_modules/react-native-http-dns/windows/RNHttpDns.sln` folder to their solution, reference from their app.
2. Open up your `MainPage.cs` app
  - Add `using Http.Dns.RNHttpDns;` to the usings at the top of the file
  - Add `new RNHttpDnsPackage()` to the `List<IReactPackage>` returned by the `Packages` method


## Usage
```javascript
import RNHttpDns from 'react-native-http-dns';

// TODO: What to do with the module?
RNHttpDns;
```
  