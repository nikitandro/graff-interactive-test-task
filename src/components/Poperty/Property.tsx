import './Property.scss';

export interface IPopertyProps {
  name: string;
  value: string;
}

export const Property = ({ name, value }: IPopertyProps) => {
  return (
    <div className='property'>
      <p className='property__name'>{name}</p>
      <p className='propert__value'>{value}</p>
    </div>
  );
};
