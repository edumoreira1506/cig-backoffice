import MarketplaceBffClient from '@cig-platform/marketplace-bff-client'

import { MARKETPLACE_BFF_API_URL } from '../constants/url'

const MarketplaceBffService = new MarketplaceBffClient(MARKETPLACE_BFF_API_URL)

export default MarketplaceBffService
