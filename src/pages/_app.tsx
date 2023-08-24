import '@fontsource/roboto/300.css';
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { CssBaseline, ThemeProvider } from '@mui/material';
import { SnackbarProvider, useSnackbar } from 'notistack';


import { UIProvider } from '@/context/ui';
import { EntriesProvider } from '@/context/entries';
import { SchedulesProvider } from '@/context/schedules';

import { darkTheme, lightTheme } from '@/themes';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SnackbarProvider maxSnack={3}>
      <SchedulesProvider>
        <EntriesProvider>
          <UIProvider>
            <ThemeProvider theme={darkTheme}>
              <CssBaseline />
              <Component {...pageProps} />
            </ThemeProvider>
          </UIProvider>
        </EntriesProvider>
      </SchedulesProvider>
    </SnackbarProvider>
  )
}
