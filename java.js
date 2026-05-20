/* ==========================
   CART FUNCTIONALITY
========================== */
let cart = [];
let total = 0;

function addToCart(name, price) {
  cart.push({ name, price });
  total += price;
  updateCartUI();
  alert(`${name} added to cart 🛒`);
}

function removeFromCart(index) {
  total -= cart[index].price;
  cart.splice(index, 1);
  updateCartUI();
}

function updateCartUI() {
  const items = document.getElementById("cartItems");
  const totalEl = document.getElementById("cartTotal");
  const count = document.getElementById("cartCount");

  items.innerHTML = '';
  cart.forEach((item, i) => {
    items.innerHTML += `<li>
      ${item.name} - RM${item.price}
      <button onclick="removeFromCart(${i})" style="float:right;color:red;border:none;background:none;cursor:pointer;">✖</button>
    </li>`;
  });

  totalEl.textContent = `Total: RM${total}`;
  count.textContent = cart.length;
}

function toggleCart() {
  document.getElementById("cartSidebar").classList.toggle("active");
}

function checkout() {
  if (cart.length === 0) {
    alert("Cart is empty!");
    return;
  }
  alert("✅ Order placed! Thank you for shopping with SUNSHINE SHOP 🌸");
  cart = [];
  total = 0;
  updateCartUI();
  toggleCart();
}
function changeQty(btn, delta){
  const input = btn.parentElement.querySelector('input');
  let val = parseInt(input.value) || 1;
  val = Math.max(1, val + delta);
  input.value = val;
}

function addToCart(name, price, el){
  let qty = 1;
  if(el){
    const qtyInput = el.parentElement.querySelector('.qty-control input');
    if(qtyInput) qty = parseInt(qtyInput.value) || 1;
  }
  for(let i=0;i<qty;i++){
    cart.push({name, price});
    total += price;
  }
  updateCartUI();
  alert(`${qty} x ${name} added to cart 🛒`);
}

function addToCart(name, price, el) {
  let qty = 1;
  // cari input quantity dalam product card
  if (el) {
    const qtyInput = el.parentElement.querySelector('.qty-control input');
    if (qtyInput) qty = parseInt(qtyInput.value) || 1;
  }

  // tambah ikut qty
  for (let i = 0; i < qty; i++) {
    cart.push({ name, price });
    total += price;
  }

  updateCartUI();
  alert(`${qty} x ${name} added to cart 🛒`);
}

/* ==========================
   TOGGLES (FAQ / OFFERS / ABOUT FLOWERS)
========================== */
function toggleSection(id){
  const section = document.getElementById(id);
  section.classList.toggle("hidden");
  if(!section.classList.contains("hidden")) section.scrollIntoView({behavior:'smooth'});
}

/* ==========================
   CATEGORY BUTTONS
========================== */
function filterCategory(cat){
  const products = document.querySelectorAll('.product');
  const buttons = document.querySelectorAll('.cat-btn');

  buttons.forEach(b => b.classList.remove('active'));
  const activeBtn = document.querySelector(`.cat-btn[data-category="${cat}"]`);
  if (activeBtn) activeBtn.classList.add('active');

  products.forEach(p=>{
    if(cat==='all' || p.dataset.category===cat) p.style.display='block';
    else p.style.display='none';
  });
}

/* ==========================
   BLOG READ MORE
========================== */
function toggleReadMore(btn){
  const full = btn.previousElementSibling;
  full.classList.toggle('hidden');
  btn.textContent = full.classList.contains('hidden') ? 'Read More →' : 'Show Less ↑';
}

/* ==========================
   CONTACT FORM (simple handler)
========================== */
function handleContactSubmit(e){
  e.preventDefault();
  const name = document.getElementById('name')?.value.trim();
  const email = document.getElementById('email')?.value.trim();
  const message = document.getElementById('message')?.value.trim();

  if(!name || !email || !message){
    alert('Sila lengkapkan semua maklumat.');
    return;
  }

  alert(`Thanks, ${name}! We have received your message. 💌`);
  e.target.reset();
}

/* ==========================
   INIT
========================== */
// Set default filter to "all" on load
document.addEventListener('DOMContentLoaded', () => {
  filterCategory('all');
});