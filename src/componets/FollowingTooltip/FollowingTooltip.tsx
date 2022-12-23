import React, { useEffect, useRef, useState } from 'react';
import './followingTooltip.scss';

interface Props {
  title: string;
}

export const FollowingTooltip: React.FC<Props> = ({ title }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [calculatig, setCalculatig] = useState(true);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const offset = { x: -12, y: 4 };

    if (ref.current) {
      offset.y += ref.current.clientHeight / 2;
    }

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX + offset.x,
        y: e.clientY + offset.y,
      });

      if (calculatig) {
        setCalculatig(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => (
      window.removeEventListener('mousemove', handleMouseMove)
    );
  }, []);

  return (
    <div
      style={{
        top: mousePosition.y,
        left: mousePosition.x,
        ...(calculatig && { visibility: 'hidden' }),
      }}
      className="tooltip"
      ref={ref}
    >
      {title}
    </div>
  );
};
