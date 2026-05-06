export interface Prize {
  id: number;
  label: string;
  promoCode: string;
  description: string;
  website?: string;   // shown as tappable link in the prize modal
  isJackpot: boolean;
  isNoWin?: boolean;
}

// 10 prizes — index 0 = JACKPOT, index 5 = NO WIN (opposite side)
export const PRIZES: Prize[] = [
  {
    id: 0,
    label: 'JACKPOT',
    promoCode: 'COFFEEBOX',
    description: 'Részt veszel a sorsoláson: május 31.🎉',
    isJackpot: true,
  },
  {
    id: 1,
    label: 'GBX 15%',
    promoCode: 'GBXHOAX15',
    description: '15% kedvezmény a Goosebumps webshopon',
    website: 'https://goosebumps.hu',
    isJackpot: false,
  },
  {
    id: 2,
    label: 'CRJ ??%',
    promoCode: 'TODO: UPDATE CODE',
    description: '??% kedvezmény a Crackerjack webshopon',
    website: 'https://crackerjack.hu',
    isJackpot: false,
  },
  {
    id: 3,
    label: 'REX 10%',
    promoCode: 'MATHIASREXXHOAX10',
    description: '10% kedvezmény a MATHIAS REX webshopon',
    website: 'https://rexkave.hu',
    isJackpot: false,
  },
  {
    id: 4,
    label: 'GBX 30%',
    promoCode: 'GBXHOAX30',
    description: '30% kedvezmény a Goosebumps webshopon',
    website: 'https://goosebumps.hu',
    isJackpot: false,
  },
  {
    id: 5,
    label: 'NO WIN',
    promoCode: 'NOWIN',
    description: 'Sajnos ezúttal nem nyertél 😔 Próbálj újra legközelebb!',
    isJackpot: false,
    isNoWin: true,
  },
  {
    id: 6,
    label: 'CRJ ??%',
    promoCode: 'TODO: UPDATE CODE',
    description: '??% kedvezmény a Crackerjack webshopon',
    website: 'https://crackerjack.hu',
    isJackpot: false,
  },
  {
    id: 7,
    label: 'DAGAZ 10%',
    promoCode: 'DAGAZXHOAX10',
    description: '10% kedvezmény a Dagaz webshopon',
    website: 'https://dagaz.hu',
    isJackpot: false,
  },
  {
    id: 8,
    label: 'REX 5%',
    promoCode: 'MATHIASREXXHOAX5',
    description: '5% kedvezmény a MATHIAS REX webshopon',
    website: 'https://rexkave.hu',
    isJackpot: false,
  },
  {
    id: 9,
    label: 'DAGAZ 20%',
    promoCode: 'DAGAZXHOAX20',
    description: '20% kedvezmény a Dagaz webshopon',
    website: 'https://dagaz.hu',
    isJackpot: false,
  },
];

export const SEGMENT_COUNT = PRIZES.length; // 10
export const SEGMENT_ANGLE = 360 / SEGMENT_COUNT; // 36°
