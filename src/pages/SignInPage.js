import styled from "styled-components"
import { Link, useNavigate } from "react-router-dom"
import MyWalletLogo from "../components/MyWalletLogo"
import api from "../services/api";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import {LsContext} from "../contexts/LocalStorageContext";

export default function SignInPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const {user, setUser} = useContext(UserContext);
  const {lsUser, setLsUser} = useContext(LsContext);
  
  useEffect(() => {
    if(localStorage.getItem("user")){
      setLsUser(JSON.parse(localStorage.getItem("user")))
      navigate("/home")
    } 
  }, [])


  function handleForm(e) {
    setForm({...form,[e.target.name]:e.target.value});
  }

  function handleLogin(e) {
    e.preventDefault();
    
    api.login(form)
      .then((res) => {
        const {name, token} = res.data;
        setUser({name, token});
        localStorage.setItem("user",JSON.stringify({name, token}));
        setLsUser(JSON.parse(localStorage.getItem("user")));
        navigate("/home");
      }).catch((err) => {
        alert(err.response.data)
      });
  }

  return (
    <SingInContainer>
      <form onSubmit={handleLogin}>
        <MyWalletLogo />
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
          required
          autoComplete="new-password" 
          value={form.password}
          onChange={handleForm}
          />
          
        <button data-test="sign-in-submit" type="submit">Entrar</button>
      </form>

      <Link to="/cadastro">
        Primeira vez? Cadastre-se!
      </Link>
    </SingInContainer>
  )
}

const SingInContainer = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
