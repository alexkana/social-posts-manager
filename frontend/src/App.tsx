import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import PostsListPage from "./pages/posts/PostsListPage";
import LikedPostsPage from "./pages/posts/LikedPostsPage";
import CreatePostPage from "./pages/posts/CreatePostPage";
import { AuthProvider } from "./contexts/AuthContext";
import MainLayout from "./components/layout/MainLayout";
import { RequireAuth } from "./components/auth/RequireAuth";

function App() {
  return (
    <Router>
      {/* Floating geometric shapes for background animation */}
      <div className="floating-shapes">
        <div className="floating-shape"></div>
        <div className="floating-shape"></div>
        <div className="floating-shape"></div>
        <div className="floating-shape"></div>
      </div>
      
      {/* If your AuthProvider needs react-router hooks, put it inside Router */}
      <AuthProvider>
        <Routes>
        <Route path="/" element={<Navigate to="/posts" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Gate the whole protected area once */}
        <Route element={<RequireAuth />}>
          {/* One layout for all protected pages */}
          <Route element={<MainLayout />}>
            <Route path="/posts">
              <Route index element={<PostsListPage />} />
              <Route path="liked" element={<LikedPostsPage />} />
              <Route path="create" element={<CreatePostPage />} />
            </Route>
          </Route>
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </AuthProvider>
  </Router>
  );
}

export default App;
