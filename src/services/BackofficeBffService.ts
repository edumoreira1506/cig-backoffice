import BackofficeBffClient from '@cig-platform/backoffice-bff-client'

import { BACKOFFICE_BFF_API_URL } from '../constants/url'

const BackofficeBffService = new BackofficeBffClient(BACKOFFICE_BFF_API_URL)

export default BackofficeBffService
