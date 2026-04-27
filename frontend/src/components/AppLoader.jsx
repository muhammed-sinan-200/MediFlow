import { motion, AnimatePresence } from "framer-motion";
import { Cross } from "lucide-react";

export default function AppLoader({ isLoading }) {
  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-white"
        >
          <div className="relative flex flex-col items-center justify-center gap-6">
            
            <motion.div
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{
                opacity: [0.25, 0.45, 0.25],
                scale: [0.9, 1.2, 0.9],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute h-40 w-40 rounded-full bg-purple-200/60 blur-3xl"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.8, filter: "blur(8px)" }}
              animate={{
                opacity: 1,
                scale: [0.9, 1.05, 1],
                filter: "blur(0px)",
              }}
              transition={{
                duration: 0.9,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="relative z-10 flex h-16 w-16 items-center justify-center rounded-[1.4rem] bg-purple-700 shadow-[0_20px_50px_rgba(126,34,206,0.25)]"
            >
              <Cross size={32} strokeWidth={2.4} className="text-white" />
            </motion.div>

            <div className="relative h-[3px] w-24 overflow-hidden rounded-full bg-purple-100">
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: "200%" }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="h-full w-10 rounded-full bg-gradient-to-r from-violet-500 via-fuchsia-500 to-purple-600"
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}