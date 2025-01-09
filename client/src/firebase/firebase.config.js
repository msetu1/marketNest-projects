// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCo86P3c4c39XneeKCWVCaHsk9S6reiTcU",
  authDomain: "marketnest-projects.firebaseapp.com",
  projectId: "marketnest-projects",
  storageBucket: "marketnest-projects.appspot.com",
  messagingSenderId: "541100039209",
  appId: "1:541100039209:web:7e867ddced14e69788d038"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;