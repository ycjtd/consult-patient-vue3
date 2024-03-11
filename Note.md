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

请求工具-axios配置  文件 utils/request.ts
- axios配置
  创建axios实例  基准地址,超时时间
  请求拦截器 携带token
  响应拦截器 业务失败处理,摘取核心响应数据,401处理
- 请求函数
  函数封装 简化传参逻辑
  添加类型 设置响应数据类型

封装请求工具函数
  不用传配置对象
  不用区分data和params函数内判断

登录
- 创建登录组件
- 配置路由
- 设置路由出口  App.vue

组件自动注册
使用Vant组件比较麻烦，需要先导入组件才可使用
如何实现？
安装组件:pnpm add unplugin-vue-components -D
配置 vite.config.ts
优化点：
- 解决类型声明文件重复
- 解决样式引入重复


CpNavBar封装
- 结构与样式
  基于Vant组件二次封装，实现组件结构，覆盖组件样式
  固定定位，左侧箭头，标题，右侧文字
- 功能实现
  支持标题和右侧文字，提供右侧文件按钮事件，实现返回功能
    回退功能：有访问记录就正常回退 router.back()
            没有访问历史记录就跳转到首页 router.push('/')
- 组件类型
  提供组件类型文件，让组件有类型提示


登录
- 重置样式
- 准备页面
- 定制表单
  
表单校验
- 校验手机号
- 校验密码
- 表单整体校验
- 勾选协议进行校验

密码登录
- 登录API函数
- 进行登录
- 存储用户信息
- 成功提示
- 是否有回跳地址 如果有，根据地址回跳，如果没有，跳转到个人中心

短信登录
- 切换界面
  标题和按钮切换
  表单项切换
- 发送短信验证码
  发送前校验
  验证码API函数
  发送&提示
  倒计时&展示
- 验证码校验
- 短信登录
  短信登录API
  合并短信登录

图标组件-打包svg地图
图片格式是png的：合成精灵图，根据定位使用
图片格式是svg的：是xml格式，打包成svg地图，通过ID使用，一次加载，动态使用图片无需import
安装插件 pnpm install vite-plugin-svg-icons -D
配置vite.config.ts

使用svg实现登录输入密码是否可见

Tabbar组件
- tabbar组件
- 支持路由切换
- 自定义图标
- 图标切换

访问权限控制
- 全局前置守卫变化
  next现在可选，next() 放行，next('/login') 跳转到指定路由(重定向)
  返回 false 取消
  返回true | undefined 放行
  返回路由地址（对象格式）重定向
- 访问权限控制实现
  路由跳转
  没有token且不在白名单 重定向到登录，否则放行