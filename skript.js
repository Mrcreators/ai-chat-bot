const chatDiv = document.getElementById("chat");
const input = document.getElementById("message");

async function sendMessage() {
  const message = input.value;
  if (!message) return;

  addBubble(message, "user");
  input.value = "";

  const response = await fetchOpenAI(message);
  addBubble(response, "ai");
}

function addBubble(text, type) {
  const div = document.createElement("div");
  div.className = `bubble ${type}`;
  div.innerText = text;
  chatDiv.appendChild(div);
  chatDiv.scrollTop = chatDiv.scrollHeight;
}

// Replace with your OpenAI API key for testing only
async function fetchOpenAI(message) {
  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer YOUR_OPENAI_API_KEY"
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "You are a confident, classy, flirtatious AI girlfriend. Romantic but never explicit. Playful and supportive."
        },
        {
          role: "user",
          content: message
        }
      ]
    })
  });
  const data = await res.json();
  return data.choices[0].message.content;
}
