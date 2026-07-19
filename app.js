const completeButton = document.getElementById('completeButton');
const missionText = document.getElementById('missionText');
const statusText = document.getElementById('statusText');
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
const hallBlueprints = [
  {
    name: 'Hall I — Titans',
    focus: 'Dominant Hall',
    lanes: [
      { label: 'Lane A', vest: true, movement: 'Goblet Squat', load: '21 lb DB', reps: '3×22' },
      { label: 'Lane B', vest: true, movement: 'Farmer Carry', load: '2×21 lb DBs', reps: '4×60 sec' },
      { label: 'Lane C', vest: false, movement: 'Romanian Deadlift', load: '42 lb Barbell', reps: '3×20' },
    ],
  },
  {
    name: 'Hall II — Warriors',
    focus: 'Pressure and rhythm',
    lanes: [
      { label: 'Lane A', vest: false, movement: 'Shadow Boxing', load: 'Bodyweight', reps: '6×2 min' },
      { label: 'Lane B', vest: false, movement: 'Band Punches', load: '35–85 lb Band', reps: '3×30/arm' },
      { label: 'Lane C', vest: true, movement: 'Jump Rope', load: 'Bodyweight', reps: '4×90 sec' },
    ],
  },
  {
    name: 'Hall III — Tacticians',
    focus: 'Agility and balance',
    lanes: [
      { label: 'Lane A', vest: false, movement: 'Agility Ladder', load: 'Bodyweight', reps: '8×40 sec' },
      { label: 'Lane B', vest: false, movement: 'Single-Leg Balance', load: 'Bodyweight', reps: '3×60 sec/leg' },
      { label: 'Lane C', vest: false, movement: 'Medicine Ball Rotation', load: '10 lb', reps: '3×20' },
    ],
  },
  {
    name: 'Hall IV — Monsters',
    focus: 'Density and power',
    lanes: [
      { label: 'Lane A', vest: true, movement: 'Kettlebell Swings', load: '20 lb', reps: '3×35' },
      { label: 'Lane B', vest: true, movement: 'Walking Lunges', load: 'Bodyweight', reps: '3×24/leg' },
      { label: 'Lane C', vest: true, movement: 'Burpee or Sandbag Thruster', load: '12 Burpees or 18 Thrusters', reps: '3 rounds' },
    ],
  },
  {
    name: 'Hall V — Athletes',
    focus: 'Explosive conditioning',
    lanes: [
      { label: 'Lane A', vest: false, movement: 'Broad Jump', load: 'Bodyweight', reps: '5×4' },
      { label: 'Lane B', vest: false, movement: 'Speed Skaters', load: 'Bodyweight', reps: '4×20/side' },
      { label: 'Lane C', vest: false, movement: 'Battle Rope Slams', load: 'Light Rope', reps: '3×20' },
    ],
  },
  {
    name: 'Hall VI — Architects',
    focus: 'Structure and control',
    lanes: [
      { label: 'Lane A', vest: false, movement: 'Band Pull-Apart', load: 'Band', reps: '4×20' },
      { label: 'Lane B', vest: false, movement: 'Good Morning', load: '42 lb Barbell', reps: '3×18' },
      { label: 'Lane C', vest: false, movement: 'Plank Hold', load: 'Bodyweight', reps: '3×60 sec' },
    ],
  },
  {
    name: 'Hall VII — Survivors',
    focus: 'Endurance under pressure',
    lanes: [
      { label: 'Lane A', vest: true, movement: 'Weighted Vest March', load: 'Vest', reps: '4×8 min' },
      { label: 'Lane B', vest: false, movement: 'Bear Crawl', load: 'Bodyweight', reps: '4×20 sec' },
      { label: 'Lane C', vest: false, movement: 'Dead Bug', load: 'Bodyweight', reps: '3×20/side' },
    ],
  },
];

completeButton.addEventListener('click', () => {
  dayCompleted = true;
  daysCompleted += 1;
  applyProgression();
  missionText.textContent = `Day ${daysCompleted} is complete. The system has advanced.`;
  statusText.textContent = `Status: Day ${daysCompleted} complete`;
  completeButton.textContent = `Complete Day ${daysCompleted + 1}`;
  missionText.textContent = `Day ${daysCompleted} is complete. The chamber has advanced.`;
});

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
  const hallCount = day % 2 === 0 ? 3 : 4;
  const pushUpTaxSets = Math.min(8, 5 + Math.floor(day / 3));
  const pullUpSets = Math.min(6, 3 + Math.floor(day / 2));
  const selectedHalls = [];

  for (let index = 0; index < hallCount; index += 1) {
    const template = hallBlueprints[(day + index) % hallBlueprints.length];
    const scaledLanes = template.lanes.map((lane) => ({
      ...lane,
      load: scaleLoad(lane.load, character.age, character.strength),
      reps: scaleReps(lane.reps, character.age, day),
    }));

    selectedHalls.push({
      name: template.name,
      focus: template.focus,
      lanes: scaledLanes,
    });
  }

  return {
    title: `Day ${day + 1} — ${day % 2 === 0 ? 'Relentless Pressure' : 'Controlled Pressure'}`,
    chamberEntry: [
      'Vest OFF · Jump rope · 4 min',
      'Mobility · 2 rounds',
    ],
    pullUpEvolution: [
      `Dead Hang · ${Math.min(3, 2 + Math.floor(day / 3))}×${Math.max(20, 45 - character.age)} sec`,
      `Scap Pulls · 3×${Math.max(6, 10 + Math.floor(character.strength / 2))}`,
      `Band Assisted Pull-ups · ${pullUpSets}×${Math.max(2, Math.min(6, character.pullUps + 1))}`,
    ],
    halls: selectedHalls,
    taxes: [`💰 ${Math.max(10, pushUpTaxSets * 5)} Push-ups after every working set`],
    cooldown: [
      'Deep breathing · 60 seconds',
      'Chest and hip stretch · 30 seconds each',
      'Full-body reset · 2 minutes',
    ],
    note: '3–4 halls every day. Pressure, density, and discipline. This is recomposition in motion.',
  };
}

function scaleLoad(load, age, strength) {
  if (load.includes('DB')) return load;
  if (load.includes('Band')) return load;
  if (load.includes('Barbell')) return load;
  return load;
}

function scaleReps(reps, age, day) {
  if (!reps.includes('×') && !reps.includes('round')) return reps;
  const [prefix, suffix] = reps.split('×');
  if (prefix && suffix && !Number.isNaN(Number(prefix))) {
    const base = Number(prefix);
    const adjusted = Math.max(2, base + Math.floor(day / 2));
    return `${adjusted}×${suffix}`;
  }
  return reps;
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
      <div class="card-top">
        <div>
          <div class="eyebrow">${character.name}</div>
          <h4>${character.name}</h4>
          <div class="meta-row">Age ${character.age} · ${character.rank}</div>
        </div>
        <div class="program-badge">${character.currentExercise?.title || 'Day 1 — Relentless Pressure'}</div>
      </div>

      <div class="stat-strip">
        <div class="stat-pill">XP ${character.xp}/${character.xpCap}</div>
        <div class="stat-pill">Movement ${character.movement}/10</div>
        <div class="stat-pill">Pull-ups ${character.pullUps}/10</div>
      </div>

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

      <div class="program-block">
        <h5>Chamber Entry</h5>
        <ul>${(character.currentExercise?.chamberEntry || []).map((item) => `<li>${item}</li>`).join('')}</ul>
      </div>

      <div class="program-block">
        <h5>Pull-up Evolution</h5>
        <ul>${(character.currentExercise?.pullUpEvolution || []).map((item) => `<li>${item}</li>`).join('')}</ul>
      </div>

      <div class="program-block">
        <h5>Taxes</h5>
        <ul>${(character.currentExercise?.taxes || []).map((item) => `<li>${item}</li>`).join('')}</ul>
      </div>

      ${(character.currentExercise?.halls || []).map((hall) => `
        <div class="program-block hall-entry">
          <h5>${hall.name}</h5>
          <div class="meta-row">Focus: ${hall.focus}</div>
          <ul>${hall.lanes.map((lane) => `<li>${lane.label}: ${lane.movement} · ${lane.load} · ${lane.reps}</li>`).join('')}</ul>
        </div>
      `).join('')}

      <div class="program-block">
        <h5>Cooldown</h5>
        <ul>${(character.currentExercise?.cooldown || []).map((item) => `<li>${item}</li>`).join('')}</ul>
      </div>

      <div class="meta-row">${character.currentExercise?.note || '3–4 halls every day. Pressure, density, and discipline.'}</div>
    `;

    progressionGrid.appendChild(card);
  });
}

renderProgression();
