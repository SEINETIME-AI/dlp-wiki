import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'NextDLP Docs',
  tagline: 'Tự động phân loại và gắn nhãn tài liệu, để DLP của bạn chặn đúng chỗ',
  favicon: 'img/logo.svg',

  future: {
    v4: true,
  },

  // GitHub Pages; with a custom domain set url to it and baseUrl to '/'.
  url: 'https://seinetime-ai.github.io',
  baseUrl: '/dlp-wiki/',

  onBrokenLinks: 'throw',

  i18n: {
    defaultLocale: 'vi',
    locales: ['vi'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    colorMode: {
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'NextDLP',
      logo: {
        alt: 'NextDLP',
        src: 'img/logo.svg',
      },
      items: [
        {to: '/docs/getting-started/intro', label: 'Giới thiệu', position: 'left'},
        {to: '/docs/getting-started/install', label: 'Hướng dẫn', position: 'left'},
        {to: '/docs/integrations/dlp', label: 'Tích hợp DLP', position: 'left'},
        {to: '/docs/integrations/api', label: 'API', position: 'left'},
        {to: '/docs/releases/v1', label: 'Phát hành', position: 'right'},
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Tài liệu',
          items: [
            {label: 'Cài đặt & kết nối', to: '/docs/getting-started/install'},
            {label: 'Nâng cấp & gỡ cài đặt', to: '/docs/operations/upgrade-uninstall'},
            {label: 'Câu hỏi thường gặp', to: '/docs/operations/faq'},
          ],
        },
        {
          title: 'Phát hành',
          items: [
            {label: 'Phiên bản V1', to: '/docs/releases/v1'},
            {label: 'Dự kiến V2', to: '/docs/releases/v2-roadmap'},
            {label: 'Lỗi đã biết', to: '/docs/releases/known-issues'},
          ],
        },
      ],
      copyright: `© ${new Date().getFullYear()} NextDLP`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
