function getAnswerValue(name) {
  const selected = document.querySelector(`input[name="${name}"]:checked`);
  return selected ? selected.value === "yes" : false; // TAK = true
}

function countTrue(values) {
  return values.filter(v => v).length;
}

function analyzeAnswers() {
  const required = { 1: 5, 2: 3, 3: 2, 4: 5, 5: 2 };
  const nazwyCech = {
    1: "System Maszynowy",
    2: "Różnorodna Autonomia",
    3: "Zdolność Adaptacji",
    4: "Wnioskowanie",
    5: "Wpływ na środowisko"
  };
  const results = {};

  for (let i = 1; i <= 5; i++) {
    const odpowiedzi = [];
    for (let j = 1; j <= 5; j++) {
      const inputName = `question-${i}-${j}-answer`;
      odpowiedzi.push(getAnswerValue(inputName));
    }
    results[nazwyCech[i]] = countTrue(odpowiedzi) >= required[i];
  }
  return results;
}

function displayResults(results) {
  const container = document.getElementById("answer");
  container.innerHTML = "<h2>Wyniki analizy:</h2>";
  for (const [cecha, passed] of Object.entries(results)) {
    const status = passed ? "✅ TAK" : "❌ NIE";
    container.innerHTML += `<p><strong>${cecha}</strong>: ${status}</p>`;
  }
}

function allQuestionsAnswered() {
  for (let i = 1; i <= 5; i++) {
    for (let j = 1; j <= 5; j++) {
      const inputName = `question-${i}-${j}-answer`;
      if (!document.querySelector(`input[name="${inputName}"]:checked`)) return false;
    }
  }
  return true;
}

// Funkcja wywoływana tylko przy kliknięciu przycisku "Zatwierdź ankietę"
function calculateSurveyResult() {
  const answerBox = document.getElementById("answer");

  if (!allQuestionsAnswered()) {
    answerBox.innerHTML = "Proszę odpowiedzieć na wszystkie pytania!";
    answerBox.style.backgroundColor = "#f8d7da";
    answerBox.style.color = "#842029";
    answerBox.style.border = "1px solid #f5c2c7";
    answerBox.scrollIntoView({ behavior: "smooth", block: "center" });
    return;
  }

  answerBox.style.backgroundColor = "#eef6fb";
  answerBox.style.color = "#333";
  answerBox.style.border = "1px solid #cce0ee";

  displayResults(analyzeAnswers());
  answerBox.scrollIntoView({ behavior: "smooth", block: "center" });
}

// Inicjalizacja nasłuchu
window.addEventListener('load', () => {
  // Wyczyszczenie zaznaczeń po odświeżeniu
  document.querySelectorAll('input[type="radio"]').forEach(radio => radio.checked = false);
  document.querySelectorAll('input[type="text"]').forEach(input => input.value = '');
  document.querySelectorAll('textarea').forEach(area => area.value = '');

  // Nasłuch dla każdej zmiany odpowiedzi
  document.querySelectorAll('input[type="radio"]').forEach(radio => {
    radio.addEventListener('change', () => {
      for (let q = 1; q <= 5; q++) updateSectionStatus(q);
    });
  });
});

// Aktualizacja statusu sekcji przy nagłówku
function updateSectionStatus(sectionNumber) {
  const sectionWrapper = document.getElementById(`question-${sectionNumber}-wrapper`);
  const sectionHeader = sectionWrapper.querySelector('.question-header');
  if (!sectionHeader) return;

  // wszystkie podcechy w danej sekcji
  const subQuestions = Array.from(sectionWrapper.querySelectorAll(`[id^="question-${sectionNumber}-"][id$="-wrapper"]`))
                            .filter(div => div.id !== `question-${sectionNumber}-wrapper`);

  let allAnswered = true;
  const answers = [];

  subQuestions.forEach(subQ => {
    const selected = subQ.querySelector('input[type="radio"]:checked');
    if (!selected) {
      allAnswered = false;
    } else {
      answers.push(selected.value === "yes"); // TAK = true
    }
  });

  const requiredCounts = {1:5, 2:3, 3:2, 4:5, 5:2};
  const passed = allAnswered ? (answers.filter(v => v).length >= requiredCounts[sectionNumber]) : false;

  // Szukamy lub tworzymy span statusu przy h1
  let statusEl = sectionHeader.querySelector('h1 > .section-status');
  if (!statusEl) {
    statusEl = document.createElement('span');
    statusEl.className = 'section-status';
    statusEl.style.marginLeft = '15px';
    statusEl.style.fontWeight = '600';
    sectionHeader.querySelector('h1').appendChild(statusEl); // dodajemy bezpośrednio przy h1
  }

  if (allAnswered) {
    statusEl.textContent = passed ? "✅ TAK" : "❌ NIE";
    statusEl.style.color = passed ? 'green' : 'red';
  } else {
    statusEl.textContent = ""; // brak statusu jeśli nie wszystkie odpowiedzi zaznaczone
  }

  // Aktualizacja końcowego wyniku tylko jeśli sekcja #answer jest już widoczna
  const answerBox = document.getElementById("answer");
  const answerVisible = answerBox.innerHTML.trim() !== ""; // sprawdzamy czy coś jest już w #answer
  if (answerVisible) {
    if (allQuestionsAnswered()) {
      answerBox.style.backgroundColor = "#eef6fb";
      answerBox.style.color = "#333";
      answerBox.style.border = "1px solid #cce0ee";
      displayResults(analyzeAnswers());
    } else {
      answerBox.innerHTML = "Proszę odpowiedzieć na wszystkie pytania!";
      answerBox.style.backgroundColor = "#f8d7da";
      answerBox.style.color = "#842029";
      answerBox.style.border = "1px solid #f5c2c7";
    }
  }
}

// Funkcja do mockowego wyszukiwania systemu
function searchSystem() {
    const systemId = document.getElementById("system-id").value.trim();
    const systemNameInput = document.getElementById("system-idd");

    if (systemId) {
        // Możesz tu zamockować różne nazwy systemów dla przykładowych ID
        const mockDatabase = {
            "1001": "System bankowości mobilnej",
            "1002": "System scoringu kredytowego",
            "1003": "System detekcji oszustw"
        };
        systemNameInput.value = mockDatabase[systemId] || "System automatycznej wyceny nieruchomości";
    } else {
        systemNameInput.value = "";
    }
}

// Nasłuch na przycisk
document.addEventListener('DOMContentLoaded', () => {
    const searchBtn = document.getElementById("search-system-btn");
    if (searchBtn) {
        searchBtn.addEventListener('click', searchSystem);
    }
});


// Funkcja zaznaczająca losowe odpowiedzi
function fillRandomAnswers() {
  for (let i = 1; i <= 5; i++) { // pytania
    for (let j = 1; j <= 5; j++) { // podcechy
      const choice = Math.random() < 0.5 ? "yes" : "no";
      const input = document.querySelector(`input[name="question-${i}-${j}-answer"][value="${choice}"]`);
      if (input) input.checked = true;
    }
    updateSectionStatus(i); // od razu aktualizuj status sekcji
  }
}

// Funkcja zaznaczająca wszystkie TAK
function fillAllYes() {
  for (let i = 1; i <= 5; i++) {
    for (let j = 1; j <= 5; j++) {
      const input = document.querySelector(`input[name="question-${i}-${j}-answer"][value="yes"]`);
      if (input) input.checked = true;
    }
    updateSectionStatus(i);
  }
}

// Funkcja zaznaczająca wszystkie NIE
function fillAllNo() {
  for (let i = 1; i <= 5; i++) {
    for (let j = 1; j <= 5; j++) {
      const input = document.querySelector(`input[name="question-${i}-${j}-answer"][value="no"]`);
      if (input) input.checked = true;
    }
    updateSectionStatus(i);
  }
}
