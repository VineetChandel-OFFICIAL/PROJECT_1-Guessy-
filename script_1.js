console.log("Magic begins from here!!");
let guessed_comp = Math.floor(Math.random() * 20 + 1);
console.log("Axon's secret number:", guessed_comp);

// ---- Variables ----
let win_text;
let lose_text;
let i = 0;
const message = document.querySelector(".sub_guss");
const hint = document.querySelector(".sub_guss_new");
const attempts = document.querySelectorAll(".sub_guss_1")[0];
const remarks = document.querySelectorAll(".sub_guss_1")[1];
const hintText = document.getElementById("hintText");

attempts.textContent = `Attempts: ${i}`;
remarks.textContent = "Make your first guess!";

// ---- Random message selection ----
let text_selection = Math.floor(Math.random() * 100 + 1);

if (text_selection <= 20) {
  win_text = "Impossible… You beat me?! 😭";
  lose_text = "Ha! Predictable, human 😏";
} else if (text_selection <= 40) {
  win_text = "404: Axon's ego not found 😭";
  lose_text = "Did your circuits overheat? Oh wait… you don't have any 🤭";
} else if (text_selection <= 60) {
  win_text = "Okay okay… you're the boss this time! 😭";
  lose_text = "Too bad, human. Maybe next time bring some RAM!";
} else if (text_selection <= 80) {
  win_text = "No way! Did my circuits just lose to you? 😭";
  lose_text = "Wrong again… I'm starting to feel bad for you 😬";
} else {
  win_text = "Congratulations… I underestimated you 😭";
  lose_text = "My sensors say you're struggling... need a reboot?";
}

// ---- Game Logic ----
document.querySelector(".submit").addEventListener("click", () => {
  let user_guess = Number(document.querySelector(".guessed").value);

  // Validate input
  if (isNaN(user_guess) || user_guess < 1 || user_guess > 20) {
    hintText.textContent = "Please enter a valid number between 1 and 20!";
    return;
  }

  i++;
  attempts.textContent = `Attempts: ${i}`;

  // Correct Guess
  if (user_guess === guessed_comp) {
    message.textContent = win_text;
    hint.textContent = "Wait... what?! How did you do that?! 🤯";
    document.body.style.backgroundColor = "#2ecc71"; // nice green
    remarks.textContent = `Axon defeated in ${i} attempts! ⚡`;

    setTimeout(() => {
      hint.textContent = "Rebooting systems... stand by 🤖";
    }, 2000);

    setTimeout(() => {
      location.reload();
    }, 5000);
  }

  // Wrong Guess
  else {
    message.textContent = lose_text;

    // Provide hint
    if (user_guess < guessed_comp) {
      hint.textContent = "Too low! Try a higher number 📈";
      remarks.textContent = "Your guess was too low";
    } else {
      hint.textContent = "Too high! Try a lower number 📉";
      remarks.textContent = "Your guess was too high";
    }

    // Change background color based on how close the guess is
    const difference = Math.abs(guessed_comp - user_guess);
    if (difference <= 2) {
      document.body.style.backgroundColor = "#e74c3c"; // red for very close
    } else if (difference <= 5) {
      document.body.style.backgroundColor = "#f39c12"; // orange for close
    } else {
      document.body.style.backgroundColor = "#000000"; // black for far
    }

    setTimeout(() => {
      hint.textContent = "Hmm? Still trying? I like your persistence 😏";
    }, 4000);
  }

  // Clear input field
  document.querySelector(".guessed").value = "";
  hintText.textContent = "Enter your next guess!";
});

// Allow Enter key to submit
document.querySelector(".guessed").addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    document.querySelector(".submit").click();
  }
});
