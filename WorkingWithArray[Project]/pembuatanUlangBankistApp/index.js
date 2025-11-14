"use strict";

// const { act } = required("react");

// const { act } = require("react");

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: "Jonas Schmedtmann",
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
  type: "Premium",
};

const account2 = {
  owner: "Jessica Davis",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
  type: "Standar",
};

const account3 = {
  owner: "Steven Thomas Williams",
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
  type: "Standar",
};

const account4 = {
  owner: "Sarah Smith",
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
  type: "Standar",
};
const account5 = {
  owner: "Desta Saputri",
  movements: [430, 1000, 700, 50, 90, 2000, 50000, 30000, -35000],
  interestRate: 1,
  pin: 5555,
  type: "Super Very Premium",
};
const account6 = {
  owner: "Ahmad Rizki Afridho",
  movements: [430, 1000, 700, 50, 90, 2000, 50000, 30000, -35000],
  interestRate: 1,
  pin: 6666,
  type: "Super Very Premium",
};
const accounts = [account1, account2, account3, account4, account5, account6];

// Elements
const labelWelcome = document.querySelector(".welcome");
const labelDate = document.querySelector(".date");
const labelBalance = document.querySelector(".balance__value");
const labelSumIn = document.querySelector(".summary__value--in");
const labelSumOut = document.querySelector(".summary__value--out");
const labelSumInterest = document.querySelector(".summary__value--interest");
const labelTimer = document.querySelector(".timer");

const containerApp = document.querySelector(".app");
const containerMovements = document.querySelector(".movements");

const btnLogin = document.querySelector(".login__btn");
const btnTransfer = document.querySelector(".form__btn--transfer");
const btnLoan = document.querySelector(".form__btn--loan");
const btnClose = document.querySelector(".form__btn--close");
const btnSort = document.querySelector(".btn--sort");

const inputLoginUsername = document.querySelector(".login__input--user");
const inputLoginPin = document.querySelector(".login__input--pin");
const inputTransferTo = document.querySelector(".form__input--to");
const inputTransferAmount = document.querySelector(".form__input--amount");
const inputLoanAmount = document.querySelector(".form__input--loan-amount");
const inputCloseUsername = document.querySelector(".form__input--user");
const inputClosePin = document.querySelector(".form__input--pin");

/////////////////////////////////////////////////

//Implemenation Change User Name === User Id
const createUserName = function (create) {
  create.forEach((acc) => {
    acc.username = acc.owner
      .toLowerCase()
      .split(" ")
      .map((acc) => acc[0])
      .join("");
  });
};
createUserName(accounts);

//Implementation Movement TO Html
const displayMovements = function (mov, sort = false) {
  containerMovements.innerHTML = "";

  const movs = sort ? mov.slice().sort((a, b) => a - b) : mov;

  movs.forEach((mov, i) => {
    const type = mov > 0 ? "deposit" : "withdrawal";

    const html = `
    <div class="movements__row">
     <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
     <div class="movements__value">${mov}€</div>
     </div>
    `;
    containerMovements.insertAdjacentHTML("afterbegin", html);
  });
};

//Implementation Menambahkan Hasil
const TambahMov = function (acc) {
  const LockMoney = (acc.balance = acc.movements.reduce(
    (acc, kur) => acc + kur
  ));

  labelBalance.textContent = `${LockMoney}€`;
};

//Implementation Deposit & Withdrawal & Bunga
const summary = function (acc) {
  const checkDeposit = acc.movements
    .filter((acc) => acc > 0)
    .reduce((acc, kur) => acc + kur, 0, 0);
  labelSumIn.textContent = `${checkDeposit}€`;

  const checkWithdrawal = acc.movements
    .filter((acc) => acc < 0)
    .reduce((acc, kur) => acc + kur, 0);
  labelSumOut.textContent = `${Math.abs(checkWithdrawal)}€`;

  const checkIntrest = acc.movements
    .filter((acc) => acc > 0)
    .map((mov) => (mov * acc.interestRate) / 100)
    .filter((acc) => acc >= 1)
    .reduce((acc, kur) => acc + kur, 0);
  labelSumInterest.textContent = `${checkIntrest}€`;
};

//Impelemtation Update UI
const updateUi = function (acc) {
  //Display ACC
  displayMovements(acc.movements);

  //Display Penambahan Hasil Tambah Mov
  TambahMov(acc);

  //Display Summary
  summary(acc);
};

//Implentation Login User & CheckPassword
let currentAccount;
btnLogin.addEventListener("click", function (e) {
  e.preventDefault();
  let inputloginUser = inputLoginUsername.value;
  let inputLoginPinUser = Number(inputLoginPin.value);

  //Check Apakah Nama Sesuai
  currentAccount = accounts.find((acc) => acc.username === inputloginUser);

  //Check Apakah Sandi Benar
  if (inputLoginPinUser === currentAccount.pin) {
    containerApp.style.opacity = 1;
    updateUi(currentAccount);

    labelWelcome.textContent = `Welcome back ${
      currentAccount.owner.split(" ")[0]
    }`;
  }
  inputloginUser = inputLoginUsername.value = "";
  inputLoginPinUser = Number((inputLoginPin.value = ""));
});

//Implementation BTN Transfer
btnTransfer.addEventListener("click", function (e) {
  e.preventDefault();
  let checkUsernameTf;

  let inputTf = inputTransferTo.value;
  let totalTf = Number(inputTransferAmount.value);

  checkUsernameTf = accounts.find((acc) => acc.username === inputTf);
  if (
    totalTf > 0 &&
    checkUsernameTf &&
    currentAccount.balance >= totalTf &&
    checkUsernameTf?.username !== currentAccount.username
  ) {
    currentAccount.movements.push(-totalTf);
    checkUsernameTf.movements.push(totalTf);

    updateUi(currentAccount);
  }
  inputTf = inputTransferTo.value = "";
  totalTf = Number((inputTransferAmount.value = ""));
});

//Implementation Transfer Loan Ammount
btnLoan.addEventListener("click", function (e) {
  e.preventDefault();

  let inputLoan = Number(inputLoanAmount.value);
  if (
    inputLoan > 0 &&
    currentAccount.movements.some((mov) => mov >= inputLoan * 0.1)
  ) {
    currentAccount.movements.push(inputLoan);
    updateUi(currentAccount);
    Number((inputLoanAmount.value = ""));
  }
});

//Implementation LogOut Account
btnClose.addEventListener("click", function (e) {
  e.preventDefault();

  let userCloseAcc = inputCloseUsername.value;
  let pinCloseAcc = Number(inputClosePin.value);
  const deleteArr = accounts.findIndex(
    (acc) => acc.username === currentAccount.username
  );
  if (
    currentAccount.username === userCloseAcc &&
    currentAccount.pin === pinCloseAcc
  ) {
    containerApp.style.opacity = 0;
    userCloseAcc = inputCloseUsername.value = "";
    pinCloseAcc = Number((inputClosePin.value = ""));
    accounts.splice(deleteArr, 1);
  }
});

//Implementation Sort Btn
let sorted = false;

btnSort.addEventListener("click", function (e) {
  e.preventDefault();
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
});

//////////////////////////////////////
