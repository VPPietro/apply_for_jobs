import React, { useEffect, useState } from "react";

// Third party
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import axios from "axios";

// Project imports
import apiGateway from "../../endpoints/apiGetway";
import reactUi from "../../endpoints/reactUi";

function PasswordListIndex() {
  // States
  const [items, setItems] = useState([]);

  // Get of the passwords on the AWS Api Gateway
  useEffect(async () => {
    console.log(process.env.REACT_APP_X_API_KEY, 'env')
    let response = await axios.get(apiGateway.passwordList, {
      headers: {
        // "Access-Control-Allow-Origin": "http://localhost:3000",
        'x-api-key': process.env.REACT_APP_X_API_KEY,
      },
    });
    if (response.status === 200) {
      setItems(response.data.body.Items || []);
    }
  }, []);

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Senha</TableCell>
            <TableCell>Adicionado em</TableCell>
            <TableCell>Visualizações</TableCell>
            <TableCell>Validade</TableCell>
            <TableCell>Link</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map((item) => {
            let addedDate = new Date(item.addedDate);
            addedDate = addedDate.toLocaleString();
            let expirationTime = new Date(item.expirationTime);
            expirationTime = expirationTime.toLocaleString();
            return (
              <TableRow key={item.id}>
                <TableCell>{item.id}</TableCell>
                <TableCell>{item.password}</TableCell>
                <TableCell>{addedDate}</TableCell>
                <TableCell>{item.viewTimes}</TableCell>
                <TableCell>{expirationTime}</TableCell>
                <TableCell>
                  <a href={reactUi.passwordViewUrl + item.id}>
                    {reactUi.passwordViewUrl + item.id}
                  </a>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default PasswordListIndex;
