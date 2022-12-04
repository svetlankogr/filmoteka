import { refs } from './refs';

const {
  themeContainerRef,
  themModalRef,
  themFooterRef,
  footerRef,
  signInModalRef,
  spinnerLoadingTextRef,
  spinnerHandsRef,
  spinnerBodyRef,
  modalHeaderRef,
  arrowNextRef,
  arrowPrevRef,
} = refs;

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
  footerRef.classList.toggle('dark-color-change');
  spinnerLoadingTextRef.classList.toggle('dark-color-change');
  modalHeaderRef.classList.toggle('dark-color-change');
  spinnerHandsRef.classList.toggle('dark-box-shadow');
  spinnerBodyRef.classList.toggle('dark-box-shadow');
  if (localStorage.getItem('theme') === 'light') {
    arrowNextRef[0]?.classList.remove('dark-invert');
    arrowPrevRef[0]?.classList.remove('dark-invert');
  } else {
    arrowNextRef[0]?.classList.add('dark-invert');
    arrowPrevRef[0]?.classList.add('dark-invert');
  }
}
