const dropdownClub = () => {
  
  const dropdownList = document.getElementById('dropdown-list');
  const dropdownListItem = dropdownList.querySelectorAll('.dropdown-list__item');
  const clubSelect = document.querySelector('.club-select');

  clubSelect.addEventListener('click', () => {
    dropdownList.classList.toggle('dropdown-list--active');
    for (let i = 0; i < dropdownListItem.length; i++) {
      dropdownListItem[i].classList.toggle('dropdown-list__item--active');
    }
  });
};

export default dropdownClub;