# `RoomSelectorWidget` – Ist-Analyse und Weiterentwicklung

## Zusammenfassung

`RoomSelectorWidget` ist als VIS-2-Widget registriert und stellt nun eine Raumauswahl bereit. Es liest eine semikolon-separierte Raumliste und den aktuell ausgewählten Raum über die von VIS 2 bereitgestellten Rx-Werte (`state.rxData` und `state.values`). Eine gültige Benutzerauswahl wird mit `context.setValue` in den konfigurierten Auswahl-State geschrieben. Das Widget verwendet damit dasselbe Datenzugriffs- und Schreibmuster wie die übrigen Widgets im Projekt.

## Registrierung und Einbindung

Die Komponente liegt in `src-widgets/src/RoomSelectorWidget.tsx`.

- `io-package.json` führt `RoomSelectorWidget` als Komponente des Widget-Sets `vis2WeatherHeatingWidgets` auf.
- `src-widgets/vite.config.ts` stellt die Komponente als Moduleintrag `./RoomSelectorWidget` bereit.
- `getWidgetInfo()` registriert den Widget-Typ als `tplRoomSelectorWidget`, mit dem Namen `RoomSelectorWidget` und der Beschriftungs-ID `vis_2_widgets-RoomSelector`.
- Die Widget-Metadaten erlauben Skalierung und Verschieben. Als Vorschaubild ist `widgets/vis-2-widgets-weather-and-heating/img/vis-widget-RoomSelector.png` eingetragen. Zu diesem exakten Pfad konnte in den vorhandenen Projektdateien kein entsprechendes Bild gefunden werden.

## Konfiguration

Im Attributbereich `common` sind drei Felder definiert:

| Attribut | Typ | Standard | Verwendung im aktuellen Code |
| --- | --- | --- | --- |
| `noCard` | Checkbox | nicht festgelegt | Gibt den Inhalt ohne Card-Wrapper aus. |
| `oid_values` | ID | `heatingcontrol.0.info.UsedRooms` | Liest die Raumliste als String aus dem Rx-Wert `<OID>.val`. |
| `oid_selectedroom` | ID | `heatingcontrol.0.vis.ChoosenRoom` | Liest die aktuelle Auswahl und ist das Ziel für eine neue Auswahl. |

Der Listenwert wird als Semikolon-getrennter String behandelt. Einträge werden getrimmt, leere Einträge ignoriert und doppelte Raumnamen entfernt. Beispiel: `Küche;Bad EG;Schlafzimmer;Bad OG;Wohnzimmer;Kinderzimmer`.

## Render- und Laufzeitverhalten

Die Klasse erbt von `Generic<StaticRxData, VisRxWidgetState>`. Die OIDs werden aus `state.rxData` gelesen; die jeweiligen Werte aus `state.values[`${oid}.val`]`. Das entspricht dem Muster der anderen Projekt-Widgets, die über `this.props.context.setValue(oid, value)` schreiben.

`createView()` rendert ein MUI-`TextField` im Select-Modus. Es zeigt nur dann einen aktuellen Wert an, wenn dieser als String in der Raumliste vorkommt. Die Auswahl ist im VIS-Edit-Modus, ohne Räume oder ohne Ziel-OID deaktiviert. `onRoomChange()` ignoriert Edit-Modus und leere Werte und schreibt nur einen Raumnamen, der aktuell in der Liste enthalten ist. Externe State-Änderungen werden über den bestehenden VIS-2/Rx-Datenfluss in der Auswahl sichtbar. `noCard` und `props.widget.usedInWidget` steuern weiterhin, ob der Inhalt mit `wrapContent()` umschlossen wird.

Bei leerem/nicht-stringförmigem Listenwert ist die Auswahl deaktiviert und zeigt „No rooms available“. Falls der gespeicherte Auswahlwert nicht in der Liste vorkommt, bleibt die Auswahl leer; das Widget schreibt keinen automatischen Ersatzwert.

## Implementierungsdetails und Grenzen

- `StaticRxData` typisiert `noCard`, `oid_values` und `oid_selectedroom` als optionale Widget-Daten.
- Die Liste wird bei jedem Rendern aus den aktuellen Rx-Werten neu ausgewertet. Das Widget führt keine eigene Subscription ein.
- Beim Schreiben wird der Raumnamen-String selbst gespeichert, nicht ein Index oder eine Objekt-ID.
- Die UI-Texte „Room“, „Select a room“ und „No rooms available“ sind derzeit fest auf Englisch gesetzt. Für Lokalisierung sollten sie in die Übersetzungsdateien aufgenommen werden.
- Die Metadaten-Beschriftung `vis_2_widgets-RoomSelector` ist in den `src-widgets/src/i18n/*.json`-Dateien nicht vorhanden. Das konfigurierte Vorschaubild `widgets/vis-2-widgets-weather-and-heating/img/vis-widget-RoomSelector.png` konnte ebenfalls nicht im Projekt gefunden werden.

## Beziehung zu anderen Widgets

`HeatingTimeScheduleWidget` verwendet ebenfalls standardmäßig `heatingcontrol.0.vis.ChoosenRoom` (dort als `oid_ChoosenRoom` konfiguriert) und liest die Auswahl aus seinen Rx-Werten. Wenn beide Widgets denselben Ziel-State konfiguriert haben, aktualisiert sich die Schedule-Anzeige über den VIS-2/Rx-Datenfluss nach einer Auswahl im RoomSelector. Die Widgets bleiben dabei lose gekoppelt: Das RoomSelector kennt das Schedule-Widget nicht.

## Hinweise für die Weiterentwicklung

1. **Lokalisierung:** Übersetzungen für Widget-Titel und Auswahl-/Leerzustand in `src-widgets/src/i18n/*.json` ergänzen und die Widget-Label-ID mit den vorhandenen Übersetzungsmustern angleichen.
2. **Laufzeitprüfung:** In VIS 2 prüfen, dass `UsedRooms` und `ChoosenRoom` als konfigurierte IDs tatsächlich in Rx-Werten verfügbar sind und dass `context.setValue` auf dem Ziel-State wie erwartet funktioniert.
3. **Datenvarianten:** Falls `UsedRooms` in anderen HeatingControl-Versionen nicht als semikolon-separierter String geliefert wird, das Datenformat anhand realer Beispiele klären und gezielt unterstützen, statt ungeprüft Formate zu erraten.
4. **Vorschau:** Das fehlende Vorschaubild erstellen oder den Metadatenpfad auf eine existierende Datei ändern.

Die Logiktests in `src-widgets/src/RoomSelectorLogic.test.mjs` decken Listen-Parsing, Anzeigeauswahl, Edit-Modus, ungültige Auswahl und den `setValue`-Aufruf ab. Sie lassen sich mit `npm test` im Verzeichnis `src-widgets` ausführen. Die derzeitige Implementierung entspricht dem projektüblichen Rx-Lese- und `context.setValue`-Schreibmuster. Eine manuelle Prüfung zusammen mit dem `HeatingTimeScheduleWidget` bleibt der nächste sinnvolle Funktionstest.
