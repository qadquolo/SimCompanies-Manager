//chrome.runtime.ExtensionEnabled = true
console.log('initscript.js')
import {getAllTabs, getCurrentTab, startBuildBusyService} from './sw-modules/functions.js'
//self.importScripts (['./sw-modules/background-script.js'])
import * as backgroundScript from './sw-modules/background-script.js'
//backgroundScript()


let ExtensionEnabled = true
let _onUpd = 0
let injection_scripts = {default: ['variables.js', 'hash-tokens.js', 'functions.js','warehouse.js','script-2.js','script-1.js' ], spec: ['script-1.js'], vars: ['variables.js']}

let activated_tabs = []

getStorageData('activated_tabs', async (error, data) => {
  if (error) {console.log(error);  return}
  if(JSON.stringify(data) == '{}') activated_tabs = []
  //else activated_tabs = data.activated_tabs
  console.log(activated_tabs)
  if (ExtensionEnabled) startForTabs()
  
})
//scriptsReg()

const extensionid = getID()
function getID() {
  try {
  let scope = self.registration.scope.trim('/')
  let index = scope.indexOf('chrome-extension://') + 19
  return String(scope).substring(index, scope.length -1)
  } catch(err) {console.log(err)}
}
console.log('id: ' + extensionid)
console.log(chrome.runtime.id)
const _queryObject = {}; // const _queryObject = {active: true}


chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log({type: 'onMessage event', message: message}); console.log({type: 'onMessage event', sender: sender});
  if (message.operation == 'recent_item') { // push new recent item
    getStorageData('recent_items', (error, data) => {
      if (error) {console.log(error);  return}
        if (message.action == 1) data.recent_items[message.id] = {ct: 0, price:0, qty:0}
        if (message.action == 0) {delete data.recent_items[message.id]}
        
        chrome.storage.local.set({recent_items: data.recent_items})   
    })
    sendResponse({success: true})
  }
  if (message.operation == 'extensionState') {  
    //console.log('extensionState')
    ExtensionEnabled = !ExtensionEnabled;  console.log({enabled: ExtensionEnabled})
    getAllTabs(_queryObject).then(tabs=> { //console.log(tabs)
      tabs.forEach(tab => {
        if (tab.url.includes('simcompanies.com/')) {
          console.log('extension state changed for tab')
          if(!ExtensionEnabled) {inject_Function(tab, f_removeElements)}
          else  { 
            inject_Function(tab, preInject).then(result=> {if(result) inject_Function(tab, onExtensionStateChange)})
          } } })  })}
       
  if (message.operation == 'getState') {  
    sendResponse({state: ExtensionEnabled})
    }
    if (message.operation == 'getContext') {  
      chrome.runtime.getContexts({}, (contexts)=> {console.log(contexts),sendResponse({contexts: contexts})})
      }  
          
  if (message.operation == 'preInject' && message.success == true) {
    
    // testFetch returns cb-custom.png
      testFetch((res) => {
        console.log(res)
      })
      injectScript(sender.tab, injection_scripts.default).then(result => {
        if (result) {
          //getStorageData('recent_items', (error, data) => {
          //inject_Function(sender.tab, pushRecent) //.then(result => {
        }
      })
      
      insertCSS(sender.tab)
    }
    if (message.operation == 'buildBusy') {
      chrome.storage.local.set({buildBusy: message.state})
      }
})


const scriptsReg = () => {

  chrome.scripting
  .registerContentScripts([{
    id: "id_initscripts.js",
    js: ["script-1.js"],
    //js: ["script-1.js", "script-2.js", "script-3.js"],
    persistAcrossSessions: false,
    matches: ["https://simcompanies.com/*"],
    
    runAt: "document_start",
  }])
  .then(() =>  {
    console.log("registration complete");
    chrome.scripting.getRegisteredContentScripts().then(scripts => console.log({registered: scripts}))
    try {
      //messages to tabs - does not work
      //chrome.runtime.sendMessage(chrome.runtime.id, {operation: 3, success: false})

      chrome.tabs.query(_queryObject, (tabs) => {
        console.log({tabs: tabs});
        //tabs.forEach(tab => {chrome.tabs.connect(tab.id)})
        //tabs.forEach(tab => {chrome.tabs.sendMessage(tab.id, {operation: 3, success: false})})
      })
    } catch(err) {console.log(err)}

    //return     
    //startForTabs()
  })
  .catch((err) => console.warn("unexpected error", err))
}




//
  //chrome.scripting.getRegisteredContentScripts().then(scripts => console.log(scripts))
  //startForTabs()  
//

function startForTabs() {
  getAllTabs(_queryObject).then(tabs => {
    console.log(tabs)
    tabs.forEach(tab => {
      if (tab.url.includes('simcompanies.com/') && (!activated_tabs.includes(tab.id))) {
        //console.log(tab.id)
        //const scripts = chrome.scripting.getRegisteredContentScripts()
        //chrome.scripting.executeScript(injectSpec, () => {
         injectScript(tab, injection_scripts.default)
          insertCSS(tab)
          
      }
    })
  })
}



  /*
  chrome.tabs.onCreated.addListener((tab, ev) => {
    try {

    console.log(tab)
    chrome.windows.forEach(window => {if (window.id == tab.windowid) 
      window.addEventListener("fetch", (event) => { 
        console.log("event fetch ");
        console.log("fetch ", event.request.url);
      })
    })
 
  } catch(err) {console.log(err)}
  })
*/
  chrome.tabs.onActivated.addListener(tabActivated);

  function tabActivated() {
    try {
      getCurrentTab().then(tab => {
          if (tab.url.includes('simcompanies.com/') && (!activated_tabs.includes(tab.id))) {
            //injectScript(tab, ['script-1.js']) //.then(result => {

          }  
      })
      //  chrome.tabs.getCurrent().then(currentTab => console.log(currentTab))
        
    } catch (error) { console.log(error);  }
  }  

  //chrome.tabs.onUpdated.addListener(tabUpdated);
  async function tabUpdated() {
    try {
      getCurrentTab().then(tab => {
        console.log(tab)

      })
      //  chrome.tabs.getCurrent().then(currentTab => console.log(currentTab))
        
    } catch (error) { console.log(error);  }
  }  
    


  chrome.tabs.onUpdated.addListener(async (id, info, tab) => {
    
    console.log({info, tab})
    /* onUpdated происходит n раза */
    //_onUpd += 1;  if (_onUpd == 4) {  _onUpd = 0 
    //console.log(await chrome.action.isEnabled())
    if (ExtensionEnabled) {  //(info.title || info.status)

      if(tab.status == 'complete' && (info.title || info.status) && tab.url.includes('simcompanies.com/')) {
          console.log('onUpdated')
          activated_tabs.push(tab.id)
          chrome.storage.local.set({activated_tabs: activated_tabs})
          inject_Function(tab, preInject, null)
      }

      if(tab.status == 'complete' && !tab.url.includes('simcompanies.com/') && (activated_tabs.includes(tab.id))) {
        activated_tabs = activated_tabs.filter((id, index) => id !== tab.id) 
        chrome.storage.local.set({activated_tabs: activated_tabs})
        //setTimeout(() => TestLog(), 100) 
      }
    }
  });

  chrome.tabs.onRemoved.addListener((tabId, removeInfo) => {
    const {iswindowClosing, windowId} = removeInfo
    let newTabs =[]
    activated_tabs.forEach((tabID, index)=> {
      if(tabID !== tabId) newTabs.push(tabID); 
      if (index == activated_tabs.length-1) {
        activated_tabs = newTabs;  setToStorage('activated_tabs', activated_tabs)
        if (newTabs.length == 0 && buildBusy.state==1) {
          startBuildBusyService()//createTimeoutForBuildBusy()
        } 
      }})
  }
);

function  setToStorage(key, object) {
  chrome.storage.local.set({[key]: object})
}
  async function injectScript(tab, scripts, function1) {
    try {
      const injectSpec_func = {
        target:{ tabId: tab.id, allFrames: true },
        func: function1
      }; 
      const injectSpec_files = {
        target:{ tabId: tab.id, allFrames: true },
        files: scripts // ["script-1.js"]
      }; 
      const getSpec = () => {
        if(function1) return injectSpec_func
        else return injectSpec_files
      }
      //console.log(injectSpec)
      chrome.scripting.executeScript(getSpec(), (result) => { console.log({injection_results: result})
        console.log({result: 'injected', script: scripts, func:function1})
        //activated_tabs.push(tab.id)
        chrome.storage.local.set({activated_tabs: activated_tabs})
        //setTimeout(() => TestLog(), 100) 
        return true
      })
      return true
    } catch (error) {console.log(error);}
    console.log('injection failed')
    return false
  }
  function insertCSS(tab) {
    try {
      chrome.scripting.insertCSS({
        target : {tabId : tab.id},
        //css : ['./script-1.css'], // String
        files : ['./script-1.css'],
        }, (result)=> console.log({cssInj: result}));
        return true
    } catch (error) {console.log(error);}
    console.log('injection failed')
    return false
  }

    async function inject_Function(tab, func, args) {
      try {
        const injectSpec_func = {
          target:{ tabId: tab.id, allFrames: true },
          func: func
        }; 
        if (args) injectSpec_func.args = args
        chrome.scripting.executeScript(injectSpec_func, (result) => { console.log({injection_results: result})
          //setTimeout(() => TestLog(), 100) 
          return true
        })
        return true
      } catch (error) {console.log(error);}
      console.log({result: 'injection failed', args: args})
      return false
    }

chrome.action.onClicked.addListener(getCurrentTab);

//  WorkerGlobalScope.self
/*
self.addEventListener("fetch", (event) => {
  console.log("Handling fetch event for", event.request.url);

  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) {
        console.log("Found response in cache:", response);

        return response;
      }
      console.log("No response found in cache. About to fetch from network…");

      return fetch(event.request).then(
        (response) => {
          console.log("Response from network is:", response);

          return response;
        },
        (error) => {
          console.error("Fetching failed:", error);

          throw error;
        },
      );
    }),
  );
});
*/


self.addEventListener("fetch", (event) => {
  // Let the browser do its default thing
  // for non-GET requests.
  console.log(event.request)
  if (event.request.method !== "GET") return;
})



/* chrome.runtime examples */
//chrome.runtime.getURL('path')
//chrome.runtime.onConnect


function TestLog() {
  console.log({name: 'activated tabs', tabs: activated_tabs} )
}

function getStorageData(key, callback) {
    chrome.storage.local.get(key).then(tabs => {
      callback(null, tabs);  })
    .catch(err => callback(err))
}

function preInject() {
  try {
    //if (document.getElementsByClassName('custom-script')[0]) {return}
    const vustomExchangeSearch = () => {
      let customExchange = document.getElementById('custom-exchange')
      if(!customExchange) {
        try{
          console.log('custom exchange elem not found')
          let isexist= wares
          injectFunc()
          return
        } catch(err) {console.log('injection require')}
        //callback(true)
        chrome.runtime.sendMessage(chrome.runtime.id, {operation: 'preInject', success: true})
        return
      }
      else {
        //console.log('custom exchange elem  found')
        preInjectFunc.dummyVar = '1234test' // show after event dispathing
        //self.dispatchEvent(preInjectFunc);  // init event
        injectFunc()
      }
    }

    let menumap = document.getElementById('menu-map')
    if(menumap) {
        //try {console.log(runtimeID);  throw new Error('scripts are loaded')} catch (err) {console.warn(err); if(err.message == 'scripts are loaded') return}
        //console.log('preinject continuation')
        vustomExchangeSearch()
    }
    else {
      chrome.runtime.sendMessage(chrome.runtime.id, {operation: 'preInject', success: false}) //callback(false) // chrome.runtime.sendMessage() 
      const menumapSearch = newInterval()
      function newInterval() { return setInterval(()=> {let menumap = document.getElementById('menu-map'); if(menumap) {vustomExchangeSearch(); clearInterval(menumapSearch) }}, 1000)}
      }

//console.log(self)

  } catch(err) {console.log(err.message)}

}

function onExtensionStateChange() {
  try {
    injectFunc()  
  } catch(err) {console.log(err.message)}
}

function f_removeElements() {
  self.dispatchEvent(removeElements);
}

function pushRecent(data) {
  try {
    //recent_items = _getRecentItems()  ;  setTimeout(() => console.log(recent_items), 100) 
    //evRecent.items = data // show after event dispathing
    //self.dispatchEvent(evRecent);  // init event

  } catch(err) {console.log(err.message)}
}

function testFetch(callback) {
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
    callback(response.body)
    //let image =     response.body
  })
 
}


chrome.runtime.onConnect.addListener((port)=> {console.log(port)
  port.postMessage({state: ExtensionEnabled})
})


/*
chrome.runtime.getContexts({}, (contexts)=> { let i = 0
  console.log(contexts) // [BACKGROUND]
  while (i < contexts.length)  {
    if (contexts.contextType == 'POPUP') {
      console.log(contexts.contextId)
      chrome.runtime.connect(contexts.contextId, {includeTlsChannelId:false, name:'initscript'}, (port)=> {
      console.log({port: port})
      port.sendMessage({ExtensionState: ExtensionEnabled})
    })}
    i++
  }
})
*/


      