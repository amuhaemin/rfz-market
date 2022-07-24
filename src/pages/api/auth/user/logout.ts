import { Appkey, AppRoutes } from '@core/config'
import { withRequest } from '@server/request'
import { serialize } from 'cookie'

const userLogoutRequest = withRequest(
  async ({ response }) => {
    const path = AppRoutes.beranda
    const option = { path, maxAge: 0 }

    response.setHeader('Set-Cookie', [
      serialize(Appkey.AC_SSID_SECURE, '', option),
      serialize(Appkey.AC_SSID_CLIENT, '', option),
    ])
  },
  ['POST']
)
export default userLogoutRequest
