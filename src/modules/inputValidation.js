// Валидация инпутов
const inputValidation = () => {
  const body = document.querySelector('body');
  body.addEventListener('input', (event) => {
    let target = event.target;
    if (target.matches('input[name="user_phone"]')) {
      target.value = target.value.replace(/[^\+\d]/g, '');
    }
    if (target.matches('input[name="user_name"]') || target.matches('input[name="user_message"]')) {
      target.value = target.value.replace(/[^а-яА-Я,.!?"';: ]/, '');
    }
  });
};
export default inputValidation;