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
