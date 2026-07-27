import React from 'react';
import { Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function PixInfoBlock({ isEligible = false }) {
  return (
    <AnimatePresence>
      {isEligible && (
        <motion.div
          initial={{ opacity: 0, height: 0, marginBottom: 0 }}
          animate={{ opacity: 1, height: 'auto', marginBottom: 16 }}
          exit={{ opacity: 0, height: 0, marginBottom: 0, overflow: 'hidden' }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
        >
          <div className="bg-[#ebfbf0] border border-[#bbf7d0] rounded-xl p-4 flex items-start gap-3 shadow-sm">
            <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center shrink-0">
              <Zap className="w-4 h-4 text-green-600" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-green-800 uppercase tracking-wide mb-0.5">
                Benefício disponível: 5% OFF no PIX à vista
              </h3>
              <p className="text-xs text-green-900/80 font-medium leading-tight">
                Finalize sua compra via Pix e garanta este desconto extra.
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}