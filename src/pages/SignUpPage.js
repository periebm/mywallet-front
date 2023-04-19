import { Link, useNavigate } from "react-router-dom"
import styled from "styled-components"
import MyWalletLogo from "../components/MyWalletLogo"
import { useState } from "react";
import apiAuth from "../services/apiAuth";

export default function SignUpPage() {
  const [form, setForm] = useState({ email: "", password: "", name: "", confPassword: "" });
  const navigate = useNavigate();

  function handleForm(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }


  function handleSignUp(e) {
    e.preventDefault();
    if (form.password !== form.confPassword) {
      return alert("As senhas diferem")
    }

    apiAuth.signUp({email: form.email, name: form.name, password: form.password})
    .then((res) => {
      console.log(res.data)
      navigate("/")
      
    }).catch((err) => {
      alert(err.response.data)
    });
  }

  return (
    <SingUpContainer>
      <form onSubmit={handleSignUp}>
        <MyWalletLogo />
        <input
          data-test="name"
          name="name"
          placeholder="Nome"
          type="text"
          required
          value={form.name}
          onChange={handleForm}
        />

        <input
         data-test="email"
          name="email"
          placeholder="E-mail"
          type="email"
          required
          value={form.email}
          onChange={handleForm}
        />

        <input
          data-test="password"
          name="password"
          placeholder="Senha"
          type="password"
          autocomplete="new-password"
          required
          value={form.password}
          onChange={handleForm}
        />

        <input
          data-test="conf-password"
          name="confPassword"
          placeholder="Confirme a senha"
          type="password"
          autocomplete="new-password"
          required
          value={form.confPassword}
          onChange={handleForm}
        />

        <button data-test="sign-up-submit" >Cadastrar</button>
      </form>

      <Link to="/">
        Já tem uma conta? Entre agora!
      </Link>
    </SingUpContainer>
  )
}

const SingUpContainer = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
