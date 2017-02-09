$(document).ready(function(){
  listAllItem()
})
function addToCart(item, price, id){
  let details = {name: item, id: id, price: price, qty: 1}
  if(localStorage.getItem(item)){
    let prev = localStorage.getItem(item)
    prev = JSON.parse(prev)
    prev.qty +=1;
    localStorage.setItem(item, JSON.stringify(prev))
  } else {
    localStorage.setItem(item, JSON.stringify(details));
  }
  refreshCart()
}
function objCart() {
  let cart = []
  for (var item in localStorage) {
    if (typeof(localStorage[item]) == 'string') {
      let data = JSON.parse(localStorage[item])
      cart.push(data);
    }
  }
  return cart
}
function refreshCart() {
  let cart = objCart()
  let total = 0
  $('#cartItem').empty()
  $('#totalPrice').empty()
  cart.forEach(function(item){
    $('#cartItem').append(
        `<tr>
          <td>${item.name}</td>
          <td>${item.qty}</td>
          <td>Rp ${Number(item.price*item.qty)}</td>
        </tr>`
    )
    total += Number(item.price*item.qty)
  })
  $('#totalPrice').append(`<h3>Total: ${total}</h3>`)
}
function listAllItem(){
  $.ajax({
    type: 'GET',
    url: 'http://localhost:3000/api/items',
    success: function(data){
      $('#itemlist').empty()
      data.forEach(function(item){
        $('#itemlist').append(
          `<div class="col-xs-4">
            <div class="thumbnail" style='text-align:center'>
              <label style="text-align:center">${item.name}</label>
              <img src="http://localhost:3000/uploads/${item.picture}">
              <p>Stock: ${item.stock}</p>
              <p>Price: ${item.price}</p>
              <button type="button" name="button" class="btn btn-success cartlist" id="${item._id}">Add to Cart</button>
              <input type="hidden" id="price${item._id}" value="${item.price}">
              <input type="hidden" id="name${item._id}" value="${item.name}">
            </div>
          </div>`
        )
      })
    },
    fail: function(err){
      console.log(err);
    }
  }).done(function(){
    addlistener()
  })
}
function checkout() {
  let cart = JSON.stringify(objCart())
  $.ajax({
    type: 'PUT',
    url: 'http://localhost:3000/api/items',
    data: {cartItem: cart},
    dataType: 'json',
    success: function() {
      $('#cartItem').empty()
      $('#totalPrice').empty()
    },
    fail: function(err){
      console.log(err);
    }
  }).done(function(){
    listAllItem()
  })
}
function addlistener(){
  $('#itemlist').on('click', '.btn.cartlist', function(){
    let price = $(`#price${this.id}`).val()
    let name = $(`#name${this.id}`).val()
    addToCart(name, price, this.id)
    alert('Added To Cart '+name);
  })
  $('#mycart').on('click', '.btn.btn-success.btn-lg.checkout', function(){
    checkout()
    localStorage.clear();
    alert('Items Will be Arrived in Your Place in a Hour');
  })
}
$('form#createdItem').submit(function(e){
  var formData = new FormData($('form#createdItem')[0]);
  console.log(formData);
  e.preventDefault()
  let name = $('input[name=name]').val()
  let stock = $('input[name=stock]').val()
  let price = $('input[name=price]').val()
  let picture = $('input[name=picture]').val()
  $.ajax({
    url: 'http://localhost:3000/api/items',
    type: 'POST',
    data: formData,
    dataType: 'json',
    contentType: false,
    processData: false,
    success: function(status) {
      console.log(status);
    }
  }).done(function(){
    // $('#addNewItem').modal('hide')
    // $('input[name=name]').val("name")
    // $('input[name=stock]').val("stock")
    // $('input[name=price]').val("price")
    // $('input[name=picture]').val("")
  })
})
