importScripts('https://www.gstatic.com/firebasejs/3.9.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/3.9.0/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing in the
// messagingSenderId.
firebase.initializeApp({
  'messagingSenderId': '456998131508'
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function (payload) {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  const title = payload.notification.title;
  const options = {
    body: payload.notification.body,
    icon: payload.notification.icon,
    actions: [{
      action: payload.fcmOptions.link,
      title: 'Book Appointment'
    }]
  };

  return self.registration.showNotification(title, options);
});

self.addEventListener('notificationclick', (event) => {
  if (event.action) {
    clients.openWindow(event.action);
  }
  event.notification.close();
});