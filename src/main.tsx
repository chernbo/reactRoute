import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom'
import Root from './routes/Root'
import ErrorPage from './ErrorPage'
import Contact, { loader as contactLoader } from './routes/Contact'
import { loader as rootLoader, action as rootAction } from './routes/Root'
import EditContact, { action as editAction } from './routes/edit'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: rootLoader,
    action: rootAction,
    children: [
      {
        path: "contacts/:contactId",
        element: <Contact />,
        loader: contactLoader
      },
      {
        path: 'contacts/:contactId/edit',
        element: <EditContact />,
        // 这里作者是偷懒，路由之间不共享加载器
        loader: contactLoader,
        action: editAction
      }
    ]
  },
])


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
