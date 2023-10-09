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
    });

    return () => unsubscribe();
  }, []);
};

export default useFCMPushAlarm;
