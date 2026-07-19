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
    name: 'Omni-Man',
    age: 34,
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

const hallPrograms = [
  {
    hall: 'Hall 1 - Foundation',
    focus: 'Control and rhythm',
    movements: ['Bodyweight squat', 'Incline push-up'],
    equipment: ['Bench', 'Resistance bands'],
  },
  {
    hall: 'Hall 2 - Iron Frame',
    focus: 'Bracing and pull strength',
    movements: ['Glute bridge', 'Band row'],
    equipment: ['Resistance bands', 'Pull-up bar'],
  },
  {
    hall: 'Hall 3 - Core Pressure',
    focus: 'Stability under tension',
    movements: ['Reverse lunge', 'Plank shoulder tap'],
    equipment: ['Bench', 'Mat'],
  },
  {
    hall: 'Hall 4 - Pressure Ladder',
    focus: 'Explosive control',
    movements: ['Step-up', 'Diamond push-up'],
    equipment: ['Bench', 'Pull-up bar'],
  },
  {
    hall: 'Hall 5 - The Breaker',
    focus: 'Power and density',
    movements: ['Bulgarian split squat', 'Pull-up hold'],
    equipment: ['Bench', 'Pull-up bar'],
  },
  {
    hall: 'Hall 6 - The Vanguard',
    focus: 'Upper-body strength',
    movements: ['Dumbbell overhead press', 'Ranger row'],
    equipment: ['Dumbbells', 'Bench'],
  },
  {
    hall: 'Hall 7 - The Sentinel',
    focus: 'Full-body endurance',
    movements: ['Burpee', 'Weighted vest march'],
    equipment: ['Weighted vest', 'Jump rope'],
  },
];

completeButton.addEventListener('click', () => {
  dayCompleted = true;
  daysCompleted += 1;
  applyProgression();
  missionText.textContent = `Day ${daysCompleted} is complete. The system has advanced.`;
  statusText.textContent = `Status: Day ${daysCompleted} complete`;
  completeButton.textContent = `Complete Day ${daysCompleted + 1}`;
  addChatMessage(`Anissa: Another day locked. You are cutting fat, building muscle, and proving you can endure.`, 'assistant');
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
  if (lower.includes('workout')) return 'Your body is not a museum piece. It is a machine built to burn fat, gain muscle, and adapt. So work.';
  if (lower.includes('today')) return 'Today is recomposition. Fat loss, muscle gain, and discipline. No excuses.';
  if (lower.includes('pull')) return 'Pull-up strength is part of the engine. It builds the upper body while you drive fat loss and muscle growth.';
  if (lower.includes('movement')) return 'Movement is the bridge between fat loss and muscle gain. Control the motion, and the body will follow.';
  if (lower.includes('strength')) return 'Strength is the frame. Muscle is the mass. Fat loss is the cut. Together, they make recomposition.';
  if (lower.includes('hard')) return 'Hard is where fat loss gets real and muscle growth begins to show. That is where you belong.';
  if (lower.includes('pain')) return 'Pain is the cost of adaptation. You endure it, recover, and come back leaner and stronger.';
  if (lower.includes('quit') || lower.includes('stop')) return 'Quitting is for the forgettable. Don\'t be forgettable.';
  return 'Recomposition is simple: burn fat, build muscle, and never drift. That is the standard.';
}

function applyProgression() {
  characters.forEach((character) => {
    const xpGain = character.age <= 8 ? 10 : character.age <= 11 ? 15 : 20;
    character.xp = Math.min(character.xp + xpGain, character.xpCap);

    const movementProgress = Math.min(character.movement + (daysCompleted > 0 ? 1 : 0), 10);
    const strengthProgress = Math.min(character.strength + (daysCompleted > 0 ? 1 : 0), 10);
    const disciplineProgress = Math.min(character.discipline + (daysCompleted > 0 ? 1 : 0), 10);

    character.pullUps = Math.min(character.pullUps + (daysCompleted > 0 ? 1 : 0), 10);
    character.movement = movementProgress;
    character.strength = strengthProgress;
    character.discipline = disciplineProgress;

    character.exercisePhase = Math.min(character.exercisePhase + 1, 4);
    character.currentExercise = getDailyProgram(daysCompleted, character);

    const nextStep = character.ladder.find((step) => step.xp >= character.xp) || character.ladder[character.ladder.length - 1];
    character.rank = nextStep.rank;
  });

  renderProgression();
}

function getDailyProgram(day, character) {
  const hall = hallPrograms[day % hallPrograms.length];
  const lowRepMain = Math.max(4, 6 - Math.floor(character.age / 12));
  const highVolumeSets = Math.min(7, 4 + Math.floor(day / 2));
  const pushUpTaxSets = Math.min(8, 5 + Math.floor(day / 3));
  const pullUpSets = Math.min(6, 3 + Math.floor(day / 2));

  return {
    hall: hall.hall,
    focus: hall.focus,
    warmup: [
      'Tempo march · 2 rounds',
      'Scapular circles · 20 reps',
      'Hip openers · 10 each side',
    ],
    main: hall.movements.map((movement, index) => {
      const reps = index === 0 ? lowRepMain : lowRepMain + 2;
      return `${movement} · ${highVolumeSets} sets x ${reps} reps`;
    }),
    pushUpTax: `${pushUpTaxSets} sets x ${Math.min(20, 10 + character.strength)} reps`,
    pullUpProgression: `${pullUpSets} sets x ${Math.max(2, Math.min(6, character.pullUps + 1))} reps + slow negatives`,
    equipment: hall.equipment,
    cooldown: [
      'Deep breathing · 60 seconds',
      'Chest and hip stretch · 30 seconds each',
      'Full-body reset · 2 minutes',
    ],
    note: 'Low reps, high volume, controlled tempo. This is recomposition: burn fat, build muscle, and force adaptation.',
  };
}

function renderProgression() {
  progressionGrid.innerHTML = '';

  characters.forEach((character) => {
    if (!character.currentExercise) {
      character.currentExercise = getDailyProgram(daysCompleted, character);
    }
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
        <div class="metric-label"><span>Daily Program</span></div>
        <div class="meta-row">Hall: ${character.currentExercise?.hall || 'Hall 1 - Foundation'}</div>
        <div class="meta-row">Focus: ${character.currentExercise?.focus || 'Control and rhythm'}</div>
        <div class="meta-row">Warm-up:</div>
        ${(character.currentExercise?.warmup || []).map((item) => `<div class="meta-row">• ${item}</div>`).join('')}
        <div class="meta-row">Main:</div>
        ${(character.currentExercise?.main || ['Bodyweight squat · 4 sets x 6 reps']).map((item) => `<div class="meta-row">• ${item}</div>`).join('')}
        <div class="meta-row">Push-up Tax: ${character.currentExercise?.pushUpTax || '5 sets x 10 reps'}</div>
        <div class="meta-row">Pull-up Progression: ${character.currentExercise?.pullUpProgression || '3 sets x 3 reps + slow negatives'}</div>
        <div class="meta-row">Equipment: ${character.currentExercise?.equipment?.join(', ') || 'Bench, bands'}</div>
        <div class="meta-row">Cooldown:</div>
        ${(character.currentExercise?.cooldown || []).map((item) => `<div class="meta-row">• ${item}</div>`).join('')}
        <div class="meta-row">${character.currentExercise?.note || 'Low reps, high volume, controlled tempo.'}</div>
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
