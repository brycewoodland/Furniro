// Copyright Date
const copyrightDate = document.querySelector('.copyright-date')

const date = new Date().getFullYear();
copyrightDate.textContent = date;

// Hamburger Menu
const body = document.body;
const hamburgerMenu = document.querySelector('[data-nav-toggle]');
const mainNav = document.querySelector('.main-nav');
const navLinks = document.querySelectorAll('a');

hamburgerMenu.addEventListener('click', () => {
    hamburgerMenu.classList.toggle('open');
    mainNav.classList.toggle('open');
    body.classList.toggle('no-scroll');
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburgerMenu.classList.remove('open');
        mainNav.classList.remove('open');
        body.classList.remove('no-scroll');
    });
});

// Card Slider
const track = document.querySelector('.card-track');
let cards = document.querySelectorAll('.card-inspiration');
const arrow = document.querySelector('.arrow-badge');
const slideAmount = cards[0].offsetWidth + 40;

const updateActiveCard = () => {
  document.querySelectorAll('.card-description').forEach(desc => desc.classList.remove('active'));
  document.querySelectorAll('.next-btn').forEach(btn => btn.classList.remove('active'));
  cards.forEach(card => card.classList.remove('active'));

  const firstCard = cards[0];
  firstCard.classList.add('active');
  const desc = firstCard.querySelector('.card-description');
  const btn = firstCard.querySelector('.next-btn');
  if (desc) desc.classList.add('active');
  if (btn) btn.classList.add('active');
};

arrow.addEventListener('click', () => {
  track.style.transition = 'transform 0.5s ease-in-out';
  track.style.transform = `translateX(-${slideAmount}px)`;

  track.addEventListener('transitionend', () => {

    track.style.transition = 'none';

    const firstCard = track.children[0];
    track.appendChild(firstCard);

    track.style.transform = 'translateX(0)';

    cards = document.querySelectorAll('.card-inspiration');
    updateActiveCard();

  }, { once: true });
});

updateActiveCard();


// Fetch from Go RESTful API
const fetchProducts = async () => {
  try {
    const response = await fetch('https://furniro-backend-j6eb.onrender.com/api/products');

    if (!response.ok) {
      throw new Error(response.status);
    }

    const data = await response.json();
    console.log("Fetched products:", data);
    displayProducts(data);
  } catch (error) {
    console.error("Error fetching products:", error);
  }
}

// Map product IDS to image paths
const productImagesMap = {
  "1": "images/Images(1).webp",
  "2": "images/Images(6).webp",
  "3": "images/image 3.webp",
  "4": "images/image 4.webp",
  "5": "images/Images(2).webp",
  "6": "images/Images(3).webp",
  "7": "images/Images(4).webp",
  "8": "images/Images(5).webp"
};

// Display the Product data
const displayProducts = (products) => {
  const productListDiv = document.querySelector('.product-body-grid');
  if (!productListDiv) return;

  productListDiv.textContent = ''; // clear old cards

  products.forEach(product => {
    const productCard = document.createElement('div');
    productCard.classList.add('product-card');

    // Product image
    const imgEl = document.createElement('img');
    imgEl.src = productImagesMap[product.id] || "images/default.png"; // fallback
    imgEl.alt = product.title;
    imgEl.loading = "lazy";
    productCard.appendChild(imgEl);

    // Hover overlay
    const overlay = document.createElement('div');
    overlay.classList.add('card-overlay');
    overlay.innerHTML = `
      <button class="add-to-cart">Add to cart</button>
      <div class="overlay-icons">
        <i class="fa-solid fa-share-nodes" title="Share"></i>
        <i class="fa-solid fa-arrow-right-arrow-left" title="Compare"></i>
        <i class="fa-solid fa-heart" title="Like"></i>
      </div>
    `;
    productCard.appendChild(overlay);

    // --- Dynamic badges ---
    if (product.discount) {
      const discountBadge = document.createElement('div');
      discountBadge.classList.add('discount-badge');
      discountBadge.textContent = product.discount;
      productCard.appendChild(discountBadge);
    }

    if (product.isNew) {
      const newBadge = document.createElement('div');
      newBadge.classList.add('new-badge');
      newBadge.textContent = "New";
      productCard.appendChild(newBadge);
    }

    // --- Product description ---
    const descBlock = document.createElement('div');
    descBlock.classList.add('product-card-description');

    const cardHeader = document.createElement('div');
    cardHeader.classList.add('card-header');

    const titleEl = document.createElement('h4');
    titleEl.classList.add('sm-text');
    titleEl.textContent = product.title;
    cardHeader.appendChild(titleEl);

    const subtitleEl = document.createElement('p');
    subtitleEl.classList.add('xs-text');
    subtitleEl.textContent = product.description;
    cardHeader.appendChild(subtitleEl);

    descBlock.appendChild(cardHeader);

    const cardBody = document.createElement('div');
    cardBody.classList.add('card-body');

    const priceEl = document.createElement('p');
    priceEl.classList.add('xs-text');
    priceEl.textContent = `Rp ${product.price.toLocaleString("id-ID")}`;
    cardBody.appendChild(priceEl);

    if (product.discount) {
      const originalPrice = document.createElement('p');
      originalPrice.classList.add('xs-text');
      originalPrice.style.textDecoration = "line-through";
      originalPrice.textContent = `Rp ${(product.price * 1.4).toLocaleString("id-ID")}`;
      cardBody.appendChild(originalPrice);
    }

    descBlock.appendChild(cardBody);
    productCard.appendChild(descBlock);

    productListDiv.appendChild(productCard);
  });
};

fetchProducts();