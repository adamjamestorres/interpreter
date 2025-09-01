import { forwardRef, ReactNode } from 'react';
import clsx from 'clsx';

interface PopupProps {
  className?: string;
  children: ReactNode;
  height?: number;
  title?: string;
  onClose?: () => void;
  open?: boolean;
}

const Popup = forwardRef<HTMLDivElement, PopupProps>(({
  className,
  children,
  height = 305,
  title,
  onClose,
  open = false
}, ref) => {
  return (
    <div
      ref={ref}
      className={clsx(
        'fixed bottom-0 right-0 z-50 bg-white rounded-tl-xl shadow-[0_0_6px_#0000001a] transition-transform duration-200',
        !open && 'translate-y-full',
        className
      )}
      style={{ height }}
    >
      {title && (
        <div className="h-14 px-4 flex items-center justify-between border-b border-b-hairline-gray">
          <h2 className="text-lg text-meet-black">{title}</h2>
          {onClose && (
            <button
              onClick={onClose}
              className="w-10 h-10 -mr-2 flex items-center justify-center hover:bg-hover-gray rounded-full"
            >
              <span className="material-icons text-2xl text-meet-gray">close</span>
            </button>
          )}
        </div>
      )}
      {children}
    </div>
  );
});

// Add display name for better debugging
Popup.displayName = 'Popup';

export default Popup;
