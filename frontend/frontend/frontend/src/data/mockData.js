export const categoryOptions = [
  'Prostate Health',
  'Urinary Health',
  'Sexual Health',
  'STI Awareness',
];

export const healthFacts = [
  {
    id: 1,
    title: 'Aging can change urinary habits',
    description:
      'Some changes in urination, such as needing to pass urine more often at night, can happen with age and may be linked to prostate enlargement or other common causes.',
    category: 'Prostate Health',
    source: 'NHS',
    sourceUrl: 'https://www.nhs.uk/conditions/prostate-problems/',
  },
  {
    id: 2,
    title: 'Many urinary symptoms are not a diagnosis',
    description:
      'Painful urination, burning, or frequent urination can have several causes, including infection, irritation, or inflammation that should be assessed by a clinician.',
    category: 'Urinary Health',
    source: 'CDC',
    sourceUrl: 'https://www.cdc.gov/antibiotic-use/uti.html',
  },
  {
    id: 3,
    title: 'Some STIs can have mild or no symptoms',
    description:
      'Sexually transmitted infections may not always cause obvious symptoms, which is why regular testing and open communication with a healthcare professional are important.',
    category: 'STI Awareness',
    source: 'WHO',
    sourceUrl: 'https://www.who.int/news-room/fact-sheets/detail/sexually-transmitted-infections-(stis)',
  },
  {
    id: 4,
    title: 'Sexual function can be affected by stress and health conditions',
    description:
      'Low libido, erectile difficulties, or changes in sexual function may be influenced by stress, tiredness, medications, or underlying medical conditions.',
    category: 'Sexual Health',
    source: 'NIDDK',
    sourceUrl: 'https://www.niddk.nih.gov/health-information/urologic-diseases/erectile-dysfunction',
  },
];

export const mythFacts = [
  {
    id: 1,
    myth: 'A frequent urge to urinate always means prostate cancer.',
    fact: 'Not necessarily. Frequent urination can happen for several reasons, including urinary tract irritation, infections, or prostate enlargement.',
    explanation:
      'Some urinary changes can be common and not cancer-related. A trained clinician can help work out the most likely cause through assessment and testing.',
    category: 'Prostate Health',
    source: 'NHS',
    sourceUrl: 'https://www.nhs.uk/conditions/prostate-enlargement/',
  },
  {
    id: 2,
    myth: 'UTIs only affect women.',
    fact: 'UTIs can affect men too, although they are less common.',
    explanation:
      'Men can develop urinary tract infections, particularly when there are urinary blockages, catheters, or other underlying conditions.',
    category: 'Urinary Health',
    source: 'CDC',
    sourceUrl: 'https://www.cdc.gov/antibiotic-use/uti.html',
  },
  {
    id: 3,
    myth: 'If you feel fine, you do not need STI screening.',
    fact: 'You can still have an STI without noticing symptoms.',
    explanation:
      'Some infections may be asymptomatic, so screening is important for people with risk factors or concerns about exposure.',
    category: 'STI Awareness',
    source: 'WHO',
    sourceUrl: 'https://www.who.int/news-room/fact-sheets/detail/sexually-transmitted-infections-(stis)',
  },
  {
    id: 4,
    myth: 'Erectile problems are always caused by stress alone.',
    fact: 'Erectile difficulties can have several causes, including health conditions, medication, lifestyle, and emotional factors.',
    explanation:
      'A medical review can help determine whether a physical, emotional, or combined cause is more likely.',
    category: 'Sexual Health',
    source: 'NIDDK',
    sourceUrl: 'https://www.niddk.nih.gov/health-information/urologic-diseases/erectile-dysfunction',
  },
];

export const adminHealthFactsSeed = [
  {
    id: 101,
    title: 'Prostate health checks may include discussion of symptoms',
    description:
      'Men may be asked about urinary flow, nighttime urination, and any changes in sensation or discomfort as part of routine review.',
    category: 'Prostate Health',
    source: 'NHS',
    sourceUrl: 'https://www.nhs.uk/conditions/prostate-problems/',
  },
  {
    id: 102,
    title: 'Hydration matters for urinary health',
    description:
      'Drinking enough water can help support normal urinary function, but personal needs vary and some conditions may require advice from a clinician.',
    category: 'Urinary Health',
    source: 'NHS',
    sourceUrl: 'https://www.nhs.uk/conditions/urinary-tract-infections-utis/',
  },
];

export const adminMythFactsSeed = [
  {
    id: 201,
    myth: 'Only older men get urinary problems.',
    fact: 'Urinary symptoms can affect men at different ages.',
    explanation:
      'Concerning urinary symptoms can happen in younger adults too, especially if there is a urinary infection or another underlying issue.',
    category: 'Urinary Health',
    source: 'NHS',
    sourceUrl: 'https://www.nhs.uk/conditions/urinary-tract-infections-utis/',
  },
];
