import { useVoice } from "@humeai/voice-react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "../ui/button";
import { Phone } from "lucide-react";

export default function StartCall() {
  const { status, connect } = useVoice();

  return (
    <AnimatePresence>
      {status.value !== "connected" && (
        <motion.div
          className="fixed bottom-6 right-6 z-50"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
        >
          <Button
            className="flex items-center gap-1.5 px-4 py-2 shadow-lg bg-gradient-to-r from-[#36828c] to-[#6bd7e7] text-white"
            onClick={() => {
              connect().catch(() => {});
            }}
          >
            <Phone className="size-4 opacity-80" />
            <span>Start Call</span>
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
