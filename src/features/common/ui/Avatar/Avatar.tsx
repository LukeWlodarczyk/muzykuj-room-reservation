import { FC, useState } from "react";
import { twMerge } from "tailwind-merge";
import DefaultAvatar from "../DefaultAvatar";

type Props = {
  photoURL: string | null;
  displayName: string | null;
  className?: string;
};

const Avatar: FC<Props> = ({ className, photoURL, displayName }) => {
  const [isError, setIsError] = useState(false);

  const styles = twMerge(
    "size-10 rounded-full border border-gray-200",
    className
  );

  if (!photoURL || isError) {
    return <DefaultAvatar name={displayName} className={styles} />;
  }

  return (
    <img src={photoURL} className={styles} onError={() => setIsError(true)} />
  );
};

export default Avatar;
