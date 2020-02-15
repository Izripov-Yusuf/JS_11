'use strict';

const start = document.getElementById('start'),
    cancel = document.getElementById('cancel'),
    btnPlus = document.getElementsByTagName('button'),
    incomePlus = btnPlus[0],
    expensesPlus = btnPlus[1],
    depositCheck = document.querySelector('#deposit-check'),
    depositBank = document.querySelector('.deposit-bank'),
    depositAmount = document.querySelector('.deposit-amount'),
    depositPercent = document.querySelector('.deposit-percent'),
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
    expensesAmount = document.querySelectorAll('.expenses-amount'),
    additionalExpensesItem = document.querySelector('.additional_expenses-item'),
    targetAmount = document.querySelector('.target-amount'),
    periodSelect = document.querySelector('.period-select'),
    periodAmount = document.querySelector('.period-amount'),
    allInputs = document.querySelectorAll('input[type=text]');

let expensesItems = document.querySelectorAll('.expenses-items'),
    inputPlaceholderNumber = document.querySelectorAll('.data [placeholder = "Сумма"]'),
    inputPlaceholderName = document.querySelectorAll('.data [placeholder = "Наименование"]'),
    incomeItem = document.querySelectorAll('.income-items');


const isNumber = function (n) {
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

function blockStart() {
  start.disabled = !salaryAmount.value.trim();
}
blockStart();

class AppData {
  constructor() {
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
  }

  start() {

    this.budget = +salaryAmount.value;


    this.getExpInc();

    this.getExpensesMonth();
    this.getAddExpenses();
    this.getAddIncome();
    this.getInfoDeposit();
    this.getBudget();
    this.resetInputs();
    this.showResult();
  }

  showResult() {
    budgetMonthValue.value = this.budgetMonth;
    budgetDayValue.value = this.budgetDay;
    expensesMonthValue.value = this.expensesMonth;
    additionalExpensesValue.value = this.addExpenses.join(', ');
    additionalIncomeValue.value = this.addIncome.join(', ');
    targetMonthValue.value = this.getTargetMonth();
    periodSelect.addEventListener('input', this.calcPeriod.bind(this));
    this.calcPeriod();
  }

  addExpensesBlock() {
    const cloneExpensesItem = expensesItems[0].cloneNode(true);
    cloneExpensesItem.children[0].value = '';
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
  }

  addIncomeBlock() {
    const cloneIncomesItem = incomeItem[0].cloneNode(true);
    cloneIncomesItem.children[0].value = '';
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
  }
  
  /* addExpInc() {
    const _this = this;

    const count = item => {
      const startStr = item.className.split('-')[0];

    };
  } */

  getExpInc() {
    const _this = this;

    const count = item => {
      const startStr = item.className.split('-')[0];
      const itemTitles = item.querySelector(`.${startStr}-title`).value;
      const itemAmount = item.querySelector(`.${startStr}-amount`).value;
      if (itemTitles !== '' && itemAmount !== '') {
        _this[startStr][itemTitles] = +itemAmount;
      }
    };

    incomeItem.forEach(count);
    expensesItems.forEach(count);

    for (let key in this.income) {
      this.incomeMonth += +this.income[key];
    }
  }

  getAddExpenses() {
    const addExpenses = additionalExpensesItem.value.split(',');
    const _this = this;
    addExpenses.forEach(function (item) {
      item = item.trim();
      if (item !== '') {
        _this.addExpenses.push(item);
      }
    });
  }

  getAddIncome() {
    const _this = this;
    additionalIncomeItem.forEach(function (item) {
      const itemValue = item.value.trim();
      if (itemValue !== '') {
        _this.addIncome.push(itemValue);
      }
    });
  }

  getExpensesMonth() {
    let sum = 0;
    for (let key in this.expenses) {
      sum += this.expenses[key];
    }
    this.expensesMonth = sum;
    return sum;
  }

  getBudget() {
    const monthDeposit = Math.floor(this.moneyDeposit * (this.percentDeposit / 100));
    this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth + monthDeposit;
    this.budgetDay = Math.floor(this.budgetMonth / 30);
  }

  getTargetMonth() {
    return Math.ceil(targetAmount.value / this.budgetMonth);
  }

  getStatusIncome() {
    if (this.budgetDay > 1200) {
      return ('У вас высокий уровень дохода');
    } else if ((this.budgetDay >= 600) && (this.budgetDay <= 1200)) {
      return ('У вас средний уровень дохода');
    } else if (this.budgetDay < 0) {
      return ('Что то пошло не так');
    } else if (this.budgetDay < 600) {
      return ('К сожалению у вас уровень дохода ниже среднего');
    }
  }

  changeRange(event) {
    periodSelect.value = event.target.value;
    periodAmount.textContent = periodSelect.value;
  }

  calcPeriod() {
    incomePeriodValue.value = this.budgetMonth * periodSelect.value;
  }

  resetInputs() {
    start.style.display = 'none';
    const leftInputs = document.querySelectorAll('.data input[type=text]');
    for (let i = 0; i < leftInputs.length; i++) {
      const elem = leftInputs[i];
      elem.disabled = true;
    }
    cancel.style.display = 'block';
    const _this = this;
    cancel.addEventListener('click', function () {
      for (let i = 0; i < allInputs.length; i++) {
        const elem = allInputs[i];
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
      depositBank.value = '';
      depositBank.style.display = 'none';
      depositAmount.style.display = 'none';
      depositPercent.style.display = 'none';
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
        const elem = leftInputs[i];
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

  getInfoDeposit() {
    if (this.deposit) {
      this.percentDeposit = depositPercent.value;
      this.moneyDeposit = depositAmount.value;
    }
  }

  changePercent() {
    const valueSelect = this.value;
    if (valueSelect === 'other') {
      depositPercent.style.display = 'inline-block';
    }  else {
      depositPercent.value = valueSelect;
      depositPercent.style.display = 'none';
    }
  }

  personPercent() {
    if (depositPercent.value > 100 || depositPercent.value < 0) {
      start.disabled = depositPercent.value < 0 || depositPercent.value > 100;
      alert('Введите число не меньше 0 и не больше 100 в поле проценты');
    } else {
      start.disabled = false;
    }
  }

  depositHandler() {
    if (depositCheck.checked) {
      depositBank.style.display = 'inline-block';
      depositAmount.style.display = 'inline-block';
      this.deposit = true;
      depositBank.addEventListener('change', this.changePercent);
      depositPercent.addEventListener('input', this.personPercent);
    } else {
      depositBank.style.display = 'none';
      depositAmount.style.display = 'none';
      depositBank.value = '';
      depositAmount.value = '';
      this.deposit = false;
      depositBank.removeEventListener('change', this.changePercent);
      depositPercent.addEventListener('input', this.personPercent);
    }
  }

  eventListeners() {
    salaryAmount.addEventListener('input', blockStart);

    start.addEventListener('click', this.start.bind(this));

    expensesPlus.addEventListener('click', this.addExpensesBlock);

    incomePlus.addEventListener('click', this.addIncomeBlock);

    periodSelect.addEventListener('input', this.changeRange);

    expensesPlus.addEventListener('click', this.addExpensesBlock);

    incomePlus.addEventListener('click', this.addIncomeBlock);

    depositCheck.addEventListener('change', this.depositHandler.bind(this));

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

    depositPercent.addEventListener('input', function () {
      depositPercent.value = depositPercent.value.replace(/[^0-9]/, '');
    });

    depositAmount.addEventListener('input', function () {
      depositAmount.value = depositAmount.value.replace(/[^0-9]/, '');
    });
  }
}

const appData = new AppData();
appData.eventListeners();