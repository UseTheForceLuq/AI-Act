function getAnswerValue(name) {
  const selected = document.querySelector(`input[name="${name}"]:checked`);
  return selected ? selected.value.endsWith("1") : false; // TAK = *_answer-1
}

function countTrue(values) {
  return values.filter(v => v).length;
}

function analyzeAnswers() {
  const required = {
    1: 5, // cecha 1: wszystkie 5 muszą być TAK
    2: 3, // cecha 2: min. 3 TAK
    3: 2, // cecha 3: min. 2 TAK
    4: 5, // cecha 4: wszystkie 5 TAK
    5: 2  // cecha 5: min. 2 TAK
  };

  const nazwyCech = {
    1: "systemMaszynowy",
    2: "roznorodnaAutonomia",
    3: "zdolnoscAdaptacji",
    4: "wnioskowanie",
    5: "wplywNaSrodowisko"
  };

  const results = {};

  for (let i = 1; i <= 5; i++) {
    const odpowiedzi = [];
    for (let j = 1; j <= 5; j++) {
      const inputName = `question-${i}-${j}-answer`;
      odpowiedzi.push(getAnswerValue(inputName));
    }

    const liczbaTak = countTrue(odpowiedzi);
    results[nazwyCech[i]] = liczbaTak >= required[i];
  }

  return results;
}

function calculateSurveyResult() {
  const answerBox = document.getElementById("answer");

  if (!allQuestionsAnswered()) {
    answerBox.innerHTML = "Proszę odpowiedzieć na wszystkie pytania!";
    answerBox.style.backgroundColor = "#f8d7da";  // jasnoczerwone tło
    answerBox.style.color = "#842029";            // ciemnoczerwony tekst
    answerBox.style.border = "1px solid #f5c2c7"; // czerwone obramowanie
    return;
  }

  // Przywróć standardowy styl, jeśli odpowiedzi są kompletne
  answerBox.style.backgroundColor = "#eef6fb";
  answerBox.style.color = "#333";
  answerBox.style.border = "1px solid #cce0ee";

  displayResults(analyzeAnswers());
}

function allQuestionsAnswered() {
  for (let i = 1; i <= 5; i++) {
    for (let j = 1; j <= 5; j++) {
      const inputName = `question-${i}-${j}-answer`;
      if (!document.querySelector(`input[name="${inputName}"]:checked`)) {
        return false;
      }
    }
  }
  return true;
}

function displayResults(results) {
  const container = document.getElementById("answer");
  container.innerHTML = "";
  container.innerHTML = "<h2>Wyniki analizy:</h2>";
  for (const [cecha, passed] of Object.entries(results)) {
    const status = passed ? "✅ spełniona" : "❌ niespełniona";
    container.innerHTML += `<p><strong>${cecha}</strong>: ${status}</p>`;
  }
}

// Wyczyść zaznaczenia radio buttonów po odświeżeniu strony
window.addEventListener('load', () => {
  const radios = document.querySelectorAll('input[type="radio"]');
  radios.forEach(radio => radio.checked = false);
});