export interface Prize {
  id: number;
  label: string;
  sublabel?: string;
  promoCode: string;
  description: string;
  website?: string;   // optional — shown as tappable link in the prize modal
  isJackpot: boolean;
}

// 15 prizes: index 0 = JACKPOT (major), 1–14 = promo codes
export const PRIZES: Prize[] = [
  {
    id: 0,
    label: 'COFFEE BOX',
    promoCode: 'JACKPOT',
    description: 'Részt veszel a sorsoláson: május 31🎉',
    isJackpot: true,
  },
  {
    id: 1,
    label: '10%',
    sublabel: 'OFF',
    promoCode: 'HOAX10-A2F',
    description: '10% kedvezmény az előfizetésre',
    isJackpot: false,
  },
  {
    id: 2,
    label: '15%',
    sublabel: 'OFF',
    promoCode: 'GBXHOAX15',
    description: '15% kedvezmény a Goosebumps webshopon',
    website: 'https://goosebumps.hu',
    isJackpot: false,
  },
  {
    id: 3,
    label: '15%',
    sublabel: 'OFF',
    promoCode: 'HOAX15-C4H',
    description: '15% kedvezmény az előfizetésre',
    isJackpot: false,
  },
  {
    id: 4,
    label: '10%',
    sublabel: 'OFF',
    promoCode: 'MATHIASREXXHOAX10',
    description: '10% kedvezmény a MATHIAS REX webshopon',
    website: 'https://mathiasrexx.com',
    isJackpot: false,
  },
  {
    id: 5,
    label: '30%',
    sublabel: 'OFF',
    promoCode: 'GBXHOAX30',
    description: '30% kedvezmény a Goosebumps webshopon',
    website: 'https://goosebumps.hu',
    isJackpot: false,
  },
  {
    id: 6,
    label: 'FREE',
    sublabel: 'KÁVÉ',
    promoCode: 'HOAXCAFE-F7K',
    description: 'Ingyenes kávé a HOAX partnereinél',
    isJackpot: false,
  },
  {
    id: 7,
    label: '20%',
    sublabel: 'OFF',
    promoCode: 'HOAX20-G8L',
    description: '20% kedvezmény az előfizetésre',
    isJackpot: false,
  },
  {
    id: 8,
    label: '50%',
    sublabel: 'OFF',
    promoCode: 'HOAX50-H9M',
    description: '50% kedvezmény az első hónapra',
    isJackpot: false,
  },
  {
    id: 9,
    label: '10%',
    sublabel: 'OFF',
    promoCode: 'HOAX10-I0N',
    description: '10% kedvezmény az előfizetésre',
    isJackpot: false,
  },
  {
    id: 10,
    label: '25%',
    sublabel: 'OFF',
    promoCode: 'HOAX25-J1O',
    description: '25% kedvezmény az előfizetésre',
    isJackpot: false,
  },
  {
    id: 11,
    label: '10%',
    sublabel: 'OFF',
    promoCode: 'HOAX10-K2P',
    description: '10% kedvezmény az előfizetésre',
    isJackpot: false,
  },
  {
    id: 12,
    label: '5%',
    sublabel: 'OFF',
    promoCode: 'MATHIASREXXHOAX5',
    description: '5% kedvezmény a MATHIAS REX webshopon',
    website: 'https://mathiasrexx.com',
    isJackpot: false,
  },
  {
    id: 13,
    label: '15%',
    sublabel: 'OFF',
    promoCode: 'HOAX15-M4R',
    description: '15% kedvezmény az előfizetésre',
    isJackpot: false,
  },
  {
    id: 14,
    label: '20%',
    sublabel: 'OFF',
    promoCode: 'HOAX20-N5S',
    description: '20% kedvezmény az előfizetésre',
    isJackpot: false,
  },
];

export const SEGMENT_COUNT = PRIZES.length; // 15
export const SEGMENT_ANGLE = 360 / SEGMENT_COUNT; // 24°
