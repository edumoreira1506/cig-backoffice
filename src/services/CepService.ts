import axios from 'axios'

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
  static async getInfo(cep: string): Promise<null | ICepInfo> {
    try {
      const { data } = await ViaCepClient.get<ICepInfo>(`/ws/${cep}/json`)

      return data
    } catch {
      return null
    }
  }
}
