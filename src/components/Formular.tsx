import { useState } from "react";
import type { ChangeEvent, MouseEvent, SyntheticEvent } from "react";

type FormularProps = {
    onSubmit: (data: FormData) => void | Promise<void>;
    onCancel: () => void;
}
export function Formular(props: FormularProps) {
    const onCancel = (e: MouseEvent<HTMLButtonElement>) => {
        e.currentTarget.closest("form")?.reset();
        props.onCancel();
    }
    return (
        <form onSubmit={props.onSubmit}>
            <label>
                Name
                <input
                    type="text"
                    name="customer"
                    required
                    maxLength={50}
                    onChange={handleChange}
                    value={service.customer}
                />
            </label>

            <label>
                Marke
                <input
                    type="text"
                    name="brand"
                    required
                    onChange={handleChange}
                    value={service.brand}
                />
            </label>

            <label>
                Aufwand in Stunden
                <input
                    type="number"
                    name="expense"
                    required
                    min={1}
                    max={20}
                    onChange={handleChange}
                    value={service.expense || ""}
                />
            </label>

            <label>
                Serviceart
                <select
                    name="kind"
                    required
                    onChange={handleChange}
                    value={service.kind}
                >
                    <option value="small">Klein</option>
                    <option value="big">Gross</option>
                </select>
            </label>

            <label>
                Autonummer
                <input
                    type="text"
                    name="numberplate"
                    required
                    onChange={handleChange}
                    value={service.numberplate}
                    pattern="^(AG|AR|AI|BL|BE|FR|GE|GL|GR|JU|LU|NE|NW|OW|SG|SH|SZ|SO|TG|TI|UR|VD|VS|ZG|ZH)[1-9]{1}[0-9]{0,6}$"
                />
            </label>

            <label>
                Dringlichkeit
                <input
                    type="checkbox"
                    name="important"
                    onChange={handleChange}
                    checked={service.important}
                />
            </label>

            <button type="submit">{props.edit ? "Ändern" : "Erstellen"}</button>
            {props.edit && <button type="reset" onClick={onCancel}>Abbrechen</button>}
        </form>
    );
}