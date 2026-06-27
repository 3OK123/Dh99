import { useEffect, useState } from "react";

export default function Home() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/series")
      .then(r => r.json())
      .then(setData);
  }, []);

  return (
    <div style={{ background: "#000", color: "#fff", minHeight: "100vh", padding: 20 }}>
      <h1>🎬 Series</h1>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10 }}>
        {data.map(s => (
          <div key={s._id} style={{ background: "#222", padding: 10 }}>
            <img src={s.poster} style={{ width: "100%" }} />
            <h3>{s.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}import { useEffect, useState } from "react";

export default function Home() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/series")
      .then(r => r.json())
      .then(setData);
  }, []);

  return (
    <div style={{ background: "#000", color: "#fff", minHeight: "100vh", padding: 20 }}>
      <h1>🎬 Series</h1>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10 }}>
        {data.map(s => (
          <div key={s._id} style={{ background: "#222", padding: 10 }}>
            <img src={s.poster} style={{ width: "100%" }} />
            <h3>{s.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}