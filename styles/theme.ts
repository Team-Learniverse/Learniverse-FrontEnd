import { css } from "styled-components";

import { Noto_Sans_KR } from "@next/font/google";

const notoSansKr = Noto_Sans_KR({
  weight: ['100', '300', '400', '500', '700', '900'],
  subsets: ['latin'],
  display: 'swap',
  fallback: ['sans-serif'],
});

export const fonts = {
  Head0: css`
    font-family: ${notoSansKr.style.fontFamily};
    font-size: 4rem;
    font-style: normal;
    font-weight: 700;
    line-height: 130%; /* 5.2rem */
  `,
  Head1: css`
    font-family: ${notoSansKr.style.fontFamily};
    font-size: 3.2rem;
    font-style: normal;
    font-weight: 700;
    line-height: 130%; /* 4.16rem */
  `,
  Head2: css`
    font-family: ${notoSansKr.style.fontFamily};
    font-size: 3rem;
    font-style: normal;
    font-weight: 700;
    line-height: 130%; /* 3.9rem */
  `,
  Title1: css`
    font-family: ${notoSansKr.style.fontFamily};
    font-size: 2.6rem;
    font-style: normal;
    font-weight: 700;
    line-height: 130%; /* 3.38rem */
  `,
  Title2: css`
    font-family: ${notoSansKr.style.fontFamily};
    font-size: 2.4rem;
    font-style: normal;
    font-weight: 700;
    line-height: 130%; /* 3.12rem */
  `,
  Title3: css`
    font-family: ${notoSansKr.style.fontFamily};
    font-size: 2rem;
    font-style: normal;
    font-weight: 700;
    line-height: 130%; /* 2.6rem */
  `,
  Title4: css`
    font-family: ${notoSansKr.style.fontFamily};
    font-size: 1.8rem;
    font-style: normal;
    font-weight: 700;
    line-height: 130%; /* 2.34rem */
  `,
  Title5: css`
    font-family: ${notoSansKr.style.fontFamily};
    font-size: 1.6rem;
    font-style: normal;
    font-weight: 700;
    line-height: 130%; /* 2.08rem */
  `,
  Body0: css`
    font-family: ${notoSansKr.style.fontFamily};
    font-size: 2.2rem;
    font-style: normal;
    font-weight: 400;
    line-height: 130%; /* 2.86rem */
  `,
  Body1: css`
    font-family: ${notoSansKr.style.fontFamily};
    font-size: 1.6rem;
    font-style: normal;
    font-weight: 400;
    line-height: 130%; /* 2.08rem */
  `,
  Body2: css`
    font-family: ${notoSansKr.style.fontFamily};
    font-size: 1.3rem;
    font-style: normal;
    font-weight: 700;
    line-height: 130%; /* 1.69rem */
  `,
  Body3: css`
    font-family: ${notoSansKr.style.fontFamily};
    font-size: 1.4rem;
    font-style: normal;
    font-weight: 400;
    line-height: 130%; /* 1.82rem */
  `,
  Body4: css`
    font-family: ${notoSansKr.style.fontFamily};
    font-size: 1.2rem;
    font-style: normal;
    font-weight: 700;
    line-height: 130%; /* 1.56rem */
  `,
  Body5: css`
    font-family: ${notoSansKr.style.fontFamily};
    font-size: 1.2rem;
    font-style: normal;
    font-weight: 400;
    line-height: 130%; /* 1.56rem */
  `,
  Body6: css`
    font-family: ${notoSansKr.style.fontFamily};
    font-size: 0.9rem;
    font-style: normal;
    font-weight: 700;
    line-height: 130%; /* 1.17rem */
  `,
  Body7: css`
    font-family: ${notoSansKr.style.fontFamily};
    font-size: 0.9rem;
    font-style: normal;
    font-weight: 400;
    line-height: 130%; /* 1.17rem */
  `,
  Body8: css`
    font-family: ${notoSansKr.style.fontFamily};
    font-size: 0.7rem;
    font-style: normal;
    font-weight: 500;
    line-height: 130%; /* 0.91rem */
  `,
  Body9: css`
    font-family: ${notoSansKr.style.fontFamily};
    font-size: 0.6rem;
    font-style: normal;
    font-weight: 700;
    line-height: 130%; /* 0.78rem */
  `,
};

export const colors = {
  Learniverse_BG: '#1E1F3B',
  Purple1: '#848BE3',
  Purple2: '#A8AEEB',
  Purple3: '#9985FE',
  Purple4: '#4D62AE',
  Gray1: '#191919',
  Gray2: '#666666',
  Gray3: '#A9A9A9',
  Gray4: '#CFCED3',
  LightGray1: '#E8E8F4',
  LightGray2: '#EEEEFA',
  White: '#FFFFFF',
  Black: '#000000',
  Green: '#0ACF84',
  Orange1: '#F1421C',
  Orange2: '#FF7362',
  Mint1: '#26C6DA',
  Mint2: '#8CE1EB',
  Mint3: '#E3F8FA',
  Blue: '#3952F3',
  SkyBlue: '#93CDFD',
  Yellow1: '#FFBF00',
  Yellow2: '#FFE599',
  Yellow3: '#FFF9DD',
};

export const theme = {
  colors,
  fonts,
};
