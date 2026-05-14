const products = [
  { id: "vitra-lounge", name: "Lounge Chair Reconditioned", brand: "Vitra", category: "chairs", price: 1850, image: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&w=900&q=80", material: "Leather, chrome", year: "1970s", dimensions: "84 x 78 x 82 cm", featured: true },
  { id: "cassina-sofa", name: "Modular Leather Sofa", brand: "Cassina", category: "sofas", price: 3200, image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=900&q=80", material: "Leather, steel", year: "1980s", dimensions: "245 x 92 x 72 cm", featured: true },
  { id: "knoll-table", name: "Travertine Coffee Table", brand: "Knoll", category: "tables", price: 1180, image: "https://images.unsplash.com/photo-1532372576444-dda954194ad0?auto=format&fit=crop&w=900&q=80", material: "Travertine, glass", year: "1975", dimensions: "110 x 70 x 35 cm", featured: true },
  { id: "artemide-lamp", name: "Adjustable Desk Lamp", brand: "Artemide", category: "lighting", price: 420, image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=900&q=80", material: "Painted metal", year: "1990s", dimensions: "68 x 18 x 18 cm", featured: true },
  { id: "usm-cabinet", name: "Modular Side Cabinet", brand: "USM", category: "storage", price: 960, image: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=900&q=80", material: "Steel, lacquer", year: "2000s", dimensions: "152 x 38 x 74 cm", featured: false },
  { id: "office-chair", name: "Executive Office Chair", brand: "Charles Pollock", category: "office", price: 740, image: "https://images.unsplash.com/photo-1580480055273-228ff5388ef8?auto=format&fit=crop&w=900&q=80", material: "Leather, aluminium", year: "1965", dimensions: "61 x 58 x 86 cm", featured: false },
  { id: "fritz-stool", name: "Bentwood Counter Stool", brand: "Fritz Hansen", category: "chairs", price: 360, image: "https://images.unsplash.com/photo-1541558869434-2840d308329a?auto=format&fit=crop&w=900&q=80", material: "Oak, steel", year: "1988", dimensions: "44 x 44 x 76 cm", featured: false },
  { id: "walnut-shelf", name: "Walnut Wall Shelf", brand: "Danish Modern", category: "storage", price: 680, image: "https://images.unsplash.com/photo-1594026112284-02bb6f3352fe?auto=format&fit=crop&w=900&q=80", material: "Walnut veneer", year: "1960s", dimensions: "180 x 28 x 64 cm", featured: false }
];

const money = value => new Intl.NumberFormat("pt-PT", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(value);
const params = new URLSearchParams(window.location.search);

function cart() {
  return JSON.parse(localStorage.getItem("rehabita-cart") || "[]");
}

function saveCart(items) {
  localStorage.setItem("rehabita-cart", JSON.stringify(items));
  updateCartCount();
}

function addToCart(id) {
  const items = cart();
  const found = items.find(item => item.id === id);
  if (found) found.qty += 1;
  else items.push({ id, qty: 1 });
  saveCart(items);
}

function updateCartCount() {
  const count = cart().reduce((sum, item) => sum + item.qty, 0);
  document.querySelectorAll(".cart-count").forEach(node => node.textContent = count);
}

function headerMarkup() {
  return `
    <a class="brand" href="index.html" aria-label="re-habita home"><span>re-habita</span><small>Originally Reconditioned</small></a>
    <button class="menu-toggle" type="button" aria-label="Open menu"><span></span><span></span></button>
    <nav class="main-nav" aria-label="Primary navigation">
      <a href="products.html">Produtos</a><a href="brands.html">Marcas</a><a href="services.html">Servicos</a><a href="about.html">Sobre nos</a><a href="contact.html">Contactos</a>
      <span class="language"><a href="#">EN</a><a href="#">ES</a></span>
    </nav>
    <div class="header-actions">
      <button class="icon-button search-open" type="button" aria-label="Search"><svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="6"></circle><path d="m16 16 4 4"></path></svg></button>
      <a class="icon-button" href="cart.html" aria-label="Cart"><svg viewBox="0 0 24 24"><path d="M7 7h14l-2 8H8L6 3H3"></path><circle cx="9" cy="20" r="1.6"></circle><circle cx="18" cy="20" r="1.6"></circle></svg><span class="cart-count">0</span></a>
    </div>`;
}

function footerMarkup() {
  return `
    <div class="footer-brand"><span>re-habita</span><small>Originally Reconditioned</small><p>Vintage design furniture, restored and curated in Lisbon.</p></div>
    <div><h2>Shop</h2><a href="products.html">Produtos</a><a href="brands.html">Marcas</a><a href="services.html#rentals">Aluguer</a></div>
    <div><h2>Studio</h2><a href="about.html">Sobre nos</a><a href="services.html">Servicos</a><a href="contact.html">Contactos</a></div>
    <div><h2>Contactos</h2><p>hello@re-habita.studio</p><p>Rua do Design 24, Lisboa</p><p>Instagram / Pinterest</p></div>`;
}

function searchMarkup() {
  return `
    <button class="search-close" type="button" aria-label="Close search">Close</button>
    <form action="products.html">
      <label for="site-search">Search the collection</label>
      <input id="site-search" name="q" type="search" placeholder="chair, sofa, vitra..." autocomplete="off">
    </form>`;
}

function productCard(product) {
  return `
    <article class="product-card" data-category="${product.category}">
      <a class="image-link" href="product.html?id=${product.id}"><img src="${product.image}" alt="${product.name}"></a>
      <div class="product-card-content">
        <h3><a href="product.html?id=${product.id}">${product.name}</a></h3>
        <p>${product.brand}</p>
        <div class="product-meta">
          <span>${money(product.price)}</span>
          <button class="small-button" type="button" data-add="${product.id}">Reservar</button>
        </div>
      </div>
    </article>`;
}

function renderProducts() {
  document.querySelectorAll("[data-product-list]").forEach(list => {
    let items = list.dataset.productList === "featured" ? products.filter(product => product.featured) : [...products];
    const query = (params.get("q") || "").toLowerCase();
    const category = params.get("category");
    if (category) items = items.filter(product => product.category === category);
    if (query) items = items.filter(product => `${product.name} ${product.brand} ${product.category}`.toLowerCase().includes(query));
    list.innerHTML = items.map(productCard).join("");
    const resultCount = document.querySelector("[data-result-count]");
    if (resultCount) resultCount.textContent = items.length;
  });
}

function wireFilters() {
  const filterButtons = document.querySelectorAll("[data-filter]");
  const list = document.querySelector("[data-product-list='all']");
  if (!filterButtons.length || !list) return;
  filterButtons.forEach(button => {
    button.addEventListener("click", () => {
      filterButtons.forEach(node => node.classList.remove("active"));
      button.classList.add("active");
      const filter = button.dataset.filter;
      const cards = [...list.querySelectorAll(".product-card")];
      let visible = 0;
      cards.forEach(card => {
        const show = filter === "all" || card.dataset.category === filter;
        card.style.display = show ? "" : "none";
        if (show) visible += 1;
      });
      const resultCount = document.querySelector("[data-result-count]");
      if (resultCount) resultCount.textContent = visible;
    });
  });
  const sort = document.querySelector("[data-sort]");
  if (sort) sort.addEventListener("change", () => {
    const sorted = [...products].sort((a, b) => sort.value === "price-low" ? a.price - b.price : sort.value === "price-high" ? b.price - a.price : Number(b.featured) - Number(a.featured));
    list.innerHTML = sorted.map(productCard).join("");
    wireAddButtons();
    filterButtons.forEach(node => node.classList.toggle("active", node.dataset.filter === "all"));
    document.querySelector("[data-result-count]").textContent = sorted.length;
  });
}

function renderDetail() {
  const mount = document.querySelector("[data-product-detail]");
  if (!mount) return;
  const product = products.find(item => item.id === params.get("id")) || products[0];
  document.title = `${product.name} | re-habita`;
  mount.innerHTML = `
    <section class="product-detail">
      <div class="product-gallery"><img src="${product.image}" alt="${product.name}"></div>
      <div class="detail-copy">
        <p class="eyebrow">${product.brand}</p>
        <h1>${product.name}</h1>
        <p class="price">${money(product.price)}</p>
        <p>Single vintage piece, checked and reconditioned by the studio. Available for purchase or project reservation, subject to final stock confirmation.</p>
        <ul class="detail-list">
          <li><span>Year</span><strong>${product.year}</strong></li>
          <li><span>Material</span><strong>${product.material}</strong></li>
          <li><span>Dimensions</span><strong>${product.dimensions}</strong></li>
          <li><span>Condition</span><strong>Reconditioned</strong></li>
        </ul>
        <button class="solid-button" type="button" data-add="${product.id}">Adicionar ao carrinho</button>
      </div>
    </section>`;
}

function renderCart() {
  const mount = document.querySelector("[data-cart-items]");
  if (!mount) return;
  const items = cart();
  const rows = items.map(item => {
    const product = products.find(p => p.id === item.id);
    if (!product) return "";
    return `<article class="cart-item">
      <img src="${product.image}" alt="${product.name}">
      <div><h2>${product.name}</h2><p>${product.brand} · Qty ${item.qty}</p><strong>${money(product.price * item.qty)}</strong></div>
      <button class="small-button" type="button" data-remove="${product.id}">Remover</button>
    </article>`;
  }).join("");
  mount.innerHTML = rows || "<p>O carrinho esta vazio.</p>";
  const total = items.reduce((sum, item) => {
    const product = products.find(p => p.id === item.id);
    return sum + (product ? product.price * item.qty : 0);
  }, 0);
  document.querySelector("[data-cart-total]").textContent = money(total);
  document.querySelectorAll("[data-remove]").forEach(button => {
    button.addEventListener("click", () => {
      saveCart(cart().filter(item => item.id !== button.dataset.remove));
      renderCart();
    });
  });
}

function wireAddButtons() {
  document.querySelectorAll("[data-add]").forEach(button => {
    button.addEventListener("click", () => {
      addToCart(button.dataset.add);
      button.textContent = "Adicionado";
      setTimeout(() => button.textContent = button.classList.contains("solid-button") ? "Adicionar ao carrinho" : "Reservar", 1100);
    });
  });
}

function wireShell() {
  document.querySelectorAll(".site-header").forEach(header => {
    if (!header.innerHTML.trim()) header.innerHTML = headerMarkup();
  });
  document.querySelectorAll(".site-footer").forEach(footer => footer.innerHTML = footerMarkup());
  document.querySelectorAll(".search-overlay").forEach(overlay => {
    if (!overlay.innerHTML.trim()) overlay.innerHTML = searchMarkup();
  });
  document.querySelectorAll(".menu-toggle").forEach(button => {
    button.addEventListener("click", () => document.body.classList.toggle("menu-open"));
  });
  document.querySelectorAll(".search-open").forEach(button => {
    button.addEventListener("click", () => {
      const overlay = document.querySelector(".search-overlay");
      overlay.hidden = false;
      overlay.querySelector("input").focus();
    });
  });
  document.querySelectorAll(".search-close").forEach(button => {
    button.addEventListener("click", () => button.closest(".search-overlay").hidden = true);
  });
  document.querySelectorAll(".newsletter-form").forEach(form => {
    form.addEventListener("submit", event => {
      event.preventDefault();
      form.innerHTML = "<p>Obrigado. Guardamos o seu pedido de subscricao.</p>";
    });
  });
  document.querySelectorAll(".contact-form").forEach(form => {
    form.addEventListener("submit", event => {
      event.preventDefault();
      form.querySelector(".form-note").textContent = "Mensagem preparada. Entraremos em contacto em breve.";
      form.reset();
    });
  });
}

wireShell();
renderProducts();
renderDetail();
wireFilters();
wireAddButtons();
renderCart();
updateCartCount();
