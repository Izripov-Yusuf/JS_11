let money = 30000, income = '15000', addExpenses = 'Аренда, Еда, Интернет, Коммуналка, Транспорт',
  deposit = false, mission = 100000, period = 3;

console.log(typeof money, typeof income, typeof deposit);

console.log(addExpenses.length);

console.log("Период равен " + period + " месяца. " + "Цель заработать " + mission + " рублей");

console.log(addExpenses.toLowerCase().split(','));

let budgetDay = money / 30;
console.log(budgetDay);