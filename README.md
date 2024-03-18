# 快速开始

```
# 安装依赖
pnpm i

# 运行项目
pnpm dev

# 打包
pnpm build
```

# 项目笔记
以下为我本人在开发项目过程中做的一些记录，希望对你有所帮助。

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


动态设置页面标题
- 路由配置元信息meta中定义标题
- 路由全局后置守卫设置标题给页面，扩展元信息类型

布局容器-加载进度,切换页面的时候现实进度条
- 开启进度条 beforeEach
- 结束进度条 afterEach
  
个人中心
- 用户信息类型
- 用户信息展示
  准备基础结构
  定义API函数
  获取数据
  完成渲染
- 快捷工具
  准备基础结构
  初始化数据
  完成渲染
- 退出登录

家庭档案
- 患者列表
  路由和组件结构  定义患者类型  患者列表API  获取数据渲染
- 添加患者
  v-model语法糖
    子组件：:modelValue和@update:modelValue
  封装单选组件
    组件结构 渲染选项（动态设置可选选项） 选中和切换功能 支持v-model
  侧滑添加弹窗
    popup组件 nav支持关闭 准备表单
  表单数据绑定
    修改类型 数据绑定 支持复选框 重置表单
  表单校验
    表单项校验  提交时校验  性别确认提示  
  实现添加
    添加患者API 进行提交
- 编辑患者
  回填表单 区分标题 编辑患者API 合并编辑
- 删除患者
  删除按钮 删除患者API函数 进行删除

首页
- 搭建页面
  组件基础结构
  知识列表Tab
- 列表加载更多效果
  卡片&列表 VanList组件 模拟加载更多
- 知识列表数据类型
  响应数据类型 请求参数类型 props类型
- 知识列表加载功能
  知识列表API 准备查询参数 加载列表数据 知识卡片渲染
- 推荐关注医生
  提取组件,定义组件基本结构
  van-swipe应用
  添加医生卡片基本结构
  去除指示器,关闭无缝滚动,色值一次滚动一个卡片
- 实现适配
  适配分析 VueUse实现 扩展原生实现
  需求:在375宽度设备,滚动宽带为50  在其它设备需要等比例设置滚动的宽度 scrollWidth = 150 / 375 * deviceWidth 就可以适配
- 推荐医生展示
  医生TS类型 获取医生API 数据和渲染
- 实现关注医生
  关注TS类型 关注API 关注&取消
- 逻辑复用
  封装关注逻辑 实现关注医生 实现关注文章

极速问诊
- 选择极速问诊
  定义问诊仓库 提供记录函数 记录问诊类型
- 选择问诊级别
  准备路由组件 提供记录函数 记录问诊级别
- 选择科室
  准备组件 类型&科室API 渲染&切换 记录问诊科室
- 填写病情描述
  路由组件结构 准备单选按钮 准备表单数据 绑定表单数据 保存数据
- 选择就诊患者
  改造家庭档案 界面兼容 选中患者效果 默认选中效果 记录患者ID
- 支付问诊费用
  获取数据 路由与组件 预支付类型 预支付API 患者详情API 获取数据
  生成订单  控制抽屉 生成订单API 实现生成订单 清理&记录订单ID
- 用户引导
  阻止用户返回上页 阻止关闭抽屉 刷新页面后提示
- 进行支付
  支付地址API 获取支付地址&跳转支付 处理支付失败

问诊室
- 组件拆分
  状态栏 操作栏 消息卡片
- websocket
  网络通信协议,和http协议一样,http协议通信只能由客户端发起,不能双向通信
  socket.io-client:基于websocket的即时通讯的解决方案,提供后端即时通讯服务,前端连接后端JS库
  怎么使用?
    服务端提供服务
    客户端:怎么建立连接?发消息?收消息?断开连接?
- 建立连接
  初始化Socket 携带token 参数订单ID 绑定常规事件 断开连接
- 通讯规则与默认消息
- 默认消息-处理数据
  分析数据结构  添加数据类型  转换消息列表
  渲染消息 传递数据给组件 展示患者卡片 预览图片 通用消息和提示
- 接诊状态-订单数据
  订单状态枚举 订单详情类型 订单详情API 初始化&状态变更
- 接诊状态 控制组件
  控制状态栏 控制操作栏
- 文字聊天
  发送文字
    操作栏传递文字 诊室接收文字 socket发送文字
- 图片聊天
  操作栏提交图片 诊室接收并发送 渲染图片消息
- 聊天记录
  默认看最新消息 实现下拉刷新 记录消息时间 通知服务器 loading&提示
- 查看处方
  医生开处方&渲染 原始处方API 预览原始处方
- 评价医生 - 结束消息和评价消息
  展示结束问诊消息  展示评价卡片组件  收集评价信息

问诊记录
- 搭建页面
  问诊item组件 问诊list组件 问诊记录页面 传入订单类型
- 加载数据
  参数和响应类型 定义问诊记录API 加载问诊记录效果
- 渲染Item组件
  展示基本信息 区别展示操作按钮 更多操作
- 取消订单
  取消订单API函数 取消订单逻辑 使用取消逻辑
- 删除订单
  删除订单API函数 删除订单逻辑 使用删除逻辑
- 问诊详情
  准备路由和组件 加上骨架屏 渲染信息 提取filter函数
- 展示操作按钮
  待支付倒计时 根据状态展示按钮

药品订单
- 支付信息
  预支付信息类型 预支付&地址API  预支付&地址数据 展示页面信息
- 完成支付
  生成药品订单API 生成订单 改造支付抽屉组件 实现药品支付
- 支付信息
  路由与组件布局 药品订单详情类型 药品订单详情API 获取数据渲染
- 订单详情
  路由与组件布局 提取订单详情逻辑 提取药品订单组件 展示订单详情页面
- 使用高德地图
  得到key和jscode 使用jscode加载 初始化地图 配置风格和缩放
- 绘制起点终点当前运输标记
  绘制起点标记 提取创建标记函数 绘制终点运输标记 定位当前运输位置