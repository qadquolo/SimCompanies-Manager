console.log('sim companies extension script');
//console.log(document.URL)

let cr = chrome.runtime
let ExtensionEnabled
console.log({popupjs:'log', ExtensionEnabled: ExtensionEnabled})

/*
chrome.runtime.onMessage.addListener((message, sender) => {
    console.log({type: 'onMessage event', message: message}); console.log({type: 'onMessage event', sender: sender});
    if (message.operation == 'extensionState') { 
        ExtensionEnabled = state
    }})
*/


setTimeout(()=> {
    //chrome.runtime.sendMessage(chrome.runtime.id, {operation:'getState'})  
  let toggleBtn =   document.getElementById('toggle-state-button')
  chrome.runtime.sendMessage(cr.id, {operation:'getState'}, (resp)=> {

    ExtensionEnabled = resp.state; console.log({response: resp, operation: 'getState'})
    if(toggleBtn.classList.contains(_toggleBtnState(ExtensionEnabled)) == false) { toggleBtnClass(toggleBtn) }
  })
  
  toggleBtn.addEventListener('click', async () => {
    try {
    // Use the isEnabled method to read the action's current state.
        //let actionEnabled = await chrome.action.isEnabled();
        //console.log(actionEnabled)
    // when the button is clicked negate the state
    //cr.ExtensionEnabled = !cr.ExtensionEnabled
    chrome.runtime.sendMessage(chrome.runtime.id, {operation: 'extensionState'})
    ExtensionEnabled = !ExtensionEnabled // chrome.action.enable() / disable()
    //console.log(ExtensionEnabled)
    
    toggleBtnClass(toggleBtn)
    } catch(err) {console.log(err)}
  });


async function setPopup() {
    const popup = 'popup.html';
    await chrome.action.setPopup({ popup });

    // Show the updated popup path
        //await getCurrentPopup();
}
setPopup()

async function getCurrentPopup() {
  const popup = await chrome.action.getPopup({});
  document.getElementById('current-popup-value').value = popup;
  return popup;
}
let link = document.getElementById('author-link')
if(link) link.addEventListener('click', (ev)=> window.open(link.href, "_blank"));
}, 10) 


function _toggleBtnState(state) {if (state) return 'enabled'; return 'disabled'}
function toggleBtnClass(btn) {  btn.classList.toggle(_toggleBtnState(ExtensionEnabled));  btn.classList.toggle(_toggleBtnState(!ExtensionEnabled));}


chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
   console.log(message) 
    if (message.operation == 'extensionState') {
        //ExtensionEnabled = message.state
    }
    if (message.operation == 'getContext') {
      console.log(response); sendResponse({operation:'new_message'})
    }
})


function toggleState() {
    //if (cr.ExtensionEnabled == undefined || cr.ExtensionEnabled ==null) {cr.ExtensionEnabled=true;return true}
    //return cr.ExtensionEnabled

    cr.sendMessage(cr.id, {operation:'toggleState'})
}


//chrome.runtime.connect()
chrome.runtime.onConnect.addListener((port)=> {console.log(port)
    //port.postMessage({state: ExtensionEnabled})
    port.onMessage.addListener((message, sender)=> {
        console.log(message)
    })
  })



//chrome.runtime.onCompleted.addListener((response) => {console.log(response)}, {})


