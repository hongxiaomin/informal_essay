# Webpack之配置说明
>webpack通过一个配置对象来操作，有两种方式来传递这个对象：
### CLI
如果你使用CLI，webpack会默认读取webpack.config.js（或者通过 -- config选项指向读取文件），该文件需要导出一个配置对象。
``` 
module.exports = {
    //configuration
}
```
### node.js API
如果使用node.js API 需要将配置对象当做参数传递
``` 
webapck({
    //configuration
},callbcak);
```
### 多个配置对象
在这两种方法里面，你都可以使用一个配置对象数组来并行的执行。他们共享数据缓存，和监听器，这样比多次执行webpack效率更高。
### 配置对象内容
>提示：记住不要拘泥于在配置对象里面写纯JSON对象，
>可以使用你想使用的任何js方法,
>它仅仅是一个nodejs模块罢了。

简单的例子：
``` 
{
    context:__dirname+"/app",
    entry:"./entry",
    output:{
        path:__dirname+"/dist",
        filename:"bundle.js"
    }
}
```
- context
>用于解析entry选项的基础目录（绝对路径），如果output.pathinfo设置了，就包含了缩短过的目录；
(相当于公共目录，下面所有的目录都在这个公共目录下面)
默认：precess.cwd()
- entry bundle的入口点。
    * 如果传入一个字符串，这个字符串就会被解析为启动时加载的模块。
    * 如果传入个数组，所有模块都是启动时加载，模块导出到最后一个里面
    ``` 
    entry:["./entry1","./entry2"]
    ```
    * 如果传入一个对象，就会创建多个输入包文件，对象键值就chunk的name，值可以是字符串或者是数组。
    ``` 
    {
        entry:{
            page1:"./page1",
            page2:["./entry1","./entry2"]
        },
        output:{
        //当使用多入口文件时候，要确保在output.filename使用[name]或者[id]
        filename:"[name].bundle.js",
        chunkFilename:"[id].bundle.js"
        }
    }
    ```
    >注意：没有别的专门来配置入口点的选项。如果你需要一个专门来配置入口点的配置对象，你需要用到多个配置对象。
- output
output是影响编译输出的选项。output选项告诉webpack怎么把编译文件写入磁盘。注意，虽然可以有很多输入口，但是只有一个输出配置
如果使用了哈希（[hash]或者[chunkhash]),需要确保有一个一致的模块顺序。使用OccurenceOrderPlugin插件或者recordsPath。
- output.filename
指定输出到硬盘的文件的文件名。这里不能是一个绝对的路径！output.path会确定该文件的存在硬盘路径的。filename仅仅用来给每个文件命名而已。
##### 单一入口
``` 
{
    entry:'./src/app.js',
    output:{
        filename:'bundle.js',
        path:'./built'
    }
}
//写入磁盘 ./built/bundle.js
```
##### 多入口
如果你的配置创建了多于一个的“chunk”（也就是带有多个入口点，或者使用了CommonsChunkPlugin这样的插件），你应该使用替换符来为每一个文件命名一个名字
[name]被chunk的名字替换
[hash]被编译器hash替换。
[chunkhash]被chunk的hash替换
``` 
{
    entry:{
        app:"./src/app.js",
        search:"./src/search.js"
    },
    output:{
        filename:'[name].js',
        path:__dirname+'/built'
    }
}
//写入磁盘：./built/app.js, ./built/search.js
```
* output.path
绝对路径（required）
[hash]被编译后文件hash替换.
* output.publicPath
>publicPath制定了一个在浏览器中被引用的url地址。
对于使用script和link加载器，当文件路径不同于他们的本地磁盘路径（由path指定）时候publicPath被用来作为href或者url指向该文件。
这种做法在你需要将静态文件放在不同的域名或者CDN上面的时候是很有用的。
Webpack Dev Server也是用这个方式来读取文件的。
与path搭配使用上[hash]就可以做好缓存方案了。

config.js
``` 
output:{
    path:"/home/proj/public/assets",
    publicPath:"/assets/"
}
```
index.html
``` 
<head>
    <link href='/assets/spinner.gif'>
</head>
```
使用CDN和hash的例子
config.js
``` 
output:{
    path:"/home/proj/cdn/assets/[hash]"，
    publicPath:"http://cdn.example.com/assets/[hash]"
    }
```
>注：万一最终输出文件的publicPath在编译的时候不知道，那么你可以不填，动态的在运行时添加也可以。
如果在编译过程你不知道publicPath你可以忽略它，然后在你的入口文件里面添加上这个字段就可以了_webpack_public_path_.
``` 
_webpack_public_path_=myRuntimePublicPath
```
- output.chunkFilename
非入口chunk的文件名，作为一个相对路径放到output.path里。
[id]替换chunk的id.
[name]替换chunk的名字（or如果没有名字就用id替换）。
[hash]替换编译的hash。
[chunkhash]替换chunk的hash。
- output.sourceMapFilename
js文件的sourceMap的文件名，也同样在output.path路径下面。
[file]替换js文件的文件名。
[id]替换chunk的id
[hash]替换编译的hash.
``` 
默认：[file].map
```
- output.devtoolModuleFilenameTemplate

### module
影响标准module的选项（NormalModuleFactory）
#### module.loaders
自动引用的加载器的数组。
每个元素有这些选项：
- test：必须满足的条件
- exclude：不满足的条件
- include：必须满足条件
- loader：用“！”隔开多个loader
- loaders：多个loader
``` 
module:{
    loaders:[
        {
            test:/\.jsx$/,// "test" is commonly used to match the file extension
            include:[// "include" is commonly used to match the directories
                path.resolve(__dirname,"app/src"),
                path.resolve(__dirname,"app/test")
            ],
            // "exclude" should be used to exclude exceptions
            // try to prefer "include" when possible
            loader:"babel-loader"
        }
    ]
}
```





