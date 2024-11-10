import { FC } from "react";
import { twMerge } from "tailwind-merge";

import logo from "@/features/login/assets/logo.svg";

type Props = {
  className?: string;
};

const Logo: FC<Props> = ({ className }) => (
  <img
    className={twMerge("size-login-logo rounded-full", className)}
    src={logo}
    alt="Muzykuj logo"
  />
);

export default Logo;
