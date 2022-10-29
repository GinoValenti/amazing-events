let sendButton = document.getElementById('btn-send')
sendButton.addEventListener('click', sendCliked)
  function sendCliked(){
    Swal.fire({
        title: 'Enviado!',
        text: 'Tu mensaje fue enviado correctamente, en breve nos contactaremos con usted, gracias!',
        imageUrl: '../assets/img/sent.png',
        imageWidth: 300,
        imageHeight: 200,
        imageAlt: 'Custom image',
      })
      let cartItems = document.getElementsByClassName('cart-items')[0]
      while (cartItems.hasChildNodes()) {
        cartItems.removeChild(cartItems.firstChild)
      }
   
}