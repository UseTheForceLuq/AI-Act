# AI-Act

## Co robi skrypt js:

### getAnswerValue(name)
Zwraca true, jeśli wybrana odpowiedź to „TAK” (tj. input kończy się na -1), false w przeciwnym razie.
	
### countTrue(values)
Liczy, ile odpowiedzi to true (czyli ile odpowiedzi „TAK”).

### analyzeAnswers()
Dla każdej z 5 cech (1–5) zbiera 5 odpowiedzi (question-1-1-answer, … question-5-5-answer).
Dla każdej cechy sprawdza, czy spełnia wymogi: np. cecha 1 wymaga 5x „TAK”, cecha 3 tylko 2x „TAK”.
Wynik jest zapisywany jako { cecha: true/false }, np. { systemMaszynowy: true, wnioskowanie: false, ... }.

### calculateSurveyResult()
Wyświetla wyniki w elemencie o ID answer w formacie JSON.