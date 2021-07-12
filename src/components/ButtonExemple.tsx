type ButtonProps = {
  text?: string; //texto opcional
};

/* FIXME: permite epxortar mais de uma função no mesmo arquivo, e é bom,
para o caso de precisar mudar o nome do botão, o arquivo que o esta importando
irá acusar o erro. devido a exportação nomeada.
deiferente da exportação default, que o arquivo não dará erro.*/
export function Button(props: ButtonProps) {
  return (
    <button>
      {props.text || "Caso o valor seja vazio, preenche com esse texto"}
    </button>
  );
}

/*propriedades podem enviar qualquer informação.*/

/* Ao enviar uma propriedade por dentro da tag, ela se chama children

<Button> AQUI_VAI_A_CHILDREN </Button>

<Button PROPS/>

como fica o type com a children

type ButtonProps = {
  children?: string; //texto opcional
};

e acessa a propriedade
{props.children}

É a unica propriedade que não pode ser nomeada
*/