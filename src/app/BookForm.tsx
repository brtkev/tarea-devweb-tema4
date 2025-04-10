"use client";
import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";

import { Data } from "./Table";

export interface FormData {
  id?: number;
  name: string;
  author: string;
  year: string;
  genre: string;
}

interface BookFormInterface {
  onAdd?: (data: FormData) => void;
  updateData: Data | null;
  setUpdateData: Function;
  onUpdate?: (data: Data) => void;
  initialData?: FormData | null; // Optional data to pre-fill the form for updates
  onCancel?: () => void; // Optional function to handle cancellation of update
}

const defaultForm: FormData = {
  name: "",
  author: "",
  year: "",
  genre: "",
};

const BookForm: React.FC<BookFormInterface> = ({
  onAdd,
  updateData,
  setUpdateData,
  onUpdate,
  onCancel,
}) => {
  const availableGenres: string[] = [
    "Ficción",
    "No ficción",
    "Ciencia ficción",
    "Fantasía",
    "Misterio",
    "Biografía",
    "Terror",
    "Romance",
  ];

  const [formData, setFormData] = useState<FormData>(defaultForm);

  const [isUpdate, setIsUpdate] = useState<boolean>(false);
  useEffect(() => {
    if (updateData) {
      setFormData(updateData);
      setIsUpdate(true);
    } else {
      setFormData(defaultForm);
      setIsUpdate(false);
    }
  }, [updateData]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (isUpdate) {
      const { id, ...data } = formData;
      if (onUpdate && id) onUpdate({ id, ...data });
    } else {
      if (onAdd) onAdd(formData);
    }
    setFormData(defaultForm);
    setIsUpdate(false);
    setUpdateData(null);
  };

  const handleCancel = (e: any) => {
    e.preventDefault();
    setIsUpdate(false);
    setFormData(defaultForm);
    setUpdateData(null);
  };

  return (
    <form className="form-input" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Nombre:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label htmlFor="author">Autor:</label>
        <input
          type="text"
          id="author"
          name="author"
          value={formData.author}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label htmlFor="year">Año:</label>
        <input
          type="number"
          id="year"
          name="year"
          value={formData.year}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label className="label-grid" htmlFor="genre">
          Género:
          <select
            id="genres"
            name="genre"
            value={formData.genre}
            onChange={handleChange}
            required
          >
            <option value="">Porfavor seleccione</option>
            {availableGenres.map((genre) => (
              <option key={genre} value={genre}>
                {genre}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div>
        {!isUpdate ? (
          <div>
            <button className="form-button">Agregar</button>
          </div>
        ) : (
          <div className="form-button-container">
            <button className="form-button">Actualizar</button>
            <button onClick={handleCancel} className="form-button">
              Cancelar
            </button>
          </div>
        )}
      </div>
    </form>
  );
};

export default BookForm;
