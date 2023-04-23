import { useParams } from "react-router-dom";
import styled from "styled-components"
import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { UserContext } from "../contexts/UserContext";
import { LsContext } from "../contexts/LocalStorageContext";
import apiAuth from "../services/apiAuth"


export default function TransactionsPage() {
  const { tipo } = useParams();
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext)
  const { lsUser, setLsUser } = useContext(LsContext);
  const [form, setForm] = useState({ value: "", description: "" });
  let cfg = "";
  let check = null;

  useEffect(() => {
    if (localStorage.getItem("user")) {
      setUser(JSON.parse(localStorage.getItem("user")))
      check = JSON.parse(localStorage.getItem("user"))
    }

    if ((check === null || check === undefined) && (user.token === null || user.token === undefined)) {
      navigate("/")
      alert("Faca o login")
    }

    else {
      cfg = {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      }

      if (lsUser === null);
      else {
        cfg.headers.Authorization = `Bearer ${check.token}`
      }

      apiAuth.transaction(cfg)
        .then((res) => {
        })
        .catch((err) => alert(err))
    };
  }, [])

  function handleForm(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();

    const fixedValue = Number(form.value).toFixed(2);

    apiAuth.makeTransaction(
      { value: fixedValue, description: form.description, type: tipo },
      {
        headers:
        {
          Authorization: `Bearer ${user.token}`
        }
      }
    )
      .then((res) => navigate("/home"))
      .catch((err) => alert(err.response.data));
  }

  return (
    <TransactionsContainer>
      <h1>Nova {tipo}</h1>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Valor"
          type="number"
          required
          name="value"
          value={form.value}
          onChange={handleForm}
        />

        <input
          placeholder="Descrição"
          type="text"
          required
          name="description"
          value={form.description}
          onChange={handleForm}
        />

        <button>Salvar {tipo}</button>
      </form>
    </TransactionsContainer>
  )
}

const TransactionsContainer = styled.main`
  height: calc(100vh - 50px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

  h1 {
    align-self: flex-start;
    margin-bottom: 40px;
  }
`
