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