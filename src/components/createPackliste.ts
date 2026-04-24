import type { Reise } from "../form";

export function createPackliste(reise: Reise): string[] {
  const liste: string[] = [];

  liste.push("Pass oder ID");
  liste.push("Portemonnaie");
  liste.push("Handy");
  liste.push("Ladegerät");
  liste.push("Krankenkassenkarte");

  liste.push(`${reise.Reisedauer}x Unterwäsche`);
  liste.push(`${reise.Reisedauer}x Socken`);
  liste.push(`${Math.ceil(reise.Reisedauer / 2)}x Hosen`);
  liste.push(`${reise.Reisedauer}x T-Shirts`);

  if (reise.Personenanzahl > 1) {
    liste.push(`Dokumente für ${reise.Personenanzahl} Personen`);
  }

  if (reise.AnzahlKoffer === 0) {
    liste.push("Rucksack oder kleine Tasche");
  } else {
    liste.push(`${reise.AnzahlKoffer} Koffer`);
  }

  if (reise.Wetter === "sonnig") {
    liste.push("Sonnenbrille");
    liste.push("Sonnencreme");
    liste.push("Cap oder Hut");
  }

  if (reise.Wetter === "regnerisch") {
    liste.push("Regenjacke");
    liste.push("Regenschirm");
    liste.push("Wasserdichte Schuhe");
  }

  if (reise.Wetter === "schneit") {
    liste.push("Winterjacke");
    liste.push("Handschuhe");
    liste.push("Schal");
    liste.push("Mütze");
  }

  if (reise.Transportmittel === "Auto") {
    liste.push("Führerschein");
    liste.push("Fahrzeugausweis");
    liste.push("Snacks für die Fahrt");
  }

  if (reise.Transportmittel === "Zug") {
    liste.push("Zugticket");
    liste.push("Kopfhörer");
    liste.push("Buch oder Unterhaltung");
  }

  if (reise.Transportmittel === "Flugzeug") {
    liste.push("Flugticket");
    liste.push("Reisepass prüfen");
    liste.push("Flüssigkeiten im Beutel");
  }

  if (reise.Transportmittel === "Schiff") {
    liste.push("Schiffsticket");
    liste.push("Reisetabletten");
    liste.push("Windjacke");
  }

  liste.push(`Infos zu ${reise.Reiseziel} prüfen`);

  return liste;
}