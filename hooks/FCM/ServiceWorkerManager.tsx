import { useEffect } from 'react';

const ServiceWorkerManager = () => {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').then(
          (registration) => {
            console.log('SW registered: ', registration);
          },
          (err) => {
            console.log('SW registration failed: ', err);
          },
        );
        navigator.serviceWorker.register('/firebase-messaging-sw.js').then(
          (registration) => {
            console.log('FCM registered: ', registration);
          },
          (err) => {
            console.log('FCM registration failed: ', err);
          },
        );
      });
    }
  }, []);

  return null;
};

export default ServiceWorkerManager;
