import AuthBffClient from '@cig-platform/auth-bff-client'

import { AUTH_BFF_API_URL } from '../constants/url'

const authBffClient = new AuthBffClient(AUTH_BFF_API_URL)

export default authBffClient
