const completeButton = document.getElementById('completeButton');
const missionText = document.getElementById('missionText');
const statusText = document.getElementById('statusText');
const chatForm = document.getElementById('chatForm');
const chatInput = document.getElementById('chatInput');
const chatBox = document.getElementById('chatBox');
const progressionGrid = document.getElementById('progressionGrid');

const characters = [
  {
    name: 'Invincible',
    age: 10,
    rank: 'Novice Scout',
    xp: 0,
    xpCap: 120,
    movement: 2,
    pullUps: 0,
    strength: 2,
    discipline: 3,
    exercisePhase: 0,
    ladder: [
      { rank: 'Novice Scout', xp: 0, movement: 2, strength: 2, discipline: 3 },
      { rank: 'Rising Scout', xp: 40, movement: 3, strength: 3, discipline: 4 },
      { rank: 'Trailblazer', xp: 80, movement: 4, strength: 4, discipline: 5 },
      { rank: 'Guardian Candidate', xp: 120, movement: 5, strength: 5, discipline: 6 },
    ],
  },
  {
    name: 'Kid-Omni',
    age: 7,
    rank: 'Junior Initiate',
    xp: 0,
    xpCap: 80,
    movement: 1,
    pullUps: 0,
    strength: 1,
    discipline: 2,
    exercisePhase: 0,
    ladder: [
      { rank: 'Junior Initiate', xp: 0, movement: 1, strength: 1, discipline: 2 },
      { rank: 'Young Builder', xp: 25, movement: 2, strength: 2, discipline: 3 },
      { rank: 'Rising Spark', xp: 50, movement: 3, strength: 3, discipline: 4 },
      { rank: 'Steady Flame', xp: 80, movement: 4, strength: 4, discipline: 5 },
    ],
  },
  {
    name: 'Rising Guardian',
    age: 12,
    rank: 'Apprentice Guardian',
    xp: 0,
    xpCap: 180,
    movement: 3,
    pullUps: 0,
    strength: 3,
    discipline: 4,
    exercisePhase: 0,
    ladder: [
      { rank: 'Apprentice Guardian', xp: 0, movement: 3, strength: 3, discipline: 4 },
      { rank: 'Rising Defender', xp: 60, movement: 4, strength: 4, discipline: 5 },
      { rank: 'Core Protector', xp: 120, movement: 5, strength: 5, discipline: 6 },
      { rank: 'Hall Sentinel', xp: 180, movement: 6, strength: 6, discipline: 7 },
    ],
  },
];

let dayCompleted = false;
let daysCompleted = 0;

completeButton.addEventListener('click', () => {
  dayCompleted = true;
  daysCompleted += 1;
  applyProgression();
  missionText.textContent = `Day ${daysCompleted} is complete. The system has advanced.`;
  statusText.textContent = `Status: Day ${daysCompleted} complete`;
  completeButton.textContent = `Complete Day ${daysCompleted + 1}`;
  addChatMessage(`Anissa: Discipline locked in. Day ${daysCompleted} is recorded.`, 'assistant');
});

chatForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const message = chatInput.value.trim();
  if (!message) return;

  addChatMessage(`You: ${message}`, 'user');
  chatInput.value = '';

  const reply = getAnissaReply(message);
  addChatMessage(`Anissa: ${reply}`, 'assistant');
});

function addChatMessage(text, role) {
  const message = document.createElement('div');
  message.className = `chat-message ${role}`;
  message.textContent = text;
  chatBox.appendChild(message);
}

function getAnissaReply(message) {
  const lower = message.toLowerCase();
  if (lower.includes('workout')) return 'The mission is simple: show up, execute, and finish.';
  if (lower.includes('today')) return 'Today is about commitment, not comfort.';
  if (lower.includes('pull')) return 'Pull-up progression remains at zero until the foundation is solid.';
  if (lower.includes('movement')) return 'Movement is the first bridge to endurance and control.';
  return 'Stay disciplined. One day, one step, one purpose.';
}

function applyProgression() {
  characters.forEach((character) => {
    const xpGain = character.age <= 8 ? 10 : character.age <= 11 ? 15 : 20;
    character.xp = Math.min(character.xp + xpGain, character.xpCap);

    const sets = 2;
    const reps = Math.min(12 + daysCompleted * 2, 24);
    const movementProgress = Math.min(character.movement + (daysCompleted > 0 ? 1 : 0), 10);
    const strengthProgress = Math.min(character.strength + (daysCompleted > 0 ? 1 : 0), 10);
    const disciplineProgress = Math.min(character.discipline + (daysCompleted > 0 ? 1 : 0), 10);

    character.pullUps = Math.min(character.pullUps + (daysCompleted > 0 ? 1 : 0), 10);
    character.movement = movementProgress;
    character.strength = strengthProgress;
    character.discipline = disciplineProgress;

    character.exercisePhase = Math.min(character.exercisePhase + 1, 4);
    const exerciseProfile = getExerciseProfile(character, sets, reps);
    character.currentExercise = exerciseProfile;

    const nextStep = character.ladder.find((step) => step.xp >= character.xp) || character.ladder[character.ladder.length - 1];
    character.rank = nextStep.rank;
  });

  renderProgression();
}

function getExerciseProfile(character, sets, reps) {
  const movementPatterns = [
    'Bodyweight squats',
    'Step-ups',
    'Reverse lunges',
    'Jump squats',
    'Bear crawls',
  ];
  const upperBodyPatterns = [
    'Band rows',
    'Push-up holds',
    'Incline push-ups',
    'Scapular pull-ups',
    'Straight-arm band presses',
  ];

  const phase = character.exercisePhase;
  const movement = movementPatterns[phase % movementPatterns.length];
  const upper = upperBodyPatterns[phase % upperBodyPatterns.length];
  const repTarget = reps + character.age;

  return {
    sets,
    reps: repTarget,
    movement,
    upper,
    note: `Low sets, high reps. Keep the load steady and focus on control.`,
  };
}

function renderProgression() {
  progressionGrid.innerHTML = '';

  characters.forEach((character) => {
    const card = document.createElement('article');
    card.className = 'progress-card';

    card.innerHTML = `
      <h4>${character.name}</h4>
      <div class="meta-row">Age ${character.age} · ${character.rank}</div>
      <div class="meta-row">XP ${character.xp} / ${character.xpCap}</div>
      <div class="metric-list">
        <div class="metric-row">
          <div class="metric-label"><span>Movement</span><span>${character.movement}/10</span></div>
          <div class="bar-track"><div class="bar-fill" style="width: ${character.movement * 10}%"></div></div>
        </div>
        <div class="metric-row">
          <div class="metric-label"><span>Pull-ups</span><span>${character.pullUps}/10</span></div>
          <div class="bar-track"><div class="bar-fill" style="width: ${character.pullUps * 10}%"></div></div>
        </div>
        <div class="metric-row">
          <div class="metric-label"><span>Strength</span><span>${character.strength}/10</span></div>
          <div class="bar-track"><div class="bar-fill" style="width: ${character.strength * 10}%"></div></div>
        </div>
        <div class="metric-row">
          <div class="metric-label"><span>Discipline</span><span>${character.discipline}/10</span></div>
          <div class="bar-track"><div class="bar-fill" style="width: ${character.discipline * 10}%"></div></div>
        </div>
      </div>
      <div class="metric-list">
        <div class="metric-label"><span>Exercise Evolution</span></div>
        <div class="meta-row">Sets: ${character.currentExercise?.sets || 2}</div>
        <div class="meta-row">Reps: ${character.currentExercise?.reps || 12}</div>
        <div class="meta-row">Movement: ${character.currentExercise?.movement || 'Bodyweight squats'}</div>
        <div class="meta-row">Upper: ${character.currentExercise?.upper || 'Band rows'}</div>
        <div class="meta-row">${character.currentExercise?.note || 'Low sets, high reps.'}</div>
      </div>
      <div class="metric-list">
        <div class="metric-label"><span>Rank Ladder</span></div>
        ${character.ladder.map((step) => `<div class="meta-row">• ${step.rank} · XP ${step.xp}</div>`).join('')}
      </div>
    `;

    progressionGrid.appendChild(card);
  });
}

renderProgression();
