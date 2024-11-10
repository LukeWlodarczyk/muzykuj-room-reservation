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
      "flex items-center justify-center bg-dark-brand-blue"
    )}
  >
    {(name || DEFAULT_DISPLAY_NAME).at(0)}
  </div>
);

export default DefaultAvatar;
