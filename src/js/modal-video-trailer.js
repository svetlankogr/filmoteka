import { Notify } from 'notiflix';
import { getTrailerById } from './api';
import { onCloseModalClick } from './modal-film';
import {refs} from './refs'

const {modalVideo, spinner} = refs;

export async function onImageClickOpenVideo(id) {
  try {
    spinner.hidden = false;
    const {
      data: { results: trailersArray },
    } = await getTrailerById(id);
    if (trailersArray.length) {
      const key = trailersArray[0].key;
      const video = `
        <iframe class="modal-film__video" src="https://www.youtube.com/embed/${key}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        `;
      modalVideo.innerHTML = video;
      modalVideo.classList.remove('is-hidden');
      modalVideo.addEventListener('click', onCloseModalClick);
    } else {
      Notify.failure('Trailers not found');
    }
  } catch (error) {
    Notify.failure(error.message);
  } finally {
    spinner.hidden = true;
  }
}
