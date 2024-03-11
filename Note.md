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

仓库统一管理
- pinia独立维护
  初始化代码在main.ts中,仓库代码在stores中,代码分散职能不单一
  优化:由stores统一维护,在stores/index.ts中完成pinia初始化,交付main.ts使用
- 仓库统一导出
  使用一个仓库 import { useUserStore } from './stores/user' 不同仓库路径不一致
  优化:由stores/index.ts 统一导出,导入路径统一 `./stores`,而且维护仓库在stores/modules中