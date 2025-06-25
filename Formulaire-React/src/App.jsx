import "./App.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useForm } from "react-hook-form";

const App = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    mode: "onSubmit",
    defaultValues: {
      select: "Basse",
      isCompleted: false,
    },
  });

  const onSubmit = (data) => {
    console.log(data);
    reset();
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Form.Group className="mb-3" controlId="name">
        <Form.Label>Nom</Form.Label>
        <Form.Control
          type="text"
          placeholder="Entrez votre nom"
          {...register("name", { required: "Le nom est requis" })}
        />
        {errors.name && <p>{errors.name.message}</p>}
      </Form.Group>

      <Form.Group className="mb-3" controlId="date">
        <Form.Label>Date</Form.Label>
        <Form.Control
          type="date"
          {...register("date", { required: "La date est requise" })}
        />
        {errors.date && <p>{errors.date.message}</p>}
      </Form.Group>
      <Form.Group className="mb-3" controlId="select">
        <Form.Select name="select" {...register("select")}>
          <option value="Basse">Basse</option>
          <option value="Moyenne">Moyenne</option>
          <option value="Haute">Haute</option>
        </Form.Select>
      </Form.Group>
      <Form.Group className="mb-3" controlId="isCompleted">
        <Form.Check
          type="checkbox"
          {...register("isCompleted")}
          label="Complété"
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Envoyer
      </Button>
    </Form>
  );
};

export default App;
