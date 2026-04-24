export type FormData = {
    id: string,
    Reiseziel: string,
    Reisedauer: number,
    AnzahlKoffer: number,
    Personenanzahl: number,
    Wetter: "sonnig" | "regnerisch" | "schneit",
}

export type NewService = Omit<FormData, "id">
