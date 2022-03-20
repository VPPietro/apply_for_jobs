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
    let response = await axios.get(apiGateway.passwordList, {
      headers: { Authorization: process.env.REACT_UI_TOKEN },
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
            return (
              <TableRow key={item.id}>
                <TableCell>{item.id}</TableCell>
                <TableCell>{item.password}</TableCell>
                <TableCell>{item.addedDate}</TableCell>
                <TableCell>{item.viewTimes}</TableCell>
                <TableCell>{item.expirationDate}</TableCell>
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
