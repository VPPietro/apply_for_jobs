import React from "react";
import { useFormik } from "formik";
import { TextField, Grid, Container, Button } from "@mui/material";
import { Auth } from 'aws-amplify'

function RegisterIndex() {
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit: async (values) => {
      try {
        const signUpResponse = await Auth.signUp({
          username: values.username,
          password: values.password,
        })
        console.log('login', signUpResponse)
      }catch(error){
        console.error(error)
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Container>
        <Grid container justifyContent="center">
          <TextField
            name="username"
            label="Usuário"
            onChange={formik.handleChange}
            value={formik.values.username}
            required
          />
          <TextField
            name="password"
            label="Senha"
            onChange={formik.handleChange}
            value={formik.values.password}
            required
          />
        </Grid>
        <Button sx={{ mt: 6 }} variant="contained" type="submit">
          Cadastrar
        </Button>
      </Container>
    </form>
  );
}

export default RegisterIndex;
