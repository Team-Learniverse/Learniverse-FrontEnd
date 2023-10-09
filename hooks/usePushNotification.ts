/* eslint-disable consistent-return */
/* eslint-disable no-useless-return */
import { useRef } from 'react';

export const usePushNotification = () => {
  const notificationRef = useRef<Notification | null>(null);

  // Notification이 지원되지 않는 브라우저가 있을 수 있기 때문에, 이를 대비해 Early return 문을 걸어준다.
  if (typeof Notification === 'undefined') {
    console.log('Notification undefiend');
    return;
  }

  // 만약 이미 유저가 푸시 알림을 허용해놓지 않았다면,
  if (Notification.permission !== 'granted') {
    // Chrome - 유저에게 푸시 알림을 허용하겠냐고 물어보고, 허용하지 않으면 return!
    try {
      Notification.requestPermission().then((permission) => {
        if (permission !== 'granted') return;
      });
    } catch (error) {
      // Safari - 유저에게 푸시 알림을 허용하겠냐고 물어보고, 허용하지 않으면 return!
      if (error instanceof TypeError) {
        Notification.requestPermission().then((permission) => {
          if (permission !== 'granted') return;
        });
      } else {
        console.error(error);
      }
    }
  }

  // 유저가 푸시 알림을 클릭하면, 푸시 알림이 일어난 화면으로 이동하기
  const setNotificationClickEvent = () => {
    if (notificationRef.current) {
      notificationRef.current.onclick = (event: Event) => {
        event.preventDefault();
        window.focus();
        notificationRef.current?.close();
      };
    }
  };

  const closeNotification = () => {
    notificationRef.current?.close();
  };

  const fireNotification = (title: string, options?: NotificationOptions) => {
    const newOption: NotificationOptions = {
      badge: '/favicon-32x32.png',
      icon: '/favicon-32x32.png',
      requireInteraction: true,
      ...options,
    };

    // notificationRef에 Notification을 넣어준다. 이 친구는 이렇게 할당만해도 바로 실행된다.
    notificationRef.current = new Notification(title, newOption);

    // 위에서 만든 클릭 이벤트 걸어주기
    setNotificationClickEvent();
  };

  return { fireNotification, closeNotification };
};
