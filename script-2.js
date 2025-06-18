   /* chrome.runtime.sendMessage(
   
    //extensionId?: string,
    //message: any,
    //options?: object,
    //callback?: function,

  )   
    */

  //const {createElement} = require('./functions')
  

function toggleBusyPanel() {
  changeSidePanelState(panel.buildBusy,()=> {
      if(priceSettingsChecked && eCreated.priceInspectorPanel) {_hide(panel.prcInspector); priceSettingsChecked=false}
      
     /*if (busySettingsChecked) {
        if (!eCreated.busyCont) {createBuildBusySettings((res)=> null) 
        else  toggleVisibility
      }}
        else  
      removeElementById(panel.buildBusy, (res)=> busySettingsChecked=false)*/

      if (busySettingsChecked && !eCreated.busyPanel) {createBuildBusySettings((result) => null); _show(panel.buildBusy)}
      else   {_hide(panel.buildBusy); if(!eCreated.busyPanel.querySelector('.custom-busy-item')) createBusyItems(eCreated.busyPanel.querySelector('.build-busy-items-cont'))}
  })
}
function toggleLowerPricePanel() {
  changeSidePanelState(panel.prcInspector, ()=> {
      if(busySettingsChecked && eCreated.priceInspectorPanel) {_hide(panel.buildBusy); busySettingsChecked=false}
      if (priceSettingsChecked && !eCreated.priceInspectorPanel) openPriceSettings((res)=> null)
        else  
        _hide(panel.prcInspector)
  })
}
function changeSidePanelState(sidePanel, callback) {
  if(sidePanel == panel.buildBusy) busySettingsChecked = !busySettingsChecked;
  if(sidePanel == panel.prcInspector) priceSettingsChecked = !priceSettingsChecked;
  if(sidePanel == panel.exchange) customExchangeChecked = !customExchangeChecked;
  callback()
}
  

function createBuildingBusiness(callback) {
  try {
    let hElem = document.getElementsByClassName('css-inxa61 e1uuitfi4')[0]
    if(hElem) {
      createElement(null, {elem:'div', id: 'build-busy-cont', classname: 'custom-cont build-busy-cont', style:_style.prcInspector}, (elem) => { 
        hElem.append(elem)
        createElement(null, {elem:'div', id: 'build-busy', classname: 'headbar-item build-busy', style:_style.prcInspector}, (div) => { 
          elem.append(div)   
          div.addEventListener('click', (ev) => {toggleBuildBusyService(ev)  })

          createSVG(null, {id: 'build-busy-toggle', classname: ['build-busy','acting-toolbar', 'toggle'], innerHTML: _path.buildBusy}, (svg) => { 
              div.append(svg)   
            })
        })
        createSVG(null, {id: 'build-busy-settings', classname: ['headbar-item', 'build-busy', 'settings'], innerHTML: _path.inspectorSettings, style:_style.prcInspectorSettings}, (svg) => { 
          elem.append(svg)   
          svg.addEventListener('click', (ev) => {   toggleBusyPanel() })
        })
        callback(true) // chrome.runtime.sendMessage()
      })
    }
    else callback(false) // chrome.runtime.sendMessage() 

  } catch(err) {console.log(err)}
}


function createBuildBusySettings(callback) {
  try {
  //let pageElem = document.getElementById('page')
  let hElem = document.querySelector('.css-1ui26ma')
  if(hElem) {  
    hElem.style = 'display: grid;'
    createElement(null, {elem:'div', id:'build-busy-panel',classname:'side-panel build-busy-panel'}, (panel)=> { eCreated.busyPanel = panel
      if(eCreated.busyCont)  eCreated.busyCont.append(panel)
      else
    createContainer({id:'custom-panel-container-02', classname: 'custom-panel-container busy-container'}, panel, (cont)=> {hElem.append(cont); eCreated.busyCont = cont;})
    
          //newElem.style="display: inline-flex; position: fixed; flex-direction: column; justify-content: flex-start; align-items: center; background: rgb(34, 34, 34); z-index: 5; padding-top: 15px; height:100%;width:30%;"
        //labels
        createElement(null, {elem:'span', id: 'build-busy-label', classname: 'm-custom-label', style:_style.label, innerHTML: 'Set values to notificate'}, (label) => { panel.append(label)   })
        /*
        //timeoutinterval in seconds
        createElement(null, {elem:'div', id: 'm-custom-busy-interval', classname: 'm-custom-inspector-interval'}, (div) => {
          newElem.append(div)
          createElement(null, {elem:'form', id: 'm-custom-busy-form-1', classname: 'm-custom-form', style:'display:flex;align-items:center;margin-bottom:.5rem;margin-top:1rem;'}, (form) => {
            div.append(form)
            createElement(null, {elem:'label', id: 'm-custom-busy-label', classname: 'm-custom-label',innerText: 'interval', style:'margin-bottom:0;'}, (label) => {
              form.append(label)
              createElement(null, {elem:'input', id: 'm-custom-busy-input', classname: 'm-custom-input', value: notif_timeinterval/1000, style:'margin-top:0;'}, (input) => {
                label.append(input)
   
              })
            })
            createElement(null, {elem:'button', id: 'm-custom-busy-interval', classname: 'dropdown-toggle btn btn-default', style:_style.intervalBtn, innerHTML:'Set Interval', type:'button'}, (btn) => { 
              form.append(btn)
              btn.onclick =(ev) => { try{
                let _input = document.getElementById('m-custom-inspector-input'); //document.getElementById().childNodes
                if (_input) updateInterval(_input.value)
                }catch(err){ console.log(err)}
              }
            })
          })
        })     */   
        //item container
        createElement(null, {elem:'div', id: 'm-custom-busy-container', classname:  'custom-items-cont build-busy-items-cont'}, (container) => {
          panel.append(container)
          //items
          createBusyItems(container)
        })
        createElement(null, {elem:'form', id: 'build-busy-form', classname: 'm-custom-form'}, (div) => { 
          panel.append(div)   
          createElement(null, {elem:'span', id: 'build-busy-label-2', classname: 'custom-label', innerText:'safe budget'}, (label) => { 
            div.append(label)  
            createElement(null, {elem:'input', id: 'build-busy-budget-input', classname: 'custom-input', value: busy_budget}, (input) => { 
              label.append(input)   
            }) 
          })
          createElement(null, {elem:'button', type:"button", id: 'custom-build-busy-btn', classname: 'btn button-default custom-button', innerHTML:'apply'}, (btn) => { 
            div.append(btn)   
            btn.onclick = (ev) => {let _input = document.getElementById('build-busy-budget-input'); let value = _input.value; chrome.storage.local.set({busy_budget: Number(value)}); busy_budget = value}
          }) 
        })
    })
    createElement(null, {elem:'div', id: 'custom-busy-list-cont', classname: 'custom-list-cont busy dropdown btn-group', style:_style.div}, (cont) => { 
      hElem.append(cont)// toggler.append(cont)
      createElement(null, {elem:'ul', id: 'custom-busy-list', classname: 'dropdown-menu dropdown-busy-wares', style:_style.busyWares}, (ul) => { 
        cont.append(ul) ; let i = -1
          do { i++
          createElement(null, {elem:'li', classname: '', style:_style.qtyOption, role:'presentation'}, (li) => { 
            ul.append(li)
            li.onclick =(ev) => { 
              //let hElem = document.getElementById
              //let hElem = getHeaderByClassName(ev.target, 'dropdown-menu'); console.log(hElem.childNodes)
              let _id = busy_list_id;            //let _id = hElem.id.substring('custom-busy-list-'.length);  
              let spanNode = document.getElementById('custom-busy-warelabel-'+ _id);
                spanNode.innerText = ev.target.innerText;  
                console.log(_id)
                busy_build[String(_id)].kind = resID[spanNode.innerText].id; busyBuild_changed = true
                chrome.storage.local.set({busy_build: busy_build})
                  //if (spanNode.className !== 'quality-value') {getChildByNodeName(spanNode, 'SPAN').innerText = ev.target.innerText; } 
                hElem = getHeaderByClassName(ev.target, 'custom-list-cont');  if(hElem) hElem.classList.toggle('open')
              } 
            createElement(null, {elem:'a', style:_style.qtyLink, role:'menuitem', tabindex:'-1', innerHTML: ''}, (a) => { 
              li.append(a)
            })})
          }    while (i < 12)
      })  
    })

      callback(true) // chrome.runtime.sendMessage()    
    }
    else callback(false) // chrome.runtime.sendMessage() 

  } catch(err) {console.log(err)}  
}

function createBuildBusyItem(item, container) {

  let key = item.id
  let resources = busy_items[item.name]

  createElement(key, {elem:'div', id: 'custom-busy-item', classname: 'm-custom-item custom-busy-item custom-j2ks46k', style:'align-content:center;'}, (elem) => { 
    container.append(elem)
    if(buildings[key]) if(buildings[key].busy) elem.classList.add('enabled') 
      elem.onmouseenter = (ev)=> setTextColorForTile(ev) 
      elem.onmouseleave = (ev)=> setTextColorForTile(ev) 
    createElement(key, {elem:'div', id: 'custom-busy-img-cont', classname: 'custom-image-cont busy', style:_style.div}, (cont) => { 
      elem.append(cont)// toggler.append(cont)      
      createElement(key, {elem:'img', id: 'custom-busy-img', classname: 'm-custom-img busy-img', src: 'static/' +item.image}, (img) => { cont.append(img)})
      createElement(key, {elem:'span', classname:'quality-value-wrap building-lvl', style:'', innerText: 'Lv ' + buildings[key].size}, (span) => { 
        cont.append(span)
      })      
    })
    //createElement(key, {elem:'div', id: 'custom-busy-toggler', classname: 'css-iagd39 dropdown btn-group', style:_style.busyDropdownGrp}, (toggler) => { 
    //  elem.append(toggler)

      createElement(key, {elem:'button', id: 'custom-busy-btn', classname: 'btn custom-dropdown-toggle', style:_style.toggleBtn}, (btn) => { 
        elem.append(btn)// toggler.append(btn)
          function qtyBtnClicked(ev) {    let target= ev.target
            let _id = target.id.split('-').reverse()[0] //let _id = ev.target.id.substring('custom-busy-btn-'.length);  //
            if(_id) {let hElem = document.getElementById('custom-busy-list-cont'); if(hElem && _id == busy_list_id) {hElem.classList.toggle('open')} else showBusyItemList(hElem); busy_list_id= _id
          /*  hElem = ev.target.parentNode
            let input=  getChildByNodeName(hElem, 'INPUT'); if (input) {ev.target.innerHTML = input.value;} */
            let bname= buildings[_id].name; let resources = busy_items[bname]
            let li_nodes= hElem.childNodes[0].childNodes; 
            resources.forEach((key, index)=> {li_nodes[index].childNodes[0].innerHTML = key; li_nodes[index].style='height:unset;';})
            let i = resources.length; while(i<li_nodes.length) { li_nodes[i].childNodes[0].innerHTML = ''; li_nodes[i].style='height:0;'; i++}
            }
          } 
        btn.onclick =(ev) => qtyBtnClicked(ev)
        createElement(null, {elem:'span', classname:'quality-value-wrap', style:''}, (span) => { 
          btn.append(span)
          
          createElement(key, {elem:'span', id: 'custom-busy-warelabel', classname:'quality-value', innerText: resources[0]}, (spanQty) => { span.append(spanQty);
            Object.keys(resID).forEach(resKey=> {if(busy_build[key]) if (resID[resKey].id == busy_build[key].kind) spanQty.innerText= resKey })
          })  // spanQty.onclick = (ev) => qtyBtnClicked(ev)
         
        })  
      })
          // there was build busy list
    //})  
    createElement(key, {elem:'div', id: 'custom-busy-form', classname: 'custom-form custom-j2ks46k', style:'display:flex; flex-direction:column; margin-left: 1rem;'}, (form) => {
      elem.append(form)

      createElement(key, {elem:'input', id: 'custom-busy-input', classname: 'm-custom-input busy-input', value: busy_build[key].ct}, (input) => {
        form.append(input)
        input.addEventListener('change', (ev)=> {let _id= ev.target.id.split('-').reverse()[0]; busy_build[_id].ct= Number(ev.target.value); busyBuild_changed = true})
      })
      //createElement(key, {elem:'input', id: 'm-custom-input-price', classname: 'css-gnelkr form-control', style:_style.input}, (input) => { elem.append(input); input.value = recent_items[key].price})  
      createElement(key, {elem:'button', id: 'custom-busy-button', classname: 'css-1mvza91 btn btn-primary', style: _style.busyProdBtn, innerHTML:'Produce'}, (Btn) => { 
        form.append(Btn)
        Btn.onclick = (ev) => {
          let _id = ev.target.id.split('-').reverse()[0]
          let _btn = document.getElementById(`custom-busy-button-${43574431}`)
          //let _id = _btn.id.substring('custom-busy-button-'.length);
          let _resID = busy_build[String(_id)].kind
          let hElem = ev.target.parentElement;
          let unitsct = Number(document.querySelector(`#custom-busy-input-${_id}`).value)
          //let maxprice = hElem.querySelector(`#m-custom-input-price-${_resID}`).value
          let q = null //let q = Number(hElem.querySelector(`.quality-value`).textContent)
          busy_build[_id] = {ct: unitsct, kind: _resID, qty: q};
          //console.log(busy_build[key])
          chrome.storage.local.set({busy_build: busy_build})   //container css-q9fi5t ef8ljhx0
          newProductionRequest(buildings[_id], 'user')
          /*
          makeApiRequest(`api/v1/buildings/${key}/busy/`, {amount: unitsct, kind: _resID, limitQuality: q}, (response) => {
            const {message, unitCost, building} = response
            //updatePlayerCash(money)
            let msg= message ;  //playerMoney=money
            if (!notificationContainer) getNotifContainer.then(c=> {if(c) {notificationContainer = c; createNotification({message:msg, type:'message'}, (notif) => c.append(notif))}; return})
              //console.log(notificationContainer)
            createNotification({message:msg, type:'message'}, (notif) => notificationContainer.append(notif))
          })*/
        }
      }) 
    })
 
  })      
}

function openWaresPanel(callback) {
  let newElem = document.createElement("div");
  newElem.className = 'css-10klw3m col-sm-4 col-xs-12';
  newElem.classList.add('side-panel', 'prefer-wares-panel') 
  newElem.id = 'wares-panel';
  let hElem = document.getElementById('custom-panel-container-01');

  if(hElem) {
      hElem.append(newElem)
      //labels
      createElement(null, {elem:'div', id: 'custom-wares-1', classname: 'custom-items-cont'}, (cont) => { 
        newElem.append(cont)   
        createElement(null, {elem:'span', id: 'custom-ware-label-1', classname: 'm-custom-label', innerText:'Choose prefer ware',style:_style.mCustomLabels}, (span) => { cont.append(span)  })   
        createElement(null, {elem:'div', id: 'custom-wares-cont-1', classname: 'custom-items-cont'}, (div) => { cont.append(div)  
          // wares
          Object.values(resID).forEach((value, index) => {
            createWaresPanelItem(value.id, div)
          })
        })
      })
      callback(newElem)
  }
  else callback(false) 
}
function createWaresPanelItem(id, hElem) {

      let key = id
      let classList = ['pref-ware-cb', 'svg-inline--fa', 'fa-star', 'css-0']
      if(recent_items[id]) classList.push('enabled')
      createElement(key, {elem:'div', id: 'custom-prefer-ware', classname: 'm-custom-item prefer-ware'}, (elem) => { 
        hElem.append(elem)
        elem.addEventListener('click', (ev)=> {preferWareClicked(elem)})
        createElement(key, {elem:'img', id: 'custom-prefer-ware-img', classname: 'm-custom-img', style:_style.img, src: itemImages[key]}, (img) => { elem.append(img)}) 
        createSVG(key, {id: 'prefer-ware-cb', classname: classList, innerHTML: _path.SVGStar, style:'visibility:unset;'}, (svg) => { elem.append(svg)})}) 
     
  }
 
function toggleBuildBusyService(event) {
  const getToolbarItem = async (ev) => {
    if (ev) {return (function(){if(ev.target.nodeName == 'path')return ev.target.closest('.build-busy'); return ev.target})()}
    else  return parseElementWithInterval('build-busy-toggle').then(toggler=> {return toggler})
  }
  getToolbarItem(event).then(target => target.classList.toggle('enabled')) 
  // отключение авто производства
  if (buildBusyTimeout)  {
    Object.keys(busyTimeouts).forEach((_key, index)=> {clearTimeout(busyTimeouts[_key]);})
    buildBusyTimeout=null; buildBusyState = 0
    showNotification('Building busy service offline', 'message', false)   
    messageToSW(runtimeID, {operation:'buildBusy', state:0})
  }
  // включение
  else   {createTimeoutForBuildBusy(); messageToSW(runtimeID, {operation:'buildBusy', state:1}); buildBusyTimeout=true; buildBusyState = 1; showNotification('service in work', 'message', true)}
}  
   
  
function createBusyItems(hElem) {
  Object.keys(buildings).forEach((key, index) => {
    createBuildBusyItem(buildings[key], hElem)
  })
}