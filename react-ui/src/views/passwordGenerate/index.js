import React, { useState } from "react";

// Third party
import { useFormik } from "formik";
import {
  Button,
  Container,
  FormControl,
  FormHelperText,
  Grid,
  Link,
  TextField,
  Typography,
  CircularProgress,
  Select,
  MenuItem,
} from "@mui/material";
import * as Yup from "yup";
import axios from "axios";

// Project imports
import apiGateway from "../../endpoints/apiGetway";
import reactUi from "../../endpoints/reactUi";

function PasswordGenerateIndex() {
  // States
  const [url, setUrl] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [type, setType] = useState({ value: 2, label: "Horas" });

  const types = [
    { value: 1, label: "Segundos" },
    { value: 2, label: "Horas" },
    { value: 3, label: "Dias" },
  ];

  // Formik
  const formik = useFormik({
    initialValues: { viewTimes: 1, expirationTime: 1 },
    onSubmit: async (values, { resetForm }) => {
      setSubmitting(true);
      if (type.value === 2) {
        let newValue = values.expirationTime * 3600;
        values.expirationTime = newValue;
      } else if (type.value === 3) {
        let newValue = values.expirationTime * 86400;
        values.expirationTime = newValue;
      }
      const response = await axios.post(apiGateway.passwordGenerate, values);
      console.log(response);
      setSubmitting(false);
      resetForm({ viewTimes: 1, expirationTime: 1 });
      if (response.status === 200) {
        setUrl(reactUi.passwordViewUrl + response.data.body.id);
      } else {
        setUrl("Erro ao gerar senha");
      }
    },
    validationSchema: Yup.object().shape({
      viewTimes: Yup.number()
        .min(1, "Mínimo uma visualização")
        .required("Campo obrigatório"),
      expirationTime: Yup.number()
        .min(1, "Número deve ser positivo maior que 0")
        .required("Campo obrigatório"),
    }),
    enableReinitialize: true,
  });

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <Grid container justifyContent="center">
          {/* VIEW QUANTITY */}
          <FormControl>
            <TextField
              name="viewTimes"
              label="quantidade de visualizações"
              type="number"
              onChange={formik.handleChange}
              value={formik.values.viewTimes}
            />
            <FormHelperText error>
              {formik.touched.viewTimes && formik.errors.viewTimes}
            </FormHelperText>
          </FormControl>

          {/* VIEW TIME LIMIT */}
          <FormControl>
            <TextField
              name="expirationTime"
              label={`Tempo limite (${type.label})`}
              type="number"
              onChange={formik.handleChange}
              value={formik.values.expirationTime}
            />
            <FormHelperText error>
              {formik.touched.expirationTime && formik.errors.expirationTime}
            </FormHelperText>
          </FormControl>

          {/* TYPE OF THE TIME LIMIT */}
          <FormControl>
            <Select value={type.value || ""}>
              {types.map((t) => (
                <MenuItem
                  key={t.value}
                  value={t.value}
                  onClick={() => setType(t)}
                >
                  {t.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Button
          endIcon={
            submitting ? (
              <CircularProgress size={15} sx={{ color: "white" }} />
            ) : (
              <></>
            )
          }
          disabled={submitting}
          type="submit"
          variant="contained"
          sx={{ mt: 3 }}
        >
          Gerar
        </Button>
      </form>

      {url.length > 0 && (
        <Container sx={{ backgroundColor: "#282c34", mt: 6 }}>
          <Typography sx={{ color: "white" }}>URL:</Typography>
          <Link href={url} target="_blank">
            {url}
          </Link>
        </Container>
      )}
    </>
  );
}

export default PasswordGenerateIndex;
