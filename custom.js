/*--### Check Boxex--*/
function checkBoxHandling(event) {
  const checkbox = event.target;
  const parent = checkbox.closest(".check-content-group");
  if (checkbox.checked) {
    parent.classList.add("marked");
  } else {
    parent.classList.remove("marked");
  }
}

function handleInputChange(event) {
  event.preventDefault();
  let totalIncome = 0;
  let monthlyIncome = document.querySelectorAll(".income-input");
  monthlyIncome.forEach(function (input) {
    totalIncome += Number(input.value) || 0;
  });

  //--------------------------------------------------

  // Budget Handling
  function budgetHandling(expencesInput, showExpences) {
    let totalExpences = 0;
    let monthlyexpences = document.querySelectorAll(expencesInput);
    monthlyexpences.forEach(function (input) {
      totalExpences += Number(input.value) || 0;
    });

    let needsAmount = document.querySelectorAll(showExpences);
    for (let i = 0; i < needsAmount.length; i++) {
      needsAmount[i].innerHTML = totalExpences;
    }
  }

  budgetHandling(".needs-input", ".needs-amount");
  budgetHandling(".wants-input", ".wants-amount");
  budgetHandling(".saving-input", ".savings-amount");

  // percentage Handling
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

const inputs = document.querySelectorAll("input");

for (let i = 0; i < inputs.length; i++) {
  inputs[i].addEventListener("input", handleInputChange);
}

function updateCalculator() {
  checkBoxHandling();
  budgetHandling();
  percentageHandling();
}

function fieldsVisibilityHandling(
  itemClass,
  checkBoxID,
  itemClassInput,
  multiFilter,
  secondId
) {
  let items = document.querySelectorAll(itemClass);
  let multiItem = document.querySelectorAll(itemClass);
  let itemInputs = document.querySelectorAll(itemClassInput);

  items.forEach((item) => {
    item.style.display = "none";
  });

  itemInputs.forEach((input) => {
    input.value = "";
  });

  document
    .getElementById(checkBoxID)
    .addEventListener("change", function (event) {
      if (checkBoxID.checked || secondId.checked) {
        multiItem.forEach((item) => {
          item.style.display = "block";
        });
        items.forEach((item) => {
          item.style.display = "block";
        });
      } else if (this.checked) {
        items.forEach((item) => {
          item.style.display = "block";
        });
      } else {
        items.forEach((item) => {
          item.style.display = "none";
          item.querySelector("input").value = "";
          handleInputChange(event);
        });
      }
    });
}

fieldsVisibilityHandling(
  ".collegeStudentFilter",
  "applyCollegeStudent",
  ".collegeStudentFilter input",
  ".collegeStudentFilter.parentsFilter",
  "applyParents"
);
fieldsVisibilityHandling(
  ".parentsFilter",
  "applyParents",
  ".parentsFilter input",
  ".collegeStudentFilter.parentsFilter",
  "applyParents"
);
fieldsVisibilityHandling(
  ".homeOverFilter",
  "applyHomeOver",
  ".homeOverFilter input",
  ".collegeStudentFilter.parentsFilter",
  "applyParents"
);
fieldsVisibilityHandling(
  ".seniorFilter",
  "applySenior",
  ".seniorFilter input",
  ".collegeStudentFilter.parentsFilter",
  "applyParents"
);
fieldsVisibilityHandling(
  ".applyNoneFilter",
  "ApplyNone",
  ".applyNoneFilter input",
  ".collegeStudentFilter.parentsFilter",
  "applyParents"
);
fieldsVisibilityHandling(
  ".applyNoneFilter",
  "ApplyNone",
  ".applyNoneFilter input",
  ".collegeStudentFilter.parentsFilter",
  "applyParents"
);
