import { useLocation } from 'react-router-dom';
import {
  LocaleCode,
  parseLocalizedPath,
  toLocalizedHref,
} from '../lib/i18n';

export function useLocale() {
  const location = useLocation();
  const { locale, prefixMode, barePath } = parseLocalizedPath(location.pathname);

  const t = <T,>(idVal: T, enVal: T): T => (locale === 'en' ? enVal : idVal);

  const localizePath = (targetBarePath: string) =>
    toLocalizedHref(targetBarePath, locale, prefixMode);

  return {
    locale: locale as LocaleCode,
    prefixMode,
    barePath,
    t,
    localizePath,
  };
}

export default useLocale;
