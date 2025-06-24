import { useState } from "react";
import "./App.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    date: "",
    select: "Basse",
    isCompleted: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="name">
        <Form.Label>Nom</Form.Label>
        <Form.Control
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Entrez votre nom"
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="date">
        <Form.Label>Date</Form.Label>
        <Form.Control
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          placeholder="Entrez votre date"
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="select">
        <Form.Select
          name="select"
          value={formData.select}
          onChange={handleChange}
        >
          <option value="Basse" >Basse</option>
          <option value="Moyenne">Moyenne</option>
          <option value="Haute">Haute</option>
        </Form.Select>
      </Form.Group>
      <Form.Group className="mb-3" controlId="isCompleted">
        <Form.Check
          type="checkbox"
          name="isCompleted"
          checked={formData.isCompleted}
          onChange={handleChange}
          label="Complété"
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Envoyer
      </Button>
    </Form>
  );
};

export default RegistrationForm;
