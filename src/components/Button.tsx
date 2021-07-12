import { ButtonHTMLAttributes } from "react";
import './../styles/button.scss';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  isOutlined?: boolean;
};

export function Button({ isOutlined = false, ...props}: ButtonProps) {
  //rest operator
  //setando valor false por padrão se não definido
  return (
    <button className={ `button ${isOutlined ? 'outlined' : '' }`}
    {...props}/>
  );
}