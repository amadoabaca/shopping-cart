// global
var products=[];
var cartItems=[];
var cart_n=document.getElementById('cart_n');

if(localStorage.getItem('positions')) {
    var positions=[JSON.parse(localStorage.getItem('positions'))];
} else {
    var positions=[];
}

// divs
var foodDIV = document.getElementById('ofertasCard');


// info
var FOOD=[
    {id:1,cart:false,img:'assets/dog-white.png',quantity:1,total:0,name:'Dog',price:150},
    {id:2,cart:false,img:'assets/cat-white.png',quantity:1,total:0,name:'Cat',price:200},
    {id:3,cart:false,img:'assets/rabbit-white.png',quantity:1,total:0,name:'Rabbit',price:80}
]


// html

function HTMLpetProduct(con) {
    let btn= `btnFood${con}`;
    if (FOOD[con-1].cart) {
        return `
        
        <div class="col-md-4 ">
          <div class="card mb-4">
              <div class="float-left img-container">
                  <img class="item-image" src="${FOOD[con-1].img}">
              </div>
          <div class="card-body">
              <p class="card-text item-title">${FOOD[con-1].name}</p>
              <div class="d-flex justify-content-between align-items-center">
                  <div class="btn-group">
                      <button type="button" class="btn btn-sm mr-2 btn-price item-price"><a href="cart.html">$${FOOD[con-1].price}</a></button>

                      <button type="button"  onclick="alertCart()" class="btn btn-sm btn-card-cart"><i class="fas fa-shopping-cart green"></i></button>
                  </div>
              </div>
            </div>
          </div>
        </div>
        

        `;
    } else {
        return `
        
        <div class="col-md-4 ">
            <div class="card mb-4">
                <div class="float-left img-container">
                    <img class="item-image" src="${FOOD[con-1].img}">
                </div>
            <div class="card-body">
                <p class="card-text item-title">${FOOD[con-1].name}</p>
                <div class="d-flex justify-content-between align-items-center">
                    <div class="btn-group">
                        <button type="button" class="btn btn-sm mr-2 btn-price item-price"><a href="cart.html">$${FOOD[con-1].price}</a></button>

                        <button type="button" id="${btn}" onclick="cart('${FOOD[con-1].id}','${FOOD[con-1].cart}',
                        '${FOOD[con-1].img}','${FOOD[con-1].quantity}','${FOOD[con-1].total}',
                        '${FOOD[con-1].name}','${FOOD[con-1].price}','${btn}')" class="btn btn-sm btn-card-cart"><i class="fas fa-shopping-cart blk"></i>
                        </button>
                        <button type="button" id="${btn}alert" onclick="alertCart()" style="display:none;" class="btn btn-sm btn-card-cart"><i class="fas fa-shopping-cart green"></i>
                        </button>
                    </div>
                </div>
              </div>
            </div>
          </div>

        `;
    }
}

// animation

function animation(){
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })
    
    Toast.fire({
      icon: 'success',
      title: 'Añadido al carrito!'
    })
  }

//   alert

function alertCart(){
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })
    
    Toast.fire({
      icon: 'info',
      title: 'El producto ya está en el carrito'
    })
    
  }

//   cart function

function cart(id,cart,img,quantity,total,name,price,btncart){
    var item={
        id:id,
        cart:true,
        img:img,
        quantity:quantity,
        total:total,
        name:name,
        price:price
    }
    positions.push(id);
    localStorage.setItem("positions",JSON.stringify(positions));
    cartItems.push(item);
    let storage= JSON.parse(localStorage.getItem("cart"));
    if (storage==null) {
        products.push(item);
        localStorage.setItem("cart",JSON.stringify(products));
    } else {
        products=JSON.parse(localStorage.getItem("cart"));
        products.push(item);
        localStorage.setItem("cart",JSON.stringify(products));
    }
    products= JSON.parse(localStorage.getItem("cart"));
    cart_n.innerHTML=`${products.length}`;
    document.getElementById(btncart).style.display="none";
    document.getElementById(btncart+'alert').style.display="block";
    animation();

}

// render

function render() {
    if (localStorage.getItem('positions')) {
        var localProductsCart = JSON.parse(localStorage.getItem('positions'));
    } else {
        var localProductsCart=[];
        localStorage.setItem('positions',JSON.stringify(localProductsCart));
        var localProductsCart = JSON.parse(localStorage.getItem('positions'));
    }

    for (let index = 0; index < localProductsCart.length; index++) {
        
        for (let index2 = 0; index2 < FOOD.length; index2++) {
            if (localProductsCart[index] == FOOD[index2].id){
                FOOD[index2].cart = true;
            } else {

            }
        }
    }

    for (let index = 1; index <= 3; index++) {
        foodDIV.innerHTML+=`${HTMLpetProduct(index)}`;
    }
    if (localStorage.getItem("cart")==null) {

    } else {
        products=JSON.parse(localStorage.getItem("cart"));
        cart_n.innerHTML=`${products.length}`;
    }
}


