//创建节点
const div = dom.create(" <div>newDiv</div>");
console.log(div);

//新增弟弟
dom.after(test, div);

//新增爸爸
const div3 =dom.create('<div id="parent"></div>')
dom.wrap(test,div3)

//删除后代
const nodes =dom.empty(window.empty)
console.log(nodes)

//读写属性
dom.attr(test, 'title', 'Hi,I am Mx') //写
const title = dom.attr(test, 'title') //读
console.log(`title: ${title}`) 

//读写文本内容
dom.text(test1, "你好，这是新的内容") //写
const text =dom.text(test1) //读
console.log(text)

//修改 style
dom.style(test, {border:'1px solid red', color:'blue'}) //写
console.log(dom.style(test, 'border')) //读
dom.style(test, 'border', '1px solid black') //修改

//修改 class
dom.class.add(test, 'red') //添加
dom.class.add(test, 'blue') //添加
dom.class.remove(test, 'blue') //删除
console.log(dom.class.has(test,'blue')) //读

//添加事件监听
const fn =()=>{
    console.log('点击了')
}
dom.on(test,'click',fn)
//删除事件监听
dom.off(test,'click',fn)

//获取标签或标签们
const testDiv =dom.find('#test')[0] //获取标签
console.log(testDiv)
const test2 = dom.find('#test2')[0] //获取标签
console.log(dom.find('.red',test2)[0]) //获取在选择器里的标签

//获取父元素
console.log(dom.parent(test))

//获取兄弟姐妹元素
const s2=dom.find('#s2')[0]
console.log(dom.siblings(s2))

//获取弟弟
console.log(dom.next(s2))
//获取哥哥
console.log(dom.previous(s2))

//遍历所有节点
const t=dom.find('#travel')[0]
dom.each(dom.children(t),(n)=> dom.style(n, 'color', 'red'))

//获取排行老几
console.log(dom.index(s2))