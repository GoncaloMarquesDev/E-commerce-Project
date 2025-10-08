import { useEffect, useRef, useState, Children, type ReactNode } from "react";
import "./Carousel.scss";

interface CarouselProps {
  children: ReactNode;
  interval?: number;
}

function Carousel({ children, interval = 2500 }: CarouselProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [step, setStep] = useState<number>(0);
  const [visibleCount, setVisibleCount] = useState<number>(1);
  const [index, setIndex] = useState<number>(0);
  const [direction, setDirection] = useState<number>(1);
  const [paused, setPaused] = useState<boolean>(false);

  const items = Children.toArray(children);

  // calcula largura do card + gap + quantos cabem no ecrã
  useEffect(() => {
    if (!containerRef.current) return;

    const card =
      containerRef.current.querySelector<HTMLDivElement>(".carousel-item");
    if (!card) return;

    const cardStyles = getComputedStyle(card);
    const cardWidth = parseFloat(cardStyles.width) || 200;

    const containerStyles = getComputedStyle(containerRef.current);
    const gap = parseFloat(containerStyles.gap) || 0;

    setStep(cardWidth + gap);

    const containerWidth = containerRef.current.offsetWidth;
    setVisibleCount(Math.floor(containerWidth / (cardWidth + gap)) || 1);
  }, [items.length]);

  // auto-scroll tipo ping-pong
  useEffect(() => {
    if (items.length === 0 || paused) return;

    const id: ReturnType<typeof setInterval> = setInterval(() => {
      setIndex((prev) => {
        let next = prev + direction;

        if (next > items.length - visibleCount) {
          setDirection(-1);
          next = prev - 1;
        } else if (next < 0) {
          setDirection(1);
          next = prev + 1;
        }

        return next;
      });
    }, interval);

    return () => clearInterval(id);
  }, [items.length, interval, direction, paused, visibleCount]);

  return (
    <div
      className="carousel"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div ref={containerRef} className="carousel-track-wrapper">
        <div
          className="carousel-track"
          style={{
            transform: `translateX(-${index * step}px)`,
            transition: "transform 0.7s ease-in-out",
            display: "flex",
          }}
        >
          {items.map((child, i) => (
            <div key={i} className="carousel-item">
              {child}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Carousel;
