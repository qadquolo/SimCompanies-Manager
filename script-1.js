//import { checkInjection } from './script-2' 

//const runtimeID = chrome.runtime.id
let notificationContainer
const hdrs = new xge({}) 

let pathname = self.location.pathname;  
let recent_items;  getFromStorage('recent_items')
let notif_prices;  getFromStorage('notif_prices')
let busy_build;    getFromStorage('busy_build')
let notifChanged = false
let busyBuild_changed = false
let notif_timeinterval = 30_000
let busy_timeinterval = 0
let default_busy_timeinterval = 3000
let busyTimeouts ={}
let busyDurations ={}
let busy_list_id = -1
let buildBusyState = 0; chrome.storage.local.get('buildBusy').then(state=> {if(Object.keys(state).length < 1) {chrome.storage.local.set({'buildBusy':0})} else buildBusyState = state.buildBusy})
let busy_budget = 1000; chrome.storage.local.get('busy_budget').then(budget=> {if(Object.keys(budget).length < 1) {chrome.storage.local.set({'busy_budget':1000})} else busy_budget = budget.busy_budget})

function onBuildingsReceived() {
  if (Object.keys(buildings).length>0) {
    if (buildBusyState == 1) {toggleBuildBusyService(); }
  }
}

//let ExtensionState
  
//document.getElementById().a
//
let companyId = 0; makeApiRequest('api/v3/companies/auth-data/', null, (response)=> { if(response.authCompany) companyId = response.authCompany.companyId});
let buildings = {}; 
makeApiRequest('api/v2/companies/me/buildings/', null, (response)=> {buildingsReq(response).then(_buildings=> onBuildingsReceived()) 
  }); setTimeout(()=> {console.log(buildings)}, 500) 

function tilefilter(tiles) {let newArray=[]; for (let i=0;i<tiles.length;i++) {if (tiles[i].href) newArray.push(tiles[i]) }; return newArray} 
let tiles; 
const mapTilesGetting = setInterval(()=> { if(pathname.includes('landscape')) {if(tiles) {resetTilesInterval(); return};  getTiles((result) => {tiles = result;})} }, 1_000)
function resetTilesInterval() { clearInterval(mapTilesGetting)}

let playerMoney = 9999;  //currentCash().then(result=> playerMoney = result)
setInterval(()=> {currentCash().then(result=> playerMoney = result)}, 1000)
let wares = []
let customExchangeChecked = false
let preferWaresChecked = false
let priceSettingsChecked = false
let busySettingsChecked = false
let eCreated = {busyPanel:null, priceInspectorPanel: null, exchangePanel: null} 
//let priceInspectorEnabled = null
let lowerPriceTimeout = null
let buildBusyTimeout = null


    console.log({chrome_runtime : chrome.runtime})

      try {
      createElement(null, {elem: 'div',id:'div-getvars', style:'height: 4rem; width:4rem;z-index:10;position:absolute;margin-top:5rem;margin-left:0rem;background-color: rgb(120 120 120);visibility:visible;'}, (elem)=> { 
        document.getElementsByClassName('css-1muzv4r')[0].append(elem)
        elem.onclick = (ev)=> {
          console.log({recent_items, notif_prices, busy_build, buildings, playerMoney, busy_timeinterval, default_busy_timeinterval,busyTimeouts,busyDurations, companyId:companyId, tiles:tiles, eCreated, buildBusyState, wares})
        }
      }) 
      }catch(err) {console.log(err)}

    self.getVars = () => {return buildings}
    self.onprogress = (ev) => { console.log(ev.target.status)}
    self.onmessage = (ev) => {console.log(self.location.pathname) }
    self.document.onloadstart = (ev) => {console.log(self.location.pathname)}
        
    self.document.onchange = (event) => { /*console.log(event)*/  }
    self.document.onload = (event) => {console.log(event)  }
        
    self.document.onclick = (ev) => { 
      if(pathname !== self.location.pathname) {pathname =self.location.pathname; /*checkInjection()*/} 
     
      if (ev.target.classList) {
        //console.log({target_innertext: ev.target.innerText})
        let elem = ev.target; 
        if (elem.classList.contains('quality-value') || elem.classList.contains('btn')) { 
          let list = document.getElementById('custom-busy-list-cont'); let posY=ev.clientY-80; if (posY>400) posY=400
          list.style=`margin-top:${posY}px;`
        } 
      }
      if(pathname.indexOf('/warehouse/') >-1 ) {
        if (eCreated.customSell && ev.target.classList)  {
          let contains = false;
          customSellCL.forEach((classname, index)=> {if (ev.target.classList.contains(classname)) contains = true; if(index == customSellCL.length-1 && !contains) {eCreated.customSell.remove();}})   
        }
        //injectSellButtons()  
      }

    }
    self.document.oncontextlost=(ev)=>{console.log(ev)}

    self.addEventListener("fetch", (event) => {
      // Let the browser do its default thing
      // for non-GET requests.
      console.log(event.request)
      if (event.request.method !== "GET") return;
    })    
    
       
    document.addEventListener("fetch", (event) => {
      // Let the browser do its default thing
      // for non-GET requests.
      console.log(event.request)
      if (event.request.method !== "GET") return;
    })    
    self.onclick = (ev) => {
      //console.log({event: ev, pathname: self.location.pathname})
    }
    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
      console.log(message); console.log(sender);
      //sendResponse(new_message)
    })

    
    //chrome.webRequest.onCompleted.addListener((response) => {console.log(response)}, {})
   

    
async function LoadScript() {
    //console.log(chrome.runtime.getURL('script-3.js'))
    let newScript = document.createElement("script");
    newScript.className = 'custom-script';

     //newScript.innerHTML =
    //newScript.src = `chrome-extension://${chrome.runtime.id}/${'script-3.js'}`
    newScript.type = `text/javascript`
    document.body.append(newScript)
}    
LoadScript()

//let abc =  new CustomEvent('preInject', () => {})
const preInjectFunc = new Event("preInject");
self.addEventListener("preInject", (e) => {
  
    console.log("preInject happened")
    console.log({event_var: e.dummyVar})
    if (customExchangeChecked) {
      let customExchangePanel = document.getElementById('exchange-panel-01')
      if (!customExchangePanel) createExchangePanel((result) => {console.log('panel created')})
    }



  },
  false,
);
const apiRequest = new Event("apiRequest");
self.addEventListener("apiRequest", (e) => {
  console.log(apiRequest.info)
})
const removeElements = new Event("removeElements");
self.addEventListener("removeElements", (e) => {
  try {
    console.log(e)
    let customlyCreated_ID = ['custom-exchange', 'exchange-panel-01', 'build-busy-panel', 'price-settings-panel', 'custom-price-inspector-cont', 
      'build-busy-cont']
    let customlyCreated_class = []
    function _remove(array) { array.forEach(key=> {let elem= document.getElementById(key);  if(elem) {elem.remove()}})}
    _remove(customlyCreated_ID)  
    _remove(customlyCreated_class)  
    //let cb= document.getElementsByClassName('m-item-cb')
    //let i= -1;  do {i++; cb[i].style.visibility = 'hidden'} while (i < cb.length-1)

  } catch(err) {console.log(err.message)}
  },
  false
);


// Chrome Storage
chrome.storage.local.get('notif_timeinterval').then(data => {
  if (!data.notif_timeinterval) {chrome.storage.local.set({notif_timeinterval: {s:30}});  notif_timeinterval=30_000} 
  else {
    notif_timeinterval =   data.notif_timeinterval.s // *1000
  }
})
setInterval(()=> {
  if (notifChanged) {
    chrome.storage.local.set({notif_prices: notif_prices})
    notifChanged = false
  }
  if (busyBuild_changed) {
    chrome.storage.local.set({busy_build: busy_build})
    busyBuild_changed = false
  }
}, 12_000)

setInterval(()=> {}, 2500)

function getFromStorage(key) {
  new Promise((res,rej)=> {
      chrome.storage.local.get(key).then(data => {
        if (!data[key]) {
          defRecent= {recent_items: {1: {ct: 0, price:0, qty: 0}, 2: {ct: 0, price:0, qty: 0}}}
          switch(key) {
            case 'recent_items': chrome.storage.local.set(defRecent);  res(defRecent.recent_items); break
            default: chrome.storage.local.set({[key]: {}});  res({})
          }
        } 
        else {
        res(data[key])
        }
      })
  }).then(result=> {
        switch(key) {
          case 'recent_items': recent_items= result   ; break
          case 'notif_prices': notif_prices= result; break
          case 'busy_build':   busy_build= result;  break
          default: return
        }
  })
}


//function lowerPriceNotifications() {
function createTimeoutForNotifs() {
  console.log(notif_timeinterval)
  if(notif_timeinterval >= 30_000)  {  // 2500
    console.log('new timeout')

    lowerPriceTimeout = setTimeout(()=>{
      makeLowerPricesRequest()
      createTimeoutForNotifs()
    }, notif_timeinterval)
  }
}
function makeLowerPricesRequest() {

  console.log({func: makeLowerPricesRequest})
  fetchLowerPrices()

}
//function buildings auto production  {
  function createTimeoutForBuildBusy() {
      console.log('new timeout')
      // общий запрос информации о строениях
      makeApiRequest('api/v2/companies/me/buildings/', null, (response)=> {
        // из массива в объект
        buildingsReq(response)
          .then(_buildings=> closestProductionReq(_buildings))
          .catch(err=> console.log(err))
      })
  }

/* buildings production */
  function closestProductionReq(_buildings) {
    let duration = 9_999_999
    let building; let timeinterval; let data
    let i = -1; let keys= Object.keys(_buildings)
    do { i++
      let item = _buildings[keys[i]];  building = item;
      if (item.busy) { 
        
        enableBusyStateForPanel(item.id); //buildings[item.id].busy=aBusy
        let to=item.busy.duration*1000 + 1000; let buildBusyTimeout = setTimeout(()=>{newProductionRequest(item);}, to);  busyTimeouts[item.id] = buildBusyTimeout
      }
        else  {let to=i*1000; let buildBusyTimeout = setTimeout(()=>{newProductionRequest(item)} ,  to); busyTimeouts[item.id] = buildBusyTimeout}
      //console.log(item)  
    } while (i < Object.keys(buildings).length -1)
  }
  function newProductionRequest(building, init) {
    try{
    //throw new Error(building.id)
    //console.log({func: newProductionRequest, building: building})

    let key = building.id;  let data = busy_build[key]
    if (data.ct>0) {
      async function getItem(items) {let i =-1; do {i++; if(items[i].id == data.kind) return items[i]} while (i < items.length-1)}

      let items = Object.values(resID); getItem(items).then(item=> {  //if(!item) console.log({data: data})
        let totalCost = (data.ct/(item.ch*building.size))*(item.wh*building.size)
        //console.log({ct: data.ct, ch: item.ch, size: building.size, wh: item.wh, totalCost: totalCost})
        if (busy_budget > playerMoney - totalCost) {showNotification('Budget limit reached', 'message', false); return}
      let payload= {amount: data.ct, kind: data.kind, limitQuality: data.qty};  /*console.log({apiRequest: '/busy/',building:buildings[key], payload: payload})*/
      makeApiRequest(`api/v1/buildings/${key}/busy/`, payload, (response)=> {
        if(response.success == false)  {let msg=response.message; console.log(msg); if(msg == 'Building is busy') {enableBusyStateForPanel(key); }; showNotification(msg, 'message', false); return}
          const {message, unitCost, money, building} = response
          let b = building
          buildings[b.id] = b
          busyDurations[b.id] = b.busy.duration //b.busy = {duration: 3}; 
          
          let msg= message ;  playerMoney -= money
          enableBusyStateForPanel(key);
          updatePlayerCash(playerMoney)
          showNotification(msg, 'message', true)
  
          if (init == 'user') { let buildBusyTimeout = setTimeout(()=> {newProductionRequest(b); }, b.busy.duration*1000 + default_busy_timeinterval ); busyTimeouts[building.id] = buildBusyTimeout}
  
      })
      })
    } 
    } catch(err) {console.log(err)} 
  }



/* INJECTION */
function injectFunc() {
    pathname = self.location.pathname;  
    if (pathname.startsWith('/market/')) pathname = '/market/'
    if (pathname.indexOf('/warehouse/') > -1) pathname = '/warehouse/'
    if (pathname.startsWith('/headquarters/')) pathname = '/headquarters/'
    if (['/landscape/', '/headquarters/', '/warehouse/', '/search/', '/messages/', '/market/'].includes(pathname)) {
        //checkMain()  
        checkInjection()
    }
    getNotifContainer().then(c=>notificationContainer=c)
}

injectFunc()
async function getNotifContainer() { try {
  let _nContainer = document.getElementsByClassName('container css-q9fi5t ef8ljhx0')[0]
  return _nContainer  } catch(err) {console.log(err)}
}


function messageToSW(id, message) {
    //chrome.runtime.sendMessage(id, message, null, () =>  null)
    chrome.runtime.sendMessage(id, message, null)
}

function checkMain() {
    let scripts = document.querySelectorAll('script')
    //console.log(scripts)
    let n = 0; //let initScripts = []
    scripts.forEach((elem, index) => { if(elem.className == 'initial-script') {
      //console.log(elem.noModule)
        let  headElem =  elem.parentNode
        headElem.removeChild(elem)
    }})
    
    //checkInjection()
}






// functions.js

const cbOnClick = (ev) => {
  console.log(ev)
  let headElem = ev.target.parentElement
  let state = ev.target.checked

    createCheckbox(index, !state, (cb) => {
      //cb.onclick = cbOnClick
      headElem.append(cb)
      headElem.removeChild(ev.target)
      setcbOnClick(cb)
    })
}

function setcbOnClick(cb) {
  cb.onclick = cbOnClick
}

function checkInjection() {
    try {
        // custom exchange
        let customExchange = document.getElementById('custom-exchange')
        if(customExchange) {
            //messageToSW(runtimeID, {success: false, operation: 2})
            //console.log({success: true, operation: 'custom-exchange element already in use'})
        }
        else createExchangeButton((result) => {
            console.log({success: result, operation: 'custom-exchange element has been created'})
            messageToSW(runtimeID, {success: result, operation: 'custom-exchange element has been created'})
        }) 
        // market & checkboxes
        if(pathname.indexOf('/market/') > -1 ){  //console.log('/market/')
            let cb = document.querySelector('.m-item-cb')
            if (!cb) {
              let marketItems = document.querySelectorAll("a.css-5hdx5b");
              setTimeout(() => {  if (marketItems) createMarketCheckboxes(marketItems, (result) => {if (result) {console.log('cb created')}})   }, 500)
              
            } else {      let checkboxes= document.getElementsByClassName('m-item-cb')
                          let i= -1;  do {i++; checkboxes[i].style.visibility = 'visible'} while (i < checkboxes.length-1)}
        }
        // warehouse
        injectSellButtons()
        //lower prices inspector
          let priceInspector = document.getElementById('custom-price-inspector')
          if(priceInspector) {
          }        
          else {
              createPriceInspector((result) => null)
          }
          //building busyness
          let buildingBusiness = document.getElementById('build-busy')
          if(buildingBusiness) {}
          else {
            createBuildingBusiness((result) => null)
          }
 
    } catch(err) {console.log(err.message)}    
}
function injectSellButtons() {
  if(pathname.indexOf('/warehouse/') > -1 ){ 
    let sellBtn = document.querySelector('button.sell-btn')
    if (!sellBtn) {
      parseElementWithInterval({selector:'div.e14va4ca4', single:false}).then(items => injectSellBtn(items)  )}
  }
}

// <input type= "checkbox" class="item-cb" style="position: absolute;">


function createExchangeButton(callback) {
  try {
      let newDiv = document.createElement("div");
      newDiv.className = 'custom-exchange';
      newDiv.id = 'custom-exchange';
      newDiv.style ='display: flex;align-items: center;'
      newDiv.innerHTML = '<span class="custom-label" style="font-size: 18px;">M.Exchange</span>';
      //newDiv.style= _style.customExchangeBtn
      //newDiv.checked = false
      newDiv.addEventListener('click', async (ev) => {
        customExchangeChecked = !customExchangeChecked
        //ev.target.checked = !ev.target.checked
          if (customExchangeChecked && !eCreated.exchContainer) {createExchangePanel((result) => null); _show(panel.exchange)}
          else  {_hide('exchange-panel')}
           
          //makeApiRequest('v2/market-order/take/')
      })

      let menumap = document.getElementById('menu-map')
      if(menumap) {
          menumap.parentElement.append(newDiv)
          callback(true) // chrome.runtime.sendMessage()
          
      }
      else callback(false) // chrome.runtime.sendMessage() 

  } catch(err) {console.log(err.message)}

}
function createPriceInspector(callback) {
  try {
    let hElem = document.getElementsByClassName('css-inxa61 e1uuitfi4')[0]
    if(hElem) {
      createElement(null, {elem:'div', id: 'custom-price-inspector-cont', classname: 'custom-cont price-inspector-cont', style:_style.prcInspector}, (elem) => { 
        hElem.append(elem)
        createElement(null, {elem:'div', id: 'custom-price-inspector', classname: 'headbar-item price-inspector', style:_style.prcInspector}, (div) => { 
          elem.append(div)   
          div.addEventListener('click', (ev) => {let _target= (function(){if(ev.target.nodeName == 'path')return ev.target.closest('.price-inspector'); return ev.target})();  _target.classList.toggle('enabled')
              if (lowerPriceTimeout)  { 
                clearTimeout(lowerPriceTimeout); lowerPriceTimeout=null; 
                showNotification('notifications offline', 'message', false)   
              }
              else   {createTimeoutForNotifs();  showNotification('notification service in work', 'message', true)}
          })
          createSVG(null, {id: 'price-inspector-toggle', classname: ['price-inspector','acting-toolbar', 'toggle'], innerHTML: _path.prcInspector}, (svg) => { 
              div.append(svg)   
            })
        })
        createSVG(null, {id: 'price-inspector-settings', classname: ['headbar-item', 'price-inspector', 'settings'], innerHTML: _path.inspectorSettings, style:_style.prcInspectorSettings}, (svg) => { 
          elem.append(svg)   
          svg.addEventListener('click', (ev) => {   toggleLowerPricePanel() })
        })
        callback(true) // chrome.runtime.sendMessage()
      })
    }
    else callback(false) // chrome.runtime.sendMessage() 

  } catch(err) {console.log(err.message)}
}
function openPriceSettings(callback) {
  try {
    

    let hElem = document.querySelector('.css-1ui26ma')
    if(hElem) {
        hElem.style = 'display: grid;'
        createElement(null, {elem:'div', id:'price-settings-panel',classname:'side-panel price-settings-panel'}, (panel)=> { eCreated.priceInspectorPanel = panel
          if(eCreated.busyCont)  eCreated.busyCont.append(panel)
          else
        createContainer({id:'custom-panel-container-02', classname: 'custom-panel-container busy-container'}, panel, (cont)=> {hElem.append(cont); eCreated.busyCont = cont;})
        //labels
        createElement(null, {elem:'span', id: 'price-inspector-label', classname: 'm-custom-label', style:_style.label, innerHTML: 'Set values to notificate'}, (label) => { panel.append(label)   })
        //timeoutinterval in seconds
        createElement(null, {elem:'div', id: 'm-custom-inspector-interval', classname: 'm-custom-inspector-interval'}, (div) => {
          panel.append(div)
          createElement(null, {elem:'form', id: 'm-custom-inspector-form-1', classname: 'm-custom-form', style:'display:flex;align-items:center;margin-bottom:.5rem;margin-top:1rem;'}, (form) => {
            div.append(form)
            createElement(null, {elem:'label', id: 'm-custom-inspector-label', classname: 'm-custom-label',innerText: 'interval', style:'margin-bottom:0;margin-left:1rem;'}, (label) => {
              form.append(label)
              createElement(null, {elem:'input', id: 'm-custom-inspector-input', classname: 'm-custom-input inspector', value: notif_timeinterval/1000, style:'margin-top:0;'}, (input) => {
                label.append(input)
   
              })
            })
            createElement(null, {elem:'button', id: 'm-custom-inspector-interval-btn', classname: 'dropdown-toggle btn btn-default', style:_style.intervalBtn, innerHTML:'Set Interval', type:'button'}, (btn) => { 
              form.append(btn)
              btn.onclick =(ev) => { try{
                let _input = document.getElementById('m-custom-inspector-input'); //document.getElementById().childNodes
                if (_input) updateInterval(_input.value)
                }catch(err){ console.log(err)}
              }
            })
          })
        })        
        //item container
        createElement(null, {elem:'div', id: 'm-custom-inspector-container', classname: 'm-custom-items-container'}, (container) => {
          panel.append(container)
          //items
          Object.keys(itemImages).forEach((key, index) => {
            createPanelItem(key, container)
          })
        })
        callback(true) // chrome.runtime.sendMessage()
    })
    }
    else callback(false) // chrome.runtime.sendMessage() 

  } catch(err) {console.log(err)}  
}
function updateInterval(value) { // seconds
  const limitInterval = (v) => { if (v < 30000) return 30000; return v }
  let newValue= limitInterval(value*1000); notif_timeinterval = newValue //2500
  chrome.storage.local.set({notif_timeinterval: {s:newValue}})
}

function createPanelItem(itemID, container) {

    let key = itemID
    createElement(key, {elem:'div', id: 'm-custom-inspector-item', classname: 'm-custom-item', style:_style.mItem}, (elem) => { 
      container.append(elem)
      createElement(key, {elem:'img', id: 'm-custom-inspector-img', classname: 'm-custom-img', style:_style.img, src: itemImages[key]}, (img) => { elem.append(img)}) 
      createElement(key, {elem:'input', id: 'm-custom-inspector-input', classname: 'css-gnelkr form-control', style:_style.input}, (input) => { 
        elem.append(input);   let _val = notif_prices[key]; if(_val) input.value = _val
        input.addEventListener('change', (ev)=> { 
          try {
            let _id= ev.target.id.split('-').reverse()[0]; notif_prices[_id]= Number(ev.target.value); notifChanged = true
          } catch(err) {}
        })
      })      
    })      
}

function _createMarketCheckboxes(marketItems, callback) {
  let aURL = chrome.runtime.getURL('cb-custom.png');
  console.log(aURL)
  let myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
       
  let myInit = { method: 'GET', headers: myHeaders,
    //mode: 'cors',
    //cache: 'default' 
    //body: JSON.stringify(payload)
  };

  aURL = 'chrome-extension://oniepekenofajnomiaocgahlackcdmmp/cb-custom.png'
  fetch( aURL, myInit ).then(response => {
    console.log(response)
  })

  marketItems.forEach( (item, index) => {
    //
  })  
}



function createMarketCheckboxes (items, callback) {

  let allitems = {}

      items.forEach((item, index) => {
      try {
        res_id = item.href.split('/').reverse()[1];  //console.log(item.href.split('/').reverse())
        /*allitems[res_id] = item.querySelector('img').src 
        if (index == items.length-1) console.log(allitems) */
    
        let _item = recent_items[res_id]
        if (_item) {
          createSVGStar(res_id, (_star) => {      
            item.append(_star)
            _star.addEventListener('click', (ev) => marketcbClicked(ev))
            /*_star.onclick  = (ev) => marketcbClicked(ev);*/ return})
          return
        }
    
        let cb = document.createElement("img");
        cb.className = 'm-item-cb';
        cb.id = 'm-item-cb-' + res_id;
        //cb.src = chrome.runtime.getURL('cb-custom.png');
        cb.src = 'https://www.simcompanies.com/static/images/sim-boosts2.png'
        //cb.height = 10; cb.width = 10
        cb.checked = false
        cb.style= _style.mitemcb  
        cb.isContentEditable = true   
        cb.onclick  = (ev) => marketcbClicked(ev)
        item.append(cb)
      } catch (err) {}
      })
  callback(true)
}

function marketcbClicked (ev)  {  
  //console.log(ev.target.parentNode) 
  let elem = _getElement(ev.target); // elem.checked = !elem.checked
  let hElem = elem.offsetParent;  if (!hElem) hElem = elem.parentNode
    let _id = hElem.href.split('/').reverse()[1]
    
  if (elem.nodeName == 'svg') {  //console.log('svg clicked')

    createMarketCheckboxes([hElem], ()=>null)
    delete recent_items[_id]
    messageToSW(runtimeID, {operation: 'recent_item', id: _id, action: 0}) //delete
    removePanelItem(_id)
  } 
  else  {
    createSVGStar(elem.id, (_star) => {
      hElem.append(_star)
      _star.onclick  = (event) => marketcbClicked(event)
    }) 
    recent_items[_id] = {ct: 0, price:0, qty: 0}
    createExchangePanelItem(_id)
    messageToSW(runtimeID, {operation: 'recent_item', id: _id, action: 1}) //add
  }

  //setTimeout(() => {hElem.removeChild(elem)}, 10)
  setTimeout(() => {elem.remove()}, 10)
  //_setSrc(elem, 'checkbox')
}
function preferWareClicked (elem)  {  
  let id= elem.id.split('-')[3]  //custom-prefer-ware-[1,2,...]
  elem.childNodes[1].classList.toggle('enabled')
  if(recent_items[id]) {
    delete recent_items[id]
    messageToSW(runtimeID, {operation: 'recent_item', id: id, action: 0}) //delete
    removePanelItem(id)
    return;}
  recent_items[id] = {ct: 0, price:0, qty: 0}
  createExchangePanelItem(id)
  messageToSW(runtimeID, {operation: 'recent_item', id: id, action: 1}) //add
}

function _getElement(target) {
  const getheader = () => {if (target.nodeName == 'path') {let hElem = target.parentElement; return hElem}; return target}
  let elem = getheader();  let id = elem.id;  let className = elem.className;
  if(elem.nodeName == 'svg') className = elem.className.baseVal 
  let elements = document.getElementsByClassName(className)
  //console.log(elements)
    for (let i = 0; i < elements.length; i++) { let e = elements[i]
      if (e.id == id) return (e);  
      if (i == elements.length -1) return (null); 
    }
  return null  
}


function createExchangePanel(callback) {
  let newElem = document.createElement("div");
  eCreated.exchangePanel = newElem
  newElem.className = 'css-10klw3m col-sm-4 col-xs-12';
  newElem.classList.add('side-panel', 'exchange-panel') 
  newElem.id = 'exchange-panel-01';
  newElem.style= _style.exchPanel;

  let params= {id:'custom-panel-container-01', classname: 'custom-panel-container'}
  //let pageElem = document.getElementById('page')
  let hElem = document.querySelector('.css-1ui26ma')

  if(hElem) {
      hElem.style = 'display: grid;'
      //let cont = document.getElementById('custom-panel-container-01')
      if (!eCreated.exchContainer) createContainer(params, newElem, (cont)=> {hElem.append(cont); eCreated.exchContainer= cont})
        else cont.prepend(newElem)
      
      //labels
      createElement(null, {elem:'div', id: 'm-custom-labels-1', classname: 'm-custom-labels', style:_style.mCustomLabels}, (elem) => { 
        newElem.append(elem)   
        createSVG(null, {id: 'custom-addwares-icon', classname: ['m-custom-wares'], innerHTML: _path.addWares}, (svg) => { 
          elem.append(svg);  svg.onclick = (ev) => {
            if(!eCreated.preferWaresPanel) {openWaresPanel((panel)=>eCreated.preferWaresPanel= panel); return} 
            else {/*toggleVisibility('wares-panel',(res)=>null);*/ eCreated.preferWaresPanel.classList.toggle('hidden')} }})
        createSVG(null, {id: 'm-custom-wares-icon', classname: ['m-custom-wares'], innerHTML: _path.wares}, (svg) => { 
          elem.append(svg)
          svg.onclick = (ev) => makeApiRequest(`api/v3/resources/${companyId}/`, null, (response) => {wares = response  ;console.log(response); setWares()})
        })      
 
        for (let i=1; i<3; i++) {
          createElement(i, {elem:'span', id: 'm-custom-label', classname: 'm-custom-label', style:_style.label, innerHTML: _getlabel(i)}, (label) => { elem.append(label)   })
        }   
      })
      //items
      createElement(null, {elem:'div', id: 'exchange-items-cont', classname: 'custom-items-cont'}, (cont) => { newElem.append(cont)  
      if (Object.keys(recent_items).length ==0) {for (let i=0;i<2;i++) createExchangePanelItem(i+1)}
      Object.keys(recent_items).forEach((key, index) => {
        createExchangePanelItem(key)
      })
      })
      callback(true) // chrome.runtime.sendMessage()
  }
  else callback(false) // chrome.runtime.sendMessage() 
  // callback(newElem) 
}


function createExchangePanelItem(itemID, container) {
  getElementById('exchange-items-cont',(cont) => {  if (!container)  container = cont;  if (container) {
      let key = itemID
      createElement(key, {elem:'div', id: 'm-custom-item', classname: 'm-custom-item', style:_style.mItem}, (elem) => { 
        container.append(elem)
        createElement(key, {elem:'div', id: 'm-custom-resource', classname:'m-custom-resource', style:'display:flex;'}, (div) => { 
          elem.append(div)
          createElement(key, {elem:'img', id: 'm-custom-img', classname: 'm-custom-img', style:_style.img, src: itemImages[key]}, (img) => { div.append(img)}) 
          createElement(key, {elem:'span', id: 'm-custom-stock', classname: 'm-custom-stock ware-stock-ct', innerText: _getWare(key, recent_items[key].qty)}, (span) => { div.append(span)}) 
        })  
         
        createElement(key, {elem:'div', id: 'm-custom-quality', classname: 'css-iagd39 dropdown btn-group', style:_style.div}, (div) => { 
          elem.append(div)
          createElement(key, {elem:'button', id: 'm-custom-quality-btn', classname: 'dropdown-toggle btn btn-default', style:_style.qtyBtn}, (btn) => { 
            div.append(btn)
              function qtyBtnClicked(ev) {let hElem = getHeaderByClassName(ev.target, 'css-iagd39')
                if (hElem.classList.contains('open')) hElem.classList.remove('open')
                else hElem.classList.add('open')
              } 
            btn.onclick =(ev) => qtyBtnClicked(ev)
            createElement(null, {elem:'span', style:''}, (span) => { 
              btn.append(span)
              createElement(null, {elem:'span', classname:'quality-value', innerText: String(recent_items[key].qty)}, (spanQty) => { span.append(spanQty); })  // spanQty.onclick = (ev) => qtyBtnClicked(ev)
              createSVGStar(key, (_star) => {_star.style = 'top:0;right:0;position:relative;'; span.append(_star); })
            })  
          })
          createElement(key, {elem:'ul', id: 'm-custom-quality-list', classname: 'dropdown-menu', style:_style.qtyUL}, (ul) => { 
            div.append(ul) ; let i = -1
              do { i++
              createElement(key, {elem:'li', classname: '', style:_style.qtyOption, role:'presentation'}, (li) => { 
                ul.append(li)
                li.onclick =(ev) => {let id = ev.target.parentNode.className.substring('m-custom-quality-list-'.length);  let qty = 0
                  console.log(ev.target); if (ev.target.textContent == '0' || ev.target.textContent == '') qty = 0;  
                                          else  qty = Number(ev.target.textContent);  
                  recentItemUpd(key, {qty: qty}, (r)=>setWares());
                  let hElem = getHeaderByClassName(ev.target, 'css-iagd39')
                  let spanNode=  getChildByNodeName(hElem, 'SPAN'); 
                  if (spanNode.className !== 'quality-value') {getChildByNodeName(spanNode, 'SPAN').innerText = ev.target.innerText; }
                }
                createElement(null, {elem:'a', style:_style.qtyLink, role:'menuitem', tabindex:'-1', innerHTML: String(i)}, (a) => { 
                  li.append(a)
                })})
              }    while (i < 12)
          })    
        })  

        createElement(key, {elem:'input', id: 'm-custom-input-units', classname: 'css-gnelkr form-control custom-input', style:_style.input}, (input) => { elem.append(input); input.value = recent_items[key].ct})  
        createElement(key, {elem:'input', id: 'm-custom-input-price', classname: 'css-gnelkr form-control custom-input', style:_style.input}, (input) => { elem.append(input); input.value = recent_items[key].price})  
        createElement(key, {elem:'button', id: 'm-custom-button', classname: 'css-1mvza91 btn btn-primary', style:_style.buyBtn, innerHTML:'Buy'}, (buyBtn) => { 
          elem.append(buyBtn)
          buyBtn.onclick = (ev) => {
            let _resID = String(ev.target.id) .split("-").slice(3).join();  
            let hElem = ev.target.parentElement;
            let unitsct = hElem.querySelector(`#m-custom-input-units-${_resID}`).value
            let maxprice = hElem.querySelector(`#m-custom-input-price-${_resID}`).value
            let q = Number(hElem.querySelector(`.quality-value`).textContent)
            recent_items[_resID] = {ct: unitsct, price: maxprice, qty: q}
            chrome.storage.local.set({recent_items: recent_items})   //container css-q9fi5t ef8ljhx0
            makeApiRequest('api/v2/market-order/take/', {resource: _resID, quantity: unitsct, quality: q, maxPrice: maxprice, money: currentCash()}, (response) => {
              if(response.success == false)  {let msg=response.message; showNotification(msg, 'message', false); return}
              const {bought, message, money, price} = response
              updateUnitsCount(key, bought, q)
              updatePlayerCash(money)
              let msg= message +' and '+ (price/bought).toFixed(3) + ' cost per unit';  playerMoney=money
              showNotification(msg, 'message', true)
            })
          }
        })  
      })    
    }
  })
}
function updateUnitsCount(id, amount, qty) {
  let elem = document.getElementById('m-custom-stock-' + id);
  elem.innerText = Number(elem.innerText) + Number(amount)
// to variable
  let i = 0;
  while (i < wares.length) { 
    if (id == wares[i].kind && qty <= wares[i].quality) wares[i].amount += amount; i++
  } 
}

function createNotification(messageObj, callback) {

  const {message, type, success}  = messageObj
  async function getJson() {if (type=='notif') { 
    const {kind, price, image} = JSON.parse(message)
    return {kind:kind, price:price, image:image}
    }
    return message}
  getJson().then(JSON=> {
    createElement(null, {elem:'div', classname:'css-1c8lzw9 edyzzdh0 custom-notif', style:'width: fit-content;'}, (elem) => { 
      createElement(null, {elem:'div', classname:'alert alert-error css-33kzy6', style:'padding:.5rem;margin-bottom:.5rem;'}, (div) => { 
        elem.append(div); 
        if (success) {div.classList.add('alert-success'); div.classList.remove('alert-error')}
        switch(type){ 
          case 'notif':
            createElement(null, {elem:'a', classname:'css-bjn8wh custom-notif custom-message', href:`${document.location.pathname}#`}, (_a) => { 
              div.append(_a); 
                               
              createElement(null, {elem:'img', src:`https://simcompanies.com/static/${JSON.image}`, style:'height:3rem;'}, (img) => { 
                _a.append(img); 
              })
              createElement(null, {elem:'span', innerText: ` available to purchase for ${JSON.price}`, style:''}, (span) => { 
                _a.append(span); 
              })
            }) ; break        
          default:
          createElement(null, {elem:'span', innerText: String(message)}, (span) => { 
            div.append(span); 
          })
        }
      })  // spanQty.onclick = (ev) => qtyBtnClicked(ev)
      setTimeout(()=> elem.remove(), 7000) // 180000
      callback(elem)
    }) 
  }) 
 
}
function showNotification(msg, type, success) {
  if (notificationContainer) {createNotification({message:msg, type: type, success: success}, (notif) => notificationContainer.append(notif)); return}
  getNotifContainer().then(c=> {if(c) {notificationContainer = c; createNotification({message:msg, type: type, success: success}, (notif) => c.append(notif))}; return})
}

function removePanelItem(itemID) {
    let item = document.getElementById('m-custom-item-' + itemID)
    if (item) item.remove()
}

function getElementById(id, callback) {
  let elem = document.getElementById(id)
  callback(elem)
}
async function getElementByIdSync(id) {
  let elem = document.getElementById(id)
  return elem
}

function removeExchangePanel(callback) {
  let elem = document.getElementById('exchange-panel-01')
  let headElem = elem.parentElement
  headElem.removeChild(elem)
  callback(true)
}
function removeElementById(id, callback) {
  let elem = document.getElementById(id)
  elem.remove()
  callback(true)
}
function toggleVisibility(element_id, callback) {
  let elem = document.getElementById(element_id)
  if (elem.style.visibility !== 'hidden') {elem.style.visibility = 'hidden'; callback(true); return}
  elem.style.visibility = 'visible'
  callback(true)
}

chrome.runtime.onConnect.addListener(() => {
    console.log('extension connected')
})

function createCheckbox(index, state, callback) {
  let newElem = document.createElement("input");
  newElem.className = 'm-item-cb';
  newElem.id = 'm-item-cb-' + index;
  newElem.type = "checkbox"
  newElem.checked = state
  newElem.style="position: absolute;"
  newElem.isContentEditable = true
   callback(newElem) 
}

function createElement(index, state, callback) {
  const _prefix = (index) => {if (!index && index !== 0) return ''; return '-';}
  let id_prefix = '-';  if (!index && index !== 0) {index = ''; id_prefix = ''}
  const {elem, id, classname, style, src, innerHTML, innerText, role, href, value, type, list, data, offsetLeft} = state
  
  let newElem = document.createElement(elem);
  if (classname) newElem.className = classname;
  if (id) newElem.id = id + id_prefix + index;
  //newElem.type = "checkbox"
  newElem.style= style
  //newElem.isContentEditable = true
  if (innerHTML) newElem.innerHTML = innerHTML 
  if (innerText) newElem.innerText = innerText 
  if (src) newElem.src = src
  if (role) newElem.role = role
  if (href) newElem.href = href
  if (value || value === 0) newElem.value = value
  if (type ) newElem.type = type
  if (list ) newElem.list = list
  if (data ) newElem.data = data
  
  //if (_for) newElem.for = _for
   callback(newElem)   
}

async function getCSRF() {
  let myInit = { method: 'GET', body: null};
  return fetch( new Request('https://www.simcompanies.com/api/csrf/'), myInit ).then(response => {if (response.ok) return response.json(); return new Promise(()=>{})}) 
 
}
function _getWare(id, qty) {
  //console.log(key, qty)
  let i = 0; let result = 0
  while (i < wares.length) { 
    //if(id ==1) console.log({ q: qty, waresq: wares[i].quality})
    if (id == wares[i].kind && qty <= wares[i].quality) result += wares[i].amount; i++
  } 
  return result
}
function setWares() {
  let items = document.getElementsByClassName('m-custom-stock')
  let i = 0; let sum = 0
  while (i < items.length) { 
    let id = items[i].id.substring('m-custom-stock-'.length)
    //if (i == 0) console.log(recent_items[id].qty)
    items[i].innerText = _getWare(Number(id), recent_items[id].qty); i++
  } 
}
function recentItemUpd(id, data, callback) {
  const {ct, price, qty} = data
  //console.log(data)  // 0 == 0
  if(ct) recent_items[id].ct = ct;  if(price) recent_items[id].price = price;  if(qty || qty === 0) recent_items[id].qty = qty;
  chrome.storage.local.set({recent_items: recent_items}) 
  callback(true)
}

function fetchLowerPrices() {
  const fprices = async () => {  
    let myInit = { method: 'GET', body: null};
    return fetch( new Request('https://www.simcompanies.com/api/v3/market-ticker/0/'), myInit ).then(response => {if (response.ok) return response.json(); return new Promise(()=>{})})
  }
  fprices().then(response=> { 
      response.forEach(item=> {   
        let limPrice=  notif_prices[String(item.kind)]; 
        if (limPrice) if (limPrice >= item.price) {
          let msg= JSON.stringify(item)  
          showNotification(msg, 'notif', true)
        }
      })
  })
}

function makeApiRequest(apiMethod, payload, callback ) {
  //let payload = {resource: 21, quantity: 1, quality: 0, maxPrice: 60, money: currentCash()}
  const fullUrl = 'https://www.simcompanies.com/' + apiMethod;
  //const urlWithoutDomain = fullUrl.split("/").slice(3).join("/");

  let myHeaders = new Headers();
      myHeaders.append('Content-Type', 'application/json');
      myHeaders.append('x-csrftoken', '29E5YOvjgz7eHRV3pUCTmfBhOf30X6e2FHGTFgyYp5Qe0xRxm2bsMF1z8dWfOCEe');
      myHeaders.append('x-prot', '6feae21259afe21eb48979c6eaff4e12');
      myHeaders.append('x-ts', Date.now());
      //myHeaders.append('x-tz-offset', '-120');
                                     
  let myInit = { method: 'POST', headers: myHeaders,
      //mode: 'cors',
      //cache: 'default' 
      body: JSON.stringify(payload)
  };
  let _api= [`api/v3/resources/${companyId}/`, 'api/v2/companies/me/buildings/', 'api/v3/companies/auth-data/']
  const _method = () => {if (_api.includes(apiMethod)) return 'GET'; return 'POST'}
  const _payload = () => {if (payload) return JSON.stringify(payload); return null}
  //const resp = await fetch( new Request('https://www.simcompanies.com/api/v2/market-order/take/'), myInit ) 
  //const response = await resp.json()
  //console.log(response)

  const makeRequest = () => {
    fetchWithConfig( fullUrl, _method(), _payload(), hdrs).then((response => {
      dispatchRequest({api: apiMethod, response: response})
      callback(response)
    }))
  }
  if (!csrftoken) {
    getCSRF().then(result => { csrftoken = result.csrfToken
      hdrs.addCsrfToken(csrftoken)
      makeRequest()
  })}
  else  makeRequest() 
}

/*
 * Fetch
 */
function fetchWithConfig(fullUrl, method, data, myHeaders)  {
  // hdrs / myHeaders
  const seconds = new Date().getTime();  //1749222240338
  const urlWithoutDomain = "/" + fullUrl.split("/").slice(3).join("/");  
  hdrs.addBotProtection(seconds, urlWithoutDomain)
  //console.log({sec: seconds, url: urlWithoutDomain, prot: utt(seconds, urlWithoutDomain)})
  let init = {
    method: method, /*body: data,*/
    headers: {
      'X-Ts': seconds,
      //'X-Prot': hex_md5("/" + urlWithoutDomain + seconds),
        'X-Prot': hdrs.headers["X-Prot"],
      'x-csrftoken': hdrs.headers.common["X-CSRFToken"]
    },
    credentials: 'include',
  } 
  if (data) init.body = data;

  return fetch(fullUrl, init).then(response => {
    if(!response.ok) {
      //response.json().then(json => errorNotification(registration, actionTitle + " failed", json.message || "Unexpected errror"));
      //response.json().then(json => {console.log(json); try{return {success: false, message: json.message}}catch(err) {return {success: false, message: err.message}}});
      
      return new Promise((res, rej) => { response.json().then(json => {console.log(json); json.success =false; res(json) })});
    }
    else
    return response.json();
  });

}



// sc service worker
/*
 * MD5sum
 */
const HEXCASE = 0;

const binl2rstr = (input) => {
  let output = "";
  for(let i = 0; i < input.length * 32; i += 8)
    output += String.fromCharCode((input[i>>5] >>> (i % 32)) & 0xFF);
  return output;
};

const safe_add = (x, y) => {
  let lsw = (x & 0xFFFF) + (y & 0xFFFF);
  let msw = (x >> 16) + (y >> 16) + (lsw >> 16);
  return (msw << 16) | (lsw & 0xFFFF);
};

/*
 * Bitwise rotate a 32-bit number to the left.
 */
const bit_rol = (num, cnt) => {
  return (num << cnt) | (num >>> (32 - cnt));
};

const md5_cmn = (q, a, b, x, s, t) => safe_add(bit_rol(safe_add(safe_add(a, q), safe_add(x, t)), s),b);
const md5_ff = (a, b, c, d, x, s, t) => md5_cmn((b & c) | ((~b) & d), a, b, x, s, t);
const md5_gg = (a, b, c, d, x, s, t) => md5_cmn((b & d) | (c & (~d)), a, b, x, s, t);
const md5_hh = (a, b, c, d, x, s, t) => md5_cmn(b ^ c ^ d, a, b, x, s, t);
const md5_ii = (a, b, c, d, x, s, t) => md5_cmn(c ^ (b | (~d)), a, b, x, s, t);


const binl_md5 = (x, len) => {
  /* append padding */
  x[len >> 5] |= 0x80 << ((len) % 32);
  x[(((len + 64) >>> 9) << 4) + 14] = len;

  let a =  1732584193;
  let b = -271733879;
  let c = -1732584194;
  let d =  271733878;

  for(let i = 0; i < x.length; i += 16)
  {
    let olda = a;
    let oldb = b;
    let oldc = c;
    let oldd = d;

    a = md5_ff(a, b, c, d, x[i+ 0], 7 , -680876936);
    d = md5_ff(d, a, b, c, x[i+ 1], 12, -389564586);
    c = md5_ff(c, d, a, b, x[i+ 2], 17,  606105819);
    b = md5_ff(b, c, d, a, x[i+ 3], 22, -1044525330);
    a = md5_ff(a, b, c, d, x[i+ 4], 7 , -176418897);
    d = md5_ff(d, a, b, c, x[i+ 5], 12,  1200080426);
    c = md5_ff(c, d, a, b, x[i+ 6], 17, -1473231341);
    b = md5_ff(b, c, d, a, x[i+ 7], 22, -45705983);
    a = md5_ff(a, b, c, d, x[i+ 8], 7 ,  1770035416);
    d = md5_ff(d, a, b, c, x[i+ 9], 12, -1958414417);
    c = md5_ff(c, d, a, b, x[i+10], 17, -42063);
    b = md5_ff(b, c, d, a, x[i+11], 22, -1990404162);
    a = md5_ff(a, b, c, d, x[i+12], 7 ,  1804603682);
    d = md5_ff(d, a, b, c, x[i+13], 12, -40341101);
    c = md5_ff(c, d, a, b, x[i+14], 17, -1502002290);
    b = md5_ff(b, c, d, a, x[i+15], 22,  1236535329);

    a = md5_gg(a, b, c, d, x[i+ 1], 5 , -165796510);
    d = md5_gg(d, a, b, c, x[i+ 6], 9 , -1069501632);
    c = md5_gg(c, d, a, b, x[i+11], 14,  643717713);
    b = md5_gg(b, c, d, a, x[i+ 0], 20, -373897302);
    a = md5_gg(a, b, c, d, x[i+ 5], 5 , -701558691);
    d = md5_gg(d, a, b, c, x[i+10], 9 ,  38016083);
    c = md5_gg(c, d, a, b, x[i+15], 14, -660478335);
    b = md5_gg(b, c, d, a, x[i+ 4], 20, -405537848);
    a = md5_gg(a, b, c, d, x[i+ 9], 5 ,  568446438);
    d = md5_gg(d, a, b, c, x[i+14], 9 , -1019803690);
    c = md5_gg(c, d, a, b, x[i+ 3], 14, -187363961);
    b = md5_gg(b, c, d, a, x[i+ 8], 20,  1163531501);
    a = md5_gg(a, b, c, d, x[i+13], 5 , -1444681467);
    d = md5_gg(d, a, b, c, x[i+ 2], 9 , -51403784);
    c = md5_gg(c, d, a, b, x[i+ 7], 14,  1735328473);
    b = md5_gg(b, c, d, a, x[i+12], 20, -1926607734);

    a = md5_hh(a, b, c, d, x[i+ 5], 4 , -378558);
    d = md5_hh(d, a, b, c, x[i+ 8], 11, -2022574463);
    c = md5_hh(c, d, a, b, x[i+11], 16,  1839030562);
    b = md5_hh(b, c, d, a, x[i+14], 23, -35309556);
    a = md5_hh(a, b, c, d, x[i+ 1], 4 , -1530992060);
    d = md5_hh(d, a, b, c, x[i+ 4], 11,  1272893353);
    c = md5_hh(c, d, a, b, x[i+ 7], 16, -155497632);
    b = md5_hh(b, c, d, a, x[i+10], 23, -1094730640);
    a = md5_hh(a, b, c, d, x[i+13], 4 ,  681279174);
    d = md5_hh(d, a, b, c, x[i+ 0], 11, -358537222);
    c = md5_hh(c, d, a, b, x[i+ 3], 16, -722521979);
    b = md5_hh(b, c, d, a, x[i+ 6], 23,  76029189);
    a = md5_hh(a, b, c, d, x[i+ 9], 4 , -640364487);
    d = md5_hh(d, a, b, c, x[i+12], 11, -421815835);
    c = md5_hh(c, d, a, b, x[i+15], 16,  530742520);
    b = md5_hh(b, c, d, a, x[i+ 2], 23, -995338651);

    a = md5_ii(a, b, c, d, x[i+ 0], 6 , -198630844);
    d = md5_ii(d, a, b, c, x[i+ 7], 10,  1126891415);
    c = md5_ii(c, d, a, b, x[i+14], 15, -1416354905);
    b = md5_ii(b, c, d, a, x[i+ 5], 21, -57434055);
    a = md5_ii(a, b, c, d, x[i+12], 6 ,  1700485571);
    d = md5_ii(d, a, b, c, x[i+ 3], 10, -1894986606);
    c = md5_ii(c, d, a, b, x[i+10], 15, -1051523);
    b = md5_ii(b, c, d, a, x[i+ 1], 21, -2054922799);
    a = md5_ii(a, b, c, d, x[i+ 8], 6 ,  1873313359);
    d = md5_ii(d, a, b, c, x[i+15], 10, -30611744);
    c = md5_ii(c, d, a, b, x[i+ 6], 15, -1560198380);
    b = md5_ii(b, c, d, a, x[i+13], 21,  1309151649);
    a = md5_ii(a, b, c, d, x[i+ 4], 6 , -145523070);
    d = md5_ii(d, a, b, c, x[i+11], 10, -1120210379);
    c = md5_ii(c, d, a, b, x[i+ 2], 15,  718787259);
    b = md5_ii(b, c, d, a, x[i+ 9], 21, -343485551);

    a = safe_add(a, olda);
    b = safe_add(b, oldb);
    c = safe_add(c, oldc);
    d = safe_add(d, oldd);
  }
  return [a, b, c, d];
};

const rstr2binl = (input) => {
  let output = Array(input.length >> 2);
  for(let i = 0; i < output.length; i++)
    output[i] = 0;
  for(let i = 0; i < input.length * 8; i += 8)
    output[i>>5] |= (input.charCodeAt(i / 8) & 0xFF) << (i%32);
  return output;
};

const rstr_md5 = (s) => binl2rstr(binl_md5(rstr2binl(s), s.length * 8));

const rstr2hex = (input) => {
  const hex_tab = HEXCASE ? "0123456789ABCDEF" : "0123456789abcdef";
  let output = "";
  let x;
  for(let i = 0; i < input.length; i++)
  {
    x = input.charCodeAt(i);
    output += hex_tab.charAt((x >>> 4) & 0x0F)
        +  hex_tab.charAt( x        & 0x0F);
  }
  return output;
};

const str2rstr_utf8 = (input) => {
  let output = "";
  let i = -1;
  let x, y;

  while(++i < input.length)
  {
    /* Decode utf-16 surrogate pairs */
    x = input.charCodeAt(i);
    y = i + 1 < input.length ? input.charCodeAt(i + 1) : 0;
    if(0xD800 <= x && x <= 0xDBFF && 0xDC00 <= y && y <= 0xDFFF)
    {
      x = 0x10000 + ((x & 0x03FF) << 10) + (y & 0x03FF);
      i++;
    }

    /* Encode output as utf-8 */
    if(x <= 0x7F)
      output += String.fromCharCode(x);
    else if(x <= 0x7FF)
      output += String.fromCharCode(0xC0 | ((x >>> 6 ) & 0x1F),
          0x80 | ( x         & 0x3F));
    else if(x <= 0xFFFF)
      output += String.fromCharCode(0xE0 | ((x >>> 12) & 0x0F),
          0x80 | ((x >>> 6 ) & 0x3F),
          0x80 | ( x         & 0x3F));
    else if(x <= 0x1FFFFF)
      output += String.fromCharCode(0xF0 | ((x >>> 18) & 0x07),
          0x80 | ((x >>> 12) & 0x3F),
          0x80 | ((x >>> 6 ) & 0x3F),
          0x80 | ( x         & 0x3F));
  }
  return output;
};

const hex_md5 = (s) => rstr2hex(rstr_md5(str2rstr_utf8(s)));


//  https://www.simcompanies.com/api/v3/market-ticker/0/  - min prices
