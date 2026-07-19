const completeButton = document.getElementById('completeButton');
const missionText = document.getElementById('missionText');
const statusText = document.getElementById('statusText');
const progressionGrid = document.getElementById('progressionGrid');
const daySummary = document.getElementById('daySummary');
const chamberStats = document.getElementById('chamberStats');

const characters = [
  {
    name: 'Invincible',
    age: 10,
    rank: 'Novice Scout',
    xp: 0,
    xpCap: 140,
    movement: 2,
    pullUps: 0,
    strength: 2,
    discipline: 3,
    exercisePhase: 0,
    completedMovementIds: new Set(),
    expandedMovementIds: new Set(),
    ladder: [
      { rank: 'Novice Scout', xp: 0, movement: 2, strength: 2, discipline: 3 },
      { rank: 'Rising Scout', xp: 40, movement: 3, strength: 3, discipline: 4 },
      { rank: 'Trailblazer', xp: 80, movement: 4, strength: 4, discipline: 5 },
      { rank: 'Guardian Candidate', xp: 140, movement: 5, strength: 5, discipline: 6 },
    ],
  },
  {
    name: 'Kid-Omni',
    age: 7,
    rank: 'Junior Initiate',
    xp: 0,
    xpCap: 100,
    movement: 1,
    pullUps: 0,
    strength: 1,
    discipline: 2,
    exercisePhase: 0,
    completedMovementIds: new Set(),
    expandedMovementIds: new Set(),
    ladder: [
      { rank: 'Junior Initiate', xp: 0, movement: 1, strength: 1, discipline: 2 },
      { rank: 'Young Builder', xp: 25, movement: 2, strength: 2, discipline: 3 },
      { rank: 'Rising Spark', xp: 50, movement: 3, strength: 3, discipline: 4 },
      { rank: 'Steady Flame', xp: 100, movement: 4, strength: 4, discipline: 5 },
    ],
  },
  {
    name: 'Omni-Man',
    age: 34,
    rank: 'Apprentice Guardian',
    xp: 0,
    xpCap: 200,
    movement: 3,
    pullUps: 0,
    strength: 3,
    discipline: 4,
    exercisePhase: 0,
    completedMovementIds: new Set(),
    expandedMovementIds: new Set(),
    ladder: [
      { rank: 'Apprentice Guardian', xp: 0, movement: 3, strength: 3, discipline: 4 },
      { rank: 'Rising Defender', xp: 60, movement: 4, strength: 4, discipline: 5 },
      { rank: 'Core Protector', xp: 120, movement: 5, strength: 5, discipline: 6 },
      { rank: 'Hall Sentinel', xp: 200, movement: 6, strength: 6, discipline: 7 },
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

  document.body.classList.add('day-transition');
  setTimeout(() => document.body.classList.remove('day-transition'), 500);

  characters.forEach((character) => {
    const xpGain = character.age <= 8 ? 10 : character.age <= 11 ? 15 : 20;
    character.xp = Math.min(character.xp + xpGain, character.xpCap);
    character.movement = Math.min(character.movement + 1, 10);
    character.strength = Math.min(character.strength + 1, 10);
    character.discipline = Math.min(character.discipline + 1, 10);
    character.pullUps = Math.min(character.pullUps + (daysCompleted % 2 === 0 ? 1 : 0), 10);
    character.exercisePhase = Math.min(character.exercisePhase + 1, 4);
    character.completedMovementIds = new Set();
    character.expandedMovementIds = new Set();
    character.currentExercise = getDailyProgram(daysCompleted, character);

    const nextStep = character.ladder.find((step) => step.xp >= character.xp) || character.ladder[character.ladder.length - 1];
    character.rank = nextStep.rank;
  });

  renderProgression();
  updateHeroState();
});

function updateHeroState() {
  const totalMovements = characters.reduce((sum, character) => sum + (character.currentExercise?.halls?.reduce((hallSum, hall) => hallSum + hall.movements.length, 0) || 0), 0);
  const completedMovements = characters.reduce((sum, character) => sum + character.completedMovementIds.size, 0);
  const dayLabel = daysCompleted + 1;

  missionText.textContent = `Day ${dayLabel} — ${daysCompleted % 2 === 0 ? 'Relentless Pressure' : 'Controlled Pressure'}`;
  statusText.textContent = `Status: ${completedMovements}/${totalMovements} chamber movements completed`;
  daySummary.textContent = 'Tap any movement to learn more and mark it complete. Each day now unlocks 14 chamber movements across all 7 halls.';
  completeButton.textContent = `Advance to Day ${dayLabel + 1}`;

  chamberStats.innerHTML = `
    <div class="hero-stat-block">
      <span>Day</span>
      <strong>${dayLabel}</strong>
    </div>
    <div class="hero-stat-block">
      <span>Completed</span>
      <strong>${completedMovements}</strong>
    </div>
    <div class="hero-stat-block">
      <span>Halls</span>
      <strong>7</strong>
    </div>
    <div class="hero-stat-block">
      <span>Mode</span>
      <strong>${daysCompleted % 2 === 0 ? 'Pressure' : 'Control'}</strong>
    </div>
  `;
}

function applyProgression() {
  characters.forEach((character) => {
    if (!character.currentExercise) {
      character.currentExercise = getDailyProgram(daysCompleted, character);
    }
  });

  renderProgression();
  updateHeroState();
}

function getDailyProgram(dayIndex, character) {
  const dayNumber = dayIndex + 1;
  const selectedHalls = hallBlueprints.map((template, hallIndex) => {
    const primaryLane = template.lanes[0];
    const secondaryLane = template.lanes[(dayIndex + hallIndex + 1) % template.lanes.length];

    return {
      name: template.name,
      focus: template.focus,
      movements: [
        buildMovement(template, primaryLane, hallIndex, dayNumber, character, 'Primary'),
        buildMovement(template, secondaryLane, hallIndex, dayNumber, character, 'Support'),
      ],
    };
  });

  return {
    title: `Day ${dayNumber} — ${dayIndex % 2 === 0 ? 'Relentless Pressure' : 'Controlled Pressure'}`,
    chamberEntry: [
      'Vest OFF · Jump rope · 4 min',
      'Mobility · 2 rounds',
    ],
    pullUpEvolution: [
      `Dead Hang · ${Math.min(3, 2 + Math.floor(dayNumber / 3))}×${Math.max(20, 45 - character.age)} sec`,
      `Scap Pulls · 3×${Math.max(6, 10 + Math.floor(character.strength / 2))}`,
      `Band Assisted Pull-ups · ${Math.min(6, 3 + Math.floor(dayNumber / 2))}×${Math.max(2, Math.min(6, character.pullUps + 1))}`,
    ],
    halls: selectedHalls,
    taxes: [`💰 ${Math.max(10, 5 + dayNumber * 4)} Push-ups after every working set`],
    cooldown: [
      'Deep breathing · 60 seconds',
      'Chest and hip stretch · 30 seconds each',
      'Full-body reset · 2 minutes',
    ],
    note: 'Every day now includes two movement slots from all 7 halls. Pressure, density, and discipline. This is recomposition in motion.',
  };
}

function buildMovement(template, lane, hallIndex, dayNumber, character, role) {
  const load = scaleLoad(lane.load, character.age, character.strength);
  const reps = scaleReps(lane.reps, character.age, dayNumber);
  const slug = `${character.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${dayNumber}-${hallIndex}-${role.toLowerCase()}`;
  const roleLabel = role === 'Primary' ? 'Opening Lane' : 'Finisher Lane';
  const detail = `${template.focus.toLowerCase()}. ${lane.vest ? 'Drive the set with weighted pressure.' : 'Move with control and tempo.'} ${role === 'Primary' ? 'Lead the movement with intent and a clean setup.' : 'Finish the hall with tension and balance.'}`;

  return {
    id: slug,
    label: roleLabel,
    movement: lane.movement,
    load,
    reps,
    detail,
  };
}

function scaleLoad(load) {
  return load;
}

function scaleReps(reps, age, dayNumber) {
  if (!reps.includes('×') && !reps.includes('round')) return reps;
  const [prefix, suffix] = reps.split('×');
  if (prefix && suffix && !Number.isNaN(Number(prefix))) {
    const base = Number(prefix);
    const adjusted = Math.max(2, base + Math.floor(dayNumber / 2));
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

    const totalMovements = character.currentExercise.halls.reduce((sum, hall) => sum + hall.movements.length, 0);
    const completedCount = character.completedMovementIds.size;
    const completionPercent = Math.round((completedCount / totalMovements) * 100);
    const card = document.createElement('article');
    card.className = 'progress-card';
    card.dataset.characterName = character.name;

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
        <div class="stat-pill">Discipline ${character.discipline}/10</div>
      </div>

      <div class="completion-box">
        <div class="metric-label"><span>Daily chamber progress</span><span>${completedCount}/${totalMovements}</span></div>
        <div class="bar-track"><div class="bar-fill" style="width: ${completionPercent}%"></div></div>
      </div>

      <div class="program-block">
        <h5>Chamber Entry</h5>
        <ul>${(character.currentExercise?.chamberEntry || []).map((item) => `<li>${item}</li>`).join('')}</ul>
      </div>

      <div class="program-block">
        <h5>Mission Focus</h5>
        <div class="meta-row">${character.currentExercise?.note || 'Every day includes two movement slots from all 7 halls.'}</div>
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
          <div class="hall-header">
            <h5>${hall.name}</h5>
            <span class="pill">${hall.focus}</span>
          </div>
          <div class="movement-list">
            ${hall.movements.map((movement) => {
              const isComplete = character.completedMovementIds.has(movement.id);
              const isExpanded = character.expandedMovementIds.has(movement.id);
              return `
                <div class="movement-card ${isComplete ? 'is-complete' : ''}">
                  <div class="movement-row">
                    <button class="movement-toggle" data-movement-id="${movement.id}" type="button">
                      <span class="movement-main">${movement.label}: ${movement.movement}</span>
                      <span class="movement-meta">${movement.load} · ${movement.reps}</span>
                    </button>
                    <button class="detail-toggle secondary-button" data-detail-id="${movement.id}" type="button">Learn more</button>
                  </div>
                  <div class="movement-detail ${isExpanded ? 'is-open' : ''}">
                    <p>${movement.detail}</p>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>
      `).join('')}

      <div class="program-block">
        <h5>Cooldown</h5>
        <ul>${(character.currentExercise?.cooldown || []).map((item) => `<li>${item}</li>`).join('')}</ul>
      </div>

      <div class="meta-row">${character.currentExercise?.note || 'Every day includes two movement slots from all 7 halls.'}</div>
    `;

    card.addEventListener('click', (event) => {
      const movementToggle = event.target.closest('.movement-toggle');
      if (movementToggle) {
        toggleMovementCompletion(character.name, movementToggle.dataset.movementId);
        return;
      }

      const detailToggle = event.target.closest('.detail-toggle');
      if (detailToggle) {
        toggleMovementDetail(character.name, detailToggle.dataset.detailId);
      }
    });

    progressionGrid.appendChild(card);
  });
}

function toggleMovementCompletion(characterName, movementId) {
  const character = characters.find((entry) => entry.name === characterName);
  if (!character) return;

  if (character.completedMovementIds.has(movementId)) {
    character.completedMovementIds.delete(movementId);
    character.xp = Math.max(0, character.xp - 4);
    character.discipline = Math.max(1, character.discipline - 1);
  } else {
    character.completedMovementIds.add(movementId);
    character.xp = Math.min(character.xpCap, character.xp + 6);
    character.movement = Math.min(10, character.movement + 1);
    character.discipline = Math.min(10, character.discipline + 1);
  }

  renderProgression();
  updateHeroState();
}

function toggleMovementDetail(characterName, movementId) {
  const character = characters.find((entry) => entry.name === characterName);
  if (!character) return;

  if (character.expandedMovementIds.has(movementId)) {
    character.expandedMovementIds.delete(movementId);
  } else {
    character.expandedMovementIds.add(movementId);
  }

  renderProgression();
}

applyProgression();
