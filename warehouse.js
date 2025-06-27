

function injectSellBtn(items) {
    //let items = []; let _items = document.getElementsByClassName('e14va4ca4'); for (let i=0; i < _items.length; i++) {items.push(_items[i])}
    //console.log({_items, items})
    //document.querySelector('button.css-1j4mifc').remove()
    parseElementWithInterval({selector: 'button.css-1j4mifc', single: true}).then(showAllBtn=> showAllBtn.remove())
    parseElementWithInterval({selector: 'div.css-1iegaby.e14va4ca9', single: true}).then(waresPage=> 
        createElement(null, {elem:'button', type:'button', classname: 'css-1j4mifc custom-showall', innerHTML:'Show all'}, (btn) => { waresPage.prepend( btn)
            btn.onclick = (ev) => {showAllResources(waresPage)}
        })
    )
    
    
    items.forEach((item, index)=> {
        let hElem =  item.parentNode
        function getItemData(item, nodeName) {let i = -1; do {i++; if(item.childNodes[i].nodeName == nodeName) 
            switch (nodeName){
                case 'B': return item.childNodes[i].textContent; break;
                case 'IMG': return item.childNodes[i].src; break;
                case 'SPAN': if (item.childNodes[i].classList.contains('e14va4ca1')) return item.childNodes[i].innerText; break;
                default : return null
            }
        }  while(i < item.childNodes.length -1) }

        let key = resID[getItemData(item, 'B')].id
        let stock = getItemData(item, 'SPAN')
        if (key) { //let offset = (hElem.scrollWidth - item.offsetLeft - 130 ); style:`margin-right:${offset}px;`
            createElement(key, {elem:'div', id: 'warehouse-item', classname: 'custom-cont warehouse-item'}, (cont) => { hElem.append(cont);
                createElement(null, {elem:'div', classname: 'warehouse-item button', style: 'width:0;'}, (div) => { cont.append(item, div);
                    createElement(key, {elem:'button', id: 'warehouse-item-sell-btn', classname: 'warehouse-item sell-btn', innerHTML:'Sell'}, (btn) => { div.append(btn)
                        btn.onclick = (ev)=> onSellButtonClick()
                      })
                })
            })
        }
        function onSellButtonClick() {
            if (eCreated.customSell)  { eCreated.customSell.remove(); }
            //if (wares.length > 0)  setWaresForOptions()
            let page = document.getElementById('page')
            
            createElement(key, {elem:'div', id: 'warehouse-item-sell', classname: 'warehouse-item custom-sell'}, (div) => { page.append(div);  eCreated.customSell = div
                createElement(key, {elem:'img', id: 'custom-sell-img', classname: 'warehouse-item custom-img', src: getItemData(item, 'IMG')}, (img) => { div.append(img)})
                createElement(null, {elem:'div', id: 'custom-sell-stock-cont', classname: 'custom-sell-cont'}, (cont) => { div.append(cont)
                    createElement(key, {elem:'span', id: 'custom-sell-stock', classname: 'warehouse-item stock', innerHTML: stock}, (span) => { cont.append(span)})
                    createElement(key, {elem:'div', classname: 'custom-sell-cont qty'}, (cont2) => { cont.append(cont2)
                        
                        createElement(key, {elem:'select', id: 'custom-sell-qty', classname: 'custom-select warehouse-item quality'}, (select) => { 
                            cont2.append(select)
                            select.onchange = (ev)=> setSellingInput(ev.target, key)
                            let i = -1; 
                            do {   i++; 
                                createElement(key, {elem:'option', classname: 'custom-option warehouse-item qty', innerText: `${i}: -1`}, (option) => { select.append(option)
                                    if (i== 11) if (wares.length == 0)  makeApiRequest(`api/v3/resources/${companyId}/`, null, (response) => {wares = response; setWaresForOptions((_wares)=> setHigherCt(_wares))})
                                    else  setWaresForOptions((_wares)=> setHigherCt(_wares))
                            })  } while(i < 12)
                        })
                        let classList = ['svg-inline--fa', 'fa-star', 'css-0', 'custom-sell-svg-star']
                        createSVG(key, {classname: classList, innerHTML: _path.SVGStar, style:'visibility:unset;'}, (svg) => { cont2.append(svg)})
                    })
                })

                createElement(key, {elem:'label', classname: 'custom-label warehouse-item ct', innerText: 'units'}, (label) => { div.append(label); 
                    createElement(key, {elem:'input', id: 'custom-sell-ct', classname: 'custom-input warehouse-item ct'}, (input) => { label.append(input); })
                })
                createElement(key, {elem:'label', classname: 'custom-label warehouse-item price', innerText: 'price'}, (label) => { div.append(label); 
                    createElement(key, {elem:'input', id: 'custom-sell-price', classname: 'custom-input warehouse-item price'}, (input) => { label.append(input); })
                })
                
                createElement(key, {elem:'button', id: 'custom-sell-btn', classname: 'warehouse-item btn btn-primary custom-button', innerHTML: 'Sell'}, (button) => { div.append(button)
                    button.onclick = (ev) => {
                        let hElem =  ev.target.parentNode; 

                        let unitsCt = String(hElem.querySelectorAll('input.custom-input')[0].value)
                        let price = Number(hElem.querySelectorAll('input.custom-input')[1].value)
                        let qty = Number(hElem.querySelector('select.custom-select').value.split(':')[0])
                        chrome.storage.local.set({to_sell: {[key]: {[qty]: price}}})
                        let payload = {"resourceId": getResourceID(key, qty),"price": price,"quantity": unitsCt,"quality": qty,"kind": key}
                        console.log(payload)
                        makeApiRequest('api/v2/market-order/', payload, (response)=> onResponse(response, (success)=> {if (success) changeWaresCount(key, unitsCt, qty, item)  }))
                        
                        }
                })
            })
            
        }
    })
}

function onResponse(response, callback) {
    try {
    if(response.success == false)  {let msg=response.message; console.log(msg); callback(false); showNotification(msg, 'message', false); return}
        const {message, unitCost, money, building} = response
        let msg= message ;  if (money) {playerMoney -= money; updatePlayerCash(playerMoney)}
        showNotification(msg, 'message', true)
        callback(true)
        }  catch (err) {console.log(err)}
}

function getResourceID(kind, qty) {
    let i = -1;
    do {i++;
        if (wares[i].kind == kind && wares[i].quality == qty) return wares[i].id
    } while (i < wares.length -1)
    
}

function changeStockCount(ev) {
    try {
        getElementID(ev.target, 'custom-sell-qty-')
        .then (kind=> { 
            return getWaresCtByQty(kind, ev.target.value)
        })
        .then (unitsCt=> { 
            document.querySelector('span.warehouse-item.stock').innerText = (()=> {if(!unitsCt) return 0; return unitsCt})()
        })
    } catch (err) {console.log(err)}
}

function getWaresCtByQty(wares, qty) {
            let i = -1
            while (i + 1 < wares.length) {  i++;  if (wares[i].quality == qty) return wares[i].amount } 
            return 0
}

async function getWaresByKind(kind) {
    if (wares.length == 0) return []
    let i = -1; let _wares = []
    do {i++;
        if (wares[i].kind == kind) _wares.push(wares[i])
        if (i === wares.length -1) return _wares
    } while (i < wares.length -1)
    return null
}
function setWaresForOptions(callback) {
    let select = document.querySelector('select.custom-select.warehouse-item')
    if (select) {
        getElementID(select, 'custom-sell-qty-').then(kind => {
            let options = select.childNodes
            getWaresByKind(kind).then(_wares=> {options.forEach((option, index)=> option.innerText = `${index}: ${getWaresCtByQty(_wares, index)}`); callback(_wares)})
        })                                    
    }
    //else  parseElementWithInterval
}
function changeWaresCount(wareID, unitsCt, qty, itemNode) {
    getWaresByKind(wareID).then(_wares=> _wares.forEach(ware=> {if (ware.quality == qty) {
        let wareCt =    ware.amount - unitsCt
        ware.amount = wareCt;  
        document.getElementById('custom-sell-stock-'+ wareID).innerHTML = String(wareCt)
        document.querySelector('select.custom-select.warehouse-item').childNodes[qty].innerText = `${qty}: ${wareCt}`
        if (String(wareCt).length > 12) wareCt = '1x10^12+'
        else if (String(wareCt).length > 9) wareCt = (wareCt/1_000_000_000).toFixed(1) + 'B'
        else if (String(wareCt).length > 6) wareCt = (wareCt/1_000_000).toFixed(1) + 'M'
        else if (String(wareCt).length > 3) wareCt = (wareCt/1000).toFixed(1) + 'K'
        itemNode.querySelector('span.css-1w44llp.e14va4ca1').innerText = String(wareCt)
    } }))
}
function showAllResources(pNode) {
    let types = pNode.querySelectorAll("div .css-1018t2o.e14va4ca8")
    if(types ) types.forEach(type=> {
        typeName = type["ariaLabel"];
        getItems(type).then(player_items=> {
            let _pNode = type.childNodes[1].childNodes[0]
            let allItems = resType[typeName]; allItems.forEach(item=> {if (!player_items.includes(item)) newItem(item, _pNode)} )})
    })
    function newItem(resName, pNode) {
        createElement(null, {elem:'div', role:"link", tabindex:"0", ariaLabel:`${resName}, not in stock`, classname:"e14va4ca4 css-k8n0gz", innerHTML: warehouseItemHTML}, (item)=> {
            pNode.append(item)
            for(let node of item.childNodes) {
                if (node.nodeName == "IMG") node.src = itemImages[resID[resName].id]
                if (node.nodeName == "B") node.innerText = resName
            }
        })
    }
    async function getItems(type) {
        let nodes = type.querySelectorAll('b')
        let _items = []; for(let node of nodes) {
            _items.push(node.textContent);
            if (_items.length == nodes.length) return _items
        }
    }
}

function setHigherCt(wares) {
    let higherCt = 0; let qty = 0
    let select = document.querySelector('select.custom-select.warehouse-item')
    wares.forEach((ware, i)=> {if(higherCt < ware.amount) {higherCt = ware.amount;  qty = ware.quality }
        if (i == wares.length-1) { if (select) {select.selectedIndex = qty; setSellingInput(select, ware.kind)}}
   })
}
function setSellingInput(select, kind) {
    let ct = select.value.split(':')[1].trim(); 
    document.querySelector('input.warehouse-item.ct').value = ct
    chrome.storage.local.get('to_sell').then(obj => {   if(obj['to_sell']) {
        let price = obj['to_sell'][kind][select.selectedIndex]; 
        if (price)
            document.querySelector('input.warehouse-item.price').value = price
    }})
    
}

const customSellCL = ['warehouse-item', 'custom-sell-svg-star', 'custom-sell-cont']
