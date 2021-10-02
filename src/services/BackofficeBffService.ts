import BackofficeBffClient from '@cig-platform/backoffice-bff-client'

import { BACKOFFICE_BFF_API_URL } from '../constants/url'

const backofficeBffClient = new BackofficeBffClient(BACKOFFICE_BFF_API_URL)

export default backofficeBffClient
