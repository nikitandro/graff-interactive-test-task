import { useEffect } from 'react';
import './Button.scss';

export const Button = ({
  children,
  icon,
  className,
  ...props
}: IButtonProps) => {
  return (
    <button
      className={
        `button ${children && icon ? ' ' : 'button_mono '}` +
        (className ? className : '')
      }
      {...props}
    >
      {icon ? <img src={icon} className='button__icon' /> : <></>}
      <span className='button__text'>{children}</span>
    </button>
  );
};

export interface IButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: any;
}
