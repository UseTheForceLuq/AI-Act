// Pobranie wartości odpowiedzi TAK/NIE
function getAnswerValue(name) {
  const selected = document.querySelector(`input[name="${name}"]:checked`);
  return selected ? selected.value === "yes" : false;
}

// Liczenie wartości true
function countTrue(values) {
  return values.filter(v => v).length;
}

// Analiza odpowiedzi
function analyzeAnswers() {
  const required = { 1: 1, 2: 1, 3: 1, 4: 1, 5: 1, 6: 1, 7: 1, 8: 1 };
  const nazwyCech = {
  1: "<strong>Techniki podprogowe, manipulacyjne lub wprowadzajace w błąd (art.5 ust.1 lit.a. AI Act):</strong> Brak lub niskie ryzyko zawalifikowania systemu jako wykorzystującego praktyki zakazane / Istnieje istotne ryzyko wykorzystania praktyk zakazanych w systemie. Odpowiedz na dodatkowe pytania.",
  2: "<strong>Wykorzystanie słabości osób (art.5 ust.1 lit.b. AI Act):</strong> Brak lub niskie ryzyko zawalifikowania systemu jako wykorzystującego praktyki zakazane / Istnieje istotne ryzyko wykorzystania praktyk zakazanych w systemie. Odpowiedz na dodatkowe pytania.",
  3: "<strong>Scoring społeczny (art.5 ust.1 lit.c. AI Act):</strong> Brak lub niskie ryzyko zawalifikowania systemu jako wykorzystującego praktyki zakazane / Istnieje istotne ryzyko wykorzystania praktyk zakazanych w systemie. Odpowiedz na dodatkowe pytania.",
  4: "<strong>Wyciąganie wniosków na temat emocji osoby fizycznej (art.5 ust.1 lit.f. AI Act):</strong> Brak lub niskie ryzyko zawalifikowania systemu jako wykorzystującego praktyki zakazane / Istnieje istotne ryzyko wykorzystania praktyk zakazanych w systemie. Odpowiedz na dodatkowe pytania.",
  5: "<strong>Kategoryzacja biometryczna (art.5 ust.1 lit.g. AI Act):</strong> Brak lub niskie ryzyko zawalifikowania systemu jako wykorzystującego praktyki zakazane / Istnieje istotne ryzyko wykorzystania praktyk zakazanych w systemie. Odpowiedz na dodatkowe pytania.",
  6: "<strong>Ocena ryzyka przestępstwa na podstawie profilowania (art.5 ust.1 lit.d. AI Act):</strong> Brak lub niskie ryzyko zawalifikowania systemu jako wykorzystującego praktyki zakazane / Istnieje istotne ryzyko wykorzystania praktyk zakazanych w systemie. Odpowiedz na dodatkowe pytania.",
  7: "<strong>Rozpoznawanie twarzy (art.5 ust.1 lit.e. AI Act):</strong> Brak lub niskie ryzyko zawalifikowania systemu jako wykorzystującego praktyki zakazane / Istnieje istotne ryzyko wykorzystania praktyk zakazanych w systemie. Odpowiedz na dodatkowe pytania.",
  8: "<strong>Zdalna identyfikacja biometryczna (art.5 ust.1 lit.h. AI Act):</strong> Brak lub niskie ryzyko zawalifikowania systemu jako wykorzystującego praktyki zakazane / Istnieje istotne ryzyko wykorzystania praktyk zakazanych w systemie. Odpowiedz na dodatkowe pytania."
};
  const results = {};

  for (let i = 1; i <= 8; i++) {
    // Pobierz wszystkie radio inputs dla danego pytania, niezależnie od liczby podpytan
    const inputs = document.querySelectorAll(`[name^="question-${i}-"][name$="-answer"]`);
    const odpowiedzi = Array.from(inputs).map(input => getAnswerValue(input.name));
    results[nazwyCech[i]] = countTrue(odpowiedzi) >= required[i];
  }

  return results;
}

// Wyświetlanie wyników analizy odpowiedzi
function displayResults(results) {
  const container = document.getElementById("answer");
  container.innerHTML = "<h2>Podsumowanie:</h2>";
  for (const [cecha, passed] of Object.entries(results)) {
    if (passed) {
        container.innerHTML += `<p>${cecha}</p>`;
    }
  }
}

// Sprawdzenie czy wszystkie pytania zostały odpowiedziane
function allQuestionsAnswered() {
  for (let i = 1; i <= 8; i++) {
    const inputs = document.querySelectorAll(`[name^="question-${i}-"][name$="-answer"]`);
    for (const input of inputs) {
      if (!document.querySelector(`input[name="${input.name}"]:checked`)) {
        return false;
      }
    }
  }
  return true;
}

// Funkcja wywoływana przy zatwierdzeniu ankiety
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

  // Wyświetlenie podsumowania odpowiedzi
  const results = analyzeAnswers();
  displayResults(results);
  const allYes = Object.values(results).every(v => v);

  const actionDiv = document.createElement("div");
  actionDiv.style.marginTop = "20px";

//  if (allYes) {
//    const text = document.createElement("p");
//    text.innerHTML = "<strong><span style='font-size:22px;'>System jest uznany za system sztucznej inteligencji w rozumieniu AI Act. Przejdź do weryfikacji czy system wykorzystuje praktyki zakazane.</span></strong>";
//    actionDiv.appendChild(text);
//
//    const verifyBtn = document.createElement("button");
//    verifyBtn.textContent = "Weryfikacja wykorzystania praktyk zakazanych";
//    verifyBtn.className = "submit-button";
//    verifyBtn.addEventListener("click", () => {
//        window.location.href = "banned_practices_survey.html"; // pokaż następną ankietę
//    });
//    actionDiv.appendChild(verifyBtn);
//
//  } else {
//    const text = document.createElement("p");
//    text.innerHTML = "<strong><span style='font-size:22px;'>System nie jest uznany za system sztucznej inteligencji w rozumieniu AI Act.</span></strong>";
//    actionDiv.appendChild(text);
//
//    const saveBtn = document.createElement("button");
//    saveBtn.textContent = "Zapisz ankietę";
//    saveBtn.className = "submit-button";
//    saveBtn.addEventListener("click", () => {
//        window.location.href = "success.html"; // pokaż ekran sukcesu
//    });
//    actionDiv.appendChild(saveBtn);
//  }

  // Dodanie akcji poniżej podsumowania
  answerBox.appendChild(actionDiv);
  answerBox.scrollIntoView({ behavior: "smooth", block: "center" });
}

// Obsługa pojawiania się inputów do uzasadnienia przy TAK/NIE
function toggleAnswerInputs() {
  document.querySelectorAll('.answer-option input[type="radio"]').forEach(radio => {
    const inputField = radio.closest('label').querySelector('.answer-input');
    if (inputField) inputField.style.display = radio.checked ? 'inline-block' : 'none';
    radio.addEventListener('change', () => {
      const allSiblings = document.getElementsByName(radio.name);
      allSiblings.forEach(r => {
        const siblingInput = r.closest('label').querySelector('.answer-input');
        if (siblingInput) siblingInput.style.display = r.checked ? 'inline-block' : 'none';
      });
    });
  });
}

// Aktualizacja statusu sekcji przy nagłówku
function updateSectionStatus(sectionNumber) {
  const sectionWrapper = document.getElementById(`question-${sectionNumber}-wrapper`);
  const sectionHeader = sectionWrapper.querySelector('.question-header');
  if (!sectionHeader) return;

  const subQuestions = Array.from(sectionWrapper.querySelectorAll(`[id^="question-${sectionNumber}-"][id$="-wrapper"]`))
                            .filter(div => div.id !== `question-${sectionNumber}-wrapper`);

  let allAnswered = true;
  const answers = [];

  subQuestions.forEach(subQ => {
    const selected = subQ.querySelector('input[type="radio"]:checked');
    if (!selected) allAnswered = false;
    else answers.push(selected.value === "yes");
  });

  const requiredCounts  = { 1: 1, 2: 1, 3: 1, 4: 1, 5: 1, 6: 1, 7: 1, 8: 1 };
  const passed = allAnswered ? (answers.filter(v => v).length >= requiredCounts[sectionNumber]) : false;

  let statusEl = sectionHeader.querySelector('h1 > .section-status');
  if (!statusEl) {
    statusEl = document.createElement('span');
    statusEl.className = 'section-status';
    statusEl.style.marginLeft = '15px';
    statusEl.style.fontWeight = '600';
    sectionHeader.querySelector('h1').appendChild(statusEl);
  }

  if (allAnswered) {
    statusEl.textContent = passed ? "✅ TAK" : "❌ NIE";
    statusEl.style.color = passed ? 'green' : 'red';
  } else {
    statusEl.textContent = "";
  }

  const answerBox = document.getElementById("answer");
  const answerVisible = answerBox.innerHTML.trim() !== "";
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

// Inicjalizacja po załadowaniu strony
window.addEventListener('load', () => {
  document.querySelectorAll('input[type="radio"]').forEach(radio => radio.checked = false);
  document.querySelectorAll('input[type="text"]').forEach(input => input.value = '');
  document.querySelectorAll('textarea').forEach(area => area.value = '');

  toggleAnswerInputs();

  document.querySelectorAll('input[type="radio"]').forEach(radio => {
    radio.addEventListener('change', () => {
      for (let q = 1; q <= 8; q++) updateSectionStatus(q);
    });
  });

  const searchBtn = document.getElementById("search-system-btn");
  if (searchBtn) searchBtn.addEventListener('click', searchSystem);
});
