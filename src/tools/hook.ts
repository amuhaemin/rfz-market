import type { Dispatcher, RootStates, SelectorDispatch } from '@core/config/store'

import { AuthContext } from '@context/Auth'
import { ColorModeContext } from '@context/Theme'
import { useContext, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

export const useRedux: SelectorDispatch = (selectorFn) => [
  selectorFn(useSelector((state: RootStates) => state)),
  useDispatch<Dispatcher>(),
]

export const useMounted = (callback: () => void) => {
  const [mounted, isMounted] = useState(false)

  useEffect(() => isMounted(true), [])
  useEffect(() => void (mounted && callback()), [mounted, callback])
}

export const useThemeContext = () => useContext(ColorModeContext)

export const useAuthContext = () => useContext(AuthContext)
