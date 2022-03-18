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

  // Formik
  const formik = useFormik({
    initialValues: {
      viewTimes: 2,
      expirationDate: "",
    },
    onSubmit: async (values) => {
      setSubmitting(true);
      const response = await axios.post(apiGateway.passwordGenerate, values);
      setSubmitting(false);
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
      expirationDate: Yup.date().required("Campo obrigatório"),
    }),
  });

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <Grid container justifyContent="center">
          {/* VIEW TIMES */}
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

          {/* VIEW LIMIT DATE */}
          <FormControl>
            <TextField
              name="expirationDate"
              label="Data limite"
              type="datetime-local"
              onChange={formik.handleChange}
              value={formik.values.expirationDate}
              InputLabelProps={{ shrink: true }}
            />
            <FormHelperText error>
              {formik.touched.expirationDate && formik.errors.expirationDate}
            </FormHelperText>
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
