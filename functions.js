function _createElement(callback) {
  
    try {
        let newDiv = document.createElement("div");
        newDiv.className = 'custom-exchange';
        newDiv.id = 'custom-exchange';
        newDiv.innerHTML = "<span>Click</span>";
        let menumap = document.getElementById('menu-map')
        if(menumap) {
            menumap.parentElement.append(newDiv)
            callback(true) // chrome.runtime.sendMessage()
            
        }
        else callback(false) // chrome.runtime.sendMessage() 
 
    } catch(err) {console.log(err.message)}

    
}
function updatePlayerCash(money){
    let cashElem = self. document.getElementsByClassName("css-q2xpdd")[0]
    //if (cashElem) cashElem.innerHTML = '$' + String(representCashString(money))
    if (cashElem) {
        if (money < 1000) {cashElem.innerHTML = '$' + String(money); return}
        //cashElem.innerHTML = '$' + Number(money*0.001).toFixed(3)

        function getTrunc(money) {
            let value = Number(money*0.001).toFixed(3); return String(value).split('.')[0]
        }
        function getFrac(money) {
            let value = Number(money*0.001).toFixed(3); return String(value).split('.')[1]
        }
        function getValues(money) {
            let values = []
            let value = money; let i=0
            do {    i++
                if(i ==1) values.push(getFrac(value))
                value = getTrunc(value);  
                if(value > 0) values.push(value)
            } while (value > 0)
            return values
        }
        let values = getValues(money); 
        let nodes = cashElem.childNodes; nodes[1].data = values.reverse().join(',')
        //cashElem.innerHTML = '$' + '\n' + values.reverse().join(',')
    }  
}

async function currentCash() {
    try {
        async function getValue () {    let cashElem = self. document.getElementsByClassName("css-q2xpdd")[0]
            if (cashElem) return cashElem.innerHTML.split('$').join('').split(',').join('')
            else  return null
            }
        //return getValue ().then(result=> {if(result) {return result} else {return parseWithInterval(getValue); return 9999} })
        return getValue ().then(result=> {if(result) {return result} else return playerMoney})

    }catch(err) {console.warn(err)}
}
function representCashString(money) {
    if (Math.abs(money) < 1000) return money
    let a =           (money/1000           - Math.floor(money/1000))          *1000
    let b = Math.floor((money/1_000_000     - Math.floor(money/1_000_000))     *1_000)
    let c = Math.floor((money/1_000_000_000 - Math.floor(money/1_000_000_000)) *1_000)
    //let d = money/1_000_000_000_000
    const getvalues = (v)=> { if (v < 1) return''; let d ; if(v < 10) d= ',00' + v; if (v < 100 && v >= 10) d = ',0' + v; return d}  
    let d = getvalues(a); if (d < 1/1000) return '0' + getvalues(a)
    let e = getvalues(b); if (e < 1/1000) return '0' + getvalues(b) + getvalues(a)
    let f = getvalues(c); if (f < 1/1000) return '0' + getvalues(c) + getvalues(b) + getvalues(a)
        return Math.floor(money/1_000_000_000) + getvalues(c) + getvalues(b) + getvalues(a)
}

function _getlabel(index) {
    if(index == 1) return 'Units'
    else return 'max Price'
}

function _setSrc(elem, type) {
    if (type == 'checkbox') {
        //
    }
}

function createSVGStar(id, callback) {
    let newElem = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    newElem.classList.add('m-item-cb', 'svg-inline--fa','fa-star','css-0') 
    //newElem.className = 'svg-inline--fa'  + ' fa-star' + ' css-0'
    id.indexOf('m-item-cb-') > -1 ? newElem.id = 'm-item-cb-' + String(id).substring(10) : newElem.id = 'm-item-cb-' + id

    newElem.ariaHidden = "true" 
    //newElem.namespaceURI="http://www.w3.org/2000/svg"
    newElem.dataset.icon = 'star'
    newElem.dataset.prefix = 'fas'
    newElem.role = 'img'
    //newElem.setAttributeNS("svg", '0 0 576 512')
    newElem.setAttribute("viewBox", '0 0 576 512');
    newElem.innerHTML = '<path fill="currentColor" d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"></path>'
    callback(newElem)
}
function createSVG(index, state, callback) {
    let newElem = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    const {id, classname, innerHTML, style} = state
    classname.forEach((cname, index) => newElem.classList.add(classname[index]) )
    if(style)  newElem.style =  style
    //newElem.className = 'svg-inline--fa'  + ' fa-star' + ' css-0'
    newElem.id = id;  if(index) newElem.id = id + '-' + index
    newElem.ariaHidden = "true" 
    //newElem.namespaceURI="http://www.w3.org/2000/svg"
    //newElem.dataset.icon = 'star'
    newElem.dataset.prefix = 'fas'
    newElem.role = 'img'
    newElem.setAttribute("viewBox", '0 0 576 512');
    newElem.innerHTML = innerHTML
    callback(newElem)
}

function getHeaderByClassName(elem, className) {
    try {
        let hElem =elem.parentNode; if (!hElem) throw new Error('parentNode undefined')
        if (hElem.classList.contains(className)) return (hElem)
        else  return getHeaderByClassName(hElem, className) 
}   catch (err) {console.log(err)}
  } 

function getChildByNodeName(elem, nodeName, callback) {
    try {
       
            let childNodes =elem.childNodes; 
            for (let i=0;i<childNodes.length;i++) {
                //console.log(elem)
                if (childNodes[i].nodeName == nodeName) return (childNodes[i]) 
                else   return getChildByNodeName(childNodes[i], nodeName)
            }
            
    }   catch (err) {console.log(err)}
  } 


function buildingsReq(response) {
    try{
        return new Promise((res, rej)=> {
            response.forEach((item, index)=>{  if(item.busy && item.busy.duration === 0) return
                let id = String(item.id)
                buildings[id] = item;
                if (item.busy) toggleBusyStateForPanel(id)
                if (!busy_build[id]) {let kind= resID[busy_items[item.name][0]].id ;    busy_build[id] = {ct: 0, kind: kind, qty: null}}
                if (index == response.length -1) 
                {res(buildings); }
            })
        });  return promise
    }  catch(err) {console.log(err)}
}
function toggleBusyStateForPanel(id) {
    let building = document.getElementById('custom-busy-item-'+id)
    if (building) building.classList.toggle('enabled')
}
function enableBusyStateForPanel(id) {
    let building = document.getElementById('custom-busy-item-'+id)
    if (building) {building.classList.remove('enabled'); building.classList.add('enabled')}
}
function showBusyItemList(elem) {
    if(elem.classList.contains('open')) return
    elem.classList.add('open');
}
//module.exports = {createElement}

function setTextColorForTile(ev) {
    if (!tiles) { return}
    let color
    if (ev.type == 'mouseenter') {color = 'color:rgb(37 235 15);'}
    else color = 'color:rgb(242 242 242);'
    getElementID(ev.target, 'custom-busy-item-').then(_id => {
        for(let i=0;i<tiles.length;i++) {if (tiles[i].href.indexOf(_id) > -1) {  
            async function getText(mainE) { let text= mainE.getElementsByClassName('css-95ohho')[0]; if(!text) text = mainE.getElementsByClassName('css-1l50l1t')[0]; return text}
            getText(tiles[i]).then(text=> {if(text) text.style = color;})
                break;
          }}
    })
}

function getTiles(callback) {
    setTimeout(()=> {
        let tiles = document.getElementsByClassName('css-dxj82q')[0]; if (tiles) tiles = tiles.childNodes;  
        callback (tilefilter(tiles))
    }, 1000)

}

function _hide(type) {
    switch(type) {
        case 'exchange-panel':
            eCreated.exchContainer.classList.toggle('hidden')
            //if(eCreated.preferWaresPanel) eCreated.preferWaresPanel.style.visibility='hidden'
        break;
        case 'build-busy-panel':
            eCreated.busyPanel.classList.toggle('hidden')
        break;
        case 'price-settings-panel':
            eCreated.priceInspectorPanel.classList.toggle('hidden')
        break;
        default: return
    }
}
function _show(type) { 
    switch(type) {
        case 'exchange-panel':
            //if(eCreated.exchContainer) eCreated.exchContainer.style.visibility='visible'
        break;
        default: return
    }
}
function createContainer(params, panel, callback) {
    //if (eCreated.busyCont) {callback(eCreated.busyCont); return }
    const panelcontainer = document.createElement("div");
    let {id, classname} = params
    panelcontainer.className = classname;
    panelcontainer.id = id;
    panelcontainer.append(panel)
    callback(panelcontainer)
  }


  function reform(variable) {
    let _resID={}
    //let newObj = {}
    //Object.keys(variable).forEach((key, index)=> {newObj[key] = {items: variable[key], wh:0}; if (index== Object.keys(variable).length -1) console.log(newObj)})
    Object.keys(variable).forEach((key, index)=> {let wh= variable[key].wh; variable[key].items.forEach((item, itemIndex)=> {if(!_resID[item]) {/*console.log(item);*/ return} ;_resID[item].wh = wh; if (itemIndex == variable[key].items.length -1 && index == Object.keys(variable).length -1) console.log(_resID)})}); 
}
    reform(bwh)

function parseWithInterval(func) {
    return new Promise((res, rej)=> {
        let done = false
        const newInterval = setInterval(_func().then(result=> {if (result) { res(result); }}), 1000)
        const _func = async () => { console.log('getting player money'); return func().then(result=> {if(result) { return result} else return null})}
        function _clear() {
            clearInterval(newInterval)
        }
    })}

function  dispatchRequest(data) {
    apiRequest.info = data; self.dispatchEvent(apiRequest)
}

async function getElementID(target, substring) {
    return target.id.substring(String(substring).length);
}

function parseElementWithInterval(type) {
    const {id, selector, single} = type
    let parse = (key) => {return document.getElementById(key)}
    let key = id
    if (selector) {key = selector;  
        if (selector) {
            if (single) parse = (key) => {return document.querySelector(key)}
            else  parse = (key) => {return document.querySelectorAll(key)}
        }
    }  

    async function getElem () {    
        let elem = parse(key)
        if (elem) return elem
        else  return null
        }
    const _func = async () => { 
        return getElem().then(result=> {if(result) { return result} else return null})
        }

    return new Promise((res, rej)=> {
        const newInterval = setInterval(()=> {_func().then(result=> { if (result) { res(result); _clear()}})}    , 1000, res)
        
        function _clear() {
            clearInterval(newInterval)
        }
    })}
