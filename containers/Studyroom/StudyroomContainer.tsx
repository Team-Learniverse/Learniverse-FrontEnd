// eslint-disable-next-line import/no-extraneous-dependencies
import { initializeApp } from 'firebase/app';
// eslint-disable-next-line import/no-extraneous-dependencies
import { getMessaging, getToken, onMessage } from 'firebase/messaging';

import { useEffect } from 'react';
import { styled } from 'styled-components';

import { Studyroom } from '@/components/Studyroom';
import { usePushNotification } from '@/hooks/usePushNotification';

const StudyroomContainer = () => {
  const pushNotification = usePushNotification();

  const askPermission = async () => {
    const permission = await window.Notification.requestPermission();
    if (permission !== 'granted') return;

    const firebaseApp = initializeApp({
      apiKey: 'AIzaSyDjK6isLBGownY7C1AEA6n05-hjpZEleEo',
      authDomain: 'learniverse-b34d9.firebaseapp.com',
      projectId: 'learniverse-b34d9',
      storageBucket: 'learniverse-b34d9.appspot.com',
      messagingSenderId: '605501909741',
      appId: '1:605501909741:web:e9a496058fa8b1812bbae4',
      measurementId: 'G-PKVGVW8D2X',
    });
    const messaging = getMessaging(firebaseApp);
    getToken(messaging, {
      vapidKey:
        'BFkKBCZ5O4qmyCwm50Aks7sRmMYJzF2wJ8FZCHNLXDLjVxMDEQJFZ_4U5I6uDBF1zXiRHChNAeeDWrTg2m0eL_k',
    })
      .then((currentToken) => {
        if (currentToken) {
          console.log('currentToken', currentToken);
        } else {
          console.log(
            'No registration token available. Request permission to generate one.',
          );
        }
      })
      .catch((err) => {
        console.log('An error occurred while retrieving token. ', err);
      });

    onMessage(messaging, (payload) => {
      console.log('Message received. ', payload);
    });

  };

  useEffect(() => {
    askPermission();
    if (pushNotification) {
      pushNotification.fireNotification('스크린이 캡처되었습니다!', {
        body: '60초 이내에 전송해주세요!',
      });
    }
  }, []);

  return (
    <StStudyroomWrapper>
      <Studyroom />
    </StStudyroomWrapper>
  );
};

export default StudyroomContainer;

const StStudyroomWrapper = styled.main`
  & > p {
    color: ${({ theme }) => theme.colors.White};
    ${({ theme }) => theme.fonts.Body0};
  }
`;
