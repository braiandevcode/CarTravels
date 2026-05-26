import Layout from "../../modules/layout/Layout"
import { createBrowserRouter, Navigate } from "react-router-dom";
import HomePage from "../../modules/pages/HomePage";
import FAQPage  from "../../modules/pages/FAQPage";
import AboutPage  from "../../modules/pages/AboutPage";
import TermsPage from "../../modules/pages/TermsPage";
import PrivacyPage from "../../modules/pages/PrivacyPage";

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'faq', element: <FAQPage/> },
      { path: 'about', element: <AboutPage /> },
      { path: 'terms', element: <TermsPage /> },
      { path: 'privacy', element: <PrivacyPage /> },
      { path: '*', element: <Navigate to="/" replace /> },
    ],
  },
])