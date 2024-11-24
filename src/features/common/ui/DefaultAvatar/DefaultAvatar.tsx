import { FC } from "react";
import { twMerge } from "tailwind-merge";

type Props = {
  name: string | null;
  className?: string;
};

const DEFAULT_DISPLAY_NAME = "MUZYKUJ";

const DefaultAvatar: FC<Props> = ({ className, name }) => (
  <div
    className={twMerge(
      className,
      "flex aspect-square items-center justify-center bg-dark-brand-blue text-brand-black"
    )}
  >
    {(name || DEFAULT_DISPLAY_NAME).at(0)?.toUpperCase()}
  </div>
);

export default DefaultAvatar;
