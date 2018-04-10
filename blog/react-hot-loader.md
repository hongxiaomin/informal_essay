# webpack配置react-hot-loader热加载局部更新
>有人会问webpack-dev-server已经是热加载了，能做到只要代码修改了页面也自动更新了，为什么在react项目还要安装react-hot-loader呢？
其实这两者的更新是有区别的，webpack-dev-server的热加载是开发人员修改了代码，代码经过打包，重新刷新了整个页面。
而react-hot-loader不会刷新整个页面，它只替换了修改的代码，做到了页面的局部刷新。但它需要依赖webpack的HotModuleReplacement热加载插件。

下面来说说怎么来配置react-hot-loader。
### 步骤1：
安装react-hot-loader
``` 
 你怕吗install --save-dev react-hot-loader
```
### 步骤2：
在webpack.config.js的entry值里加上react-hot-loader/patch,一定要写在entry的最前面，如果有babel-polyfill就写在babel-polyfill的后面。
``` 
entry:[
        'babel-polyfill',
        'react-hot-loader/patch',//设置这里
        __dirname+'/app/main.js'
    ]
```
### 步骤3：
在webpack.config.js中设置devServer的hot为true
``` 
devServer:{
        contentBase:'./build',
        port:'1188',
        historyApiFallback:true,
        inline:true,
        hot:true,//设置这里
    }
```
### 步骤4：
在.babelrc里添加plugin
``` 
{
"presets":['es2015','react'],
"plugins":["react-hot-loader/babel"]//设置这里
}
```
### 步骤5：
在webpack.config.js的plugins里添加依赖的HotModuleReplacement插件
``` 
plugns:[
    new HtmlWebpackPlugin({
        template:__dirname+"/app/index.tmpl.html"
    }),
    new webpack.HotModuleReplacementPlugin()//设置这里
    ]
```
### 步骤6：
最后这个操作就是在页面的主入口，比如main.js添加这些代码
``` 
import React from 'react';
import ReactDOM from 'react-dom';
import Greeter from './greeter';
import './main,css';
import {AppContainer} from 'react-hot-loader';//设置这里

const render = (App)=>{
    ReactDOM.render(
        <AppContainer>
            <App/>
        </AppContainer>,
        document.getElementById('root')
    )
}
render(Greeter);

//Hot Module Replacement API
if(module.hot){
    module.hot.accept('./greeter',()=>{
        render(require('./greeter').default)
    })
}
```