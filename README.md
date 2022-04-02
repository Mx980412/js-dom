# 封装DOM库

## 对象风格

- `window.dom` ：是我们提供的全局对象（库）

### 增

- 创建节点：`dom.create('<div>hi</div>')`
- 增弟弟：`dom.after(node, node2)`

- 增哥哥：`dom.before(node, node2)`
- 增儿子：`dom.append(parent, child)`

- 增爸爸：`dom.wrap(node,parent)`


### 删

- 删节点：`dom.remove(node)`
- 删后代：`dom.empty(parent)`

### 改

- 读写属性：
  - 写：`dom.attr(node, 'title', ?)`
  - 读：`dom.attr(node, 'title')`
- 读写文本内容：
  - 写：`dom.text(node, ?)`
  - 读：`dom.text(node)`
- 读写 HTML 内容：
  - 写：`dom.html(node, ?)`
  - 读：`dom.html(node)`
- 修改 style：
  - 写：`dom.style(node, {color: 'red'})`
  - 修改：`dom.style(node,'color', 'red')` 
  - 读：`dom.style(div, 'color')`
- 修改 class
  - 添加：`dom.class.add(node, 'blue')`
  - 删除：`dom.class.remove(node, 'blue')`
  - 读：`dom.class.has(node, 'blue')`
- 修改事件监听
  - 添加：`dom.on(node, 'click', fn)`
  - 删除：`dom.off(node, 'click', fn)`

### 查

- 获取标签或标签们：

  - 在document里：`dom.find('标签')`
  - 在选择器里：`dom.find(标签, '选择器')`
- 获取父元素：`dom.parent(node)`
- 获取子元素：`dom.children(node)`
- 获取兄弟姐妹元素：`dom.siblings(node)`
- 获取弟弟：`dom.next(node)`
- 获取哥哥：`dom.previous(node)`
- 遍历所有节点：`dom.each(nodes, fn)`
- 获取排行老几：`dom.index(node)`

## 设计模式

1. 重载：支持多种参数
2. 适配：针对不同浏览器使用不同代码