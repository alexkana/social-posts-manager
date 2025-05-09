import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import PostsListPage from "./pages/posts/PostsListPage";
import LikedPostsPage from "./pages/posts/LikedPostsPage";
import CreatePostPage from "./pages/posts/CreatePostPage";
import { AuthProvider } from "./contexts/AuthContext";
import MainLayout from "./components/layout/MainLayout";
import RequireAuth from "./components/auth/RequireAuth";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/posts" replace />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route
            path="/posts"
            element={
              <MainLayout>
                <RequireAuth>
                  <PostsListPage />
                </RequireAuth>
              </MainLayout>
            }
          />
          <Route
            path="/posts/liked"
            element={
              <MainLayout>
                <RequireAuth>
                  <LikedPostsPage />
                </RequireAuth>
              </MainLayout>
            }
          />
          <Route
            path="/posts/create"
            element={
              <MainLayout>
                <RequireAuth>
                  <CreatePostPage />
                </RequireAuth>
              </MainLayout>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
