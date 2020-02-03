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
  strExpenses: '',
  addExpenses: [],
  deposit: false,
  percentDeposit: 0,
  moneyDeposit: 0,
  mission: 100000,
  period: 3,
  asking: function () {
    if (confirm('Есть ли у вас дополнительный источник заработка?')) {
      let itemIncome = prompt('Какой у вас дополнительный заработок?', 'Продаю, бананы, людей. Шучу, не бананы');
      while (isNumber(itemIncome)) {
        itemIncome = prompt('Какой у вас дополнительный заработок?', 'Продаю, бананы, людей. Шучу, не бананы');
      }
      let cashIncome = +prompt('Сколько вы в месяц зарабатываете на этом?', 10000);
      while (!isNumber(cashIncome)) {
        cashIncome = +prompt('Сколько вы в месяц зарабатываете на этом?', 10000);
      }
      appData.income[itemIncome] = cashIncome;
    }

    let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
        appData.addExpenses = addExpenses.toLowerCase().split(', ');
        appData.firstLetterCaps = function () {
          let res = [];
          for (let i = 0; i < appData.addExpenses.length; i++) {
            let word = appData.addExpenses[i];
            res += `${word.charAt(0).toUpperCase() + word.slice(1)}, `;
          }
          return res;
        };
        appData.strExpenses = appData.firstLetterCaps().trim().split(', ');
        appData.addExpenses = appData.strExpenses.join(', ');
        appData.deposit = confirm('Есть ли у вас депозит в банке?');
        let sum = 0,
        res = 0,
        question;
        for (let i = 0; i < 2; i++) {

          question = prompt('Введите обязательную статью расходов?');
          while (isNumber(question)) {
            question = prompt('Введите обязательную статью расходов?');
          }
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
    appData.budgetMonth = appData.budget - appData.expensesMonth;
    appData.budgetDay = Math.floor(appData.budgetMonth / 30);
  },
  getTargetMonth: function () {
    return Math.ceil(appData.mission / appData.budgetMonth);
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
  getInfoDeposit: function () {
    if (appData.deposit) {
      appData.percentDeposit = +prompt('Какой годовой процент?', 10);
      while (!isNumber(appData.percentDeposit)) {
        appData.percentDeposit = +prompt('Какой годовой процент?', 10);
      }
      appData.moneyDeposit = +prompt('Какая сумма заложена', 10000);
      while (!isNumber(appData.percentDeposit)) {
        appData.percentDeposit = +prompt('Какая сумма заложена', 10000);
      }
    }
  },
  calcSavedMoney: function () {
    return appData.budgetMonth * appData.period;
  }
};

appData.asking();
appData.expensesMonth = appData.getExpensesMonth();
appData.getBudget();

console.log(appData.budget);
console.log('Расходы за месяц: ', appData.expensesMonth);

console.log('Накопится за месяц: ', appData.budgetMonth);

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


console.log(appData.addExpenses.substring(0, appData.addExpenses.length - 1));