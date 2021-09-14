let productsElt = JSON.parse(localStorage.getItem("products"));
console.log(productsElt);



function displayProduct(products)  { 

    let product = displayProduct(productsElt);

    for (product of products) {
        document.getElementById("name-product").textContent= products.ProductName;
    }
}