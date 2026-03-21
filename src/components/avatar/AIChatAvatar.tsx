import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X, Minimize2, Maximize2, Bot } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function AIChatAvatar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)

  return (
    <>
      <AnimatePresence>
        {!isOpen && !isMinimized && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-24 right-6 z-50 flex items-center gap-3 overflow-hidden rounded-full bg-white p-2.5 pr-6 text-primary shadow-2xl ring-1 ring-black/5 hover:bg-bg-secondary hover:shadow-glow transition-all duration-300 md:bottom-[104px] md:right-8"
            aria-label="Open chat assistant"
          >
            <div className="relative">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary">
                <Bot className="h-5 w-5 text-primary" />
              </div>
              <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
                <span className="relative inline-flex h-3.5 w-3.5 rounded-full bg-accent" />
              </span>
            </div>
            <span className="hidden text-sm font-semibold md:block">Chat with Us</span>
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
              height: isMinimized ? 'auto' : undefined,
            }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className={cn(
              'fixed right-6 z-50 flex flex-col',
              'w-[380px] max-w-[calc(100vw-3rem)] overflow-hidden',
              'rounded-2xl bg-white shadow-2xl ring-1 ring-black/5',
              'bottom-40 md:bottom-[164px]',
              isMinimized ? 'h-auto' : 'h-[600px] max-h-[calc(100vh-6rem)]'
            )}
          >
            {/* Header */}
            <div className="flex items-center justify-between gap-3 bg-primary px-4 py-3.5">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary">
                    <Bot className="h-5 w-5 text-primary" />
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">Amigo Support</h3>
                  <p className="text-[11px] font-medium text-white/70">Online now</p>
                </div>
              </div>
              
              {/* Window Controls */}
              <div className="flex items-center gap-1.5 -mr-1">
                <button
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="rounded-full p-1.5 text-white/70 hover:bg-white/10 hover:text-white transition-colors"
                  aria-label={isMinimized ? "Maximize window" : "Minimize window"}
                >
                  {isMinimized ? (
                    <Maximize2 className="h-4 w-4" />
                  ) : (
                    <Minimize2 className="h-4 w-4" />
                  )}
                </button>
                <button
                  onClick={() => {
                    setIsOpen(false)
                    setIsMinimized(false)
                  }}
                  className="rounded-full p-1.5 text-white/70 hover:bg-white/10 hover:text-white transition-colors"
                  aria-label="Close chat"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Bey.chat Iframe Area */}
            {!isMinimized && (
              <div id="agent-container" className="flex-1 w-full bg-white relative">
                <iframe
                  src="https://bey.chat/agent/85fb8ebb-4310-435e-a126-cdcfd74f190b"
                  style={{ width: '100%', height: '100%', border: 'none' }}
                  allow="camera; microphone; fullscreen"
                  allowFullScreen
                  title="Amigo Chatbot"
                />
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
