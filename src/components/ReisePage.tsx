import { useState } from "react";
import type { Reise, NewReise } from "../form";
import ReiseFormular from "./Formular";
import ReiseDisplay from "./ReiseDisplay";

function ReisePage() {
    const [reisen, setReisen] = useState<Reise[]>([]);
    const [editReise, setEditReise] = useState<Reise | undefined>();

    const onSave = (reise: Reise | NewReise) => {
        if ("id" in reise) {
            setReisen((prev) =>
                prev.map((r) => (r.id === reise.id ? reise : r))
            );
            setEditReise(undefined);
        } else {
            const neueReise: Reise = {
                id: crypto.randomUUID(),
                ...reise,
            };

            setReisen((prev) => [...prev, neueReise]);
        }
    };

    const onDelete = (id: string) => {
        setReisen((prev) => prev.filter((reise) => reise.id !== id));
    };

    const onUpdate = (id: string) => {
        const found = reisen.find((reise) => reise.id === id);
        setEditReise(found);
    };

    const onCancel = () => {
        setEditReise(undefined);
    };

    return (
        <main className="app-container">
            <h1>Reiseplaner</h1>

            <ReiseFormular
                key={editReise?.id ?? "new"}
                onSave={onSave}
                onCancel={onCancel}
                edit={editReise}
            />

            <ReiseDisplay
                data={reisen}
                onDelete={onDelete}
                onUpdate={onUpdate}
            />
        </main>
    );
}
    export default ReisePage;