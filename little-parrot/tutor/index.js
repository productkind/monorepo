const tutorFrame = document.getElementById('tutor')
let allMessages = []
let projectUrl = ''

function sendToTutor() {
  if (!tutorFrame.contentWindow || !projectUrl) return
  tutorFrame.contentWindow.postMessage({
    type: 'lovable-chat-context',
    projectUrl,
    messages: allMessages.map((msg) => ({
      source: msg.role === 'user' ? 'user' : 'ai',
      content: msg.text,
    })),
  }, '*')
}

chrome.runtime.onMessage.addListener((message) => {
  if (message.type === 'LOVABLE_MESSAGES_FOR_PANEL') {
    if (message.projectUrl) {
      projectUrl = message.projectUrl
    }
    allMessages.push(...message.messages)
    sendToTutor()
  }
})

// Request any messages captured before the panel opened
chrome.runtime.sendMessage({ type: 'PANEL_REQUEST_MESSAGES' }, (response) => {
  if (response?.projectUrl) {
    projectUrl = response.projectUrl
  }
  if (response?.messages?.length) {
    allMessages.push(...response.messages)
  }
  sendToTutor()
})

// Re-send when the iframe finishes loading (it may load after messages arrive)
tutorFrame.addEventListener('load', () => {
  sendToTutor()
})
