'use strict'
const countryCodeIL = '972'
const CONTEXT_MENU_ID = 'SWA_CONTEXT_MENU'

chrome.runtime.onInstalled.addListener(function () {
    console.log('SendWhatsApp loaded')

    function getWord(info, tab) {
        try {
            if (info.menuItemId !== CONTEXT_MENU_ID) {
                return
            }
            chrome.storage.sync.get(['countryCode'], function (result) {
                // alert(`Value currently is ${result.countryCode}`)
                console.log(`Value currently is ${result.countryCode}`)
                const countryCode = result.countryCode || countryCodeIL
                console.log(countryCode)
                const num = info.selectionText.replace('-', '').replace(' ', '')
                const url = `https://api.whatsapp.com/send?phone=+${countryCode}${num.substr(1)}`
                console.log(`Word ${info.selectionText} was clicked.`)
                chrome.tabs.create({url})
            });
        } catch (e) {
            alert(e)
        }
    }

    chrome.contextMenus.create({
        title: 'Send WhatsApp to: %s',
        contexts: ['selection'],
        id: CONTEXT_MENU_ID
    })
    chrome.contextMenus.onClicked.addListener(getWord)
})