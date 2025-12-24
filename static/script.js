// Custom JavaScript: This is where you add interactivity to your website

// This event listener waits for the entire HTML page to load before running any code
document.addEventListener("DOMContentLoaded", function () {
  console.log("Page loaded!");

  // We find the button using its unique ID from the HTML
  const ctaButton = document.getElementById("cta-button");

  // Check if the button exists on the page before adding an event listener
  if (ctaButton) {
    // This function runs whenever the button is clicked
    ctaButton.addEventListener("click", function () {
      console.log("CTA button clicked");
      alert("Welcome! This is your starting point.");
    });
  }
  
  const addGoodHabitButton = document.getElementById("addGoodHabit");
  const goodHabitModal = document.getElementById("goodHabitModal");
  const saveGoodModalButton = document.getElementById("saveGoodModal")
  const closeGoodModalButton = document.getElementById("closeGoodModal");

  if (addGoodHabitButton) {
    addGoodHabitButton.addEventListener("click", function () {
      goodHabitModal.classList.add("open");
    });
  }

  if (saveGoodModalButton) {
    saveGoodModalButton.addEventListener("click", function () {

      habit_name = document.getElementById("goodHabit").value;
      
      if (!habit_name) return;
      const goodTable = document.getElementById("goodTable");
      const row = goodTable.insertRow(-1);
      const cell1 = row.insertCell(0);
      cell1.textContent = habit_name;
      const cell2 = row.insertCell(1);
      cell2.innerHTML = `
      <button type="button" class="btn btn-light btn-sm">-</button>
      <span>0</span>
      <button type="button" class="btn btn-light btn-sm">+</button>
      `;

      fetch("/addHabit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ habit_name })
      })
      .then(res => res.json())
      .then(data => {
        console.log(data.habit_name);
      })
      .catch(err => console.error(err));

      goodHabitModal.classList.remove("open");
    });
  }

  if (closeGoodModalButton) {
    closeGoodModalButton.addEventListener("click", function () {
      goodHabitModal.classList.remove("open");
    })
  }

  const addBadHabitButton = document.getElementById("addBadHabit");
  const badHabitModal = document.getElementById("badHabitModal");
  const saveBadModalButton = document.getElementById("saveBadModal")
  const closeBadModalButton = document.getElementById("closeBadModal")

  if (addBadHabitButton) {
    addBadHabitButton.addEventListener("click", function () {
      badHabitModal.classList.add("open")
    });
  }

  if (saveBadModalButton) {
    saveBadModalButton.addEventListener("click", function () {

      habit_name = document.getElementById("badHabit").value;
      
      if (!habit_name) return;
      const badTable = document.getElementById("badTable");
      const row = badTable.insertRow(-1);
      const cell1 = row.insertCell(0);
      cell1.textContent = habit_name;
      const cell2 = row.insertCell(1);
      cell2.innerHTML = `
      <button type="button" class="btn btn-light btn-sm">-</button>
      <span>0</span>
      <button type="button" class="btn btn-light btn-sm">+</button>
      `;

      fetch("/addHabit?habit_type=bad", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ habit_name })
      })
      .then(res => res.json())
      .then(data => {
        console.log(data.habit_name);
      })
      .catch(err => console.error(err));

      badHabitModal.classList.remove("open");
    });
  }

  if (closeBadModalButton) {
    closeBadModalButton.addEventListener("click", function () {
      badHabitModal.classList.remove("open")
    })
  }

  let email = document.forms['signupForm']['email'].value
  let password = document.forms['signupForm']['password'].value
  fetch('signup/createAccount', {
    'email': email,
    'password': password
  })



});
