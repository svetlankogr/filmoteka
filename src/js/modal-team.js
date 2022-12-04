import { refs } from './refs';

const { openModalTeamBtn, modalTeam, closeModalTeamBtn } = refs;

const onModalOpenBtnElClick = () => {
  modalTeam.classList.remove('is-hidden');
  document.addEventListener('keydown', onEscKeyDown);
  modalTeam.addEventListener('click', onBackdropElClick);
};

const closeModal = () => {
  modalTeam.classList.add('is-hidden');

  document.removeEventListener('keydown', onEscKeyDown);
  modalTeam.removeEventListener('click', onBackdropElClick);
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

openModalTeamBtn.addEventListener('click', onModalOpenBtnElClick);
closeModalTeamBtn.addEventListener('click', closeModal);
