import { ReactNode } from "react";
import cx from "classnames";

import "./styles.scss";

type QuestionProps = {
  content: string;
  author: {
    name: string;
    avatar: string;
  };
  children?: ReactNode;
  isAnswered?: boolean;
  isHighlighted?: boolean;
};

export function Question({
  content,
  author,
  children,
  isAnswered = false,
  isHighlighted = false,
}: QuestionProps) {
  console.log(content, isAnswered, isHighlighted);
  return (
    <div
      /*className={`question ${isAnswered ? 'isanswered' : ''} ${isHighlight ? 'ishighlight' : ''}`}*/
      className={cx(
        "question",
        { answered: isAnswered },
        { highlighted: isHighlighted && !isAnswered} /*por que o css da pergunta respondida prevalece sobre o high, 
        já que pergunta terá os dois estados como verdadeiro*/
      )}
    >
      <p>{content}</p>
      <footer>
        <div className="user-info">
          <img src={author.avatar} alt={author.name} />
          <span>{author.name}</span>
        </div>
        <div>{children}</div>
      </footer>
    </div>
  );
}
