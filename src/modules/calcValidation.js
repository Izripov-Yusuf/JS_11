//Валидация калькулятора
const calcValidation = () => {
  const calcBlock = document.querySelector('.calc-block');
  calcBlock.addEventListener('input', (event) => {
    let target = event.target;
    if (target.matches('input')) {
      target.value = target.value.replace(/[^0-9]/, '');
    }
  });
};
export default calcValidation;