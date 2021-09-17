


let productsElt = JSON.parse(localStorage.getItem("products"));
for (let i = 0; i < productsElt.length; i++) {

let nameProduct = productsElt[i].productName;
console.log(nameProduct);
let priceProduct = productsElt[i].productPrice;
console.log(priceProduct); 
let IdProduct = productsElt[i].productId;
console.log(IdProduct);
let qtyProduct = productsElt[i].productQty;
console.log(qtyProduct);
let optionProduct = productsElt[i].productOption;
console.log(optionProduct);


const productList = document.querySelector(".cart__container");
const productDiv = document.createElement("div");

const newProductName = document.createElement("div");
const newProductPrice = document.createElement("div");
const newProductQty = document.createElement("div");
const newProductOption = document.createElement("div");
const newProductDelete = document.createElement("button");
   
    productDiv.classList.add("productCart");
    newProductName.innerText = nameProduct;
    newProductName.classList.add("product-name");
    productDiv.appendChild(newProductName);
    
    productDiv.classList.add("productCart");
    newProductPrice.innerText = priceProduct;
    newProductPrice.classList.add("product-price");
    productDiv.appendChild(newProductPrice);
    
    productDiv.classList.add("productCart");
    newProductQty.innerText = qtyProduct;
    newProductQty.classList.add("product-qty");
    productDiv.appendChild(newProductQty);
    
    productDiv.classList.add("productCart");
    newProductOption.innerText = optionProduct;
    newProductOption.classList.add("product-option");
    productDiv.appendChild(newProductOption);
    
    productDiv.classList.add("productCart");
    newProductDelete.innerHTML = '<i class="fas fa-trash"></i>';
    newProductDelete.classList.add("trash-btn");
    productDiv.appendChild(newProductDelete);

    //productList.appendChild(productDiv);
    productList.appendChild(productDiv);
    
};




          
               
        
