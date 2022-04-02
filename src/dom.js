window.dom = {
  //增
  //创建节点
  create(string) {
    const container = document.createElement("template");
    //template：里面可以容纳任意元素，不会在页面中显示（不用div，因为里面不能直接含td这些标签）
    container.innerHTML = string.trim(); //trim：去除字符串两边的文本节点（如空格）
    return container.content.firstChild; //template不能直接通过children[0]获取到儿子
  },
  //新弟弟
  after(node, node2) {
    node.parentNode.insertBefore(node2, node.nextSibling);
    //找到node的爸爸，把node2插到node下个节点前面（因为没有insertAfter不稳定）
    //就算node没有下一个节点(null)，也是可以创建
  },
  //增哥哥
  before(node, node2) {
    node.parentNode.insertBefore(node2, node);
  },
  //增儿子
  append(parent, node) {
    parent.appendChild(node);
  },
  //增爸爸
  wrap(node, parent) {
    dom.before(node, parent); //先把爸爸放在节点前面（兄弟关系）
    dom.append(parent, node); //然后把节点变成爸爸儿子(父子关系)
  },

  //删
  //删节点
  remove(node) {
    node.parentNode.removeChild(node);
    return node;
  },
  //删后代
  empty(node) {
    const array = [];
    let x = node.firstChild;
    while (x) {
      array.push(dom.remove(node.firstChild));
      x = node.firstChild;
    }
    return array;
  },

  //改
  //读写属性【重载】
  attr(node, name, value) {
    if (arguments.length === 3) {
      //写
      node.setAttribute(name, value);
    } else if (arguments.length === 2) {
      //读
      return node.getAttribute(name);
    }
  },
  //读写文本内容【重载、适配】
  text(node, string) {
    if (arguments.length === 2) {
      //写
      if ("innerText" in node) {
        node.innerText = string; //ie（旧的ie只支持这种）
      } else {
        node.textContent = string; //firefox、Chrome
      }
    } else if (arguments.length === 1) {
      //读
      if ("innerText" in node) {
        return node.innerText;
      } else {
        return node.textContent;
      }
    }
  },
  //读写HTML内容【重载】
  html(node, string) {
    if (arguments.length === 2) {
      //写
      node.innerHTML = string;
    } else if (arguments.length === 1) {
      //读
      return node.innerHTML;
    }
  },
  //修改style【重载】
  style(node, name, value) {
    if (arguments.length === 3) {
      //修改：dom.style(div, 'color', 'red')
      node.style[name] = value;
    } else if (arguments.length === 2) {
      if (typeof name === "string") {
        //读：dom.style(div, 'color')
        return node.style[name];
      } else if (name instanceof Object) {
        //写：dom.style(div,{color:'red'})
        const object = name;
        for (let key in object) {
          node.style[key] = object[key];
        }
      }
    }
  },
  //修改class
  class: {
    //添加
    add(node, className) {
      node.classList.add(className);
    },
    //删除
    remove(node, className) {
      node.classList.remove(className);
    },
    //读
    has(node, className) {
      return node.classList.contains(className);
    },
  },
  //添加事件监听
  on(node, eventName, fn) {
    node.addEventListener(eventName, fn);
  },
  //删除事件监听
  off(node, eventName, fn) {
    node.removeEventListener(eventName, fn);
  },

  //查
  //获取标签或标签们
  find(selector, scope) {
    return (scope || document).querySelectorAll(selector);
  },
  //获取父元素
  parent(node) {
    return node.parentNode;
  },
  //获取子元素
  children(node) {
    return node.children;
  },
  //获取兄弟姐妹元素
  siblings(node) {
    return Array.from(node.parentNode.children).filter((n) => n !== node);
    //伪数组变成数组→过滤排除自己
  },
  //获取弟弟
  next(node) {
    let brother = node.nextSibling;
    //剔除文本节点
    while (brother && brother.nodeType === 3) {
      brother = brother.nextSibling;
    }
    return brother;
    //方法二：return node.nextElementSibling;
  },
  //获取哥哥
  previous(node) {
    let brother = node.previousSibling;
    //剔除文本节点
    while (brother && brother.nodeType === 3) {
      brother = brother.previousSibling;
    }
    return brother;
    //方法二：return node.previousElementSibling;
  },
  //遍历所有节点
  each(nodeList, fn) {
    for (let i = 0; i < nodeList.length; i++) {
      fn.call(null, nodeList[i]);
    }
  },
  //获取排行老几
  index(node) {
    const list = dom.children(node.parentNode);
    let i; //let要声明在外面，return才能获取
    for (i = 0; i < list.length; i++) {
      if (list[i] === node) {
        break;
      }
    }
    return i + 1;
  },
};
