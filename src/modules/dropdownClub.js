const dropdownClub = () => {
  
  const dropdownList = document.getElementById('dropdown-list'),
        dropdownListItem = dropdownList.querySelectorAll('.dropdown-list__item'),
        clubSelect = document.querySelector('.club-select');

  clubSelect.addEventListener('click', (event) => {
    let target = event.target;
    console.log('target: ', target);
    if (target === dropdownList || target === dropdownListItem[0] || target === dropdownListItem[1]) {
      return;
    }
    dropdownList.classList.toggle('dropdown-list--active');
    for (let i = 0; i < dropdownListItem.length; i++) {
      dropdownListItem[i].classList.toggle('dropdown-list__item--active');
    }
  });
};

export default dropdownClub;