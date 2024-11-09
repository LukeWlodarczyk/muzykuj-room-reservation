import { FC, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

type Props = {
  children: ReactNode;
  className?: string;
  hasBlur?: boolean;
};

const Page: FC<Props> = ({ children, className, hasBlur = false }) => (
  <section className={twMerge("relative", className)}>
    <div
      className={twMerge(
        "fixed -z-10 h-full w-full scale-75 rounded-full bg-brand-blue",
        hasBlur && "blur-3xl"
      )}
    ></div>
    <div
      className={twMerge(
        "fixed -left-1/4 -top-1/3 -z-10 h-1/2 w-full rounded-full bg-[#2ca4c9]",
        hasBlur && "blur-3xl"
      )}
    ></div>
    <div
      className={twMerge(
        "fixed left-1/3 top-2/3 -z-10 h-full w-full rotate-6 scale-75 rounded-full bg-[#2ca4c9]",
        hasBlur && "blur-3xl"
      )}
    ></div>
    <div className="bg-noise fixed left-0 top-0 -z-10 h-full w-full opacity-30"></div>
    {children}
  </section>
);

export default Page;
