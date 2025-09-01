import { ButtonHTMLAttributes, ReactNode } from 'react';
import IconButton from './IconButton';

interface CallControlButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: ReactNode;
  active?: boolean;
  variant?: 'primary' | 'secondary' | 'danger';
}

const CallControlButton = ({
  icon,
  active = false,
  variant = 'primary',
  ...props
}: CallControlButtonProps) => {
  const variantMap = {
    primary: 'primary',
    secondary: 'secondary',
    danger: 'outline',
  } as const;

  return (
    <IconButton
      size="lg"
      variant={variantMap[variant]}
      active={active}
      className={variant === 'danger' ? 'bg-red-500 text-white hover:bg-red-600 border-red-500' : ''}
      {...props}
    >
      {icon}
    </IconButton>
  );
};

export default CallControlButton;
