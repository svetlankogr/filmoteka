(() => {
  const refs = {
    openModalBtn: document.querySelector('[data-modal-open]'),
    closeModalBtn: document.querySelector('[data-modal-close]'),
    modal: document.querySelector('[data-modal]'),
  };

  refs.openModalBtn.addEventListener('click', toggleModal);
  refs.closeModalBtn.addEventListener('click', toggleModal);

  function toggleModal() {
    refs.modal.classList.toggle('is-hidden');
  }

  refs.modal.addEventListener('click', e => {
    if (e.target === refs.modal) {
      toggleModal();
    }
  });

  document.addEventListener('keydown', e => {
    if (e.code === 'Escape' && !refs.modal.classList.contains('is-hidden')) {
      toggleModal();
    }
  });
})();
