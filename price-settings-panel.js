function createPriceInspector(callback) {
    try {
      let hElem = document.getElementsByClassName('css-inxa61')[0]
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
            svg.addEventListener('click', (ev) => {   toggleLowerPricePanel(); moveChat() })
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
              createElement(null, {elem:'label', id: 'm-custom-inspector-label', classname: 'm-custom-label inspector-interval',innerText: 'interval', style:'margin-bottom:0;margin-left:1rem;'}, (label) => {
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