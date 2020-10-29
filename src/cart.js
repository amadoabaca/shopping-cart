function total() {
  var productsLocal = JSON.parse(localStorage.getItem('cart'));
  let total=0;
  for (let index = 0; index < productsLocal.length; index++) {
      if (productsLocal[index].cart) {
          total += parseInt(productsLocal[index].total);
      }
  }
  return total
}

var con=0;
var con2=JSON.parse(localStorage.getItem('positions'));

function clean(){
  document.getElementById('shoppingCartItemsContainer').innerHTML='';
  document.getElementById('total').innerHTML='';
  var cartn = document.getElementById('cart_n');
  cartn.innerHTML='';
  localStorage.clear();
}

function remove(id) {
  var productsLocal = JSON.parse(localStorage.getItem('cart'));
    for (let index=0; index < productsLocal.length; index++) {
        if (productsLocal[index].id == id) {
            var x = productsLocal[index].id;
            productsLocal.splice(index,1);
            localStorage.setItem('cart',JSON.stringify(productsLocal));

            total();
            for (let index2=0; index2 < con2.length; index2++) {
                if (x == con2[index2]) {
                    con2.splice(index2,1);
                    localStorage.setItem('positions',JSON.stringify(con2));
            } else{

            }
        }
        updateCart();
    } else{
        updateCart();
    }
}
}

function updateCart() {
con=0;
var cartn = document.getElementById('cart_n');
var productsLocal = JSON.parse(localStorage.getItem('cart'));
cartn.innerHTML= `${productsLocal.length}`;
document.getElementById('shoppingCartItemsContainer').innerHTML='';
for (let index = 0; index < con2.length; index++) {
    var position = con2[index];
    for (let index3 = 0; index3 < productsLocal.length; index3++) {
        if (position == productsLocal[index3].id) {
            document.getElementById('shoppingCartItemsContainer').innerHTML+=`
            <div class="cart-item shoppingCartItem d-flex align-items-center">
              <div class="img-container-padre d-flex align-items-center">
                  <div class="cart-img-container">
                      <img src="${productsLocal[index3].img}" alt="">
                  </div>
              </div>
              <div class="cart-text d-flex align-items-center">
                  <p class="shoppingCartItemTitle">${productsLocal[index3].name}</p>
              </div>
              <div class="cart-cantidad d-flex align-items-center">
                <button class="d-flex justify-content-center align-items-center" onclick="reduceAmount(${productsLocal[index3].id})">-</button>
                  <input class="input-cantidad" id="${productsLocal[index3].id}" value="${productsLocal[index3].quantity}" disabled>
                <button class="d-flex justify-content-center align-items-center" onclick="addAmount(${productsLocal[index3].id})">+</button>
              </div>
              <div class="cart-item-price d-flex align-items-center justify-content-center">
                  <p class="">$ ${productsLocal[index3].price*productsLocal[index3].quantity}</p>
              </div>
              <div onclick="remove(${productsLocal[index3].id})" class="cart-delete d-flex align-items-center justify-content-center">
                  <span>&times;</span>
              </div>
            </div>
            
            `;
            productsLocal[index3].total = productsLocal[index3].price*productsLocal[index3].quantity
            localStorage.setItem('cart',JSON.stringify(productsLocal));
        } else {

        }

    }
    con=con+1;
}
if (total()==0) {
    document.getElementById('total').innerHTML="";
} else {
    document.getElementById('total').innerHTML=`
    
    <div class="total__container d-flex align-items-center">
        <div class="cart__total">
            <p>Total <span class="">$${total()}.00</span></p>
        </div>
        <div class="cart__clean d-flex justify-content-center">
            <button onclick="clean()" class="btn btn-sm btn-clean"><a><i class="far fa-trash-alt mr-2"></i></a></button>
        </div> 
        <div class="cart__buy d-flex justify-content-end">
            <button type="button" class="btn btn-md btn-price comprarButton"><a href="#"><i class="fab fa-whatsapp mr-2"></i>Send order</a></button>
        </div>
    </div>
    
    `;
}

}

function reduceAmount(id)  {
    var productsLocal = JSON.parse(localStorage.getItem('cart'));
    for (let index = 0; index < productsLocal.length; index++) {
        if (productsLocal[index].id == id) {
            if(productsLocal[index].quantity >1) {
                productsLocal[index].quantity = parseInt(productsLocal[index].quantity)-1;
                localStorage.setItem("cart",JSON.stringify(productsLocal));
                updateCart();
            } else {

            }

        } else {

        }
    }
}


function addAmount(id) {
    var productsLocal = JSON.parse(localStorage.getItem('cart'));
    for (let index = 0; index < productsLocal.length; index++) {
        if (productsLocal[index].id == id) {
            if(productsLocal[index].quantity >0) {
                productsLocal[index].quantity = parseInt(productsLocal[index].quantity)+1;
                localStorage.setItem("cart",JSON.stringify(productsLocal));
                updateCart();
            } else {

            }

        } else {

        }
    }
}

// render
(()=>{
var productsLocal = JSON.parse(localStorage.getItem('cart'));
var cartn = document.getElementById('cart_n');

  for (let index = 0; index < productsLocal.length; index++) {
      document.getElementById('shoppingCartItemsContainer').innerHTML+=`
      
        <div class="cart-item shoppingCartItem d-flex align-items-center">
          <div class="img-container-padre d-flex align-items-center">
              <div class="cart-img-container">
                  <img src="${productsLocal[index].img}" alt="">
              </div>
          </div>
          <div class="cart-text d-flex align-items-center">
              <p class="shoppingCartItemTitle">${productsLocal[index].name}</p>
          </div>
          <div class="cart-cantidad d-flex align-items-center">
            <button class="d-flex justify-content-center align-items-center" onclick="reduceAmount(${productsLocal[index].id})">-</button>
              <input class="input-cantidad" id="${productsLocal[index].id}" value="${productsLocal[index].quantity}" disabled>
            <button class="d-flex justify-content-center align-items-center" onclick="addAmount(${productsLocal[index].id})">+</button>
          </div>
          <div class="cart-item-price d-flex align-items-center justify-content-center">
              <p class="">$ ${productsLocal[index].price*productsLocal[index].quantity}</p>
          </div>
          <div onclick="remove(${productsLocal[index].id})" class="cart-delete d-flex align-items-center justify-content-center">
              <span>&times;</span>
          </div>
        </div>

      `;
      productsLocal[index].total= productsLocal[index].price*productsLocal[index].quantity
      localStorage.setItem('cart',JSON.stringify(productsLocal));
  }

    if (total()==0) {
        document.getElementById('total').innerHTML='';
    } else {
        document.getElementById('total').innerHTML=`
        <div class="total__container d-flex align-items-center">
          <div class="cart__total">
              <p>Total <span class="">$${total()}.00</span></p>
          </div>
          <div class="cart__clean d-flex justify-content-center">
              <button onclick="clean()" class="btn btn-sm btn-clean"><a><i class="far fa-trash-alt mr-2"></i></a></button>
          </div> 
          <div class="cart__buy d-flex justify-content-end">
              <button type="button" class="btn btn-md btn-price comprarButton"><a href="#"><i class="fab fa-whatsapp mr-2"></i>Send order</a></button>
          </div>
        </div>
        `;
    }
    cartn.innerHTML= `${productsLocal.length}`;
})();