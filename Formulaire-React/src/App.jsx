import "./App.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
  name: yup
    .string()
    .min(8, "Le nom doit contenir au moins 8 caractères")
    .max(15, "Le nom ne doit pas contenir plus de 15 caractères")
    .required("Le nom est requis"),
  date: yup
    .string()
    .matches(
      /^(0[1-9]|[12][0-9]|3[01])[/](0[1-9]|1[0-2])[/](19|20)\d\d$/,
      "Format invalide (jj/mm/aaaa)"
    )
    .required("La date est requise")
    .test("antérieure", "Date antérieure", (val) => {
      if (!val) return false;
      const [j, m, a] = val.split("/").map(Number);
      const inputDate = new Date(a, m - 1, j);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return inputDate >= today;
    }),

  select: yup.string().oneOf(["Basse", "Moyenne", "Elevée"], "Valeur invalide"),
  isCompleted: yup.boolean(),
});

const App = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
    defaultValues: {
      select: "Basse",
      isCompleted: false,
    },
    resolver: yupResolver(schema),
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
          placeholder="Entrez le nom"
          {...register("name")}
        />
        {errors.name && <p>{errors.name.message}</p>}
      </Form.Group>

      <Form.Group className="mb-3" controlId="date">
        <Form.Label>Date</Form.Label>
        <Form.Control
          type="text"
          placeholder="jj/mm/aaaa"
          {...register("date")}
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
