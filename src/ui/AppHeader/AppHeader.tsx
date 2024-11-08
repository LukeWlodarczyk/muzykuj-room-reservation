import { FC } from "react";
import { Link } from "react-router-dom";
import { User } from "firebase/auth";

import { paths } from "@/router";
import logo from "./logo.svg";

type Props = {
  user: User;
};

const AppHeader: FC<Props> = ({ user }) => (
  <header className="flex h-14 w-full items-center justify-between rounded-full px-4">
    <h1>
      <Link to={paths.RESERVATIONS}>
        <img src={logo} className="-ml-4 size-28" />
      </Link>
    </h1>
    <nav>
      <ul className="flex">
        <li>
          <Link
            to={paths.SETTINGS}
            className="group flex h-full items-center pl-4"
          >
            <span className="mr-4 text-sm font-medium tracking-wide text-brand-black group-hover:underline">
              {user.displayName}
            </span>
            <img
              src={user.photoURL || ""}
              className="size-10 rounded-full border border-gray-200 duration-300 group-hover:scale-110"
            />
          </Link>
        </li>
      </ul>
    </nav>
  </header>
);

export default AppHeader;
