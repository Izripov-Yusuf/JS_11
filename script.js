'use strict';

let isNumber = function(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

let money, income = 'Фриланс', deposit = false, mission = 100000, period = 3;

let start = function () {

  do {
    money = prompt('Ваш месячный доход ?');
  }
  while (!isNumber(money));
};

start();

let showTypeOf = function(data) {
  console.log(data, typeof(data));
};
showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);

let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
deposit = confirm('Есть ли у вас депозит в банке?');

let expenses = [];

function getExpensesMonth() {
  let sum = 0;
  let res = 0;
  for (let i = 0; i < 2; i++) {

    expenses[i] = prompt('Введите обязательную статью расходов?');
    sum = prompt('Во сколько это обойдется?');
    while (!isNumber(sum)) {
      sum = prompt('Во сколько это обойдется?');
    }
    res += +sum;
  }
  console.log(expenses);

  return res;
}

let expensesAmount = getExpensesMonth();

console.log('Расходы за месяц: ', expensesAmount);

console.log(addExpenses.toLowerCase().split(','));

function getAccumulatedMonth() {
  return money - expensesAmount;
}

let accumulatedMonth = getAccumulatedMonth();
console.log('Накопится за месяц: ', accumulatedMonth);

function getTargetMonth() {
  return Math.ceil(mission / accumulatedMonth);
}

if (getTargetMonth() > 0) {
  console.log('Цель достигнется за: ', getTargetMonth());
} else {
  console.log('Цель не будет достигнута');
}


let budgetDay = Math.floor(accumulatedMonth / 30);
console.log('Бюджет на день: ', budgetDay);

let getStatusIncome = function() {
  if (budgetDay > 1200) {
    return ('У вас высокий уровень дохода');
  } else if ((budgetDay >= 600) && (budgetDay <= 1200)) {
    return ('У вас средний уровень дохода');
  }
  else if (budgetDay < 0) {
    return ('Что то пошло не так');
  }
  else if (budgetDay < 600) {
    return ('К сожалению у вас уровень дохода ниже среднего');
  }
};
console.log('Уровень дохода: ', getStatusIncome());