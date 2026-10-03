const products = [
  {
    name: "NEXUS WHITE",
    price: 2500,
    image: "pc-violet.jpg",
    specs: ["PC Gaming", "RGB", "Boîtier blanc"]
  },
  {
    name: "NEXUS GAMING DISPLAY",
    price: 1900,
    image: "ecran-acer.jpg",
    specs: ["Écran Acer", "Gaming", "Haute qualité"]
  },
  {
    name: "NEXUS RGB VIOLET",
    price: 2300,
    image: "pc-blanc.jpg",
    specs: ["PC Gaming", "RGB blanc", "Boîtier blanc"]
  }
];

let cart = JSON.parse(localStorage.getItem("nexusCart") || "[]");

const euro = n =>
  n.toLocaleString("fr-FR", {
    style: "currency",
    currency: "EUR"
  });

function renderProducts(list = products) {
  productsEl.innerHTML = list.map((p, i) => `
    <article class="card">
      <div class="pic">
        <img src="${p.image}" alt="${p.name}"
          style="width:100%;height:100%;object-fit:contain;border-radius:12px;">
      </div>

      <h3>${p.name}</h3>

      <div class="specs">
        ${p.specs.map(x => "✓ " + x).join("<br>")}
      </div>

      <div class="price">${euro(p.price)}</div>

      <button class="cta" onclick="add(${i})">
        Ajouter au panier
      </button>
    </article>
  `).join("");
}

function add(i) {
  cart.push(products[i]);
  save();
  openCart();
}

function save() {
  localStorage.setItem("nexusCart", JSON.stringify(cart));
  renderCart();
}

function renderCart() {
  count.textContent = cart.length;

  cartItems.innerHTML = cart.length
    ? cart.map((p, i) => `
      <div class="cartline">
        <span>
          ${p.name}<br>
          <small>${euro(p.price)}</small>
        </span>
        <button onclick="removeItem(${i})">✕</button>
      </div>
    `).join("")
    : "<p>Votre panier est vide.</p>";

  total.textContent = euro(
    cart.reduce((s, p) => s + p.price, 0)
  );
}

function removeItem(i) {
  cart.splice(i, 1);
  save();
}

function openCart() {
  cartEl.classList.add("open");
}

const productsEl = document.getElementById("products");
const cartEl = document.getElementById("cart");
const cartItems = document.getElementById("cartItems");
const count = document.getElementById("count");
const total = document.getElementById("total");

renderProducts();
renderCart();

document.getElementById("cartBtn").onclick = openCart;

document.getElementById("close").onclick = () => {
  cartEl.classList.remove("open");
};

document.getElementById("search").oninput = e => {
  const q = e.target.value.toLowerCase();

  renderProducts(
    products.filter(p =>
      (p.name + " " + p.specs.join(" "))
        .toLowerCase()
        .includes(q)
    )
  );
};

const modal = document.getElementById("modal");

document.getElementById("checkout").onclick = () => {
  if (!cart.length) {
    alert("Votre panier est vide.");
    return;
  }

  modal.classList.add("show");
};

document.getElementById("modalClose").onclick = () => {
  modal.classList.remove("show");
};

document.getElementById("payDemo").onclick = () => {
  alert("Checkout de démonstration : aucun paiement réel n'a été effectué.");
};
.product-card img {
    width: 100%;
    height: 300px;
    object-fit: cover;
    display: block;
    border-radius: 10px;
}
