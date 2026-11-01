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

  // Release package shown by <DownloadCard /> on the install page; url points to the zot artifactory.
  customFields: {
    release: {
      version: '1.0.0',
      fileName: 'dlp-stack-deploy-1.0.0.zip',
      // Direct download of dlp-release/1.0.0/dlp-stack-deploy-1.0.0.zip on Google Drive (anyone with the
      // link); confirm=t skips Drive's "too large to scan" page.
      url: 'https://drive.usercontent.google.com/download?id=1XCEkteqhe_Az38T9nEMPppjwRFx_3L7L&export=download&confirm=t',
      offlineUrl: '',
    },
  },

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
        // Release announcements, one post per version, with RSS/Atom.
        blog: {
          routeBasePath: 'releases',
          blogTitle: 'Phát hành',
          blogDescription: 'Thông báo phát hành và ghi chú từng phiên bản NextDLP.',
          blogSidebarTitle: 'Tin mới nhất',
          blogSidebarCount: 'ALL',
          showReadingTime: false,
          feedOptions: {
            type: ['rss', 'atom'],
            title: 'NextDLP – Phát hành',
            description: 'Thông báo phát hành NextDLP',
            copyright: `© ${new Date().getFullYear()} NextDLP`,
          },
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  // Release pages moved to version numbers; links already sent out keep working.
  plugins: [
    [
      '@docusaurus/plugin-client-redirects',
      {
        redirects: [
          {
            from: ['/docs/releases/v1', '/docs/releases/1.0.0', '/docs/releases/next', '/docs/releases/1.1.0',
              '/releases/nextdlp-1.1.0'],
            to: '/releases/nextdlp-1.0.0',
          },
          {from: '/docs/releases/v2-roadmap', to: '/docs/releases/roadmap'},
        ],
      },
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
        {to: '/releases', label: 'Phát hành', position: 'right'},
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
            {label: 'Thông báo phát hành', to: '/releases'},
            {label: 'Các phiên bản', to: '/docs/releases/'},
            {label: 'Lộ trình phát triển', to: '/docs/releases/roadmap'},
            {label: 'Nhận tin qua RSS', href: 'pathname:///releases/rss.xml'},
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
