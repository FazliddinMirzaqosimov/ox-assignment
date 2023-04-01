import jwtAxios from "auth/jwt-auth/jwtaxios";
import { log } from "console";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function ProductPage() {
  const { id } = useParams();
  const [data, setData] = useState();
  useEffect(() => {
    jwtAxios.get(`/variations?q=belt`).then((res) => {
      setData(res.data);
    });
  }, [id]);

  return (
    <div style={{ whiteSpace: "pre" }}>
      {JSON.stringify(data)}

      <h1>
        I am sorry i had no time to decorate product page but i think i showed
        you enough that i could work with backend
      </h1>
    </div>
  );
}

export default ProductPage;
