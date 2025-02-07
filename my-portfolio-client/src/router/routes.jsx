import {
    createBrowserRouter,
  } from "react-router-dom";
  import MainLayout from "../layout/MainLayout";
  import Dashboard from "../admin/dashboard/Dashboard";
  import BannerUpdate from "../admin/component/BannerUpdate";
  import FindUpdate from "../admin/component/FindUpdate";
  import AboutUpdate from "../admin/component/AboutUpdate";
  import SkillUpdate from "../admin/component/SkillUpdate";
  import Education from "../admin/component/Education";
  import Project from "../admin/component/Project";
  import Contact from "../admin/component/Contact";
  import Quote from "../admin/component/Quote";
  import Main from "../conponents/Main";
  import ProjectDetails from "../conponents/ProjectDetails";

  const routes = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout />,
      children: [
        {
          path: "/",
          element: <Main />
        },
        {
          path: "projects/:id",
          element: <ProjectDetails />
        }
      ]
    },
    {
      path: "/admin/dashboard",
      element: <Dashboard />,
      children: [
        {
          path: "banner-update",
          element: <BannerUpdate />
        },
        {
          path: "find-update",
          element: <FindUpdate />
        },
        {
          path: "about-update",
          element: <AboutUpdate />
        },
        {
          path: "skill-update",
          element: <SkillUpdate />
        },
        {
          path: "education-update",
          element: <Education />
        },
        {
          path: "project-update",
          element: <Project />
        },
        {
          path: "contact-update",
          element: <Contact />
        },
        {
          path: "quote-update",
          element: <Quote />
        }
      ]
    },
  ]);

  export default routes;