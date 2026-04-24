import { useState } from "react";
import type { Reise, NewReise } from "../form";

import autoZiele from "../data/auto.json";
import zugZiele from "../data/zug.json";
import flugzeugZiele from "../data/flug.json";
import schiffZiele from "../data/schiff.json";

type FormState = {
  Reiseziel: string;
  Transportmittel: "Auto" | "Zug" | "Flugzeug" | "Schiff";
  Reisedauer: number | "";
  AnzahlKoffer: number | "";
  Personenanzahl: number | "";
  Wetter: "sonnig" | "regnerisch" | "schneit";
};

type Props = {
  onSave: (reise: Reise | NewReise) => void;
  onCancel: () => void;
  edit?: Reise;
};

function ReiseFormular({ onSave, onCancel, edit }: Props) {
  const [formData, setFormData] = useState<FormState>({
    Reiseziel: edit?.Reiseziel ?? "",
    Transportmittel: edit?.Transportmittel ?? "Auto",
    Reisedauer: edit?.Reisedauer ?? "",
    AnzahlKoffer: edit?.AnzahlKoffer ?? "",
    Personenanzahl: edit?.Personenanzahl ?? "",
    Wetter: edit?.Wetter ?? "sonnig",
  });

  const zieleNachTransportmittel = {
    Auto: autoZiele,
    Zug: zugZiele,
    Flugzeug: flugzeugZiele,
    Schiff: schiffZiele,
  };

  const aktuelleZiele = zieleNachTransportmittel[formData.Transportmittel];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "Reisedauer" ||
        name === "AnzahlKoffer" ||
        name === "Personenanzahl"
          ? value === ""
            ? ""
            : Number(value)
          : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      formData.Reiseziel === "" ||
      formData.Reisedauer === "" ||
      formData.AnzahlKoffer === "" ||
      formData.Personenanzahl === ""
    ) {
      alert("Bitte alle Felder ausfüllen.");
      return;
    }

    const gespeicherteReise = {
      ...(edit ? { id: edit.id } : {}),
      Reiseziel: formData.Reiseziel,
      Transportmittel: formData.Transportmittel,
      Reisedauer: Number(formData.Reisedauer),
      AnzahlKoffer: Number(formData.AnzahlKoffer),
      Personenanzahl: Number(formData.Personenanzahl),
      Wetter: formData.Wetter,
    };

    onSave(gespeicherteReise);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>{edit ? "Reise bearbeiten" : "Neue Reise"}</h3>

      <div>
        <label>Transportmittel:</label>
        <select
          name="Transportmittel"
          value={formData.Transportmittel}
          onChange={handleChange}
        >
          <option value="Auto">Auto</option>
          <option value="Zug">Zug</option>
          <option value="Flugzeug">Flugzeug</option>
          <option value="Schiff">Schiff</option>
        </select>
      </div>

      <div>
        <label>Reiseziel:</label>
        <input
          list="reiseziele"
          name="Reiseziel"
          value={formData.Reiseziel}
          onChange={handleChange}
        />

        <datalist id="reiseziele">
          {aktuelleZiele.map((ziel) => (
            <option key={ziel} value={ziel} />
          ))}
        </datalist>
      </div>

      <div>
        <label>Reisedauer (Tage) :</label>
        <input
          type="number"
          name="Reisedauer"
          value={formData.Reisedauer}
          onChange={handleChange}
        />
      </div>

      <div>
        <label>Anzahl Koffer:</label>
        <input
          type="number"
          name="AnzahlKoffer"
          value={formData.AnzahlKoffer}
          onChange={handleChange}
        />
      </div>

      <div>
        <label>Personen:</label>
        <input
          type="number"
          name="Personenanzahl"
          value={formData.Personenanzahl}
          onChange={handleChange}
        />
      </div>

      <div>
        <label>Wetter:</label>
        <select name="Wetter" value={formData.Wetter} onChange={handleChange}>
          <option value="sonnig">Sonnig</option>
          <option value="regnerisch">Regnerisch</option>
          <option value="schneit">Schneit</option>
        </select>
      </div>

      <button type="submit">
        {edit ? "Änderungen speichern" : "Absenden"}
      </button>

      {edit && (
        <button type="button" onClick={onCancel}>
          Abbrechen
        </button>
      )}
    </form>
  );
}

export default ReiseFormular;