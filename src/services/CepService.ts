import axios from 'axios'
import { ErrorHandler } from '@cig-platform/decorators'

const ViaCepClient = axios.create({
  baseURL: process.env.REACT_APP_VIA_CEP_URL,
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

export default class CepService {
  @ErrorHandler(null)
  static async getInfo(cep: string) {
    const { data } = await ViaCepClient.get<ICepInfo>(`/ws/${cep}/json`)

    return data
  }
}
