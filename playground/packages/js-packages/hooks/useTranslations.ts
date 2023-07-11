
import { useCallback } from 'react';
import { useIntl } from 'react-intl';

export const useTranslations=()=>{
    const intl = useIntl();
    return useCallback((label)=>intl.formatMessage({ id: label}),[intl])
}  