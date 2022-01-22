/*
jQuery = function(selector){
    const elements = document.querySelectorAll(selector)
    const api = {
        addClass(className){
            //闭包：函数访问外部变量；
            for(let i=0;i<elements.length;i++){
                elements[i].classList.add(className)
            }
            return null
        }
    }
    return api  //返回api对象
    */

    /*
    const elements = document.querySelectorAll(selector)
    const api = {
        addClass(className){
            for(let i=0;i<elements.length;i++){
                elements[i].classList.add(className)
            }
            return api  //链式操作
        }
    }
    return api
    */

    /*
    const elements = document.querySelectorAll(selector)
    const api = {
        addClass(className){
            for(let i=0;i<elements.length;i++){
                elements[i].classList.add(className)
            }
            return this  //返回this, this 就是 api ;
        }
    }
    return api  //调用jQuery的时候是用 window.jQuery，所以 this 就是 window;
    */

    /*
jQuery = function(selector){
    const elements = document.querySelectorAll(selector)
    return {
        //直接 return 对象，不要额外 const 一个变量；
        addClass(className){
            for(let i=0;i<elements.length;i++){
                elements[i].classList.add(className)
            }
            return this  //api没有了，所以这里要用 this ;
        },
        find(selector){
            let array = []
            for(let i=0;i<elements.length;i++){
                const elements2 = Array.from(elements[i].querySelectorAll(selector))
                array = array.concat(elements2)
            }
            //return array  //返回数组，链式操作中断；
            return this     //返回this,但this表示的是find前面那个调用find的对象，而不是find执行后的对象。只能再构造一个新的api对象进行链式操作；
            
        }
    }
}
*/


jQuery = function(selectorOrArray){
    let elements
    if(typeof selectorOrArray === 'string'){
        elements = document.querySelectorAll(selectorOrArray)
    }else if(selectorOrArray instanceof Array){
        elements = selectorOrArray
    }
    return {
        addClass(className){
            for(let i=0;i<elements.length;i++){
                elements[i].classList.add(className)
            }
            return this  
        },
        oldApi:selectorOrArray.oldApi,
        find(selectorOrArray){
            let array = []
            for(let i=0;i<elements.length;i++){
                const elements2 = Array.from(elements[i].querySelectorAll(selectorOrArray))
                array = array.concat(elements2)
            }
            /*
            const newApi = jQuery(array)  //此时的 array 是数组，而最开始的 jQuery 参数是选择器，所以需要将参数从selector改为selectorOrArray，再在find这里构造一个新的jQuery对象；
            return newApi
            */
           array.oldApi = this  //将调用this的对象放在array上，以便end方法调用,但是没有放在api身上，调用不了，所以再加一个oldApi方法；
           return jQuery(array)
        },
        end(){
            return this.oldApi  //此时的this是find方法调用后新生成的newApi对象；
        },
        each(fn){
            for(let i=0;i<elements.length;i++){
                fn.call(null,elements[i],i)
            }
        },
        parent(){
            const array = []
            this.each((node)=>{
                if(array.indexOf(node.parentNode) === -1)
                  array.push(node.parentNode)
            })
            return jQuery(array)
        },
        print(){
            console.log(elements)
        },
        children(){
            const array = []
            this.each((node)=>{
                  array.push(...node.children)
                })
            return jQuery(array)
        },
        siblings(){
            let array = []
            this.each((node)=>{
                if(array.indexOf(node.parentNode.children) === -1)
                array.push(Array.from(node.parentNode.children).filter(n=>n!==node))
            })
            return jQuery(array)
        },
        index(){
            const list = elements[0].parentNode.children
            let i
            for(i=0;i<list.length;i++){
                if(list[i]===elements[0])
                break
            }
            console.log(i)
            return this
        },
        next(){
            let array = []
            let x = elements[0].nextSibling
            if(!x){
                return this
            }else if(x.nodeType===3){
                x = x.nextSibling
                array.push(x)
            }
            return jQuery(array)
        },
        prev(){
            let array = []
            let x = elements[0].previousSibling
            if(!x){
                return this
            }else if(x.nodeType===3){
                x = x.previousSibling
                array.push(x)
            }
            return jQuery(array)
        }
    }
}
