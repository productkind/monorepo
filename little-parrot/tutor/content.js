const SEEN_MESSAGE_IDS = new Set()

function getMessageRole(messageId) {
  if (messageId.startsWith('umsg_')) return 'user'
  if (messageId.startsWith('aimsg_')) return 'ai'
  return 'unknown'
}

function extractMessageText(messageEl) {
  const proseChatEl = messageEl.querySelector('.prose-chat')
  if (proseChatEl) {
    return proseChatEl.textContent.trim()
  }
  return ''
}

function getProjectUrl() {
  // Extract project URL from the current page location
  // e.g. https://lovable.dev/projects/abc123
  const match = location.href.match(/https:\/\/lovable\.dev\/projects\/[^/?#]+/)
  return match ? match[0] : location.href
}

function scanMessages() {
  const messageEls = document.querySelectorAll('[data-message-id]')
  console.log('[Little Parrot] scan: found', messageEls.length, 'elements with [data-message-id]')
  if (messageEls.length === 0) {
    // Log what we can see to help debug selectors
    const allProseChat = document.querySelectorAll('.prose-chat')
    console.log('[Little Parrot] scan: .prose-chat elements on page:', allProseChat.length)
  }
  const newMessages = []

  for (const el of messageEls) {
    const id = el.dataset.messageId
    if (SEEN_MESSAGE_IDS.has(id)) continue

    const text = extractMessageText(el)
    if (!text) {
      // Debug: show all class names inside this message element to find the right selector
      const allDivs = el.querySelectorAll('div[class*="prose"]')
      const classes = Array.from(allDivs).map(d => d.className.split(' ').filter(c => c.includes('prose')).join(' '))
      console.log('[Little Parrot] message', id, 'no .prose-chat found. Prose divs:', classes)
      if (allDivs.length === 0) {
        console.log('[Little Parrot] message', id, 'innerHTML preview:', el.innerHTML.slice(0, 300))
      } else {
        console.log('[Little Parrot] message', id, 'first prose div text:', allDivs[0].textContent.slice(0, 80))
      }
      continue
    }

    SEEN_MESSAGE_IDS.add(id)
    newMessages.push({
      id,
      role: getMessageRole(id),
      text,
      timestamp: Date.now(),
    })
  }

  if (newMessages.length > 0) {
    chrome.runtime.sendMessage({
      type: 'LOVABLE_MESSAGES',
      messages: newMessages,
      projectUrl: getProjectUrl(),
    })
  }
}

// Debounce to avoid excessive scanning during fast scrolling
let scanTimeout = null
function debouncedScan() {
  if (scanTimeout) return
  scanTimeout = setTimeout(() => {
    scanTimeout = null
    scanMessages()
  }, 200)
}

// Observe the DOM for any child changes — Lovable uses a virtualized list,
// so messages appear/disappear as the user scrolls
const observer = new MutationObserver(() => {
  debouncedScan()
})

observer.observe(document.documentElement, {
  childList: true,
  subtree: true,
})

// Allow the panel to request a full re-scan (e.g. after background restart)
chrome.runtime.onMessage.addListener((message) => {
  if (message.type === 'RESCAN_MESSAGES') {
    SEEN_MESSAGE_IDS.clear()
    scanMessages()
  }
})

// Report the project URL immediately so the panel has it even before messages arrive
chrome.runtime.sendMessage({
  type: 'LOVABLE_PROJECT_URL',
  projectUrl: getProjectUrl(),
})

// Initial scan for messages already on the page
scanMessages()

console.log('[Little Parrot] Lovable chat observer active')
