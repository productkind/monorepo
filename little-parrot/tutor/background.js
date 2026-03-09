const storedMessages = []
let storedProjectUrl = ''

chrome.action.onClicked.addListener(async (tab) => {
  await chrome.sidePanel.open({ tabId: tab.id })
})

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'LOVABLE_PROJECT_URL') {
    if (message.projectUrl) {
      storedProjectUrl = message.projectUrl
    }
  }

  if (message.type === 'LOVABLE_MESSAGES') {
    storedMessages.push(...message.messages)
    if (message.projectUrl) {
      storedProjectUrl = message.projectUrl
    }
    chrome.runtime.sendMessage({
      type: 'LOVABLE_MESSAGES_FOR_PANEL',
      messages: message.messages,
      projectUrl: storedProjectUrl,
      tabId: sender.tab?.id,
    })
  }

  if (message.type === 'PANEL_REQUEST_MESSAGES') {
    if (storedProjectUrl) {
      sendResponse({ messages: storedMessages, projectUrl: storedProjectUrl })
    } else {
      // Fallback: get URL from the active tab
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const tabUrl = tabs[0]?.url || ''
        const match = tabUrl.match(/https:\/\/lovable\.dev\/projects\/[^/?#]+/)
        const url = match ? match[0] : tabUrl
        sendResponse({ messages: storedMessages, projectUrl: url })
      })
      return true // async sendResponse
    }
  }
})
