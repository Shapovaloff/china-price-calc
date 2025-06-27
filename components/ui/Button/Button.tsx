import { forwardRef } from 'react';
import { ButtonProps } from './Button.interface';
import styles from './Button.module.scss';
import cn from 'classnames';

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, type = 'button', className, ...props }, ref) => {
    return (
      <button
        className={cn(styles['button'], className)}
        ref={ref}
        type={type}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
