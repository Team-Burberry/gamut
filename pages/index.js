import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import firebase from '../firebase.js'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div>
          <button onClick={
            (e)=>{
              console.log('trying to sign out');
              const auth = getAuth();
              signOut(auth).then(() => {
                console.log('signed out');
              }).catch((error) => {
                console.log('Something went wrong with the sign out process: ');
              });
            }
          }>Sign Out</button>
          <h1>Log in</h1>
          <input type="email" placeholder="partyHausRulz@gmail.com"/>
          <input type="password" placeholder="IzCheatingWithHardCodingThis"/>
          <button onClick={e=>{
            const email = 'partyHausRulz@gmail.com';
            const password = 'IzCheatingWithHardCodingThis';
            const auth = getAuth();
            signInWithEmailAndPassword(auth, email, password)
              .then((userCredential) => {
                const user = userCredential.user;
                console.log('[SIGN IN]:', user);
                //redirect to feed page
              })
              .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
              });
          }}>Log In</button>
        </div>
        <div>
          <h2>SignUp</h2>
          <form>
            <input type="text" placeholder="name"/>
            <input type="email" placeholder="email@email.com"/>
            <input type="password" placeholder="******"/>
            <input type="date"/>
            <input type="text" placeholder="city"/>
            <input type="text" placeholder="state"/>
            <select name="gender">
              <option value="">Gender selection</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="non-binary">Non Binary</option>
            </select>
            <button>Next</button>
            <button onClick={e=>{
              const email = 'partyHausRulz@gmail.com';
              const password = 'IzCheatingWithHardCodingThis';

              const auth = getAuth();
              createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                  const user = userCredential.user;
                  console.log(userCredential);
                })
                .catch((error) => {
                  const errorCode = error.code;
                  const errorMessage = error.message;
                  console.log(errorCode, errorMessage);
                });
            }}>Submit</button>
          </form>
          <p>Have an account? <a href="./login">login</a></p>
        </div>
      </main>
    </div>
  )
}

/*
Set an authentication state observer and get user data
For each of your app's pages that need information about the signed-in user, attach an observer to the global authentication object. This observer gets called whenever the user's sign-in state changes.

Attach the observer using the onAuthStateChanged method. When a user successfully signs in, you can get information about the user in the observer.
*/
// import { getAuth, onAuthStateChanged } from "firebase/auth";

// const auth = getAuth();
// onAuthStateChanged(auth, (user) => {
//   if (user) {
//     // User is signed in, see docs for a list of available properties
//     // https://firebase.google.com/docs/reference/js/firebase.User
//     const uid = user.uid;
//     // ...
//   } else {
//     // User is signed out
//     // ...
//   }
// });