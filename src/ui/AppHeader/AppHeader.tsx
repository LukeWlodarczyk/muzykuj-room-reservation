import { FC } from "react";
import { Link } from "react-router-dom";
import { User } from "firebase/auth";

import { paths } from "@/router";
import logo from "./logo.svg";

type Props = {
  user: User;
};

const AppHeader: FC<Props> = ({ user }) => (
  <header
    className="w-full h-14 px-4  flex justify-between items-center rounded-full"
  >
    <h1>
      <Link to={paths.RESERVATIONS}>
        <img src={logo} className="size-28 -ml-4" />
      </Link>
    </h1>
    <nav>
      <ul className="flex">
        <li>
          <Link
            to={paths.SETTINGS}
            className="group h-full pl-4 flex items-center"
          >
            <span className="mr-4 text-sm font-medium tracking-wide text-brand-black group-hover:underline">
              {user.displayName}
            </span>
            <img
              src={user.photoURL || ""}
              className="size-10 rounded-full border border-gray-200 group-hover:scale-110 duration-300"
            />
          </Link>
        </li>
      </ul>
    </nav>
  </header>
);

export default AppHeader;
