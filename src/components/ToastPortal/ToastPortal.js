import { forwardRef, useImperativeHandle, useState } from 'react';
import ReactDOM from 'react-dom';
import { useToastPortal } from 'hooks';
import styles from './styles.module.scss';
import { Toast } from 'components';
import { uuid } from 'shared';

export const ToastPortal = forwardRef(
  ({ autoClose, autoCloseTime }, ref) => {
    const [toasts, setToasts] = useState([]);
    const [loaded, portalId] = useToastPortal();

    const removeToast = id => {
      setToasts(toasts.filter(t => t.id !== id));
    };

    useImperativeHandle(ref, () => ({
      addMessage(toast) {
        setToasts([...toasts, { ...toast, id: uuid() }]);
      }
    }));

    return loaded ? (
      ReactDOM.createPortal(
        <div className={styles.toastContainer}>
          {toasts.map(t => (
            <Toast
              key={t.id}
              mode={t.mode}
              message={t.message}
              onClose={() => removeToast(t.id)}
            />
          ))}
        </div>,
        document.getElementById(portalId),
      )
    ) : (
      <></>
    );
  },
);
