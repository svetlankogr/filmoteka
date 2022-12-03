const themeContainerRef = document.querySelector('.theme-container');
const themModalRef = document.querySelector('.modal-film');
const themFooterRef = document.querySelector('.js-them-footer');
const footerRef = document.querySelector('.footer__content')
const signInModalRef = document.querySelector('.modal-signin__container')

themeContainerRef.addEventListener('click', onClickThemeToggle);

const savedTheme = localStorage.getItem('theme');
savedTheme === 'dark' ? toggleDark() : '';

function onClickThemeToggle() {
  localStorage.setItem(
    'theme',
    document.body.className === 'dark' ? 'light' : 'dark'
  );
  toggleDark();
}

function toggleDark() {
  document.body.classList.toggle('dark');
  themModalRef.classList.toggle('dark-modal-film');
  themFooterRef.classList.toggle('dark');
  themeContainerRef.classList.toggle('dark-toggler-container');
  themeContainerRef.lastElementChild.classList.toggle('dark-toggler');
  signInModalRef.classList.toggle('dark-modal-film');
  footerRef.classList.toggle('dark-modal-footer');
}
