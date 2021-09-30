onLoadCartNumbers();
const order = JSON.parse(localStorage.getItem("order")) || [];
const date = JSON.parse(localStorage.getItem("date")) || [];

// Affichage des informations du client(contact)
const informations = document.querySelector(".contact");
informations.innerHTML += `
                            <p class="thank">
                                <span class="thank-text"><strong><em>${order.contact.firstName}, </em></strong></span>
                                Merci de vos achats sur notre boutique en ligne ! 
                            </p>
                            <p class="date">Votre commande reçue le
                                <span class="date"><strong><em>${date[0].date}</em></strong></span> à 
                                <span class="hours"><strong><em>${date[0].hours}</em></strong></span> d'un montant total de
                                <span class="totalamount"><strong><em>${convertPrice(updateTotalCost())}</em></strong></span> a été validée.
                            </p>
                            <p class="orderId"> Votre référence de commande est: 
                                <span class="orderId"><strong><em>${order.orderId}</em></strong></span>
                            </p>
                            <p class="returnmail">Votre facture vous sera transmise par email à :
                                <span class"returnmail"><strong><em>${order.contact.email}</em></strong></span>
                            </p>
                            
                            <div class="expedition__contact">
                                <p class="expedition"> Vos produits vous seront expédiés à l'adresse suivante :</p>
                                <p class="expedition__contact-name"><strong><em>${order.contact.firstName}${order.contact.lastName}</em></strong></p>
                                <p class="expedition__contact-address"><strong><em>${order.contact.address}</em></strong></p>
                                <p class="expedition__contact-city"><strong><em>${order.contact.city}</em></strong></p>
                            </div>
                        `;

// Affichage du recapitulatif de commande
for(product of cart) {
    displayCart(product);
}

// Affichage du prix total 
displayTotalCart();

// Bouton imprimer
const print = document.getElementById("print__Btn");
print.addEventListener("click", (e) => {
    e.preventDefault;
    window.print();
    // vider le localStorage ? 
    // clearCart();
    location.reload();
});