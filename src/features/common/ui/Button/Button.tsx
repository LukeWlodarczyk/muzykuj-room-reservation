import { ButtonHTMLAttributes, FC } from "react";
import { twMerge } from "tailwind-merge";

type Props = ButtonHTMLAttributes<HTMLButtonElement>;

const Button: FC<Props> = ({ children, className, ...props }) => (
  <button
    className={twMerge(
      "relative rounded-2xl border px-4 py-1 text-base text-brand-black hover:bg-brand-black/10",
      className
    )}
    {...props}
  >
    {children}
  </button>
);

export default Button;
