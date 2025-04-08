import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "../../../../firebaseConfig";

async function signinwithgoogle(
  setUserData,
  toast,
  setLoading,
  navigate,
  isBlog,
  url
) {
  setLoading(true);
  const provider = new GoogleAuthProvider();
  toast({
    title: "Signining in",
    position: "top",
    description: "Please wait while we sign you in",
    status: "info",
    duration: 2000, // Display for 5 seconds
    isClosable: true, // Allow the user to close the toast
  });

  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    const docRef = doc(db, "users", user.uid);
    const snapshot = await getDoc(docRef);

    if (snapshot.exists()) {
      setUserData(snapshot.data());
      if (isBlog) {
        navigate(url);
      } else {
        navigate("/home");
      }
    } else {
      await setDoc(docRef, {
        uid: user.uid,
        username: user.displayName,
        nickname: "No Tag",
        profilepic: user.photoURL,
        blogs: [],
        trusts: 0,
        followers: [],
        followedChannels: [],
        podcasts: [],
        discreet: [],
        spaces: [],
        notifications: [],
        username_lower: user.displayName.toLowerCase(),
        bio: "Please update your description",
      });
      const newSnapshot = await getDoc(docRef);
      setUserData(newSnapshot.data());
      if (isBlog) {
        navigate(url);
      } else {
        navigate("/home");
      }
      setLoading(false);
    }
  } catch (error) {
    setLoading(false);
    toast({
      title: "Error",
      position: "top",
      description: error.message,
      status: "error",
      duration: 5000, // Display for 5 seconds
      isClosable: true, // Allow the user to close the toast
    });
  }
}

export default signinwithgoogle;
