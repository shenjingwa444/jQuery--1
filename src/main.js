// const api = window.jQuery('.test')   //window可省略；
//const api = jQuery('.test')  //不返回elements，而是返回api对象；
//api.addClass('red').addClass('blue')    //链式操作

/*
obj.fn(p1)
obj.fn.call(obj,p1)  //函数里的 this 就是 obj ;
*/

// api.addClass('red').addClass('blue').addClass('green')  //这里的 this 就是 api，所以可直接 return this 

/*
jQuery('.test') 
  .addClass('red')
  .addClass('blue')  //  不用api，直接用函数返回值调用；
*/

/*
const x = jQuery('.test1').find('.child')
console.log(x)  //如果find()返回array,此时 x 是一个纯数组，不能链式操作了；
*/

//jQuery('.test1').find('.child').addClass('red')  
//find函数如果返回 this ,red 属性加在了test1上面，而不是child上面，其实是返回前面那个对象

/*jQuery('.test1')
  .find('.child')
  .addClass('red')
  .end()
  .addClass('yellow')

  jQuery('.test1')
  .find('.child')
  .each(div=>console.log(div))
*/

//怎么在几个相同class属性值的父节点中，返回想要找的子节点的index值
 jQuery('.test3>.child').parent().prev().index()
  //.print()  
  //.index()
  //let arr1 = jQuery('#test').parent().next()
  //console.log(arr1)


jQuery('#child').parent()
.prev()
.index()
   //这是class = class 的div
    //这是id = test 的div
//   let arr2 = jQuery('#child').parent().next()
  //console.log(arr2)


 //console.log(dom.next(dom.parent(dom.find('#test')[0])))
//let arr3 = jQuery('.test2')
//console.log(arr3)
//console.log(jQuery('#test').index())