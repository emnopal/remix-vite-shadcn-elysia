import { useCallback, useEffect, useState } from 'react'
import { MoonIcon, SunIcon } from '@radix-ui/react-icons'
import { Link } from '@remix-run/react'
import { useHydrated } from 'remix-utils/use-hydrated'
import {
  getTheme,
  setTheme as setSystemTheme,
  type Theme,
} from '@/components/theme-switcher'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { SidebarTrigger } from '@/components/ui/sidebar'

export function Header() {
  const hydrated = useHydrated()
  const [theme, setThemeState] = useState(getTheme())

  const setTheme = useCallback((theme: string) => {
    setSystemTheme(theme)
    setThemeState(theme as Theme)
  }, [])

  useEffect(() => {
    setThemeState(getTheme())
  }, [])

  return (
    <header className="flex h-14 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
      <div className="flex items-center gap-2 px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <Link className="flex items-center space-x-2" to="/">
          <span className="text-lg font-bold">shadcn</span>
        </Link>
      </div>
      <div className="flex items-end gap-2 px-4 ml-auto">
        <Button
          className="h-10 w-10 transform rounded-full border transition-transform hover:scale-105 active:scale-95"
          size="icon"
          variant="ghost"
          onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
        >
          <span className="sr-only">Theme selector</span>
          {!hydrated ? null : theme === 'dark' ? <MoonIcon /> : <SunIcon />}
        </Button>
      </div>
    </header>
  )
}
