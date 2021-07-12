import { useEffect, useState } from "react";
import { database } from "../services/firebase";
import { useAuth } from "./useAuth";

type Questions = {
  id: string;
  author: {
    name: string;
    avatar: string;
  };
  content: string;
  isAnswered: boolean;
  isHighlighted: boolean;
  likeCount: number;
  likeId: string | undefined;
};

type FirebaseQuestions = Record<
  string,
  {
    author: {
      name: string;
      avatar: string;
    };
    content: string;
    isAnswered: boolean;
    isHighlighted: boolean;
    likes: Record<
      string,
      {
        authorId: string;
      }
    >;
  }
>;

export function useRoom(roomId: string) {
  const { user } = useAuth();
  const [questions, setQuestions] = useState<Questions[]>([]);
  const [title, setTitle] = useState("");

  //dispara um evento, sempre que uma informação mudar
  // mas se nao for passado informação no [], sera executado uma unica vez
  useEffect(() => {
    const roomRef = database.ref(`rooms/${roomId}`);

    //FIXME: tem como pegar apenas valores novos child added
    roomRef.on("value", (room) => {
      const databaseRoom = room.val();
      const firebaseQuestions: FirebaseQuestions = databaseRoom.questions ?? {};

      const parsedQuestions = Object.entries(firebaseQuestions).map(
        ([key, value]) => {
          return {
            id: key,
            content: value.content,
            author: value.author,
            isHighlighted: value.isHighlighted,
            isAnswered: value.isAnswered,
            likeCount: Object.values(value.likes ?? {}).length,
            likeId: Object.entries(value.likes ?? {}).find(
              ([key, like]) => like.authorId === user?.id)?.[0],
              /*Se o usuario nao tiver dado like naquela questão, nao ira retornar nada
              o usuario nao vai conseguir acessar a posição 0. 
              com o sinal `?` se nao retornar nada, nem tenta acessar a posicao 0*/
          };
        }
      );

      setTitle(databaseRoom.title);
      setQuestions(parsedQuestions);
    });

    return () => {
      roomRef.off("value");
    }
  }, [roomId, user?.id]
  
  
  );
  /*A informaçnao de user ID vem de fora, e o hooks depende dela pra funcionar
  logo, na alteracao da mesma, o hooks precisa alterar seu comportamento.
  logo, ele prcisa estar no array de dependencias que ira alterar o hooks para
  atualizar conforme o novo dado.*/

  return { questions, title };
}
