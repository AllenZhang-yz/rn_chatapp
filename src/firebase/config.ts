import Firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyA0V93bT_QfHcoPyHGJtmQTXd3sf5-zBDk',
  databaseURL: 'https://rn-chatapp-3094c.firebaseio.com/',
  projectId: 'rn-chatapp-3094c',
  appId: '1:41198927019:android:255d64860da93e5925cbee',
};

export default Firebase.initializeApp(firebaseConfig);
