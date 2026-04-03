import { useState } from 'react'
import { ArrowLeft } from 'lucide-react'
import { motion, AnimatePresence } from 'motion/react'
import bgImage from './assets/background.jpeg'
// import SpringImage from "./assets/spring.png"
import { Button } from './components/ui/button'
import { Input } from './components/ui/input'
import { toast } from 'sonner'
import { supabase } from './utils/supabase'

const App = () => {
  const [showForm, setShowForm] = useState(false)
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setIsSubmitting(true)
    
    // Insert into Supabase
    const { error } = await supabase
      .from('subscribers')
      .insert([{ email }])

    setIsSubmitting(false)

    if (error) {
      toast.error('Failed to subscribe', {
        description: error.message || "Please check your email and try again.",
      })
    } else {
      toast.success('Successfully subscribed!', {
        description: "We'll notify you when we launch.",
      })
      setEmail('')
      setShowForm(false)
    }
  }

  return (
    <div className={`relative min-h-screen w-full flex flex-col items-center p-8 font-sans overflow-hidden bg-[#FBF9F8] text-brand-dark ${showForm ? 'justify-between' : 'justify-center'}`}>
      {/* Background Image Setup */}
      <div className="absolute inset-0 z-0 flex shadow-inner pointer-events-none">
        <img
          src={bgImage}
          alt="Studio Background"
          className="w-full h-full object-cover object-center opacity-60 mix-blend-multiply -scale-x-100"
        />
      </div>

      {/* Back Button */}
      <AnimatePresence>
        {showForm && (
          <motion.button
            layout
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            onClick={() => setShowForm(false)}
            className="absolute top-5 left-5 z-20 text-brand-dark hover:scale-110 transition-transform duration-600 ease-in-out cursor-pointer"
            aria-label="Go back"
          >
            <ArrowLeft size={24} strokeWidth={1.5} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Top Header */}
      <div className={`relative z-10 uppercase tracking-[0.25em] font-medium text-sm text-center h-6 flex items-center justify-center w-full ${showForm ? 'pt-10 md:pt-16' : 'mb-12 md:mb-16'}`}>
        <AnimatePresence>
          {showForm ? (
            <motion.div
              layout
              key="inner-circle"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="absolute"
            >
              Welcome to the inner circle
            </motion.div>
          ) : (
            <motion.div
              layout
              key="launching"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="absolute"
            >
              Launching Summer 2026
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Middle Form Area */}
      {
        showForm && <div className="relative z-10 w-full flex flex-col items-center justify-center flex-1 my-8 max-[450px]:mt-20 max-w-sm sm:max-w-[450px]">
          <AnimatePresence>

            <motion.div
              layout
              key="form"
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="w-full bg-[#FAF8F6]/80 backdrop-blur-md rounded-2xl p-8 sm:p-10 shadow-sm flex flex-col items-center border border-white/60"
            >
              <h2 className="uppercase text-lg sm:text-xl tracking-[0.15em] text-brand-dark mb-6 font-medium">
                Enter your email
              </h2>
              <form onSubmit={handleSubmit} className="w-full space-y-4">
                <Input
                  type="email"
                  name="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  disabled={isSubmitting}
                  className="w-full h-10 border-brand-dark/30 text-brand-dark bg-transparent focus-visible:ring-brand-light focus-visible:border-brand-light focus-visible:ring-1 rounded-md transition-all outline-none"
                />
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-10 bg-brand-light hover:bg-brand-dark text-[#FBF9F8] uppercase tracking-widest rounded-full transition-colors duration-600 ease-in-out"
                >
                  {isSubmitting ? 'Joining...' : 'Join Mailing List'}
                </Button>
              </form>
              {/* <p className="text-[9px] sm:text-[10px] tracking-wider text-brand-dark/60 mt-4 text-center">
                Your Canva profile name won't be shared. Never submit passwords.
              </p> */}
            </motion.div>
          </AnimatePresence>
        </div>
      }


      {/* Bottom Area */}
      <motion.div layout transition={{ duration: 0.6, ease: "easeInOut" }} className={`relative z-10 flex flex-col items-center justify-center pb-12 min-h-[160px] ${showForm ? 'mt-auto' : ''}`}>
        <motion.div layout transition={{ duration: 0.6, ease: "easeInOut" }} className="text-center w-full" style={{
          marginTop: showForm ? "10px" : "150px",
          marginBottom: showForm ? "32px" : "32px"
        }}>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-[0.25em] text-brand-dark mb-4 max-[450px]:mt-5">
            Three13 Studio
          </h1>
        </motion.div>

        <div className="relative w-full flex items-center justify-center h-[48px]">
          <AnimatePresence>
            {!showForm && (
              <motion.div
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                className="absolute"
              >
                <Button
                  onClick={() => setShowForm(true)}
                  variant="outline"
                  className="rounded-full border-brand-dark border-[1.5px] text-brand-dark bg-transparent hover:bg-brand-dark hover:text-white px-8 h-12 uppercase tracking-[0.15em] text-xs font-semibold transition-all duration-600 ease-in-out cursor-pointer"
                >
                  Save Your Seat →
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  )
}

export default App