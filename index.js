const paragraph = document.querySelectorAll(".empty");
const labels = document.querySelectorAll("label");
const inputs = document.querySelectorAll("input");

const spans = document.querySelectorAll("span");
const ageCalculate = () => {
  const day = document.getElementById("day").value;
  const month = document.getElementById("month").value;
  const year = document.getElementById("year").value;

  const birthDate = new Date(year, month - 1, day);
  const currentDate = new Date();

  //   Calculation of age

  let age = currentDate.getFullYear() - birthDate.getFullYear();
  let monthDifference = currentDate.getMonth() - birthDate.getMonth();
  let dayDifference = currentDate.getDate() - birthDate.getDate();

  //   To prevent negative output for months
  if (currentDate.getMonth() < birthDate.getMonth()) {
    monthDifference = currentDate.getMonth() + 12 - birthDate.getMonth();
    age--;
  }
  if (dayDifference < 0) {
    const lastMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      0
    );
    dayDifference += lastMonth.getDate();
    monthDifference--;
  }
  const changeDOM = () => {
    paragraph.forEach((para) => {
      para.style.display = "block";
    });

    labels.forEach((label) => {
      label.classList.add("empty");
    });

    inputs.forEach((input) => {
      input.classList.add("empty");
    });
  };
  if (day == "" || month == "" || year == "") {
    changeDOM();
  } else {
    // Hide the error message paragraph if all fields are filled
    paragraph.forEach((para) => {
      para.style.display = "none"; // Hide the error message
    });

    // Remove the 'empty' class from labels and inputs
    labels.forEach((label) => {
      label.classList.remove("empty");
    });

    inputs.forEach((input) => {
      input.classList.remove("empty");
    });
  }
  // As the name implies
  const validateInput = (birthday, birthmonth, birthyear) => {
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1;
    const currentDay = new Date().getDate();

    const loweryearBoundary = 1900;

    //  Object for storing errors in input field
    let errors = {
      days: "",
      month: "",
      year: "",
    };

    // Handles leap years and out of bound dates in specific months
    const getdaysInMonth = (month, year) => {
      if (month == 2) {
        return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0)
          ? 29
          : 28;
      } else if ([4, 6, 9, 11].includes(month)) {
        return 30;
      } else {
        return 31;
      }
    };

    if (birthmonth < 1 || birthmonth > 12) {
      changeDOM();
      errors.month = "Invalid month";
    }
    if (birthyear == currentYear && birthmonth > currentMonth) {
      changeDOM();
      errors.month = "Invalid month";
    }
    if (
      birthyear == currentYear &&
      birthmonth == currentMonth &&
      birthday > currentDay
    ) {
      changeDOM();
      errors.days = "Invalid date";
    }
    if (birthyear > currentYear || birthyear < loweryearBoundary) {
      changeDOM();
      errors.year = "Invalid year";
    }
    if (birthday < 1 || birthday > getdaysInMonth(month, year)) {
      changeDOM();
      errors.days = "Invalid date";
    }
    paragraph[0].textContent = errors.days;
    paragraph[1].textContent = errors.month;
    paragraph[2].textContent = errors.year;
    // Show only paragraphs that have an error message
    paragraph.forEach((para, index) => {
      para.style.display = paragraph[index].textContent ? "block" : "none";
    });

    if (errors.days || errors.month || errors.year) {
      changeDOM();
      return;
    }

    spans[0].textContent = age;

    spans[1].textContent = monthDifference;

    spans[2].textContent = dayDifference;
  };
  validateInput(day, month, year);
};
