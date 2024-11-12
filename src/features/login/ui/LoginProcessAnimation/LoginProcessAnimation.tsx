import { ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Props<T> = {
  status: T;
  labels: Map<T, ReactNode>;
  onFinish: () => void;
};

const isFirstOrLast = <T,>(
  status: Props<T>["status"],
  labels: Props<T>["labels"]
) => {
  const statuses = [...labels.keys()];
  return statuses.at(0) === status || statuses.reverse().at(0) === status;
};

const isLast = <T,>(status: Props<T>["status"], labels: Props<T>["labels"]) => {
  const statuses = [...labels.keys()].reverse();
  return statuses.at(0) === status;
};

const LoginProcessAnimation = <T extends string>({
  status,
  labels,
  onFinish,
}: Props<T>) => (
  <div className="relative h-10 w-80 overflow-hidden rounded-2xl border border-[#dadce0] bg-white shadow-2xl">
    {!isFirstOrLast(status, labels) && (
      <motion.div
        className="pointer-events-none absolute z-40 h-10 w-px bg-gradient-to-b from-transparent via-cyan-500 to-transparent"
        animate={{
          x: [0, 316],
          width: [3, 1, 3],
          transition: {
            duration: 1.2,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          },
        }}
      ></motion.div>
    )}
    <AnimatePresence mode="wait">
      <motion.div
        className="flex h-10 items-center justify-center text-sm font-medium tracking-wide text-[#3c4043]"
        key={status}
        initial={{ y: 10, opacity: 0 }}
        animate={{
          //   y: [1, 0, -1],
          y: isFirstOrLast(status, labels) ? 0 : [2, 0],
          //   opacity: [1, 0.6],
          opacity: 1,
          transition: {
            y: isFirstOrLast(status, labels)
              ? {}
              : {
                  duration: 0.3,
                  repeat: Infinity,
                  repeatType: "reverse",
                },
            // opacity: {
            //   duration: 1.2,
            //   repeat: Infinity,
            //   repeatType: "reverse",
            // },
          },
        }}
        exit={{ y: -10, opacity: 0 }}
        transition={{
          ease: "easeInOut",
          duration: 0.3,
        }}
        {...(isLast(status, labels) ? { onAnimationComplete: onFinish } : {})}
      >
        {labels.get(status)}
      </motion.div>
    </AnimatePresence>
  </div>
);

export default LoginProcessAnimation;
