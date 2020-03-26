import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

import api from "../../services/api";

import "./styles.css";

import logoImg from "../../assets/logo.svg";

export default function NewIncident() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [value, setValue] = useState("");

  const history = useHistory();

  const ongId = localStorage.getItem("ongId");

  async function handleNewIncident(e) {
    e.preventDefault();

    const data = {
      title,
      description,
      value
    };

    try {
      api.post("incidents", data, {
        headers: {
          Authorization: ongId
        }
      });

      history.push("/profile");
    } catch (err) {
      alert("Error registering a cause. Try again later.");
    }
  }

  return (
    <div className="new-incident-container">
      <div className="content">
        <section>
          <img src={logoImg} alt="Be The Hero" />

          <h1>Add a new cause</h1>
          <p>Detail your cause to find out the heroes.</p>
          <Link className="back-link" to="/profile">
            <FiArrowLeft size={16} color="#e02041" />
            Go back
          </Link>
        </section>

        <form onSubmit={handleNewIncident}>
          <input
            placeholder="Cause title"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
          <textarea
            placeholder="Cause details"
            value={description}
            onChange={e => setDescription(e.target.value)}
          />

          <input
            placeholder="Amount"
            value={value}
            onChange={e => setValue(e.target.value)}
          />

          <button className="button" type="submit">
            Add
          </button>
        </form>
      </div>
    </div>
  );
}
