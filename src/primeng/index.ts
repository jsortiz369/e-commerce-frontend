import { providePrimeNG } from 'primeng/config';

import { configPreset } from './_preset';

export const customerConfigPrimeNG = () =>
  providePrimeNG({
    inputVariant: 'filled',
    overlayAppendTo: 'body',
    overlayOptions: {
      appendTo: 'body',
      mode: 'overlay',
      hideOnEscape: false,
      responsive: {
        direction: 'top-end',
      },
    },
    zIndex: {
      modal: 1100,
      overlay: 1000,
      menu: 1000,
      tooltip: 1100,
    },
    theme: {
      preset: configPreset(),
      options: {
        darkModeSelector: '.ecom-dark',
        prefix: 'ecom',
        cssLayer: false,
        cssVariables: true,
        classPrefix: 'ecom',
      },
    },
    ripple: true,
    license:
      'eyJpZCI6ImExMWNmNGQ0LTc2MGUtNDcyMC1iNmQ1LTM3Y2NkYjgxYjhmYiIsInByb2R1Y3QiOiJwcmltZXVpIiwidGllciI6ImNvbW11bml0eSIsInR5cGUiOiJkZXYiLCJpYXQiOjE3ODgyMDQ1MDYsImV4cCI6MTgxOTc0MDUwNn0.3J2vT3AeJMm98LaO_wL2N_rQdai6s8PA8CQF62qLRb8p7MudMcK3Kp07S5gT4b0TN1bH4eQwsVre2EkiJRGuBQ',
  });
