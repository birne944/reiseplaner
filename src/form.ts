export type Reise = {
  id: string;
  Reiseziel: string;
  Transportmittel: "Auto" | "Zug" | "Flugzeug" | "Schiff";
  Reisedauer: number;
  AnzahlKoffer: number;
  Personenanzahl: number;
  Wetter: "sonnig" | "regnerisch" | "schneit";
};

export type NewReise = Omit<Reise, "id">;