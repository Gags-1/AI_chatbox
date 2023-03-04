import bot from "./assets/bot.png";
import user from "./assets/user.svg";

const form = document.querySelector("form");
const chatContainer = document.querySelector("#chat-container");

let loadInterval;

function loader(element) {
  element.textContent = "Sochne de";

  loadInterval = setInterval(() => {
    element.textContent += ".";

    if (element.textContent === ".... ") {
      element.textContent = " ";
    }
  }, 300);
}

function typeText(element, text) {
  let index = 0;

  let interval = setInterval(() => {
    if (index < text.length) {
      element.innerHTML += text.charAt(index);
      index++;
    } else {
      clearInterval(interval);
    }
  }, 20);
}

function generateId() {
  const timetamp = Date.now();
  const randomNumber = Math.random();
  const hexNumber = randomNumber.toString(32);

  return `id-${timetamp}-${hexNumber}`;
}

function chatStrip(isAi, value, uniqueId) {
  return `
    <div class="wrapper ${isAi && "ai"}">
      <div class="chat">
        <div class="profile">
          <img 
            src = "${isAi ? bot : user}"
            alt = "${isAi ? "bot" : "user"}"
          />
        </div>
        <div class="message" id=${uniqueId}>
          ${value}
        </div>
      </div>
    </div>
    `;
}

const handleSubmit = async (e) => {
  e.preventDefault();

  const data = new FormData(form);
  const prompt = data.get('prompt');

  chatContainer.innerHTML += chatStrip(false, data.get("prompt"));

  form.reset();

  const uniqueId = generateId();
  chatContainer.innerHTML += chatStrip(true, " ", uniqueId);

  chatContainer.scrollTop = chatContainer.scrollHeight;

  const messageDiv = document.getElementById(uniqueId);

  loader(messageDiv);
  let botResponse = "I'm sorry, I didn't understand your question.";

  if (prompt.includes('hello') || prompt.includes('hi')) {
    botResponse = 'Hi there!';
  } else if (prompt.includes('tera baap kon hain?')) {
    botResponse = "Mere 7 baap hain :- Gagan, Surya, Grenish, Naveen, Anish, Junnu, Aryan.";
  } else if (prompt.includes('how are you')) {
    botResponse = "I'm doing well, thank you!";
  } else if (prompt.includes('what is your name?') || prompt.includes('tera naam kya hain?')){
    botResponse = "My name is Aayu Ai (oiginated from Aayush Baral).";
  } else {
    botResponse = "I'm sorry, I didn't understand your question.";
  }

  // Simulate delay before showing bot's response
  setTimeout(() => {
    messageDiv.textContent = botResponse;
    setTimeout(() => {
      typeText(botResponse);
    }, 3000);
    clearInterval(loadInterval);
  }, 2000);
};

form.addEventListener("submit", handleSubmit);
form.addEventListener("keyup", (e) => {
  if (e.keyCode === 13) {
    handleSubmit(e);
  }
});
