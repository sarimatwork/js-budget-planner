/*--### Check Boxex--*/
function checkBoxHandling(event) {
  const checkbox = event.target;
  const checkboxValue = event.target.value;
  let multiFilters = ["collegeStudentFilter", "parentsFilter"];
  const parent = checkbox.closest(".check-content-group");
  if (checkbox.checked) {
    parent.classList.add("marked");
    fieldsVisibilityHandling(`.${checkboxValue}`, "block");
  } else {
    parent.classList.remove("marked");
    if (multiFilters.includes(checkboxValue)) {
      let collegeCheckBox = document.querySelector("#applyCollegeStudent");
      let parentsCheckBox = document.querySelector("#applyParents");
      if (checkboxValue === "collegeStudentFilter" && parentsCheckBox.checked) {
        fieldsVisibilityHandling(".collegeStudentFilter", "none", true);
        fieldsVisibilityHandling(".parentsFilter", "block");
      } else if (checkboxValue === "parentsFilter" && collegeCheckBox.checked) {
        fieldsVisibilityHandling(".parentsFilter", "none", true);
        fieldsVisibilityHandling(".collegeStudentFilter", "block");
      } else {
        fieldsVisibilityHandling(`.${checkboxValue}`, "none");
      }
    } else {
      fieldsVisibilityHandling(`.${checkboxValue}`, "none");
    }
  }
}

/*--### Handle Input Change--*/
function handleInputChange(event) {
  event.preventDefault();

  // -> Total Income
  let totalIncome = 0;
  let monthlyIncome = document.querySelectorAll(".income-input");
  monthlyIncome.forEach(function (input) {
    totalIncome += Number(input.value) || 0;
  });

  // -> Total Expenses
  function calculateExpenses(expensesInput, showExpenses) {
    let totalExpences = 0;
    let monthlyexpences = document.querySelectorAll(expensesInput);
    monthlyexpences.forEach(function (input) {
      totalExpences += Number(input.value) || 0;
    });

    let needsAmount = document.querySelectorAll(showExpenses);
    for (let i = 0; i < needsAmount.length; i++) {
      needsAmount[i].innerHTML = totalExpences;
    }
  }

  calculateExpenses(".needs-input", ".needs-amount");
  calculateExpenses(".wants-input", ".wants-amount");
  calculateExpenses(".saving-input", ".savings-amount");

  // -> Percentage Handling
  function percentageHandling(showPercentage, percentageValue) {
    let perOfNecessities = (totalIncome * percentageValue) / 100;
    if (perOfNecessities != 0) {
      document.querySelector(showPercentage).innerHTML =
        perOfNecessities.toFixed(2);
    } else {
      document.querySelector(showPercentage).innerHTML = perOfNecessities;
    }
  }
  percentageHandling(".percentage-of-necessities", 50);
  percentageHandling(".percentage-of-wants", 30);
  percentageHandling(".percentage-of-savings", 20);
}

// -> Event Listener
const inputs = document.querySelectorAll(".free-budget-form input");
for (let i = 0; i < inputs.length; i++) {
  inputs[i].addEventListener("input", handleInputChange);
}

// -> Hide All Filter Items
const filterItems = document.querySelectorAll(
  '.free-budget-form [class$="Filter"]'
);

if (filterItems.length) {
  filterItems.forEach((item) => {
    item.style.display = "none";
  });
}

// -> Fields Visibility Handling
function fieldsVisibilityHandling(classItem, visibility, isMultiFilter) {
  const fields = document.querySelectorAll(classItem);
  fields.forEach((field) => {
    field.style.display = visibility;
    if (visibility === "none" && !isMultiFilter) {
      let input = field.querySelector("input");
      input.value = "";
      input.dispatchEvent(new Event("input", { bubbles: true }));
      input.dispatchEvent(new Event("change", { bubbles: true }));
    }
  });
}
