import "react-spring-bottom-sheet/dist/style.css";
import "./App.css";
import All_Store_Chats from "./pages/MyStore/All_Store_Chats";
import Blog_Layout from "./components/BlogComponents/Blog_Layout";
import BlogsPage from "./components/BlogComponents/BlogsPage";
import BottomNavBar from "./components/ReUsables/Navigation/Mobile/BottomNavBar";
import CategorySearchResult from "./pages/Search_Result_Page/CategorySearchResult";
import Chat_Index from "./pages/Live Discussion/Chat_Index";
import Chat_Route from "./pages/Live Discussion/Routes/Chat_Route";
import CreateBlog_Page from "./components/BlogComponents/CreateBlog_Page";
import DashBoard from "./pages/Dashboard/DashBoard";
import DesktopSideNav from "./components/DesktopSideNav";
import ErrorPage from "./pages/ErrorPage";
import Explore_Page from "./pages/Explore_Page/Explore_Page";
import GlobalProfilePage from "./pages/GlobalProfilePage/GlobalProfilePage";
import Header from "./components/ReUsables/Header";
import Home_Page from "./pages/Home_Page/Home_Page";
import Login from "./pages/Authentication/Login";
import MarketPlace from "./pages/MarketPlace/MarketPlace";
import MyStore from "./pages/MyStore/MyStore";
import Notifications from "./pages/Notifications/Notifications";
import Pick_Chat_Route from "./pages/Live Discussion/Routes/Pick_Chat_Route";
import PlayerProvider from "./components/Player/PlayerContext";
import PostLayout from "./pages/Layouts/PostLayout";
import Profile_Page from "./pages/Profile_Page/Profile_Page";
import Protected from "./Protected";
import React, { useEffect, useState } from "react";
import Recent_Chat_Route from "./pages/Live Discussion/Routes/Recent_Chat_Route";
import RecorderProvider from "./components/Recorder/RecorderContext";
import Redirecto from "./Redirecto";
import ScrollToTop from "./ScrollToTop";
import Search_Result_Page from "./pages/Search_Result_Page/Search_Result_Page";
import SignUp from "./pages/Authentication/SignUp";
import SplashScreen from "./SplashScreen";
import StoreChats from "./pages/Live Discussion/Routes/StoreChats";
import updateUserStatus from "./updateUserStatus";
import { ChakraProvider, Flex } from "@chakra-ui/react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc, onSnapshot, setDoc } from "firebase/firestore";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { auth, db } from "../firebaseConfig";
import { ChatProvider } from "./pages/Live Discussion/Context/ChatContext";
import { Post_Page } from "./pages/Post_Page/Post_Page";

export const AuthContext = React.createContext({
  setUserId: () => {},
  userId: null,
  userData: null,
  setUserData: () => {},
});

function App() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const updateUserStatus = async (docRef, status) => {
      // Ensure that Firebase is initialized before making database calls
      if (docRef) {
        try {
          await setDoc(docRef, { status }, { merge: true });
        } catch (error) {
          console.error("Error updating user status:", error);
        }
      }
    };

    if (userData) {
      const docRef = doc(db, "users", userId);
      if (navigator.onLine) {
        updateUserStatus(docRef, "online");
      } else {
        updateUserStatus(docRef, "offline");
      }
    }
  }, [userData]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUserId(user.uid);
      }
      setLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, [userId]);

  useEffect(() => {
    if (userId) {
      const docRef = doc(db, "users", userId);
      onSnapshot(docRef, (snapshot) => {
        if (snapshot.exists) {
          setUserData(snapshot.data());
          return;
        }
        setUserData(null);
      });
    }
  }, [userId]);

  if (loading) {
    return <SplashScreen />;
  }

  return (
    <div className=" overflow-hidden">
      <ChakraProvider>
        <Router>
          <AuthContext.Provider
            value={{
              userId,
              userData,
              setUserData,
              setUserId,
            }}
          >
            <PlayerProvider>
              <RecorderProvider>
                <ChatProvider>
                  <div className=" font-poppins block md:hidden">
                    {userId && <Header />}
                  </div>
                  <ScrollToTop />
                  <Flex alignItems={"start"} className=" overflow-hidden">
                    {userId && <DesktopSideNav />}

                    <Routes>
                      <Route path="/" element={<Redirecto />} />
                      <Route path="/login" element={<Login />} />
                      <Route path="/signup" element={<SignUp />} />
                      <Route
                        path="/home"
                        element={
                          <Protected isSignedIn={userId}>
                            <Home_Page />
                          </Protected>
                        }
                      />
                      <Route
                        path="/notifications"
                        element={
                          <Protected isSignedIn={userId}>
                            <Notifications />
                          </Protected>
                        }
                      />
                      <Route
                        path="/dashboard"
                        element={
                          <Protected isSignedIn={userId}>
                            <DashBoard />
                          </Protected>
                        }
                      />
                      <Route
                        path="/search/:id"
                        element={
                          <Protected isSignedIn={userId}>
                            <Search_Result_Page />
                          </Protected>
                        }
                      />
                      <Route
                        path="/storeChats"
                        element={
                          <Protected isSignedIn={userId}>
                            <All_Store_Chats />
                          </Protected>
                        }
                      />
                      <Route
                        path="/myStore"
                        element={
                          <Protected isSignedIn={userId}>
                            <MyStore />
                          </Protected>
                        }
                      ></Route>
                      <Route
                        path="/store/:id"
                        element={
                          <Protected isSignedIn={userId}>
                            <MyStore isVisitor={true} />
                          </Protected>
                        }
                      ></Route>
                      {/* Discussion  and Messaging Route */}
                      <Route
                        path="/discussion"
                        element={
                          <Protected isSignedIn={userId}>
                            <Chat_Index />
                          </Protected>
                        }
                      >
                        <Route
                          path="recent_chats"
                          index={true}
                          element={
                            <Protected isSignedIn={userId}>
                              <Recent_Chat_Route />
                            </Protected>
                          }
                        />
                        <Route
                          path="store_chats/:id"
                          element={
                            <Protected isSignedIn={userId}>
                              <StoreChats />
                            </Protected>
                          }
                        ></Route>
                        <Route
                          path="pick_chat"
                          element={
                            <Protected isSignedIn={userId}>
                              <Pick_Chat_Route />
                            </Protected>
                          }
                        />
                        <Route
                          path="chat/:id"
                          element={
                            <Protected isSignedIn={userId}>
                              <Chat_Route />
                            </Protected>
                          }
                        />
                      </Route>
                      {/* ----------------------------------------- */}

                      <Route
                        path="/user_profile/:id"
                        element={
                          <Protected isSignedIn={userId}>
                            <GlobalProfilePage />
                          </Protected>
                        }
                      />
                      <Route
                        path="/category/:id"
                        element={
                          <Protected isSignedIn={userId}>
                            <CategorySearchResult />
                          </Protected>
                        }
                      />
                      <Route
                        path="/profile/createPost"
                        element={
                          <Protected isSignedIn={userId}>
                            <Post_Page />
                          </Protected>
                        }
                      />
                      <Route path="/blog/:id" element={<Blog_Layout />} />

                      <Route
                        path="/myBlogs"
                        element={
                          <Protected isSignedIn={userId}>
                            <BlogsPage />
                          </Protected>
                        }
                      />

                      <Route
                        path="/explore"
                        element={
                          <Protected isSignedIn={userId}>
                            <Explore_Page />
                          </Protected>
                        }
                      />
                      <Route
                        path="/skuareDiscussion"
                        element={
                          <Protected isSignedIn={userId}>
                            <MarketPlace />
                          </Protected>
                        }
                      />

                      <Route
                        path="/profile"
                        element={
                          <Protected isSignedIn={userId}>
                            <Profile_Page />
                          </Protected>
                        }
                      ></Route>
                      <Route
                        path="/new-blog"
                        element={
                          <Protected isSignedIn={userId}>
                            <CreateBlog_Page />
                          </Protected>
                        }
                      />
                      <Route
                        path="/post/:id"
                        element={
                          <Protected isSignedIn={userId}>
                            <PostLayout />
                          </Protected>
                        }
                      />
                      {/* Define more Routes */}
                      <Route path="*" element={<ErrorPage />} />
                    </Routes>
                  </Flex>
                  {userId && <BottomNavBar />}
                </ChatProvider>
              </RecorderProvider>
            </PlayerProvider>
          </AuthContext.Provider>
        </Router>
      </ChakraProvider>
    </div>
  );
}

export default App;
