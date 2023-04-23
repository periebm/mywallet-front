import styled from "styled-components"
import { BiExit } from "react-icons/bi"
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai"
import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { UserContext, checkLoggedIn } from "../contexts/UserContext";
import {LsContext} from "../contexts/LocalStorageContext";

import apiAuth from "../services/apiAuth"

export default function HomePage() {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext)
  const [username, setName] = useState("")
  const [transactions, setTransactions] = useState([])
  const [total, setTotal] = useState(0);
  const [totalColor, setColor] = useState("positivo")
  const {lsUser, setLsUser} = useContext(LsContext);
  let check = null;

  useEffect(() => {

    if(localStorage.getItem("user")){
      setUser(JSON.parse(localStorage.getItem("user")))
      check = JSON.parse(localStorage.getItem("user"))
    } 

    if((check === null || check === undefined) && (user.token === null || user.token === undefined)){
      navigate("/")
      alert("Faca o login")
    }

    else {
      let cfg = {
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
          setName(res.data.username);
          setTransactions(res.data.transactions);
          sumMoney(res.data.transactions)
        })
        .catch((err) => console.log(err))
    };
  }, [])


  function sumMoney(transactions) {
    let totalSum = 0;

    transactions.forEach(e => {
      if (e.type === "entrada") totalSum += Number(e.value);
      else totalSum -= Number(e.value);
    });

    totalSum < 0 ? setColor("negativo") : setColor("positivo");
    
    if(totalSum < 0) totalSum *= -1;

    setTotal(totalSum.toFixed(2));
  }


  function logout(){
    setUser({});
    localStorage.removeItem("user");
    navigate("/");
  }

  /*   if (movie === undefined) {
      return <div>Carregando...</div>
    }
   */


  return (
    <HomeContainer>
      <Header>
        <h1>Olá, {username}</h1>
        <BiExit onClick={() => logout()} />
      </Header>

      <TransactionsContainer>
        <ul>
          {
            transactions.map((t) => (
              <ListItemContainer key={t._id}>
                <div>
                  <span>{t.date}</span>
                  <strong>{t.description}</strong>
                </div>
                <Value color={t.type === "entrada" ? "positivo" : "negativo"}>{t.value}</Value>
              </ListItemContainer>
            ))
          }
        </ul>

        <article>
          <strong>Saldo</strong>
          <Value color={totalColor}>{total}</Value>
        </article>
      </TransactionsContainer>


      <ButtonsContainer>
        <button onClick={() => navigate("/nova-transacao/entrada")}>
          <AiOutlinePlusCircle />
          <p>Nova <br /> entrada</p>
        </button>

        <button onClick={() => navigate("/nova-transacao/saida")}>
          <AiOutlineMinusCircle />
          <p>Nova <br />saída</p>
        </button>
      </ButtonsContainer>

    </HomeContainer>
  )
}

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 50px);
`
const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2px 5px 2px;
  margin-bottom: 15px;
  font-size: 26px;
  color: white;
`
const TransactionsContainer = styled.article`
  flex-grow: 1;
  background-color: #fff;
  color: #000;
  border-radius: 5px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;
  ul{
    overflow: scroll;
  }
  article {
    display: flex;
    justify-content: space-between;   
    strong {
      font-weight: 700;
      text-transform: uppercase;
    }
  }
`
const ButtonsContainer = styled.section`
  margin-top: 15px;
  margin-bottom: 0;
  display: flex;
  gap: 15px;
  
  button {
    width: 50%;
    height: 115px;
    font-size: 22px;
    text-align: left;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    p {
      font-size: 18px;
    }
  }
  `

const Value = styled.div`
  font-size: 16px;
  text-align: right;
  color: ${(props) => (props.color === "positivo" ? "green" : "red")};
`
const ListItemContainer = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  color: #000000;
  margin-right: 10px;
  div span {
    color: #c6c6c6;
    margin-right: 10px;
  }
`