移动端适配

- 安装插件
  pnpm i postcss-px-to-viewport -D
- 配置
  创建postcss.config.js文件
  ```
  module.exports = {
  plugins: {
    'postcss-px-to-viewport': {
      viewportWidth: 375
    }
  }
  }
  ```

自定义主题
- 在main.scss中
  ```
    // 全局css变量 使用场景:项目主题
    :root {
      --main-color: red;
    }
    //局部css变量 使用场景:组件变量
    .footer {
      --footer-color: green;
    }
  ```
- 使用
  color: var(--main-color);


用户仓库和持久化
- 设置用户信息类型(参考后端返回的字段)
- 实现仓库,用户状态,设置用户,删除用户
- 进行测试
- 持久化
  pnpm i pinia-plugin-persistedstate