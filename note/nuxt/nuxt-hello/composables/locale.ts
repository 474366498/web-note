export const useLocale = () => {
  return useState('locale', () => useDefaultLocale().value)
}


const useDefaultLocale = (fallback = 'en-US') => {
  const locale = ref(fallback)
  if (process.server) {
    const reqLocale = useRequestHeaders()['accept-language']?.split(',')[0]
    if (reqLocale) locale.value = reqLocale
  } else if (process.client) {
    const navLang = navigator.language
    if (navLang) locale.value = navLang
  }

  return locale
}


export const useLocales = () => {
  const locale = useLocale()
  const locales = ref([
    'en-US',
    'en-GB',
    'zh-CN',
    'zh-TW'
  ])
  if (!locales.value.includes(locale.value)) {
    locales.value.unshift(locale.value)
  }
  return locales
}

export const useLocalDate = (date: Ref<Date> | Date, locale = useLocale()) => {
  return computed(() => new Intl.DateTimeFormat(locale.value, { dateStyle: 'full' }).format(unref(date)))
}
