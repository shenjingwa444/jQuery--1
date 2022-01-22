window.$ = window.jQuery = function(selectorOrArray){
    let elements
    if(typeof selectorOrArray === 'string'){
        elements = document.querySelectorAll(selectorOrArray)
    }else if(selectorOrArray instanceof Array){
        elements = selectorOrArray
    }

    function createElement(string){
        const container = documents.createElements('template');
        container.innerHTML = string.trim()
        return container.content.firstChild
    }

    const api = Object.create(jQuery.prototype)  //创建一个对象，这个对象的 __proto__为括号中的jQuery.prototype;
    //相当于 const api = {__proto__:jQuery.prototype}
    Object.assign(api,{
        elements: elements,
        oldApi: selectorOrArray.oldApi
        //api.elements = elements
        //api.oldApi = selectorOrArray.oldApi
    })
    return api
};

jQuery.fn = jQuery.prototype = {
    constructor: jQuery,
    addClass(className){
        for(let i=0;i<this.elements.length;i++){
            elements[i].classList.add(className)
        }
        return this  
    },
    find(selectorOrArray){
        let array = []
        for(let i=0;i< this.elements.length;i++){
            const elements2 = Array.from(this.elements[i].querySelectorAll(selectorOrArray))
            array = array.concat(this.elements2)
        }
       
       array.oldApi = this 
       return jQuery(array)
    },
    end(){
        return this.oldApi  
    },
    get(index){
        return this.elements[index]
    },
    each(fn){
        for(let i=0;i< this.elements.length;i++){
            fn.call(null,this.elements[i],i)
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
        console.log(this.elements)
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
        console.log(this.elements[0].parentNode)
        const list = this.elements[0].parentNode.children
        let i
        for(i=0;i<list.length;i++){
            if(list[i]===this.elements[0])
            break
        }
        console.log(i)
        return this
    },
    next(){
        let array = []
        let x = this.elements[0].nextSibling
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
        let x = this.elements[0].previousSibling
        if(!x){
            return this
        }else if(x.nodeType===3){
            x = x.previousSibling
            array.push(x)
        }
        return jQuery(array)
    }
}