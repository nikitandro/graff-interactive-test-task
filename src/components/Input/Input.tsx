import './Input.scss';

export const Input = ({ title }: IInputProps) => {
  return (
    <div className='input'>
      <p className='input__title'>{title}</p>
      <input type='text' />
    </div>
  );
};

export interface IInputProps {
  title: string;
  type: 'text' | 'list';
}
