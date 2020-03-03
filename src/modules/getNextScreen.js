// Кнопка перехода к следующему слайду
const getNextScreen = () => {
  let buttonDown = document.querySelector('a[href="#service-block"]');
  buttonDown.addEventListener('click', (event) => {
    event.preventDefault();
    const buttonDownId = buttonDown.getAttribute('href');
    document.querySelector(buttonDownId).scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  });
}
export default getNextScreen;