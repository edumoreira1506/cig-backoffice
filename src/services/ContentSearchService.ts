import ContentSearchClient from '@cig-platform/content-search-client'

import { CONTENT_SEARCH_API_URL } from '../constants/url'

const ContentSearchService = new ContentSearchClient(CONTENT_SEARCH_API_URL)

export default ContentSearchService
