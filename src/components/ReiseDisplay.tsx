import { Fragment, useState } from "react";
import type { Reise } from "../form";
import { createPackliste } from "./createPackliste";

type Props = {
  data: Reise[];
  onDelete: (id: string) => void;
  onUpdate: (id: string) => void;
};

function ReiseDisplay({ data, onDelete, onUpdate }: Props) {
  const [openId, setOpenId] = useState<string | null>(null);
  const [checkedItems, setCheckedItems] = useState<Record<string, string[]>>({});

  const togglePackliste = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  const toggleCheck = (reiseId: string, item: string) => {
    setCheckedItems((prev) => {
      const aktuelleItems = prev[reiseId] ?? [];

      return {
        ...prev,
        [reiseId]: aktuelleItems.includes(item)
          ? aktuelleItems.filter((i) => i !== item)
          : [...aktuelleItems, item],
      };
    });
  };

  if (data.length === 0) {
    return <p>Noch keine Reisen gespeichert.</p>;
  }

  return (
    <div className="display-container">
      <h2>Gespeicherte Reisen</h2>

      <div className="table-card">
        <table className="reise-table">
          <thead>
            <tr>
              <th>Reiseziel</th>
              <th>Transport</th>
              <th>Dauer</th>
              <th>Koffer</th>
              <th>Personen</th>
              <th>Wetter</th>
              <th>Aktionen</th>
            </tr>
          </thead>

          <tbody>
            {data.map((reise) => {
              const packliste = createPackliste(reise);
              const erledigt = checkedItems[reise.id] ?? [];

              return (
                <Fragment key={reise.id}>
                  <tr>
                    <td>{reise.Reiseziel}</td>
                    <td>{reise.Transportmittel}</td>
                    <td>{reise.Reisedauer} Tage</td>
                    <td>{reise.AnzahlKoffer}</td>
                    <td>{reise.Personenanzahl}</td>
                    <td>{reise.Wetter}</td>

                    <td className="actions-cell">
                      <div className="actions">
                        <button
                          className="packliste"
                          onClick={() => togglePackliste(reise.id)}
                        >
                          Packliste
                        </button>

                        <button
                          className="edit"
                          onClick={() => onUpdate(reise.id)}
                        >
                          Bearbeiten
                        </button>

                        <button
                          className="delete"
                          onClick={() => onDelete(reise.id)}
                        >
                          Löschen
                        </button>
                      </div>
                    </td>
                  </tr>

                  {openId === reise.id && (
                    <tr>
                      <td colSpan={7}>
                        <div className="packliste-box">
                          <h3>Packliste für {reise.Reiseziel}</h3>

                          <div className="packliste-grid">
                            {packliste.map((item) => (
                              <label key={item} className="packliste-item">
                                <input
                                  type="checkbox"
                                  checked={erledigt.includes(item)}
                                  onChange={() => toggleCheck(reise.id, item)}
                                />
                                <span>{item}</span>
                              </label>
                            ))}
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </Fragment>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ReiseDisplay;