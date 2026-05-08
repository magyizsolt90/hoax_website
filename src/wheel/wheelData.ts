export interface Prize {
  id: number;
  label: string;
  promoCode: string;
  description: string;
  website?: string;   // shown as tappable link in the prize modal
  isJackpot: boolean;
  isNoWin?: boolean;
}

export const PRIZES: Prize[] = [
  {
    id: 0,
    label: 'JACKPOT',
    promoCode: 'GBXHOAX30',
    description: 'Részt veszel a sorsoláson: május 31.🎉 + 30% kedvezmény a Goosebumps webshopon',
    website: 'https://goosebumps.hu',
    isJackpot: true,
  },
  {
    id: 1,
    label: 'GB 15%',
    promoCode: 'GBXHOAX15',
    description: '15% kedvezmény a Goosebumps webshopon',
    website: 'https://goosebumps.hu',
    isJackpot: false,
  },
  {
    id: 2,
    label: 'REX 10%',
    promoCode: 'MATHIASREXXHOAX10',
    description: '10% kedvezmény a MATHIAS REX webshopon',
    website: 'https://rexkave.hu',
    isJackpot: false,
  },
  {
    id: 3,
    label: 'IMP 10%',
    promoCode: 'IMPRESSOxHOAX10',
    description: '10% kedvezmény az Impresso webshopon',
    website: 'https://impresso.hu',
    isJackpot: false,
  },
  {
    id: 4,
    label: 'NO WIN',
    promoCode: 'NOWIN',
    description: 'Sajnos ezúttal nem nyertél...😔',
    isJackpot: false,
    isNoWin: true,
  },
  {
    id: 5,
    label: 'DGZ 10%',
    promoCode: 'DAGAZXHOAX10',
    description: '10% kedvezmény a Dagaz webshopon',
    website: 'https://dagaz.hu',
    isJackpot: false,
  },
  {
    id: 6,
    label: 'REX 5%',
    promoCode: 'MATHIASREXXHOAX5',
    description: '5% kedvezmény a MATHIAS REX webshopon',
    website: 'https://rexkave.hu',
    isJackpot: false,
  },
  {
    id: 7,
    label: 'IMP 20%',
    promoCode: 'IMPRESSOxHOAX20',
    description: '20% kedvezmény az Impresso webshopon',
    website: 'https://impresso.hu',
    isJackpot: false,
  },
  {
    id: 8,
    label: 'DGZ 20%',
    promoCode: 'DAGAZXHOAX20',
    description: '20% kedvezmény a Dagaz webshopon',
    website: 'https://dagaz.hu',
    isJackpot: false,
  },
];

export const SEGMENT_COUNT = PRIZES.length;
export const SEGMENT_ANGLE = 360 / SEGMENT_COUNT; // 36°
