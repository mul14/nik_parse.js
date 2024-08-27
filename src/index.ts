import { provinsi, kabkot, kecamatan } from './wilayah.json'

export interface NikDetail {
  isValid: Function,
  provinceId: Function,
  province: Function,
  kabupatenKotaId: Function,
  kabupatenKota: Function,
  kecamatanId: Function,
  kecamatan: Function,
  kodepos: Function,
  kelamin: Function,
  lahir: Function,
  uniqcode: Function,
}

export const nikParser = (nik: string): NikDetail => ({

  isValid(): boolean {
    const isValidLength = (): boolean => nik.length === 16
    const isValidProvinsi = (): boolean => !!this.province()
    const isValidKabupatenKota = (): boolean => !!this.kabupatenKota()
    const isValidKecamatan = (): boolean => !!this.kecamatan()

    return isValidLength()
      && isValidProvinsi()
      && isValidKabupatenKota()
      && isValidKecamatan()
  },

  provinceId: (): string => nik.substring(0, 2),

  province(): string {
    return provinsi[this.provinceId()]
  },

  kabupatenKotaId: (): string => nik.substring(0, 4),

  kabupatenKota(): string {
    return kabkot[this.kabupatenKotaId()]
  },

  kecamatanId: (): string => nik.substring(0, 6),

  kecamatan(): string {
    return kecamatan[this.kecamatanId()].split(' -- ')[0]
  },

  kodepos(): number {
    return kecamatan[this.kecamatanId()].slice(-5)
  },

  kelamin(): string {
    return this.lahir().getDate() < 40 ? 'pria' : 'wanita'
  },

  lahir: (): Date => {
    const yearPart = Number(nik.substring(10, 12))
    const month = Number(nik.substring(8, 10))
    const date = Number(nik.substring(6, 8))

    // Menentukan tahun kelahiran    
    const year = yearPart <= 21 ? 2000 + yearPart : 1900 + yearPart

    return new Date(year, month - 1, date)
  },

  uniqcode: (): string => nik.substring(12, 16),

})
