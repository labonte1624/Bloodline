const completeButton = document.getElementById('completeButton');
const missionText = document.getElementById('missionText');
const statusText = document.getElementById('statusText');
const chatForm = document.getElementById('chatForm');
const chatInput = document.getElementById('chatInput');
const chatBox = document.getElementById('chatBox');

let dayCompleted = false;

completeButton.addEventListener('click', () => {
  dayCompleted = true;
  missionText.textContent = 'Day 1 is complete. The system has begun.';
  statusText.textContent = 'Status: Day 1 complete';
  addChatMessage('Anissa: Discipline locked in. The first day is yours.');
});

chatForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const message = chatInput.value.trim();
  if (!message) return;

  addChatMessage(`You: ${message}`);
  chatInput.value = '';

  const reply = getAnissaReply(message);
  addChatMessage(`Anissa: ${reply}`);
});

function addChatMessage(text) {
  const message = document.createElement('div');
  message.className = 'chat-message assistant';
  message.textContent = text;
  chatBox.appendChild(message);
}

function getAnissaReply(message) {
  const lower = message.toLowerCase();
  if (lower.includes('workout')) return 'The mission is simple: show up, execute, and finish.';
  if (lower.includes('today')) return 'Today is about commitment, not comfort.';
  if (lower.includes('pull')) return 'Pull-up progression remains at zero until the foundation is solid.';
  return 'Stay disciplined. One day, one step, one purpose.';
}
