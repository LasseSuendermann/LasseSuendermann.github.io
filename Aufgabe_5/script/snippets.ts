/** 
 * Folgende Code-Fragmente untersützen Sie bei der Bearbeitung der Aufgabe
 * 
 * Diese Fragmente werden wir in den kommenden Stunden noch vertiefen, 
 * damit Sie aber etwas "greifbares" schaffen können, sollten Sie diese Fragmente jetzt schon einsetzen
*/

/**
 * A)
 * Den Inhalt eines DOM-Elements manipulieren / einen Wert in ein Selektiertes DOM-Element schreiben
 * Zwei Punkte müssten Sie anpassen: 
 *   1. den Selektor (hier am Beispiel mit einem Klassenselektor)
 *   2. den Wert (hier eine Zeichenkette, kann aber natürlich auch eine Variante/mehrere Variablen sein)
 */
document.querySelector('.exampleClassOfElement').innerHTML = "Dieser Text wurde zur Laufzeit in das Element geschrieben";

/**
 * B)
 * Funktion
 * Eine Funktion ist ein Anweisungsblock, der bei Aufruf dieser Funktion abgearbeitet wird.
 * Bspw. wenn ein Button geklick wird, dann sollen die Anweisungen dieser Funktion aufgerufen werden.
 */

function exampleFunctionName() {
    // hier werden die Anweisungen, Zeile für Zeile, aufgeführt
    // Beispiel (eine Variable wird deklariert. Der Inhalt der Variable wird als Prompt / Alert ausgegeben):
    var test:number = 1;
    alert(test);
}

/**
 * C)
 * Button klicken
 * 
 * Das Event-Handling in TypeScript ist ein eigenes, großes Thema. Für den Anfang, damit Ihre kleine Anwendung
 * etwas an "Leben" gewinnt können Sie folgendermaßen eine Funktion / einen Anweisungsblock aufrufen:
 * In HTML ergänzen Sie an ein Element das Attribut "onclick". Als Wert wird der Funktionsname mit Klammer auf+zu 
 * angegeben. Bspw. so:
 * <button onclick="exampleFunctionName()">Mein Button</button>
 * 
 * Das "onclick" Attribut kann an sämtlichen HTML-Tags ergänzt werden, bspw.
 * <img src="meinBild.jpg" onclick="exampleFunctionName()">
 */
