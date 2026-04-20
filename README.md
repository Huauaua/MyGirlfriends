# 🌸 我的老婆仓库 (My Waifu Collection)
一个精美的二次元角色收藏展示网站，用于展示和浏览喜爱的二次元角色。
访问链接：https://huauaua.github.io/MyGirlfriends/

## ✨ 功能特性

- 🎴 **角色展示** - 精美的卡片式角色展示界面
- 🔍 **搜索功能** - 支持按名称和标签搜索角色
- 🏷️ **标签筛选** - 通过标签快速筛选感兴趣的角色
- 📱 **响应式设计** - 适配各种屏幕尺寸
- 🌙 **主题切换** - 支持明暗主题切换
- 🖼️ **图片画廊** - 每个角色都有专属的图片集
- 💬 **经典语录** - 展示角色的经典台词
- 🎨 **个性化配色** - 每个角色都有独特的主题色

## 📁 项目结构

```
MyGirlfriends/
├── index.html              # 主页
├── character.html          # 角色详情页
├── css/                    # 样式文件
│   ├── global.css          # 全局样式
│   ├── home-page.css       # 主页样式
│   ├── chara-style.css     # 角色页样式
│   ├── light-home.css      # 明亮主题
│   └── bootstrap*.css      # Bootstrap框架
├── js/                     # JavaScript文件
│   ├── home-script.js      # 主页逻辑
│   ├── character.js        # 角色页逻辑
│   ├── data-loader.js      # 数据加载器
│   ├── pretty_btn.js       # 按钮组件
│   └── bootstrap*.js       # Bootstrap脚本
├── data/
│   └── characters.json     # 角色数据配置
└── photos/                 # 角色图片
    ├── 工口老师/
    ├── 六花chan/
    ├── 千反田chan/
    ├── 兔子pekora/
    ├── 亚斯娜chan/
    ├── 洋葱aqua/
    ├── Gura_chan/
    ├── lastOrder/
    ├── 未来/
    ├── misaka_chan/
    └── neko_chan/
```

## 🚀 使用方法

### 本地运行

1. 克隆或下载本项目
2. 直接在浏览器中打开 `index.html` 文件
3. 或使用本地服务器运行：

```bash
# 使用Python内置服务器
python -m http.server 8000

# 或使用Node.js的http-server
npx http-server -p 8000
```

4. 访问 `http://localhost:8000`

### 添加新角色

1. 在 `photos/` 目录下创建角色文件夹
2. 将角色图片放入对应文件夹
3. 在 `data/characters.json` 中添加角色信息：

```json
{
  "id": "角色ID",
  "name": "显示名称",
  "realName": "真实姓名",
  "avatar": "头像路径",
  "japaneseName": "日文名",
  "birthday": "生日",
  "age": "年龄",
  "height": "身高",
  "tags": ["标签1", "标签2"],
  "description": "角色描述",
  "color1": "#主题色1",
  "color2": "#主题色2", 
  "color3": "#主题色3",
  "quotes": [
    {
      "text": "语录内容",
      "image": "配图路径"
    }
  ],
  "gallery": ["图片路径1", "图片路径2"]
}
```

## 🛠️ 技术栈

- **HTML5** - 页面结构
- **CSS3** - 样式设计，包含渐变、动画等效果
- **JavaScript (ES6+)** - 交互逻辑
- **Bootstrap 5** - UI框架
- **Font Awesome** - 图标库
- **Web Components** - 自定义主题按钮组件

## 📝 数据格式说明

### 角色数据结构

| 字段 | 类型 | 说明 |
|------|------|------|
| id | string | 角色唯一标识符 |
| name | string | 显示名称 |
| realName | string | 角色真实姓名 |
| avatar | string | 头像图片路径 |
| japaneseName | string | 日文名称 |
| birthday | string | 生日 |
| age | string | 年龄 |
| height | string | 身高 |
| tags | array | 标签数组 |
| description | string | 角色描述 |
| color1 | string | 主题色1 |
| color2 | string | 主题色2 |
| color3 | string | 主题色3 |
| quotes | array | 语录数组 |
| gallery | array | 画廊图片数组 |

## 🎨 主题定制

项目支持明暗两种主题：
- 明亮主题：`light-home.css`
- 暗黑主题：默认主题样式

主题选择会保存在 `localStorage` 中，下次访问时自动应用。

## 📱 浏览器兼容性

- Chrome (推荐)
- Firefox
- Safari
- Edge
- 其他现代浏览器

## 🤝 贡献指南

欢迎提交 Issue 和 Pull Request！

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

## 📄 许可证

本项目仅供学习交流使用。

## ❤️ 致谢

感谢所有为二次元文化贡献的创作者！

---

**Made with ❤️ for all waifus**
