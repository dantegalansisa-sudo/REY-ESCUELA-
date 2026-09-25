import { motion } from 'framer-motion'
import { WhatsAppIcon } from './icons'
import { WA_DEFAULT } from '../data/site'

export default function WhatsAppFloat() {
  return (
    <motion.a
      href={WA_DEFAULT}
      target="_blank"
      rel="noopener noreferrer"
      className="wa-float"
      aria-label="Escríbenos por WhatsApp"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1.4, type: 'spring', stiffness: 260, damping: 18 }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.94 }}
    >
      <WhatsAppIcon size={30} />
    </motion.a>
  )
}
