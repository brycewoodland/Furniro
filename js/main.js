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
const cards = document.querySelectorAll('.card-inspiration');
const descriptions = document.querySelectorAll('.card-description');
const buttons = document.querySelectorAll('.next-btn');
const arrow = document.querySelector('.arrow-badge');
const track = document.querySelector('.card-track');
const cardWidth = cards[0].offsetWidth;
let currentIndex = 0;

const updateActiveCard = (index) => {
  cards.forEach((card, i) => {
    descriptions[i].classList.remove('active');
    buttons[i].classList.remove('active');
    card.classList.remove('active');
  });

  descriptions[index].classList.add('active');
  buttons[index].classList.add('active');
  cards[index].classList.add('active');

  track.style.transform = `translateX(-${index * cardWidth * 1.1}px)`;
}

arrow.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % cards.length;
  updateActiveCard(currentIndex);
});

updateActiveCard(currentIndex);