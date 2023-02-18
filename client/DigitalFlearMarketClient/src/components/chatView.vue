<template>
  <template>
    <div id="chat">
      <h2>Chat</h2>
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

</template>

<script>
export default {
  name: "chatView"
}
</script>

<style scoped>


h2{
  font-size: 24px;
  font-family: sans-serif;
  padding: 0 10px;
  color: #5555dd;
}

button{
  margin-top: 4px;
}

#chat{
  max-width: 600px;
  margin: 30px auto;
  border: 1px solid #aaa;
  box-shadow: 1px 3px 5px rgba(0,0,0,0.05);
  border-radius: 2px;
}

#chat-window{
  height: 400px;
  overflow: auto;
  background: #ddd;
}

#output p{
  padding: 14px 0;
  margin: 0 20px;
  border-bottom: 1px solid #e9e9e9;
  color: #555;
}

#feedback p{
  color: #aaa;
  padding: 14px 0;
  margin: 0 20px;
}

#output strong{
  color: #575ed8;
}

label{
  box-sizing: border-box;
  display: block;
  padding: 10px 20px;
}

input{
  padding: 10px 20px;
  box-sizing: border-box;
  background: #eee;
  border: 0;
  display: block;
  width: 100%;
  border-bottom: 1px solid #aaa;
  font-size: 16px;
}

button{
  background: #575ed8;
  color: #fff;
  font-size: 18px;
  border: 0;
  padding: 12px 0;
  width: 100%;
  border-radius: 0 0 2px 2px;
}

</style>
