import axios from 'axios'
import { ErrorHandler } from '@cig-platform/decorators'

import { GOOGLE_MAPS_API_KEY } from '../constants/keys'

const ViaCepClient = axios.create({
  baseURL: process.env.REACT_APP_VIA_CEP_URL,
})

const GoogleMapsApiClient = axios.create({
  baseURL: 'https://maps.googleapis.com/maps/api'
})

interface ICepInfo {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  ibge: string;
  gia: string;
  ddd: string;
  siafi: string;
}

interface IGoogleMapsInfo {
  results: {
    geometry: {
      location: {
        lat: number;
        lng: number;
      }
    }
  }[]
}

export default class CepService {
  @ErrorHandler(null)
  static async getInfo(cep: string) {
    const { data } = await ViaCepClient.get<ICepInfo>(`/ws/${cep}/json`)

    return data
  }

  @ErrorHandler(null)
  static async getGeoCoords(cep: string) {
    const { data } = await GoogleMapsApiClient.get<IGoogleMapsInfo>(`/geocode/json?address=${cep}&key=${GOOGLE_MAPS_API_KEY}`)

    if (!data?.results?.length) return null

    const { lat, lng } = data?.results?.[0]?.geometry?.location

    return { latitude: lat, longitude: lng }
  }
}
