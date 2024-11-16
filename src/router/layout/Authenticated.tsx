import { FC } from "react";
import { Navigate, Outlet } from "react-router-dom";

import Page from "@/features/common/ui/Page";
import AppHeader from "@/features/common/components/AppHeader";

import { useAuthContext } from "@/features/common/context/auth";

const Authenticated: FC = () => {
  const { user, loading } = useAuthContext();

  if (loading)
    return (
      <Page className="h-dvh min-h-dvh" hasBlur>
        Laoding
      </Page>
    );

  if (!user) return <Navigate to={"/login"} />;

  return (
    <Page className="h-dvh min-h-dvh p-4">
      <AppHeader user={user} />
      <Outlet />
    </Page>
  );
};

export default Authenticated;
