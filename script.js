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

const AppData = function () {
  this.income = {};
  this.addIncome = [];
  this.expenses = {};
  this.incomeMonth = 0;
  this.strExpenses = '';
  this.addExpenses = [];
  this.deposit = false;
  this.percentDeposit = 0;
  this.moneyDeposit = 0;
  this.budget = 0;
  this.budgetDay = 0;
  this.budgetMonth = 0;
  this.expensesMonth = 0;
};

AppData.prototype.start = function () {

  this.budget = +salaryAmount.value;


  this.getExpenses();
  this.getIncome();

  this.getExpensesMonth();
  this.getAddExpenses();
  this.getAddIncome();
  this.getBudget();
  this.resetInputs();
  this.showResult();
};


AppData.prototype.showResult = function () {
  budgetMonthValue.value = this.budgetMonth;
  budgetDayValue.value = this.budgetDay;
  expensesMonthValue.value = this.expensesMonth;
  additionalExpensesValue.value = this.addExpenses.join(', ');
  additionalIncomeValue.value = this.addIncome.join(', ');
  targetMonthValue.value = this.getTargetMonth();
  periodSelect.addEventListener('change', this.calcPeriod);
  this.calcPeriod();
};

AppData.prototype.addExpensesBlock = function () {
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
  };
AppData.prototype.addIncomeBlock = function () {
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
};
AppData.prototype.getExpenses = function () {
  const _this = this;
  expensesItems.forEach(function (item) {
    let itemExpenses = item.querySelector('.expenses-title').value;
    let cashExpenses = item.querySelector('.expenses-amount').value;
    if (itemExpenses !== '' && cashExpenses !== '') {
      _this.expenses[itemExpenses] = +cashExpenses;
    }
  });
};
AppData.prototype.getIncome = function () {
  const _this = this;
  incomeItem.forEach(function (item) {
    let itemExpenses = item.querySelector('.income-title').value;
    let cashExpenses = item.querySelector('.income-amount').value;
    if (itemExpenses !== '' && cashExpenses !== '') {
      _this.income[itemExpenses] = +cashExpenses;
    }
  });

  for (let key in this.income) {
    this.incomeMonth += +this.income[key];
  }
};
AppData.prototype.getAddExpenses = function () {
  let addExpenses = additionalExpensesItem.value.split(',');
  const _this = this;
  addExpenses.forEach(function (item) {
    item = item.trim();
    if (item !== '') {
      _this.addExpenses.push(item);
    }
  });
};
AppData.prototype.getAddIncome = function () {
  const _this = this;
  additionalIncomeItem.forEach(function (item) {
    let itemValue = item.value.trim();
    if (itemValue !== '') {
      _this.addIncome.push(itemValue);
    }
  });
};
AppData.prototype.getExpensesMonth = function () {
    let sum = 0;
    for (let key in this.expenses) {
      sum += this.expenses[key];
    }
    this.expensesMonth = sum;
    return sum;
  };
AppData.prototype.getBudget = function () {
  this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
  this.budgetDay = Math.floor(this.budgetMonth / 30);
};
AppData.prototype.getTargetMonth = function () {
  return Math.ceil(targetAmount.value / this.budgetMonth);
};
AppData.prototype.getStatusIncome = function () {
  if (this.budgetDay > 1200) {
    return ('У вас высокий уровень дохода');
  } else if ((this.budgetDay >= 600) && (this.budgetDay <= 1200)) {
    return ('У вас средний уровень дохода');
  } else if (this.budgetDay < 0) {
    return ('Что то пошло не так');
  } else if (this.budgetDay < 600) {
    return ('К сожалению у вас уровень дохода ниже среднего');
  }
};
AppData.prototype.getInfoDeposit = function () {
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
};
AppData.prototype.changeRange = function (event) {
  periodSelect.value = event.target.value;
  periodAmount.textContent = periodSelect.value;
};
AppData.prototype.calcPeriod = function () {
  incomePeriodValue.value = this.budgetMonth * periodSelect.value;
};
AppData.prototype.resetInputs = function () {
  start.style.display = 'none';
  let leftInputs = document.querySelectorAll('.data input[type=text]');
  for (let i = 0; i < leftInputs.length; i++) {
    let elem = leftInputs[i];
    elem.disabled = true;
  }
  cancel.style.display = 'block';
  const _this = this;
  cancel.addEventListener('click', function () {
    for (let i = 0; i < allInputs.length; i++) {
      let elem = allInputs[i];
      elem.value = '';
    }
    _this.income = {};
    _this.addIncome = [];
    _this.expenses = {};
    _this.incomeMonth = 0;
    _this.strExpenses = '';
    _this.addExpenses = [];
    _this.deposit = false;
    _this.percentDeposit = 0;
    _this.moneyDeposit = 0;
    _this.budget = 0;
    _this.budgetDay = 0;
    _this.budgetMonth = 0;
    _this.expensesMonth = 0;
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
};

function blockStart() {
  start.disabled = !salaryAmount.value.trim();
}
blockStart();

const appData = new AppData();
console.log('appData: ', appData);

AppData.prototype.eventListeners = function () {
  salaryAmount.addEventListener('input', blockStart);

  start.addEventListener('click', this.start.bind(this));

  expensesPlus.addEventListener('click', this.addExpensesBlock);

  incomePlus.addEventListener('click', this.addIncomeBlock);

  periodSelect.addEventListener('change', this.changeRange);

  expensesPlus.addEventListener('click', this.addExpensesBlock);

  incomePlus.addEventListener('click', this.addIncomeBlock);

  periodSelect.addEventListener('change', this.changeRange);

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
};

appData.eventListeners();




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