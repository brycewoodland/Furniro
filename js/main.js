// Copyright Date
const copyrightDate = document.querySelector('.copyright-date')

const date = new Date().getFullYear();
copyrightDate.textContent = date;

// Hamburger Menu
const hamburgerMenu = document.querySelector('.hamburger-menu');
const mainNav = document.querySelector('.main-nav');
const navLinks = document.querySelectorAll('a');

hamburgerMenu.addEventListener('click', () => {
    hamburgerMenu.classList.toggle('open');
    mainNav.classList.toggle('open');
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburgerMenu.classList.remove('open');
        mainNav.classList.remove('open');
    })
})