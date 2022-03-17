import React from "react";
import { useParams } from "react-router-dom";

function PasswordViewIndex() {
  const params = useParams();

  return <p>código da senha (id): {params.id}</p>;
}

export default PasswordViewIndex;
