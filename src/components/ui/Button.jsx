import { motion } from 'framer-motion';

const VARIANTS = {
  primary: 'btn btn-primary',
  secondary: 'btn btn-secondary',
  terracotta: 'btn btn-terracotta',
  bare: '',
};

export function Button({
  children,
  variant = 'primary',
  className = '',
  icon = null,
  trailing = null,
  type = 'button',
  ...props
}) {
  return (
    <motion.button
      type={type}
      whileHover={{ y: -1 }}
      whileTap={{ scale: 0.99 }}
      className={`${VARIANTS[variant] ?? VARIANTS.primary} group ${className}`}
      {...props}
    >
      {icon}
      {children ? <span>{children}</span> : null}
      {trailing}
    </motion.button>
  );
}
