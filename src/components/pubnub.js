/* eslint no-undef: 0 */

var pubnubDemo = new PubNub({
  publishKey: 'pub-c-e092044f-482d-40e3-ad96-a74ddb5bb14a',
  subscribeKey: 'sub-c-2b6da548-008d-11ea-819e-82cdbbe6698c'
})

pubnubDemo.addListener({
  message: function (message) {
    const messagesArea = document.querySelector('.messages')
    const newMessageTag = createNewMessage(message.message)
    messagesArea.append(newMessageTag)
  }
})

pubnubDemo.subscribe({
  channels: ['demo_tutorial']
})

const textInput = document.querySelector('.input-text')
const createNewMessage = function (text) {
  const startSign = document.createElement('p')
  startSign.classList.add('message-start')
  startSign.innerHTML = '>'
  const newMessage = document.createElement('div')
  newMessage.classList.add('message')
  const newMessageContent = document.createElement('p')
  newMessageContent.classList.add('message-content')
  newMessageContent.innerHTML = text
  newMessage.append(startSign)
  newMessage.append(newMessageContent)
  return newMessage
}

const enterMessage = function (evt) {
  if (evt.keyCode === 13) {
    pubnubDemo.publish({
      message: evt.target.value,
      channel: 'demo_tutorial'
    })

    evt.target.value = ''
  }
}

textInput.addEventListener('keypress', enterMessage)
