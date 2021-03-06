import { FormEvent, useState } from "react";
import { useHistory } from "react-router-dom";

import { Button } from "../components/Button";
import { useAuth } from "../hooks/useAuth";

import illustrationImg from "../assets/images/illustration.svg";
import logoImg from "../assets/images/logo.svg";
import googleImg from "../assets/images/google-icon.svg";

import "./../styles/auth.scss";
import { database } from "../services/firebase";

export function Home() {

  const history = useHistory();
  const { user, signInWithGoogle } = useAuth();
  const [roomCode, setRoomCode] = useState('');
  const [roomName, setRoomName] = useState('');

  async function handleCreateRoom(){
    if(!user){
      await signInWithGoogle();
    }
      
    history.push('rooms/new'); 
  }

  async function handleJoinRoom(event: FormEvent){
    event.preventDefault();

    if (roomCode.trim() === "")
      return;

      const roomRef = await database.ref(`rooms/${roomCode}`).get();

      if(!roomRef.exists()){
        alert('Sala não existente.');
        return;
      }


    if(roomRef.val().endedAt){
      alert("Sala já encerrada.");
      return;
    }
      history.push(`/rooms/${roomCode}`);
  };

  async function handleJoinRoomWithName(event: FormEvent){
    event.preventDefault();

    if (roomName.trim() === "")
      return;

      database.ref('rooms').orderByChild("name").equalTo("Raja Tamil").on("child_added", (snap) => {
        console.log(snap.val());
    });
      
      const roomRef = await database.ref(`rooms/${roomCode}`).get();



      if(!roomRef.exists()){
        alert('Sala não existente.');
        return;
      }


    if(roomRef.val().endedAt){
      alert("Sala já encerrada.");
      return;
    }
      history.push(`/rooms/${roomCode}`);
  };

  return (
    <div id="page-auth">
      <aside>
        <img
          src={illustrationImg}
          alt="Ilustração simbolizando perguntas e respostas"
        />
        <strong>Crie salas de Q&amp;A ao vivo</strong>
        <p> Tire suas dúvidas de sua audiência em tempo real.</p>
      </aside>
      <main>
        <div className="main-content">
          <img src={logoImg} alt="Let me ask" />
          <button className="create-room" onClick={handleCreateRoom}>
            <img src={googleImg} alt="Logo do google" />
            Crie sua sala com o google
          </button>
          <div className="separator">ou entre em uma sala com o código</div>
          <form onSubmit={handleJoinRoom}>
            <input type="text" placeholder="Digite o nome da sala"
            onChange={event => setRoomCode(event.target.value)} value={roomCode}></input>
            <Button type="submit">Entrar na sala</Button>
          </form>
          <div className="separator">ou entre em uma sala com o nome</div>
          <form onSubmit={handleJoinRoomWithName}>
            <input type="text" placeholder="Digite o código da sala"
            onChange={event => setRoomName(event.target.value)} value={roomName}></input>
            <Button type="submit">Entrar na sala</Button>
          </form>
        </div>
      </main>
    </div>
  );
}
