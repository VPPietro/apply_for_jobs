import React from "react";
import { useFormik } from "formik";
import {
  Button,
  FormControl,
  FormHelperText,
  Grid,
  TextField,
} from "@mui/material";
import * as Yup from "yup";
import apiGateway from "../../endpoints/apiGetway";

function PasswordGenerateIndex() {
  const formik = useFormik({
    initialValues: {
      viewTimes: 2,
      expirationDate: "",
    },
    onSubmit: async (values) => {
      const result = await fetch(apiGateway.random_password_generate, {
        method: "POST",
        credentials: "include",
        headers: {
            "Access-Control-Allow-Origin": true,
        },
        body: JSON.stringify(values),
      });
      console.log('result', result)
    },
    validationSchema: Yup.object().shape({
      viewTimes: Yup.number()
        .min(1, "Mínimo uma visualização")
        .required("Campo obrigatório"),
      expirationDate: Yup.date().required("Campo obrigatório"),
    }),
  });

  return (
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
      <Button type="submit" variant="contained" sx={{ mt: 3 }}>
        Gerar
      </Button>
    </form>
  );
}

export default PasswordGenerateIndex;
