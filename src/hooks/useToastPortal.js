import { useState, useEffect } from 'react';
import { uuid } from 'shared';

export const useToastPortal = () => {
  const [loaded, setLoaded] = useState(false);
  const [portalId] = useState(`toast-portal-${uuid()}`);

  useEffect(() => {
    const div = document.createElement('div');
    div.id = portalId;
    div.style = 'position: fixed; top: 10px; right: 10px;';
    document.querySelector('body').prepend(div);

    setLoaded(true);

    return () => document.querySelector('body').removeChild(div);
  }, [portalId]);

  return [loaded, portalId];
};
