window.dom = {
    //增
    create(string){ //创建节点
        const container =document.createElement("template"); //template里面可以容纳任意元素，不会在页面中显示，不要用div（因为里面不能直接含td标签）
        container.innerHTML = string.trim();//trim去除字符串两边的文本元素（空格）
        return container.content.firstChild;//template不能直接通过children[0]获取到儿子
    },
    after(node, node2){ //新增弟弟
        node.parentNode.insertBefore(node2, node.nextSibling)
        //找到node的爸爸调用insertBefore方法，把node2插到node下个节点前面
    },
    before(node,node2){ //新增哥哥
        node.parentNode.insertBefore(node2, node)
    },
    append(parent,node){ //新增儿子
        parent.appendChild(node)
    },
    wrap(node,parent){ //新增爸爸
        dom.before(node,parent) //先把爸爸放在节点前面（兄弟关系）
        dom.append(parent,node) //然后把节点变成爸爸儿子
    },

    //删
    remove(node){ //删除节点
        node.parentNode.removeChild(node)
        return node
    },
    empty(node){ //删除后代
        const {childNodes} = node // const childNodes =node.childNodes的缩写
        const array =[]
        let x =node.firstChild
        while(x){
            array.push(dom.remove(node.firstChild))
            x = node.firstChild
        }
        return array
    },

    //改
    attr(node, name, value){ //读写属性 【重载】
        if(arguments.length === 3){ //写
            node.setAttribute(name, value)
        }else if(arguments.length === 2){ //读
           return node.getAttribute(name)    
        }
    },
    text(node,string){ //读写文本内容【适配】
        if(arguments.length === 2){ //写
            if('innerText' in node){
                node.innerText = string //ie 旧的IE只支持这种
            }else{
                node.textContent = string //firefox、Chrome
            } 
        }else if(arguments.length ===1){ //读
            if('innerText' in node){
                return node.innerText 
            }else{
                return node.textContent
            } 
        }
    }, 
    html(node,string){ //读写HTML内容
        if(arguments.length === 2){ //写
            node.innerHTML =string
        }else if(arguments.length === 1){ //读
            return node.innerHTML
        } 
    },
    style(node,name,value){ //修改 style
        if(arguments.length === 3){ //修改
            //dom.style(div, 'color', 'red')
            node.style[name] = value
        }else if(arguments.length === 2){ 
            if(typeof name === 'string'){ //写
                //dom.style(div, 'color')
                return node.style[name] //读
            }else if(name instanceof Object){
                //dom.style(div,{color:'red'})
                const object =name
                for(let key in object){
                node.style[key] = object[key]
              }
          }    
       }
    },
    class: {  //修改class
        add(node,className){ //添加
            node.classList.add(className)
        },
        remove(node,className){ //删除
            node.classList.remove(className)
        },
        has(node,className){ //读
            return node.classList.contains(className)
        },
    },
    on(node,eventName,fn){ //添加事件监听
        node.addEventListener(eventName,fn)
    },
    off(node,eventName,fn){ //删除事件监听
        node.removeEventListener(eventName,fn)
    },

    //查
    find(selector,scope){ //获取标签或标签们
        return  (scope || document).querySelectorAll(selector)
    },
    parent(node){ //获取父元素
        return node.parentNode
    },
    children(node){ //获取子元素
        return node.children
    },
    siblings(node){ //获取兄弟姐妹元素
        return Array.from(node.parentNode.children).filter(n=>n!==node) //伪数组变成数组，然后过滤排除自己
    },
    next(node){ //获取弟弟
        let brother =node.nextSibling
        while (brother && brother.nodeType ===3){ //剔除文本节点
            brother =brother.nextSibling
        } 
        return brother
    },
    previous(node){ //获取哥哥
        let brother=node.previousSibling
        while (brother && brother.nodeType ===3){ //剔除文本节点
            brother =brother.previousSibling
        } 
        return brother
    },
    each(nodeList,fn){ //遍历所有节点
        for(let i=0; i<nodeList.length; i++){
            fn.call(null, nodeList[i])
        }
    },
    index(node){ //获取排行老几
        const list = dom.children(node.parentNode)
        let i 
        for(i=0; i<list.length; i++){
            if(list[i] === node){
                break
            }
        }
        return i
    },
};
