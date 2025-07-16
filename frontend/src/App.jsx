import { Navigate, Route, Routes, data } from "react-router-dom";
import HomePage from "./pages/home-page.jsx";
import SignUpPage from "./pages/signup-page.jsx";
import LoginPage from "./pages/login-page.jsx";
import NotificationsPage from "./pages/notifications-page.jsx";
import CallPage from "./pages/call-page.jsx";
import ChatPage from "./pages/chat-page.jsx";
import OnboardingPage from "./pages/onboarding-page.jsx";
import { Toaster } from "react-hot-toast" 
import PageLoader from "./components/page-loader.jsx";
import useAuthUser from "./hooks/use-auth-user.js";
import Layout from "./components/layout.jsx";
import { useThemeStore } from "./store/use-theme-store.js";

const App = () => {
  const { authUser, isLoading } = useAuthUser()
  const isAuthozincated = Boolean(authUser)
  const isOnboarded = authUser?.isOnboarded

  const { theme } = useThemeStore()

  if(isLoading) return <PageLoader />

  return (
    <div className="h-screen" data-theme={theme}>
       <Routes>
        <Route
          path="/"
          element={
            isAuthozincated && isOnboarded ? (
              <Layout showSidebar={true}>
                <HomePage />
              </Layout>
            ) : (
              <Navigate to={!isAuthozincated ? "/login" : "/onboarding"} />
            )
          }
        />
        <Route
          path="/signup"
          element={
            !isAuthozincated ? <SignUpPage /> : <Navigate to={isOnboarded ? "/" : "/onboarding"} />
          }
        />
        <Route
          path="/login"
          element={
            !isAuthozincated ? <LoginPage /> : <Navigate to={isOnboarded ? "/" : "/onboarding"} />
          }
        />
        <Route
          path="/notifications"
          element={
            isAuthozincated && isOnboarded ? (
              <Layout showSidebar={true}>
                <NotificationsPage />
              </Layout>
            ) : (
              <Navigate to={!isAuthozincated ? "/login" : "/onboarding"} />
            )
          }
        />
        <Route
          path="/call/:id"
          element={
            isAuthozincated && isOnboarded ? (
              <CallPage />
            ) : (
              <Navigate to={!isAuthozincated ? "/login" : "/onboarding"} />
            )
          }
        />

        <Route
          path="/chat/:id"
          element={
            isAuthozincated && isOnboarded ? (
              <Layout showSidebar={false}>
                <ChatPage />
              </Layout>
            ) : (
              <Navigate to={!isAuthozincated ? "/login" : "/onboarding"} />
            )
          }
        />

        <Route
          path="/onboarding"
          element={
            isAuthozincated ? (
              !isOnboarded ? (
                <OnboardingPage />
              ) : (
                <Navigate to="/" />
              )
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>
      <Toaster />
    </div>
  );
};
export default App;