'use strict';

let isNumber = function(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

let money,
start = function () {

  do {
    money = prompt('Ваш месячный доход ?');
  }
  while (!isNumber(money));
};
start();

let appData = {
  income: {},
  addIncome: [],
  expenses: {},
  addExpenses: [],
  deposit: false,
  mission: 100000,
  period: 3,
  asking: function () {
    let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
        appData.addExpenses = addExpenses.toLowerCase().split(',');
        appData.deposit = confirm('Есть ли у вас депозит в банке?');
        let sum = 0,
        res = 0,
        question;
        for (let i = 0; i < 2; i++) {

          question = prompt('Введите обязательную статью расходов?');
          sum = prompt('Во сколько это обойдется?');
          while (!isNumber(sum)) {
            sum = prompt('Во сколько это обойдется?');
          }
          appData.expenses[question] = +sum;
        }
        console.log(appData.expenses);

        return res;
  },
  budget: money,
  budgetDay: 0,
  budgetMonth: 0,
  expensesMonth: 0,
  getExpensesMonth: function () {
    let sum = 0;
    for (let key in appData.expenses) {
      sum += appData.expenses[key];
    }
    appData.expensesMonth = sum;
    return sum;
  },
  getBudget: function () {
    return appData.budget - appData.expensesMonth;
  },
  getTargetMonth: function () {
    appData.budgetMonth = Math.ceil(appData.mission / appData.getBudget());
    appData.budgetDay = Math.floor(appData.getBudget() / 30);
  },
  getStatusIncome: function () {
    if (appData.budgetDay > 1200) {
      return ('У вас высокий уровень дохода');
    } else if ((appData.budgetDay >= 600) && (appData.budgetDay <= 1200)) {
      return ('У вас средний уровень дохода');
    }
    else if (appData.budgetDay < 0) {
      return ('Что то пошло не так');
    }
    else if (appData.budgetDay < 600) {
      return ('К сожалению у вас уровень дохода ниже среднего');
    }
  },
};

appData.asking();
appData.expensesMonth = appData.getExpensesMonth();

console.log(appData.budget);
console.log('Расходы за месяц: ', appData.expensesMonth);

console.log('Накопится за месяц: ', appData.getBudget());

if (appData.getTargetMonth() > 0) {
  console.log('Цель достигнется за: ', appData.getTargetMonth());
} else {
  console.log('Цель не будет достигнута');
}

console.log('Бюджет на день: ', appData.budgetDay);

console.log('Уровень дохода: ', appData.getStatusIncome());

for (let key in appData) {
  console.log('Наша программа включает в себя данные: ' + 'свойство ' + key + ' значение ' + appData[key]);
}