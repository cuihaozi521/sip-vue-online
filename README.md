# api-console

> api-console for vue2

## 安装工程环境

``` bash
# install dependencies
npm install
```

## 启动开发环境

``` bash
# 启动开发环境，webserver: http://localhost:9596
npm start
```

## 发布(build)

``` bash
# 发布
npm run build
```

## 其他

``` bash
# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

## 相关资料

- [https://dev.bingocc.com:8443/mvue/](https://dev.bingocc.com:8443/mvue-doc/)
- [vue文档](https://cn.vuejs.org/v2/guide/)
- [Vue Router](https://router.vuejs.org/zh/)
- [iview](https://www.iviewui.com/)
- [Vuex](https://vuex.vuejs.org/zh/)
- [vuex-class](https://github.com/ktsn/vuex-class/)
- [vue-class-component](https://github.com/vuejs/vue-class-component)
- [vue-property-decorator](https://github.com/kaorun343/vue-property-decorator)
- [lodash](https://lodash.com/docs/)

## 使用 TypeScript

- 安装typescript 2.x
- 安装ts-loader 3.x
- build\webpack.base.conf.js配置：

```javascript

...
vueLoaderConfig.ts = 'ts-loader';
...

  module: {
    rules: [
    //在vue-loader之前
      {
        test: /\.ts$/,
        exclude: /node_modules|vue\/src/,
        loader: "ts-loader"
      }
      ...


```

## 按router配置分片打包

- 修改build\auto-router.js的writeJs方法内容

```javascript
// routes=routes.replace(/\"##require_placeholder_begin##/g,'require').replace(/##require_placeholder_end##\"/g,'');
    
    routes=routes.replace(/\"##require_placeholder_begin##/g,`function (cb) {
        require.ensure([], function () {
            cb(require`).replace(/\'\)##require_placeholder_end##\"/g,`.vue'));
        });
    }`);
```


## 将pages下所有的shared目录不添加进router表

- 修改build\auto-router.js内容

```javascript

...
function run(devMode){
    ...
    let tmList = [];
    const sharedReg = /\/shared\//i;
    routes.forEach(function(item){
        if (!sharedReg.test(item.path)) tmList.push(item);
    });
    routes = tmList;

    writeJs(pagesPath,JSON.stringify(routes,(key,value)=>{
    ...
    }
    ....
}
```