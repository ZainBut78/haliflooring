// Single source of truth for all content used by pages + SSG generator.

export const SITE = {
  name: 'Hali Flooring',
  url: 'https://haliflooring.co.uk',
  phone: '+447467030479',
  phoneDisplay: '+44 7467 030479',
  whatsapp: 'https://wa.me/447467030479',
  email: 'quotes@haliflooring.co.uk',
  address: {
    line1: 'Bolton',
    line2: 'Greater Manchester',
    postcode: 'BL1',
    country: 'United Kingdom',
  },
  hours: [
    { day: 'Mon - Fri', time: '8:00 AM - 6:00 PM' },
    { day: 'Saturday', time: '9:00 AM - 4:00 PM' },
    { day: 'Sunday', time: 'Emergency / By Appt' },
  ],
}

// Photos come from the optimised manifest (scripts/optimize-images.mjs) rather
// than the multi-megabyte originals in src/assets/Images, so every page ships
// WebP/JPEG variants at sensible widths instead of 16 MB of camera files.
import { optimizedImages } from '../assets/generated/images'

const flooring1 = optimizedImages['flooring-1']
const flooring2 = optimizedImages['flooring-2']
const flooring3 = optimizedImages['flooring-3']
const flooring4 = optimizedImages['flooring-4']
const flooring5 = optimizedImages['flooring-5']
const flooring6 = optimizedImages['flooring-6']

export const imagePool = [flooring1, flooring2, flooring3, flooring4, flooring5, flooring6]

/**
 * Every project is fully static data, so the SSG generator can
 * enumerate /work/<slug> pages and emit them at build time.
 */
export const projects = [
  {
    slug: 'bolton-residence-herringbone-lvt',
    category: 'lvt',
    categoryLabel: 'LVT & Vinyl',
    title: '45m² Open-Plan Kitchen & Diner in Herringbone LVT',
    location: 'Bolton, BL1',
    metaTitle: 'Herringbone LVT Installation in Bolton | Hali Flooring Project',
    metaDescription:
      '45m² herringbone luxury vinyl tile installation in Bolton, Greater Manchester. Full latex screed prep, 2-plank perimeter border and flush brass transitions. See our Bolton LVT project.',
    excerpt:
      'Precision herringbone alignment across an open-plan kitchen and diner, finished with a two-plank perimeter border and flush brass transitions.',
    images: [flooring2, flooring6, flooring1],
    specs: {
      Area: '45m²',
      Duration: '3 Days',
      Product: 'Luxury Vinyl Tile (Herringbone)',
      Subfloor: 'Latex Screed + DPM',
      'Area Covered': '45 m² open-plan',
      Pattern: 'Herringbone with 2-plank border',
    },
    challenge:
      'The existing subfloor had significant level variation across a 45m² open-plan space, and the clients wanted a herringbone layout that ran uninterrupted from the kitchen island through to the dining area.',
    solution:
      'We laser-surveyed the full floor, laid a fresh latex screed to bring the slab within tolerance, then installed the herringbone LVT from the centre line outwards so the pattern stayed symmetrical on both sides of the room.',
    duration: '3 days on site',
  },
  {
    slug: 'worsley-manor-custom-runner',
    category: 'carpet',
    categoryLabel: 'Carpets & Runners',
    title: 'Bespoke Wool Stair Runner with Whipped Edge',
    location: 'Worsley, M28',
    metaTitle: 'Bespoke Stair Runner Installation in Worsley | Hali Flooring Project',
    metaDescription:
      'Custom whipped wool stair runner fitted to a curved staircase flight in Worsley, Greater Manchester. Deep pile wool twist with 11mm acoustic underlay and matte black stair rods.',
    excerpt:
      'A deep pile wool runner custom-whipped on site over a curved flight, with acoustic underlay and matte black stair rods.',
    images: [flooring3, flooring5],
    specs: {
      Area: '18m²',
      Duration: '2 Days',
      Product: 'Wool Twist Saxony',
      Subfloor: '11mm Acoustic Underlay',
      'Area Covered': 'Curved flight + landing',
      Finish: 'Hand-whipped edge, matte black rods',
    },
    challenge:
      'The staircase curved through a 180-degree turn, so a straight off-the-shelf runner would not sit flat. The clients also wanted to reduce footfall noise from the open-plan landing below.',
    solution:
      'We templated the full curved flight on site, hand-whipped the runner edge to a 60mm allowance, and fitted 11mm acoustic underlay beneath to dampen noise transfer between floors.',
    duration: '2 days on site',
  },
  {
    slug: 'chorley-barn-engineered-oak',
    category: 'wood',
    categoryLabel: 'Engineered Wood',
    title: 'Smoked Brushed Engineered Oak over Underfloor Heating',
    location: 'Chorley, PR7',
    metaTitle: 'Engineered Oak Flooring over UFH in Chorley | Hali Flooring Project',
    metaDescription:
      '120m² smoked brushed engineered oak flooring installed over underfloor heating in Chorley, Lancashire. Floating installation with thermal acoustic membrane and ply boarding.',
    excerpt:
      'A 120m² floating installation of smoked brushed European oak over underfloor heating, with a thermal acoustic membrane and ply boarded subfloor.',
    images: [flooring1, flooring4, flooring6],
    specs: {
      Area: '120m²',
      Duration: '5 Days',
      Product: 'Smoked Brushed Engineered Oak 190mm',
      Subfloor: 'Thermal Acoustic Membrane + Ply',
      'Area Covered': 'Barn conversion, full ground floor',
      Finish: 'Brushed, oiled, natural knots',
    },
    challenge:
      'A converted barn with a solid concrete slab and a newly installed manifold underfloor heating system. Solid engineered oak needed correct thermal resistance or the flooring would overheat and cup.',
    solution:
      'We boarded the slab with moisture-resistant ply, laid a thermal and acoustic membrane between ply and oak, then floated the 190mm engineered planks. Heating was brought up slowly over a staged commissioning schedule.',
    duration: '5 days on site',
  },
  {
    slug: 'manchester-office-safety-flooring',
    category: 'commercial',
    categoryLabel: 'Commercial',
    title: 'Coved Safety Vinyl for Commercial Wet Areas',
    location: 'Manchester, M2',
    metaTitle: 'Commercial Safety Flooring in Manchester | Hali Flooring Project',
    metaDescription:
      '85m² of hygienic anti-slip safety vinyl installed with coved skirting in a Manchester city centre office wet room and kitchen areas. Full contract fit-out.',
    excerpt:
      'Hygienic anti-slip safety vinyl with a coved skirting detail, installed across commercial wet rooms and kitchen areas to contract specification.',
    images: [flooring5, flooring2],
    specs: {
      Area: '85m²',
      Duration: '4 Days',
      Product: 'Commercial Safety Vinyl',
      Subfloor: 'Screed + Feather Edge',
      'Area Covered': 'Wet rooms, staff kitchen, changing area',
      Finish: 'Coved skirting, welded seams',
    },
    challenge:
      'A city centre office required washable, slip-resistant flooring in wet areas, with a coved detail so the floor-to-wall junction could be cleaned without a dirt trap.',
    solution:
      'We feather-edged the screed perimeter, installed the safety vinyl sheet and formed a 100mm coved skirting with a welded seam, giving a fully sealed surface for infection-control cleaning.',
    duration: '4 days on site',
  },
  {
    slug: 'bury-retail-laminate-herringbone',
    category: 'laminate',
    categoryLabel: 'Laminate',
    title: 'AC5 Herringbone Laminate for High-Traffic Retail',
    location: 'Bury, BL9',
    metaTitle: 'AC5 Herringbone Laminate in Bury | Hali Flooring Project',
    metaDescription:
      '60m² of AC5 rated herringbone laminate installed over a fibreboard subfloor in Bury, Greater Manchester. Built for high-traffic retail durability.',
    excerpt:
      'Heavy-duty AC5 herringbone laminate laid over fibreboard and DPM, specified for daily footfall in a retail unit.',
    images: [flooring4, flooring2],
    specs: {
      Area: '60m²',
      Duration: '2 Days',
      Product: 'AC5 Herringbone Laminate',
      Subfloor: 'Fibreboard + DPM',
      'Area Covered': 'Retail shop floor + stockroom',
      Finish: 'Herringbone, click-fit',
    },
    challenge:
      'A retail floor with constant footfall and occasional damp mopping. The budget allowed laminate but the spec still had to handle commercial wear.',
    solution:
      'We specified AC5 wear-rated herringbone laminate over a fibreboard and DPM build-up, giving a 30-year wear warranty on a floor that sees daily footfall and wet cleaning.',
    duration: '2 days on site',
  },
  {
    slug: 'preston-care-home-wet-rooms',
    category: 'commercial',
    categoryLabel: 'Commercial',
    title: '12 Wet Rooms with Hot-Welded Safety Vinyl',
    location: 'Preston, PR1',
    metaTitle: 'Care Home Wet Room Flooring in Preston | Hali Flooring Project',
    metaDescription:
      '120m² of safety vinyl across 12 en-suite wet rooms in a Preston care home. Waterproof tanking, coved skirting and hot-welded seams for infection control.',
    excerpt:
      'Twelve en-suite wet rooms fitted with waterproof tanking and hot-welded safety vinyl, built to infection-control standard while the facility remained in operation.',
    images: [flooring6, flooring5, flooring3],
    specs: {
      Area: '120m²',
      Duration: '6 Days',
      Product: 'Safety Vinyl (Wet Room)',
      Subfloor: 'Latex Screed + Waterproof Tanking',
      'Area Covered': '12 en-suite wet rooms',
      Finish: 'Coved and hot-welded',
    },
    challenge:
      'A live care home needed 12 en-suites upgraded to infection-control standard without closing the facility, and without noise disruption to residents on adjacent floors.',
    solution:
      'We worked room by room out of hours, applied a waterproof tanking system under the screed, then laid and hot-welded safety vinyl with a coved skirt. No overnight noise and zero room downtime during the day.',
    duration: '6 days on site, out of hours',
  },
]

export const projectCategories = [
  { id: 'all', label: 'All Projects' },
  { id: 'lvt', label: 'LVT & Vinyl' },
  { id: 'wood', label: 'Engineered Wood' },
  { id: 'carpet', label: 'Carpets & Runners' },
  { id: 'laminate', label: 'Laminate' },
  { id: 'commercial', label: 'Commercial' },
]

export const services = {
  lvt: {
    slug: 'lvt',
    name: 'Luxury Vinyl Tile',
    navLabel: 'LVT',
    metaTitle: 'Luxury Vinyl Tile (LVT) Flooring Specialists | Herringbone & Chevron | Hali Flooring',
    metaDescription:
      'Luxury Vinyl Tile flooring specialists across the North West. Herringbone, chevron and bordered LVT installed with flush transitions. Free home survey, free laser measure and no-obligation quote. Call +44 7467 030479.',
    heroHeading: 'LUXURY VINYL TILE',
    intro:
      'Hardwearing, water-proof and available in the herringbone and chevron patterns that engineered timber costs three times as much to achieve. LVT is the single most requested floor in the North West right now.',
    // Unique per service, so the six service pages never share a paragraph.
    sellingPoint:
      'Every LVT job starts with a laser survey of the slab, because a herringbone layout magnifies any dip in the subfloor. We then set the centre line first and work outwards, which is the only way the chevron reads symmetrical across a kitchen diner.',
    faqNote:
      'The questions Bolton homeowners actually ask before ordering LVT — mostly about water, underfloor heating and how long a herringbone floor really takes.',
    // Short line for the /services index card, so the index does not reprint
    // each service page's opening paragraph.
    listBlurb:
      'Water-proof herringbone and chevron laid from a laser-set centre line, with a flushed brass or oak threshold at every doorway.',
    features: [
      { title: 'Herringbone & Chevron', desc: 'Classic 45° herringbone and chevron layouts laid to a true centre line so the pattern reads symmetrical across the room.' },
      { title: '100% Water-Proof', desc: 'Fully waterproof core, so kitchens, bathrooms and utility rooms are covered without the warping risk of real timber.' },
      { title: 'Commercial Wear Ratings', desc: 'Available in heavy-duty wear layers rated for busy family homes and light commercial footfall.' },
      { title: 'Underfloor Heating Ready', desc: 'Thermal resistance tested for compatibility with underfloor heating manifolds.' },
      { title: 'Flush Transitions', desc: 'Brass, oak or matched trim transitions laid perfectly flush so there is no trip lip between rooms.' },
      { title: 'Free Laser Measure', desc: 'Accurate laser surveying of every room before a single board is ordered. No wastage, no surprises.' },
    ],
    faqs: [
      { q: 'Is LVT as good as real wood flooring?', a: 'Modern LVT with a rigid core and a 0.55mm+ wear layer performs comparably to engineered timber in a domestic setting, and it is fully waterproof. Many of our Bolton and Manchester clients choose LVT specifically to avoid the water risk of real oak in kitchens and bathrooms.' },
      { q: 'How long does a herringbone LVT installation take?', a: 'A typical 45m² open-plan herringbone installation takes three to four days on site, assuming the subfloor is level. If screeding is also needed, allow an additional two days for the screed to cure.' },
      { q: 'Can LVT go over underfloor heating?', a: 'Yes, provided the product is specifically rated for underfloor heating. We check the manufacturer specification for every product before we order it, and we always confirm the surface temperature does not exceed 27°C.' },
      { q: 'Do you remove the old flooring first?', a: 'Yes, old floor removal and disposal is included in the quote for every job. We lift the old floor, clear the debris, and prepare the subfloor ready for the new installation.' },
    ],
  },
  wood: {
    slug: 'wood',
    name: 'Engineered Wood Flooring',
    navLabel: 'Engineered Wood',
    metaTitle: 'Engineered Wood Flooring | Real Oak & Smoked Planks | Hali Flooring Bolton',
    metaDescription:
      'Engineered real oak flooring specialists. Smoked, brushed and oiled European oak in straight plank, herringbone and chevron. Built for underfloor heating. Free measure and quote across Greater Manchester and Lancashire.',
    heroHeading: 'ENGINEERED WOOD',
    intro:
      'Real oak, engineered to be stable over underfloor heating and British humidity. Our Chorley barn conversion shows exactly what a 120m² engineered oak floor looks like when it is specified properly.',
    sellingPoint:
      'Timber moves, and engineered oak is built to move with it. We hold each board to a 6–8% moisture content for the property, acclimatise the packs inside for a week before laying, and leave a gap at every wall so the floor can breathe through its worst winter.',
    faqNote:
      'Everything about engineered oak that catches people out: whether it is genuinely suitable over underfloor heating, how to care for an oiled finish, and what happens to a gapped floor in January.',
    listBlurb:
      'Real European oak, engineered to stay flat over heating and British humidity, in straight plank, herringbone or chevron.',
    features: [
      { title: 'European Oak Species', desc: 'Genuine European oak in a range of finishes, from natural oiled to smoked and brushed for a darker, wire-brushed look.' },
      { title: 'UFH Compatible', desc: 'Engineered construction with a suitable thermal resistance, so real timber works safely over underfloor heating systems.' },
      { title: 'Herringbone & Chevron', desc: 'Full pattern work in engineered oak, laid from a laser-set centre line across the full room to avoid pattern drift.' },
      { title: 'Wide Plank Availability', desc: '190mm and wider planks in fixed lengths to minimise end joints and give a cleaner, calmer floor line.' },
      { title: 'Subfloor Prep Included', desc: 'Ply boarding, damp proof membrane and acoustic underlay supplied and fitted as part of the installation.' },
      { title: 'Staged Commissioning', desc: 'With underfloor heating we bring the system up slowly on a staged schedule to protect the timber during the first weeks.' },
    ],
    faqs: [
      { q: 'What is the difference between solid and engineered oak?', a: 'Solid oak is a single timber layer, typically 14-20mm thick. Engineered oak is a real oak wear layer bonded to a plywood or softwood base, making it far more dimensionally stable and therefore the correct choice over underfloor heating.' },
      { q: 'Is engineered oak suitable for kitchens?', a: 'It works well in kitchens if you maintain sensible water exposure and wipe spills promptly. For fully wet rooms such as bathrooms, we would normally recommend safety vinyl or LVT instead, because real timber and standing water are not a good pairing.' },
      { q: 'How long does engineered oak last?', a: 'A quality engineered oak floor with a 3mm+ wear layer should last 25-30 years in a domestic property with normal maintenance. We supply board lengths and wear layers sized to the traffic level of the room.' },
      { q: 'Can engineered oak go over concrete?', a: 'Yes, provided the subfloor is prepared correctly. We lay a moisture-resistant plywood base, a damp proof membrane, and an acoustic underlay before the timber is floated or bonded. Our Chorley barn project was a full concrete slab.' },
    ],
  },
  carpet: {
    slug: 'carpet',
    name: 'Carpets & Stair Runners',
    navLabel: 'Carpets & Runners',
    metaTitle: 'Carpets & Bespoke Stair Runners | Wool, Saxony & Runners | Hali Flooring',
    metaDescription:
      'Deep pile saxony carpets, wool twists and bespoke stair runners across Bolton and the North West. Hand-whipped edges, acoustic underlay and matte black stair rods. Free home survey.',
    heroHeading: 'CARPETS & STAIR RUNNERS',
    intro:
      'Carpet is the warmest, quietest and most forgiving floor in the house. For staircases we template on site and whip the edge by hand, so the runner follows a curve rather than fighting it.',
    sellingPoint:
      'Carpet is judged on what is underneath it, and that is what gets skipped. We stretch-fit with a proper knee kicker, power-stretcher and trimmer rather than a staple gun, so a fitted carpet stays flat through a British winter instead of ridging along the wall.',
    faqNote:
      'Carpet questions from our Bolton installs: choosing a pile for a busy hallway, whether underlay matters, and what fitting a curved staircase actually involves.',
    listBlurb:
      'Deep saxony and wool twists, plus bespoke stair runners templated on site and hand-whipped to follow a curve.',
    features: [
      { title: 'Deep Pile Saxony', desc: 'High-twist saxony in wool and wool blends, selected for longevity in the highest traffic rooms in the house.' },
      { title: 'Bespoke Stair Runners', desc: 'Runners templated on site to follow curved or straight flights, cut and hand-whipped to fit exactly.' },
      { title: 'Acoustic Underlay', desc: '11mm underlay beneath stair runners to reduce impact noise between floors in converted and loft spaces.' },
      { title: 'Stair Rods & Finishing', desc: 'Matte black, brass or stainless rods fixed to hold runners securely on the tread.' },
      { title: 'Room Sizing Advice', desc: 'We will tell you if a room needs a patterned carpet, or if a plain twist will wear better and cost less over ten years.' },
      { title: 'Free Sampling Call', desc: 'Order swatches to your home from the mobile showroom van, or visit the Bolton showroom in person.' },
    ],
    faqs: [
      { q: 'Can stair runners follow a curved staircase?', a: 'Yes. For a curved flight we template the full run on site, cut the runner to the measured profile and whip the edge by hand. Our Worsley manor project is a full 180-degree curved flight.' },
      { q: 'Wool or synthetic carpet — which is better?', a: 'Wool is naturally resilient, self-cleaning in fibre and lasts longer, but costs more per square metre. Synthetic twists are more stain resistant and budget-friendly. For high-traffic hallways we usually recommend a wool-rich blend.' },
      { q: 'What underlay do you use?', a: 'We use 11mm acoustic underlay as standard on staircases, and a 10-12mm bonded underlay on normal floors. Underlay is the single biggest factor in how a carpet feels and wears over time.' },
      { q: 'How long does carpet fitting take?', a: 'A standard room takes most of a day including removal of the old carpet. Stair runners take around two days, since each tread and riser is templated and cut individually.' },
    ],
  },
  laminate: {
    slug: 'laminate',
    name: 'Laminate Flooring',
    navLabel: 'Laminate',
    metaTitle: 'Laminate Flooring | AC4 & AC5 Herringbone & Straight Plank | Hali Flooring',
    metaDescription:
      'Heavy duty AC4 and AC5 laminate flooring in straight plank and herringbone across Bolton and the North West. Water-resistant options for busy homes. Free measure and fit.',
    heroHeading: 'LAMINATE FLOORING',
    intro:
      'Laminate is the value-for-money option that has genuinely improved. AC5 herringbone in a busy Bury retail unit proves that you do not need real timber to get a herringbone floor.',
    sellingPoint:
      'A floating click floor lives or dies on the flatness of what is under it, because the boards span the floor rather than bonding to it. We laser-check every high point and bring the whole room into tolerance with a screed before a single board is locked together.',
    faqNote:
      'Laminate questions we get asked most: which wear rating suits which room, how much it really saves against engineered oak, and where a click floor will not work at all.',
    listBlurb:
      'AC4 and AC5 heavy domestic laminate in straight plank and herringbone, floating-fitted with no glue lines and no dust.',
    features: [
      { title: 'AC4 & AC5 Wear Ratings', desc: 'We specify on the room, not the budget. Bedrooms take AC4, busy kitchens and commercial spaces take AC5.' },
      { title: 'Herringbone & Straight Plank', desc: 'Available in both layouts, with the herringbone ranges producing a genuinely convincing timber look.' },
      { title: 'Water-Resistant Core', desc: 'A sealed HDF core that stands up to everyday kitchen and bathroom spills without swelling.' },
      { title: 'Click-Fit Installation', desc: 'Fast, clean floating installation with no glue lines and no dust created in the property.' },
      { title: 'Fibreboard Preparation', desc: 'Where the existing subfloor needs it, we lay fibreboard and DPM to give the click system a stable, flat base.' },
      { title: '10 Year Wear Guarantee', desc: 'Every commercial-rated AC5 laminate we fit carries a 10 year wear layer warranty.' },
    ],
    faqs: [
      { q: 'What is the difference between AC4 and AC5 laminate?', a: 'Both are wear ratings. AC4 is intended for normal domestic use in rooms such as bedrooms and living rooms. AC5 is a commercial grade suitable for busy hallways, kitchens and light commercial footfall. We recommend AC5 wherever water and traffic combine.' },
      { q: 'Is laminate as good as engineered wood?', a: 'Engineered wood is the better floor for resale value and long-term feel, because it is real timber. Modern AC5 laminate, however, is dramatically improved and is the right choice where the budget matters or the area is very wet.' },
      { q: 'Can laminate be used in a bathroom?', a: 'It can, provided it is a genuine water-resistant core and the room has suitable ventilation. For a fully wet room we would normally specify safety vinyl, which is designed for standing water and coved skirting.' },
      { q: 'How long does laminate take to install?', a: 'A typical 60m² straight plank installation takes two days including subfloor preparation. Herringbone takes longer because every plank is individually aligned.' },
    ],
  },
  commercial: {
    slug: 'commercial',
    name: 'Commercial Flooring',
    navLabel: 'Commercial',
    metaTitle: 'Commercial Flooring Contractors | Safety Flooring & Contract Work | Hali Flooring',
    metaDescription:
      'Commercial flooring contractor serving the North West. Hygienic safety flooring, coved skirting and welded seams for care homes, clinics, kitchens and offices. Fully insured contract work.',
    heroHeading: 'COMMERCIAL FLOORING',
    intro:
      'We are a fully insured flooring contractor as well as a domestic installer. Our Manchester and Preston commercial projects run to a contract spec, with method statements and out-of-hours working where the building stays open.',
    sellingPoint:
      'In a care home or a clinic, the floor is inspected for a slip rating rather than admired. We lay R11 safety vinyl with hot-welded seams and a coved skirting, and we hold the R11 certificate on file so your compliance audit has the paperwork already in it.',
    faqNote:
      'Commercial and wet-room questions: which slip rating a care home or commercial kitchen needs, how we work around a live building, and what our insurance paperwork covers.',
    listBlurb:
      'R11 safety vinyl with welded seams and coved skirting, fitted out of hours so care homes and offices stay open.',
    features: [
      { title: 'Safety Flooring', desc: 'R11-rated hygienic anti-slip vinyl for wet rooms, kitchens and clinical areas, with welded seams.' },
      { title: 'Coved Skirting', desc: 'A 100mm coved detail formed and welded so the floor-to-wall junction can be washed down with no dirt trap.' },
      { title: 'Out-of-Hours Working', desc: 'We work nights and weekends on live care homes and occupied offices, with zero daytime room downtime.' },
      { title: 'Insured & Documented', desc: 'Full public liability and professional indemnity cover, method statements, and RAMS on request.' },
      { title: 'Waterproof Tanking', desc: 'Tanking systems and tanking membranes under screed in areas subject to persistent moisture ingress.' },
      { title: 'Maintenance Advice', desc: 'Written cleaning and maintenance schedules handed over on completion so the floor keeps performing.' },
    ],
    faqs: [
      { q: 'What safety flooring do you install?', a: 'Commercial safety vinyl rated to R11 for slip resistance, usually in sheet form so we can weld the seams and form a coved skirting. We hold stock from Polyflor and Altro so we can match an existing facility spec.' },
      { q: 'Can you work around an occupied building?', a: 'Yes. Our Preston care home project fitted 12 wet rooms while the facility remained fully occupied, working out of hours with no daytime room downtime. We plan around the operation rather than closing the building.' },
      { q: 'Do you provide method statements?', a: 'Yes. Risk assessment and method statements, RAMS and COSHH documentation are all available on request before works begin, along with our public liability and professional indemnity certificates.' },
      { q: 'What areas do you cover commercially?', a: 'We cover the whole North West for contract work, with our base in Bolton. Larger multi-site projects are quoted per site so the client has a clear cost per property.' },
    ],
  },
  subfloor: {
    slug: 'subfloor',
    name: 'Floor Levelling & Prep',
    navLabel: 'Floor Prep',
    metaTitle: 'Floor Levelling & Subfloor Preparation | Screeding & DPM | Hali Flooring',
    metaDescription:
      'Laser-checked floor levelling, self-levelling screeds, damp proof membranes and ply boarding across Bolton and the North West. The prep that decides whether a floor looks good.',
    heroHeading: 'FLOOR LEVELLING & PREP',
    intro:
      'The subfloor decides how a finished floor looks. We laser-survey every room before ordering, and we will tell you honestly if a floor can be laid without screeding rather than selling you a prep package you do not need.',
    sellingPoint:
      'Tolerance is measured in millimetres across a two metre span, not by eye. We laser the whole floor and put the numbers in the quote, so you can see exactly what prep was needed and what was not — and hold us to it on the day.',
    faqNote:
      'Subfloor questions that come up before any flooring order: how thick the screed needs to be, whether a DPM is required, and what self-levelling compound actually costs per square metre.',
    listBlurb:
      'Laser surveying, self-levelling screeds, damp proof membranes and ply boarding, quoted honestly even when no prep is needed.',
    features: [
      { title: 'Laser Surveying', desc: 'Every room is laser-surveyed before a single board is ordered, so quantities are accurate and the pattern lines up.' },
      { title: 'Self-Levelling Screed', desc: 'Flowing self-levelling screeds to bring a slab within tolerance for herringbone, chevron and wide plank timber.' },
      { title: 'Damp Proof Membranes', desc: 'DPM tanking laid to the correct standard for engineered timber and laminate over ground floors.' },
      { title: 'Ply Boarding', desc: 'Moisture-resistant plywood over existing subfloors, then a proper flat base for floating installations.' },
      { title: 'Feather Edging', desc: 'Perimeter feather edging for commercial coved skirting and for tight upstands against walls.' },
      { title: 'Honest Advice', desc: 'If the subfloor is already within tolerance, we will tell you. We do not sell prep packages that are not needed.' },
    ],
    faqs: [
      { q: 'Do I need to level the floor before LVT?', a: 'Not always. LVT in a straight plank format is more forgiving than herringbone. We laser-check the floor first and only recommend levelling if the variation would show in the finished pattern, which is common with herringbone and chevron.' },
      { q: 'How long does a self-levelling screed take to dry?', a: 'A standard cementitious self-levelling screed needs 24 to 48 hours before foot traffic and typically three to seven days before installing the floor covering over it. We will always give you the manufacturer cure time for the specific product used.' },
      { q: 'What is a damp proof membrane?', a: 'A DPM is a sealed membrane laid between the concrete slab and the flooring build-up. It stops ground moisture rising into your timber or laminate, which would otherwise cause cupping and lifting over time.' },
      { q: 'Do you do prep-only jobs?', a: 'Yes. Many clients have their own fitter install the floor, and we do the laser survey, screeding, DPM and ply boarding only. It is a common split on larger commercial projects.' },
    ],
  },
}

export const serviceSlugs = Object.keys(services)

export const areas = [
  { name: 'Bolton', desc: 'Headquarters & Hub', highlight: true },
  { name: 'Manchester', desc: 'City & Greater Area' },
  { name: 'Bury', desc: 'Town & Suburbs' },
  { name: 'Wigan', desc: 'All Postcodes' },
  { name: 'Chorley', desc: 'Central & Surrounds' },
  { name: 'Preston', desc: 'Lancashire County' },
  { name: 'Rochdale', desc: 'Domestic & Commercial' },
  { name: 'Salford', desc: 'Quays & Residential' },
  { name: 'Blackburn', desc: 'Full Coverage' },
  { name: 'Horwich', desc: '& West Pennine' },
]

export const testimonials = [
  {
    quote:
      'They laser-measured the whole open plan before turning up, so the herringbone ran perfectly from the kitchen to the dining area. No wasted boards, no guesswork. Three days, completely tidy.',
    name: 'Sarah K.',
    location: 'Bolton',
    project: 'Herringbone LVT, 45m²',
  },
  {
    quote:
      'The stair runner follows a full curve which I had been told was not worth attempting. Templated on site and whipped by hand. It looks like it was made for the house.',
    name: 'Mark D.',
    location: 'Worsley',
    project: 'Bespoke wool stair runner',
  },
  {
    quote:
      'They brought samples to the house, talked me out of the more expensive option, and explained exactly what would wear better in the hallway. That honesty is why I went back to them for the kitchen.',
    name: 'Priya S.',
    location: 'Chorley',
    project: 'Engineered oak, 120m²',
  },
]

export const stats = [
  { value: '20+', label: 'Years Trading' },
  { value: '3,000+', label: 'Installations' },
  { value: '10', label: 'Areas Covered' },
  { value: '100%', label: 'Insured & Guaranteed' },
]

export const processSteps = [
  {
    step: '01',
    title: 'See It',
    desc: 'Explore our showroom or the mobile van, with samples to feel under real home lighting before you commit.',
  },
  {
    step: '02',
    title: 'Measure It',
    desc: 'Free laser survey of every room, transparent pricing with no obligation, and a written itemised quote.',
  },
  {
    step: '03',
    title: 'Fit It',
    desc: 'Clean, fast, tidy workmanship by our own installers, with comprehensive guarantees on the finished floor.',
  },
]
