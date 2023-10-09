importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js');
importScripts(
  'https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js',
);

const firebaseConfig = {
  apiKey: 'AIzaSyDjK6isLBGownY7C1AEA6n05-hjpZEleEo',
  authDomain: 'learniverse-b34d9.firebaseapp.com',
  projectId: 'learniverse-b34d9',
  storageBucket: 'learniverse-b34d9.appspot.com',
  messagingSenderId: '605501909741',
  appId: '1:605501909741:web:e9a496058fa8b1812bbae4',
  measurementId: 'G-PKVGVW8D2X',
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging(app);

messaging.onBackgroundMessage((payload) => {
  console.log('[Background] Message received. ', payload);

  const bc = new BroadcastChannel('fcm_channel');
  bc.postMessage(payload);

  const notificationTitle = payload.data.title;
  const notificationOptions = {
    body: payload.data.body,
    icon: '/favicon.png',
    data: payload.data.link,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

self.addEventListener('notificationclick', function (event) {
  console.log(event.notification);

  const targetUrl =
    event.notification.data || 'https://learniverse-front-end.vercel.app/';
  event.notification.close();

  event.waitUntil(
    clients
      .matchAll({ type: 'window', includeUncontrolled: true })
      .then(function (clientList) {
        // 해당 페이지가 이미 열려 있는지 확인
        for (let i = 0; i < clientList.length; i++) {
          const client = clientList[i];
          if (client.url === targetUrl && 'focus' in client) {
            return client.focus();
          }
        }
        // 페이지가 열려 있지 않으면 새 탭에서 열림
        if (clients.openWindow) {
          return clients.openWindow(targetUrl);
        }
      }),
  );
});

// self.addEventListener('notificationclick', function (event) {
//   event.notification.close();

//   // 클릭 액션 URL을 이용하여 새 탭을 엽니다.
//   if (event.notification.data && event.notification.data.click_action) {
//     event.waitUntil(clients.openWindow(event.notification.data.click_action));
//   }
// });
