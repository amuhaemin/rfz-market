import type { MetaInterface } from '@store/meta/type'
import type { FetchRequest } from '@type'
import type { AxiosRequestConfig, AxiosResponse } from 'axios'

import { AppCSSVar, AppRoutes } from '@config'
import { default as AppCookies } from '@lib/cookies'
import { default as AppStorage } from '@lib/storage'
import { default as Axios } from 'axios'
import { default as NextLink } from 'next/link'

export const axios = Axios
export const Anchor = NextLink

export const storage = new AppStorage('localStorage')
export const session = new AppStorage('sessionStorage')
export const cookies = new AppCookies()

export const devlog = (message: unknown, key?: keyof typeof colorType) => {
  if (typeof window === 'undefined') {
    throw new Error('`setDevConsole` is called ouside the window.')
  }

  const colorType = {
    error: '#dc2626',
    log: '#2563eb',
    success: '#15803d',
    warn: '#ca8a04',
  }

  const style = `
    background-color: ${colorType[key || 'log']};
    font-size: 11px;
    font-weight: bold;
    padding: 2px 5px;
    border-radius: 4px;
  `

  const isClientDev = location.href.includes('localhost')
  return isClientDev && console.log('%cDEV', style, message)
}

export const dofetch = async <P extends FetchRequest>(
  option: AxiosRequestConfig<P['payload']>
) => {
  const defaultConfig = {
    ...option,
    method: option.method ?? 'GET',
  }
  return (await axios(defaultConfig)) as AxiosResponse<P['response']>
}

export const isProtectedPage = (string: string) => {
  const protectedRoutes = [AppRoutes.masuk, AppRoutes.daftar]
  return protectedRoutes.includes(string as AppRoutes)
}

export const cssvar = (vars: keyof typeof AppCSSVar) => {
  return `var(--${AppCSSVar[vars]})`
}

export const cssVarRoot = (arr: [keyof typeof AppCSSVar, string][]) => {
  const root = Object.create({})

  for (let i = 0; i < arr.length; i++) {
    root[`--${AppCSSVar[arr[i][0]]}`] = arr[i][1]
  }

  return root
}

export const metaRequestPending = (state: MetaInterface) => void (state._meta = 'pending')
export const metaRequestFailure = (state: MetaInterface) => void (state._meta = 'failure')
export const metaRequestSuccess = (state: MetaInterface) => void (state._meta = 'success')
