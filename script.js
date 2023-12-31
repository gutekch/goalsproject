document.addEventListener("DOMContentLoaded", function () {
  const goal = document.getElementById("goal-input");
  const deadline = document.getElementById("deadline-input");
  const button = document.getElementById("button");
  const list = document.getElementById("entered-goals");
  const delButton = document.getElementById("delButton");
  let storedItems = JSON.parse(localStorage.getItem("key")) || [];
  const todaysDate = document.getElementById("todaysDate");

  // displaying the date:

  const today = new Date();
  todaysDate.innerText = today.toDateString();

  function updateDisplay(items) {
    list.innerHTML = items
      .map(
        (item, index) =>
          `<li><input type='checkbox' data-index='${index}'>${item.goal}  -  deadline:${item.deadline}  -  ${item.daysLeft} remaining days</li>`
      )
      .join("");
  }

  console.log("Hej!");

  updateDisplay(storedItems);

  button.addEventListener("click", function () {
    const goalText = goal.value;
    const deadlineText = deadline.value;
    const currentDate = new Date();
    const targetDate = new Date(deadline.value);
    const timeDifference = targetDate - currentDate;
    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

    if (goalText !== "" && deadlineText !== "") {
      storedItems.push({
        goal: goalText,
        deadline: deadlineText,
        daysLeft: days,
      });
    } else {
      console.log("ERROR: both goal and deadline inputs are required");
    }

    localStorage.setItem("key", JSON.stringify(storedItems));

    updateDisplay(storedItems);
  });

  delButton.addEventListener("click", function () {
    const checkboxes = document.querySelectorAll(
      '#entered-goals li input[type="checkbox"]'
    );

    const newStorage = storedItems.filter((item, index) => {
      return checkboxes[index].checked === false;
    });
    localStorage.setItem("key", JSON.stringify(newStorage));
    updateDisplay(newStorage);
  });
});
