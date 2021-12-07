import {
  ExclamationIcon,
  QuestionMarkCircleIcon,
  SearchIcon,
  ServerIcon,
  WifiIcon,
} from '@heroicons/react/outline';
import axios, { AxiosError } from 'axios';
import React from 'react';
import { useTranslation } from 'react-i18next';

function isNetworkError(err: AxiosError) {
  return !!err.isAxiosError && !err.response;
}
export const ErrorComponent = ({ error }: { error: unknown }) => {
  const { t } = useTranslation('apiResponse');
  const errorMessage = () => {
    if (axios.isAxiosError(error)) {
      if (isNetworkError(error)) {
        return (
          <>
            <WifiIcon className="h-9 w-9 text-gray-400" />
            {t('errorNetwork')}
          </>
        );
      }
      switch (error.response?.status) {
        case 404:
          return (
            <>
              <SearchIcon className="h-9 w-9 text-gray-400" />
              {t('error404')}
            </>
          );
        case 403:
          return (
            <>
              <ExclamationIcon className="h-9 w-9 text-gray-400" />
              {t('error403')}
            </>
          );

        default:
          return (
            <>
              <ServerIcon className="h-9 w-9 text-gray-400" />
              {t('error500')}
            </>
          );
      }
    }

    return (
      <>
        <QuestionMarkCircleIcon className="h-9 w-9 text-gray-400" />
        {t('errorUnknown')}
      </>
    );
  };
  return (
    <div className="flex flex-col items-center justify-center p-4 text-gray-600 w-full h-full text-center bg-gray-50 flex-grow">
      {errorMessage()}
    </div>
  );
};
