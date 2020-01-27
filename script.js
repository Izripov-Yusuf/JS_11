'use strict';

let money = 30000, income = '15000', deposit = false, mission = 100000, period = 3;

console.log(typeof money, typeof income, typeof deposit);

console.log("Период равен " + period + " месяца. " + "Цель заработать " + mission + " рублей");

let budgetDay = money / 30;
console.log(budgetDay);

money = prompt('Ваш месячный доход ?');
let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
deposit = confirm('Есть ли у вас депозит в банке?');

let expenses1 = prompt('Введите обязательную статью расходов?'),
amount1 = +prompt('Во сколько это обойдется?'),
expenses2 = prompt('Введите обязательную статью расходов?'),
amount2 = +prompt('Во сколько это обойдется?');

let budgetMonth = money - (amount1 + amount2);
console.log('budgetMonth: ', budgetMonth);

period = Math.ceil(mission / budgetMonth);
console.log('period: ', period);

budgetDay = Math.floor(budgetMonth / 30);
console.log('budgetDay: ', budgetDay);

if (budgetDay > 1200) {
  console.log('У вас высокий уровень дохода');
} else if ( (budgetDay >= 600) && (budgetDay <= 1200) ) {
  console.log('У вас средний уровень дохода');
}
else if ( (budgetDay < 600) && (budgetDay === 0) ) {
  console.log('К сожалению у вас уровень дохода ниже среднего');
}
else if (budgetDay < 0) {
  console.log('Что то пошло не так');
}