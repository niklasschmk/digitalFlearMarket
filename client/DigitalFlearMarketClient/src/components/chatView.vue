<template>
  <div id="chat">
    <h2>UserMan Chat</h2>
    <div id="chat-window">
      <div id="output"></div>
      <div id="feedback"></div>
    </div>
    <input id="username" type="text" placeholder="Username" />
    <input id="message"  type="text" placeholder="Message"  />
    <button id="send">Send</button>
    <button id="erase">Erase</button>
  </div>
</template>

<script>
export default {
  name: "chatView"
}


</script>

<style scoped>

</style>
