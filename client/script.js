import bot from "./assets/bot.png";
import user from "./assets/user.svg";

const form = document.querySelector("form");
const chatContainer = document.querySelector("#chat-container");

let loadInterval;

function loader(element) {
  element.textContent = "Sochne de";

  loadInterval = setInterval(() => {
    element.textContent += ".";

    if (element.textContext === ".... ") {
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

  // users chat
  chatContainer.innerHTML += chatStrip(false, data.get("prompt"));

  form.reset();

  // bot's chat
  const uniqueId = generateId();
  chatContainer.innerHTML += chatStrip(true, " ", uniqueId);

  chatContainer.scrollTop = chatContainer.scrollHeight;

  const messageDiv = document.getElementById(uniqueId);

  loader(messageDiv);
  
  // fetching response ai
  const response = await fetch('http://localhost:5000', {
    method: 'POST',
    header: {
      'Content-Type' : 'application.json'
    },
    body : JSON.stringify({
      prompt: data.get('prompt')
    })
  })

  clearInterval(loadInterval);
  messageDiv.innerHTML = " ";

  if (response.ok) {
    const data = await response.json();
    const parsedData = data.bot.trim();

    typeText(messageDiv, parsedData);
  } else {
    const err = await response.text();
    messageDiv.innerHTML = "Dimag mein kuch gush nhi raha bhai....";

    alert(err)
  }
};

form.addEventListener("submit", handleSubmit);
form.addEventListener("keyup", (e) => {
  if (e.keyCode === 13) {
    handleSubmit(e);
  }
});
