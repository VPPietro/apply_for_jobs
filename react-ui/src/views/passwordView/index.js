import React, { useEffect, useState } from "react";

// Third party
import { useParams } from "react-router-dom";
import axios from "axios";

// Project imports
import apiGateway from "../../endpoints/apiGetway";
import { Typography } from "@mui/material";

function PasswordViewIndex() {
  const params = useParams();

  // States
  const [item, setItem] = useState({});
  const [availableDate, setAvailableDate] = useState("");

  // Get the password on the AWS Api Gateway
  useEffect(async () => {
    let response = await axios.post(
      apiGateway.passwordView,
      { id: params.id },
      {
        headers: {
          "x-api-key": process.env.REACT_APP_X_API_KEY,
        },
      }
    );
    if (response.status === 200) {
      setItem(response.data || {});
    }
  }, []);

  useEffect(() => {
    if (item.expirationTime !== undefined) {
      let newDate = new Date(item.expirationTime);
      setAvailableDate(newDate.toLocaleString());
    }
  }, [item]);

  return (
    <>
      {item.password && (
        <>
          <Typography>Senha: {item.password}</Typography>
          <Typography>
            Quantidade de visualizações restantes: {item.viewTimes}
          </Typography>
          <Typography>Link disponível até: {availableDate}</Typography>
        </>
      )}

      {item.invalid_request && <Typography>{item.invalid_request}</Typography>}

      {item.invalid_password && (
        <Typography>{item.invalid_password}</Typography>
      )}
    </>
  );
}

export default PasswordViewIndex;
