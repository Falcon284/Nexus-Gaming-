const products=[
{name:"NEXUS STARTER",price:799,specs:["AMD Ryzen 5 5600","16 Go DDR4 3200 MHz","GeForce RTX 4060 8 Go","SSD NVMe 1 To","Windows 11"],icon:"🖥️"},
{name:"NEXUS PERFORMANCE",price:1099,specs:["Intel Core i5-12400F","16 Go DDR4 3200 MHz","GeForce RTX 3060 12 Go","SSD NVMe 1 To","Windows 11"],icon:"🖥️"},
{name:"NEXUS ULTIMATE",price:2499,specs:["AMD Ryzen 7 7800X3D","32 Go DDR5 6000 MHz","GeForce RTX 4080 16 Go","SSD NVMe 2 To","Windows 11"],icon:"🖥️"}];
let cart=JSON.parse(localStorage.getItem("nexusCart")||"[]");
const euro=n=>n.toLocaleString("fr-FR",{style:"currency",currency:"EUR"});
function renderProducts(list=products){productsEl.innerHTML=list.map((p,i)=>`<article class="card"><div class="pic">${p.icon}</div><h3>${p.name}</h3><div class="specs">${p.specs.map(x=>"✓ "+x).join("<br>")}</div><div class="price">${euro(p.price)}</div><button class="cta" onclick="add(${i})">Ajouter au panier</button></article>`).join("")}
function add(i){cart.push(products[i]);save();openCart()}
function save(){localStorage.setItem("nexusCart",JSON.stringify(cart));renderCart()}
function renderCart(){count.textContent=cart.length;cartItems.innerHTML=cart.length?cart.map((p,i)=>`<div class="cartline"><span>${p.name}<br><small>${euro(p.price)}</small></span><button onclick="removeItem(${i})">✕</button></div>`).join(""):"<p>Votre panier est vide.</p>";total.textContent=euro(cart.reduce((s,p)=>s+p.price,0))}
function removeItem(i){cart.splice(i,1);save()}
function openCart(){cartEl.classList.add("open")}
productsEl=document.getElementById("products");cartEl=document.getElementById("cart");cartItems=document.getElementById("cartItems");count=document.getElementById("count");total=document.getElementById("total");
renderProducts();renderCart();
document.getElementById("cartBtn").onclick=openCart;document.getElementById("close").onclick=()=>cartEl.classList.remove("open");
document.getElementById("search").oninput=e=>{const q=e.target.value.toLowerCase();renderProducts(products.filter(p=>(p.name+" "+p.specs.join(" ")).toLowerCase().includes(q)))};
const modal=document.getElementById("modal");document.getElementById("checkout").onclick=()=>{if(!cart.length)return alert("Votre panier est vide.");modal.classList.add("show")};document.getElementById("modalClose").onclick=()=>modal.classList.remove("show");document.getElementById("payDemo").onclick=()=>alert("Checkout de démonstration : aucun paiement réel n'a été effectué.");
