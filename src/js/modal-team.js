const openModalBtn = document.querySelector('[data-modal-team-open]');
const modal = document.querySelector('[data-modal-team]');
const closeModalBtn = document.querySelector('[data-modal-team-close]');

const onModalOpenBtnElClick = () => {
  modal.classList.remove('is-hidden');
  document.addEventListener('keydown', onEscKeyDown);
  modal.addEventListener('click', onBackdropElClick);
};

const closeModal = () => {
  modal.classList.add('is-hidden');

  document.removeEventListener('keydown', onEscKeyDown);
  modal.removeEventListener('click', onBackdropElClick);
};

const onEscKeyDown = event => {
  if (event.code === 'Escape') {
    closeModal();
  }
};

const onBackdropElClick = event => {
  const { target, currentTarget } = event;

  if (target === currentTarget) {
    closeModal();
  }
};

openModalBtn.addEventListener('click', onModalOpenBtnElClick);
closeModalBtn.addEventListener('click', closeModal);
