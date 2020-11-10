'use strict'
const countryCodeIL = '972'

const countryCodeText = document.getElementById('countryCode')
chrome.storage.sync.get(['countryCode'], function (result) {
  // alert(`Value currently is ${result.countryCode}`)
  console.log(`Value currently is ${result.countryCode}`)
  const countryCode = result.countryCode || countryCodeIL
  countryCodeText.value = countryCode
})

function saveSettings() {
  const val = countryCodeText.value
  console.log(`countryCode is ${val}`)
  chrome.storage.sync.set({countryCode: val}, function() {})
}

countryCodeText.addEventListener('blur', function() {
  saveSettings()
})

const save = document.getElementById('save')
save.addEventListener('click', function() {
  saveSettings()
})
