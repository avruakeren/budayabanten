import { AnimatePresence, motion } from 'framer-motion';

export function Toast({ message }) {
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-5 z-[80] flex justify-center px-4">
      <AnimatePresence>
        {message ? (
          <motion.div
            role="status"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.18 }}
            className="max-w-md rounded-md border border-line bg-ink px-4 py-2.5 text-center text-xs font-medium text-paper"
          >
            {message}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
