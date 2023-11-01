/* eslint-disable @typescript-eslint/no-unused-vars */
import 'firebase/messaging';

import firebase from 'firebase/app';
import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';

import { captureTimeState } from '@/recoil/atom';

import useFirebaseInit from './useFirebaseInit';

const useFCMPushAlarm = () => {
  useFirebaseInit();
  const setCaptureTime = useSetRecoilState(captureTimeState);

  // BroadcastChannel 구독
  const channel = new BroadcastChannel('fcm_channel');

  useEffect(() => {
    channel.onmessage = (event: MessageEvent) => {
      setCaptureTime((prev) => prev + 1);
    };
  }, []);

  useEffect(() => {
    const messaging = firebase.messaging();

    const unsubscribe = messaging.onMessage((payload) => {
      console.log('[Foreground] Message received. ', payload);
      setCaptureTime((prev) => prev + 1);

      if (!('Notification' in window)) {
        console.log('This browser does not support system notifications');
      } else if (Notification.permission === 'granted') {
        navigator.serviceWorker.getRegistration().then((reg) => {
          if (reg) {
            const notificationTitle = payload.data.title;
            const notificationOptions = {
              body: payload.data.body,
              icon: 'https://user-images.githubusercontent.com/73213437/279809546-59329a6d-139a-43c1-92a9-9bdaa767df5e.png',
              data: payload.data.link,
            };
            reg.showNotification(notificationTitle, notificationOptions);
          }
        });
      }
    });

    return () => unsubscribe();
  }, []);
};

export default useFCMPushAlarm;
