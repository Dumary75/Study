import { useState } from "react";

interface AddMyListFormProps {
  onCreated: () => void;
}

export function AddMyListForm({ onCreated }: AddMyListFormProps) {
  const [title, setTitle] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault(); // Verhindert das Neuladen der Seite

    try {
      const response = await fetch("http://localhost:5298/myList", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ title, imageUrl: imageUrl === "" ? null : imageUrl })
      });

      if (response.ok) {
        setTitle("");
        setImageUrl("");
        onCreated();
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="userCreateForm">
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="myListTitel">Titel</label>
          <input 
            type="text" 
            id="myListTitel"
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
          />
        </div>

        <div>
          <label htmlFor="myListBild">Bild-URL (optional)</label>
          <input 
            id="myListBild"
            value={imageUrl} 
            onChange={(e) => setImageUrl(e.target.value)} 
          />
        </div>

        <button type="submit">Hinzufügen</button>
      </form>
    </div>
  );
}
