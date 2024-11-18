import { FC, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

type Props = {
  children: ReactNode;
  className?: string;
};

const Card: FC<Props> = ({ children, className }) => (
  <section
    className={twMerge(
      "h-[88%] rounded-2xl border border-white/35 bg-white/5 p-4 shadow-2xl backdrop-blur-lg",
      className
    )}
  >
    {children}
  </section>
);

export default Card;
