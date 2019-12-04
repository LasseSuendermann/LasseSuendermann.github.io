# Aufgabe 7
## Drum Pad

Mit dem Grundlagenwissen zu Events, Funktionen, Operatoren, der DOM-Manipulation und Arrays sind Sie in der Lage ein interaktives Drum Pad zu entwickeln. Ein Drum Pad ist ein elektronisches Schlaginstrument, das neben einem Schlagzeug-Sound auch sämtliche andere Klänge (Samples) anspielen kann.

Die Aufgabe besteht aus zwei Teilanforderungen:

### Aufgabe 7.1 - Drum Pad

Ein Drum Pad mit neun Pads/Buttons soll Klänge/Samples abspielen. Wenn der Nutzer auf ein Pad tippt/klick, dann soll das entsprechende Sample abgespielt werden.

Anforderungen:

1. Das Abspielen der Sound-Dateien wird in TypeScript realisiert. Verwenden Sie __kein__ HTML-Audio-Tag. Folgende Anweisung wird Ihnen hilfreich sein:
```typescript
var sound:HTMLAudioElement = new Audio('sample.mp3');
sound.play();
```

2. Das Abspielen aller Sound-Dateien soll über eine zentrale Funktion gesteuert werden. Diese Funktion wird den Namen **playSample** bekommen. Alle Abspiel-Aufrufe werden über diese Funktion geführt, d.h. Sie sollten nicht für jeden einzelnen Button die Anweisungen zum Abspielen einer Sound-Datei mehrfach progammmieren. Stattdessen wird jeder Button bzw. jeder Funtkionsaufruf eines Event-Listeners diese zentrale Funktion triggern/aufrufen (Stichwort: Funktionsparameter).

3. Zeichnen Sie zunächst ein Flow-Chart, dass den Prozess der Anwendung abbildet. Ausgangspunkt ist die Eingabe des Nutzers.

4. Die Darstellung des Drum Pads gemäß Designvorlage. Ein Button hat die Größe 150 x 150px. Das Drum Pad wird horizontal zentriert im Browser-Viewport dargestellt. Farbdefinitionen bitte als Hex-Wert setzen.

### Aufgabe 7.2 - Drum Machine

Mit dem zweiten Teil der Aufgabe soll das Abspielen eines fest definierten Beats realisiert werden.

1. Bei Klick auf den Play Button soll ein Beat (bestehend aus Kick, Snare und HiHat) abgespielt werden.

2. Eine Stop- / Pause- / Replay-Funktion ist erst einmal nicht vorgesehen.

3. Der Beat bzw. die Reihenfolge der abzuspielenden Samples sollte in einem Array gespeichert werden.

4. Hilftestellung: damit die Drum Machine ein Sample nach dem anderen abspielt, benötigen Sie ein Konstrukt, dass kontinuierlich innerhalb einer definierten Zeitspanne eine Anweisung ausführt. Das kontinuierliche Ausführen einer Anweisung kann mit folgendem primitiven Fragment realisiert werden:
```typescript
setInterval(function() {
    // Anweisungen
}, 500);
```
Mehr dazu hier https://www.w3schools.com/jsref/met_win_setinterval.asp

Bearbeitung wie gehabt: als Unterordner in Ihrem Git Repository (/Aufgabe_7); das fertige Arbeitspaket wieder auf Github pushen und auf Ihrem Kursseiten-Steckbrief verlinken.


## Abgabe 7 bis Mittwoch, 27.11.2019 18:00 Uhr


Samples von freesound.org, Creative Commons 0 License