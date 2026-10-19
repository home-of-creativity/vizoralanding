// Facts shared by both locales, exactly as they appear in the Company Profile.
export const CONTACT = {
  phone: '+920 940 958 963',
  email: 'vizora.gr@gmail.com',
  social: 'visoragroup',
  facebook: 'https://www.facebook.com/visoragroup',
  instagram: 'https://www.instagram.com/visoragroup',
} as const;

/** Same order as `achievements.items` in each locale. */
export const ACHIEVEMENT_VALUES = [250, 59, 55, 30, 50, 40, 12] as const;

export const FOUNDED_YEAR = 2019;

/** Client names as written in the Company Profile; shown as text because no logo files were supplied. */
export const CLIENTS = [
  'World Health Organization',
  'Dorcas',
  'UNESCO',
  'The Developer for Economical Consultancy Ltd',
] as const;
