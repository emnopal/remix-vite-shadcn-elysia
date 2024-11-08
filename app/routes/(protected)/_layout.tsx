import { Outlet } from '@remix-run/react'
import AppSidebar from '@/components/sidebar'

export default function Layout() {
  return (
    <AppSidebar>
      <Outlet />
    </AppSidebar>
  )
}
