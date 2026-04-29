export interface Prize {
  id: number;
  label: string;
  sublabel?: string;
  promoCode: string;
  description: string;
  isJackpot: boolean;
}

// 15 prizes: index 0 = JACKPOT (major), 1–14 = promo codes
export const PRIZES: Prize[] = [
  {
    id: 0,
    label: 'JACKPOT',
    promoCode: 'HOAX-JACKPOT-001',
    description: '3 hónapos HOAX előfizetés — INGYEN!',
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
    label: '20%',
    sublabel: 'OFF',
    promoCode: 'HOAX20-B3G',
    description: '20% kedvezmény az előfizetésre',
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
    promoCode: 'HOAX10-D5I',
    description: '10% kedvezmény az előfizetésre',
    isJackpot: false,
  },
  {
    id: 5,
    label: '30%',
    sublabel: 'OFF',
    promoCode: 'HOAX30-E6J',
    description: '30% kedvezmény az első hónapra',
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
    label: 'FREE',
    sublabel: 'KÁVÉ',
    promoCode: 'HOAXCAFE-L3Q',
    description: 'Ingyenes kávé a HOAX partnereinél',
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
