'use strict';

let start = document.getElementById('start'),
  cancel = document.getElementById('cancel'),
  btnPlus = document.getElementsByTagName('button'),
  incomePlus = btnPlus[0],
  expensesPlus = btnPlus[1],
  depositCheck = document.querySelector('#deposit-check'),
  additionalIncomeItem = document.querySelectorAll('.additional_income-item'),
  budgetMonthValue = document.querySelector('.budget_month-value'),
  budgetDayValue = document.querySelector('.budget_day-value'),
  expensesMonthValue = document.querySelector('.expenses_month-value'),
  additionalIncomeValue = document.querySelector('.additional_income-value'),
  additionalExpensesValue = document.querySelector('.additional_expenses-value'),
  incomePeriodValue = document.querySelector('.income_period-value'),
  targetMonthValue = document.querySelector('.target_month-value'),
  salaryAmount = document.querySelector('.salary-amount'),
  incomeTitle = document.querySelectorAll('.income-title')[1],
  incomeAmount = document.querySelectorAll('.income-amount'),
  additionalIncomeFirst = document.querySelectorAll('.additional_income-item')[0],
  additionalIncomeSecond = document.querySelectorAll('.additional_income-item')[1],
  expensesTitle = document.querySelectorAll('.expenses-title')[1],
  expensesItems = document.querySelectorAll('.expenses-items'),
  expensesAmount = document.querySelectorAll('.expenses-amount'),
  additionalExpensesItem = document.querySelector('.additional_expenses-item'),
  targetAmount = document.querySelector('.target-amount'),
  periodSelect = document.querySelector('.period-select'),
  periodAmount = document.querySelector('.period-amount'),
  incomeItem = document.querySelectorAll('.income-items'),
  allInputs = document.querySelectorAll('input[type=text]'),
  inputPlaceholderNumber = document.querySelectorAll('.data [placeholder = "Сумма"]'),
  inputPlaceholderName = document.querySelectorAll('.data [placeholder = "Наименование"]');

let isNumber = function (n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

function inputNum() {
  for (let i = 0; i < inputPlaceholderNumber.length; i++) {
    inputPlaceholderNumber[i].value = inputPlaceholderNumber[i].value.replace(/[^0-9]/, '');
  }
}

function inputText() {
  for (let i = 0; i < inputPlaceholderName.length; i++) {
    inputPlaceholderName[i].value = inputPlaceholderName[i].value.replace(/[^а-яА-Я,.!?"';: ]/, '');
  }
}

let appData = {
  income: {},
  addIncome: [],
  expenses: {},
  incomeMonth: 0,
  strExpenses: '',
  addExpenses: [],
  deposit: false,
  percentDeposit: 0,
  moneyDeposit: 0,
  start: function () {

    this.budget = +salaryAmount.value;


    this.getExpenses();
    this.getIncome();

    this.getExpensesMonth();
    this.getAddExpenses();
    this.getAddIncome();
    this.getBudget();
    this.resetInputs();
    this.showResult();
  },
  showResult: function () {
    budgetMonthValue.value = this.budgetMonth;
    budgetDayValue.value = this.budgetDay;
    expensesMonthValue.value = this.expensesMonth;
    additionalExpensesValue.value = this.addExpenses.join(', ');
    additionalIncomeValue.value = this.addIncome.join(', ');
    targetMonthValue.value = this.getTargetMonth();
    periodSelect.addEventListener('change', this.calcPeriod);
    this.calcPeriod();
  },
  addExpensesBlock: function () {
    let cloneExpensesItem = expensesItems[0].cloneNode(true);
    cloneExpensesItem.children[0].value = '';
    cloneExpensesItem.children[1].value = '';
    expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
    expensesItems = document.querySelectorAll('.expenses-items');
    inputPlaceholderNumber = document.querySelectorAll('.data [placeholder = "Сумма"]');
    inputPlaceholderName = document.querySelectorAll('.data [placeholder = "Наименование"]');
    for (let i = 0; i < inputPlaceholderNumber.length; i++) {
      inputPlaceholderNumber[i].addEventListener('input', inputNum);
    }
    for (let i = 0; i < inputPlaceholderName.length; i++) {
      inputPlaceholderName[i].addEventListener('input', inputText);
    }

    if (expensesItems.length === 3) {
      expensesPlus.style.display = 'none';
    }
  },
  addIncomeBlock: function () {
    let cloneIncomesItem = incomeItem[0].cloneNode(true);
    cloneIncomesItem.childNodes[1].value = '';
    cloneIncomesItem.childNodes[3].value = '';
    incomeItem[0].parentNode.insertBefore(cloneIncomesItem, incomePlus);
    incomeItem = document.querySelectorAll('.income-items');
    inputPlaceholderNumber = document.querySelectorAll('.data [placeholder = "Сумма"]');
    inputPlaceholderName = document.querySelectorAll('.data [placeholder = "Наименование"]');
    for (let i = 0; i < inputPlaceholderNumber.length; i++) {
      inputPlaceholderNumber[i].addEventListener('input', inputNum);
    }
    for (let i = 0; i < inputPlaceholderName.length; i++) {
      inputPlaceholderName[i].addEventListener('input', inputText);
    }


    if (incomeItem.length === 3) {
      incomePlus.style.display = 'none';
    }
  },
  getExpenses: function () {
    expensesItems.forEach(function (item) {
      let itemExpenses = item.querySelector('.expenses-title').value;
      let cashExpenses = item.querySelector('.expenses-amount').value;
      if (itemExpenses !== '' && cashExpenses !== '') {
        appData.expenses[itemExpenses] = +cashExpenses;
      }
    });
  },
  getIncome: function () {
    incomeItem.forEach(function (item) {
      let itemExpenses = item.querySelector('.income-title').value;
      let cashExpenses = item.querySelector('.income-amount').value;
      if (itemExpenses !== '' && cashExpenses !== '') {
        appData.income[itemExpenses] = +cashExpenses;
      }
    });

    for (let key in this.income) {
      this.incomeMonth += +this.income[key];
    }
  },
  getAddExpenses: function () {
    let addExpenses = additionalExpensesItem.value.split(',');
    addExpenses.forEach(function (item) {
      item = item.trim();
      if (item !== '') {
        appData.addExpenses.push(item);
      }
    });
  },
  getAddIncome: function () {
    additionalIncomeItem.forEach(function (item) {
      let itemValue = item.value.trim();
      if (itemValue !== '') {
        appData.addIncome.push(itemValue);
      }
    });
  },
  budget: 0,
  budgetDay: 0,
  budgetMonth: 0,
  expensesMonth: 0,
  getExpensesMonth: function () {
    let sum = 0;
    for (let key in this.expenses) {
      sum += this.expenses[key];
    }
    this.expensesMonth = sum;
    return sum;
  },
  getBudget: function () {
    this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
    this.budgetDay = Math.floor(this.budgetMonth / 30);
  },
  getTargetMonth: function () {
    return Math.ceil(targetAmount.value / this.budgetMonth);
  },
  getStatusIncome: function () {
    if (this.budgetDay > 1200) {
      return ('У вас высокий уровень дохода');
    } else if ((this.budgetDay >= 600) && (this.budgetDay <= 1200)) {
      return ('У вас средний уровень дохода');
    } else if (this.budgetDay < 0) {
      return ('Что то пошло не так');
    } else if (this.budgetDay < 600) {
      return ('К сожалению у вас уровень дохода ниже среднего');
    }
  },
  getInfoDeposit: function () {
    if (this.deposit) {
      this.percentDeposit = +prompt('Какой годовой процент?', 10);
      while (!isNumber(this.percentDeposit)) {
        this.percentDeposit = +prompt('Какой годовой процент?', 10);
      }
      this.moneyDeposit = +prompt('Какая сумма заложена', 10000);
      while (!isNumber(this.percentDeposit)) {
        this.percentDeposit = +prompt('Какая сумма заложена', 10000);
      }
    }
  },
  changeRange: function (event) {
    periodSelect.value = event.target.value;
    periodAmount.textContent = periodSelect.value;
  },
  calcPeriod: function () {
    incomePeriodValue.value = appData.budgetMonth * periodSelect.value;
  },
  resetInputs: function () {
    start.style.display = 'none';
    let leftInputs = document.querySelectorAll('.data input[type=text]');
    for (let i = 0; i < leftInputs.length; i++) {
      let elem = leftInputs[i];
      elem.disabled = true;
    }
    cancel.style.display = 'block';
    cancel.addEventListener('click', function () {
      for (let i = 0; i < allInputs.length; i++) {
        let elem = allInputs[i];
        elem.value = '';
      }
      appData.income = {};
      appData.addIncome = [];
      appData.expenses = {};
      appData.incomeMonth = 0;
      appData.strExpenses = '';
      appData.addExpenses = [];
      appData.deposit = false;
      appData.percentDeposit = 0;
      appData.moneyDeposit = 0;
      appData.budget = 0;
      appData.budgetDay = 0;
      appData.budgetMonth = 0;
      appData.expensesMonth = 0;
      for (let i = 1; i < incomeItem.length; i++) {
        incomeItem[i].remove();
      }
      incomeItem = document.querySelectorAll('.income-items');
      for (let i = 1; i < expensesItems.length; i++) {
        expensesItems[i].remove();
      }
      expensesItems = document.querySelectorAll('.expenses-items');
      cancel.style.display = 'none';
      for (let i = 0; i < leftInputs.length; i++) {
        let elem = leftInputs[i];
        elem.disabled = false;
      }
      if (salaryAmount.value.trim() === '') {
        start.disabled = !salaryAmount.value.trim();
      }
      periodSelect.value = '1';
      periodAmount.textContent = periodSelect.value;
      start.style.display = 'block';
      if (incomePlus.style.display === 'none') {
        incomePlus.style.display = 'block';
      }
      if (expensesPlus.style.display === 'none') {
        expensesPlus.style.display = 'block';
      }
      if (depositCheck.checked === true) {
        depositCheck.checked = false;
      }
    });
  }
};

function blockStart() {
  start.disabled = !salaryAmount.value.trim();
}
blockStart();

salaryAmount.addEventListener('input', blockStart);

start.addEventListener('click', appData.start.bind(appData));

expensesPlus.addEventListener('click', appData.addExpensesBlock);

incomePlus.addEventListener('click', appData.addIncomeBlock);

periodSelect.addEventListener('change', appData.changeRange);

expensesPlus.addEventListener('click', appData.addExpensesBlock);

incomePlus.addEventListener('click', appData.addIncomeBlock);

periodSelect.addEventListener('change', appData.changeRange);

incomeTitle.addEventListener('input', function () {
  incomeTitle.value = incomeTitle.value.replace(/[^а-яА-Я,.!?"';: ]/, '');
});

additionalIncomeItem[0].addEventListener('input', function () {
  additionalIncomeItem[0].value = additionalIncomeItem[0].value.replace(/[^а-яА-Я,.!?"';: ]/, '');
});

additionalIncomeItem[1].addEventListener('input', function () {
  additionalIncomeItem[1].value = additionalIncomeItem[1].value.replace(/[^а-яА-Я,.!?"';: ]/, '');
});

expensesTitle.addEventListener('input', function () {
  expensesTitle.value = expensesTitle.value.replace(/[^а-яА-Я,.!?"';: ]/, '');
});

additionalExpensesItem.addEventListener('input', function () {
  additionalExpensesItem.value = additionalExpensesItem.value.replace(/[^а-яА-Я,.!?"';: ]/, '');
});

salaryAmount.addEventListener('input', function () {
  salaryAmount.value = salaryAmount.value.replace(/[^0-9]/, '');
});

incomeAmount[0].addEventListener('input', function () {
  incomeAmount[0].value = incomeAmount[0].value.replace(/[^0-9]/, '');
});

expensesAmount[0].addEventListener('input', function () {
  expensesAmount[0].value = expensesAmount[0].value.replace(/[^0-9]/, '');
});

targetAmount.addEventListener('input', function () {
  targetAmount.value = targetAmount.value.replace(/[^0-9]/, '');
});




/* console.log(appData.budget);
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


console.log(appData.addExpenses.substring(0, appData.addExpenses.length - 1)); */