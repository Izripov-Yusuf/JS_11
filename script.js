'use strict';

let money = 30000, income = 'Фриланс', deposit = false, mission = 100000, period = 3;

let showTypeOf = function(data) {
  console.log(data, typeof(data));
};
showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);

money = prompt('Ваш месячный доход ?', 40000);
let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую',
'Аренда, Коммуналка, Интернет');
deposit = confirm('Есть ли у вас депозит в банке?');

let expenses1 = prompt('Введите обязательную статью расходов?', 'Аренда'),
amount1 = +prompt('Во сколько это обойдется?', +'20000'),
expenses2 = prompt('Введите обязательную статью расходов?', 'Еда'),
amount2 = +prompt('Во сколько это обойдется?', +'15000');

function getExpensesMonth() {
  return amount1 + amount2;
}
console.log('getExpensesMonth(): ', getExpensesMonth());

console.log(addExpenses.toLowerCase().split(','));

function getAccumulatedMonth() {
  return money - getExpensesMonth();
}

let accumulatedMonth = getAccumulatedMonth();
console.log('accumulatedMonth: ', accumulatedMonth);

function getTargetMonth() {
  return Math.ceil(mission / accumulatedMonth);
}
console.log('getTargetMonth(): ', getTargetMonth());

let budgetDay = Math.floor(accumulatedMonth / 30);
console.log('budgetDay: ', budgetDay);

let getStatusIncome = function() {
  if (budgetDay > 1200) {
    return ('У вас высокий уровень дохода');
  } else if ((budgetDay >= 600) && (budgetDay <= 1200)) {
    return ('У вас средний уровень дохода');
  }
  else if (budgetDay < 0) {
    return ('Что то пошло не так');
  }
  else if ((budgetDay < 600) || (budgetDay === 0)) {
    return ('К сожалению у вас уровень дохода ниже среднего');
  }
};
console.log('getStatusIncome: ', getStatusIncome());