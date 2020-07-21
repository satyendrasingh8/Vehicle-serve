
const socket = io();

const $messageForm =document.querySelector('#form-message')
const $messageFormInput = $messageForm.querySelector('input')
const $messageFormButton = $messageForm.querySelector('button')
const $shareLocationButton = document.querySelector('#share-location');
const $messages =document.querySelector('#messages');

//message template
const messageTemplate = document.querySelector("#message-template").innerHTML;
const locationMessageTemplate = document.querySelector('#locationMessage-template').innerHTML


socket.on('message',(message)=> {
    console.log(message)
    const html = Mustache.render(messageTemplate,{message })
    $messages.insertAdjacentHTML('beforeend',html)

    socket.on('locationMessage',(url)=>{
        console.log(url)
        const html = Mustache.render(locationMessageTemplate,{url})
        $messages.insertAdjacentHTML('beforeend',html)
       })

    $messageForm.addEventListener('submit',(e)=>{
        e.preventDefault();
        $messageFormButton.setAttribute('disabled','disabled')

        const message = e.target.elements.message.value;
        socket.emit('sendMessage',message,(error)=>{
   $messageFormButton.removeAttribute('disabled')
   $messageFormInput.value='';
   $messageFormInput.focus()
            if(error){ 
           return console.log(error)}
           console.log("message was delivered! ")

        })
    })
})


  
   
  
       $shareLocationButton.addEventListener('click',()=> {
           
    if(!navigator.geolocation)
    {
        return alert("Geolocation is not supported by your browser! ")
    }
    
    $shareLocationButton.setAttribute('disabled','disabled')
    navigator.geolocation.getCurrentPosition((position)=>{
     socket.emit('shareLocation',{
         latitude:position.coords.latitude,
         longitude:position.coords.longitude
     },()=>{
      $shareLocationButton.removeAttribute('disabled')
         console.log("Location Shared!")

     })
    })

})
