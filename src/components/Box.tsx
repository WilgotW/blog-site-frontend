import { useEffect, useRef, useCallback } from 'react';

interface RotateOnHoverProps {
  deg?: number;
}

const useRotateOnHover = (deg = 5) => {
    const ref = useRef<HTMLDivElement>(null);
    const handleMouseMove = useCallback((e: MouseEvent) => {
        if (!ref.current) return;
        const width = ref.current.clientWidth;
        const height = ref.current.clientHeight;
        const centerX = width / 2;
        const centerY = height / 2;
        const deltaX = e.clientX - centerX;
        const deltaY = e.clientY - centerY;
        const rotate = Math.atan2(deltaY, deltaX);
        ref.current.style.transform = `rotate(${rotate}rad)`;
    }, [ref]);
    const handleMouseLeave = useCallback(() => {
        if (!ref.current) return;
        ref.current.style.transform = 'rotate(0deg)';
    }, [ref]);
};

const Box: React.FC<RotateOnHoverProps> = ({ deg }) => {
  const ref = useRef<HTMLDivElement>(null);
  return (
    <div className='box' ref={ref}></div>
  )
};

export default Box;