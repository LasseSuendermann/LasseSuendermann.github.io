# Aufgabe 8
## Drum Pad II

Voraussetzung für diese Aufgabe ist das Grundgerüst des Drum Pads aus Aufgabe 7. Für Aufgabe 8 also bitte erst einmal eine Kopie von Aufgabe 7 anlegen, an der nun weitergearbeitet werden kann.

Das Drum-Pad soll jetzt mit mehreren Features erweitert werden:

1. Ein Linter soll das Projekt bei der Entwicklung überprüfen. Setzen Sie dafür das Regelwerk des Linter (die Datei tsconfig.json) in Ihren Projektordner und installieren Sie sich per Terminal das Node-Modul TSLinter:
```bash
npm install typescript tslint -g
# bzw. wenn Adminrechte benötigt werden:
sudo npm install typescript tslint -g
```

2. Der Beat soll als Loop, also wiederholend, abspielen.

3. Der Play-Button soll erweitert werden: bei Klick auf Play, soll sich der Button zu einem Stop-Button verwandeln. Bei Klick auf Stop soll wieder der Play-Button in Funktion und Darstellung abgebildet sein.

4. Ein Delete-Button soll den aktuell definierten Beat löschen / leeren.

5. Ein Record-Button soll ermöglichen, das man einen Beat aufnimmt. Sobald der Record-Button geklickt wurde, soll folgende Aktion bei Klick eines Pads ausgeführt werden: der entsprechende Sound des Pads wird abgespielt (wie gehabt) plus das entsprechende Sample wird in den Beat-Loop aufgenommen. D.h. wenn später der Play-Button geklickt wird, dann soll der neu definierte Beat abspielen.

6. Folgende Anforderung für Ihre Code-Struktur: (a) das Abspielen eines Samples (new Audio... usw.) soll von einer zentralen Funktion ausgeführt werden. In Ihrem Code darf also nur **einmal** die Anweisung __new Audio__ auftrauchen. (b) Für das Abspielen, Aufnehmen und Löschen eines Beats soll nur **ein** Array manipuliert werden.

7. Eine visuelle Anforderung: für die Darstellung der Buttons (Record, Play/Stop, Delete) sollen **keine** Grafiken eingesetzt werden, stattdessen werden Sie die Icons aus einer Icon-Font einbinden. Sehen Sie sich dazu das Beispiel **example-icon-fonts.html** an und übertragen Sie die entsprechenden Fragemente in Ihre Anwendung.

**Zusatzaufgabe (wenn 8.1. - 8.7 erfüllt wurde dann gibt es dafür einen Tibute)**  
Mit der Tastatur soll das Drum-Pad ebenfalls bedienbar sein. Die Tastenbelegung ist dabei frei wählbar. Bei Tastendruck soll die selbe Funktion getriggert werden, wie sie auch bei Kick-Input genutzt wird (Abspielen des Samples und, wenn Record-Button aktiv, auch übertrag in den Beat-Loop).


## Abgabe 8 bis Mittwoch, 11.12.2019 18:00 Uhr

