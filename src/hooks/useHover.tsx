import { RefObject, useEffect, useRef, useState } from 'react';

function useHover<T extends HTMLElement = HTMLElement>(): [
  RefObject<T>,
  boolean
] {
  const [value, setValue] = useState<boolean>(false);
  const ref = useRef<T>(null);

  const handleMouseOver = () => setValue(true);
  const handleMouseOut = () => setValue(false);

  useEffect(() => {
    const node = ref.current;
    if (node) {
      node.addEventListener('mouseover', handleMouseOver);
      node.addEventListener('mouseout', handleMouseOut);
      return () => {
        node.removeEventListener('mouseover', handleMouseOver);
        node.removeEventListener('mouseout', handleMouseOut);
      };
    }
  });

  return [ref, value];
}

export default useHover;
