import React from 'react';
import './Property.scss';

export interface IPopertyProps extends React.HTMLAttributes<HTMLDivElement> {
  name?: string | null;
  value?: string | null;
}

export const Property = ({
  name,
  value,
  className,
  ...props
}: IPopertyProps) => {
  return (
    <div className={'property ' + (className ? className : '')} {...props}>
      <p className='property__name'>{name}</p>
      <p className='propert__value'>{value}</p>
    </div>
  );
};
