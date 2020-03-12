const freeVisitModal = () => {
  const freeVisit = document.getElementById('free-visit'),
        freeVisitPopup = document.getElementById('free_visit_form');

  freeVisit.addEventListener('click', (event) => {
    event.preventDefault();
    freeVisitPopup.style.display = 'flex';
  });

  freeVisitPopup.addEventListener('click', (event) => {
    let target = event.target;
    if (target.classList.contains('close_icon')) {
      freeVisitPopup.style.display = 'none';
    } else {
      target = target.closest('.form-wrapper');
      if (!target) {
        freeVisitPopup.style.display = 'none';
      }
    }
  });
};

export default freeVisitModal;