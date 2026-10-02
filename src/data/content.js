// Single source of truth for all content used by pages + SSG generator.

export const SITE = {
  name: 'Hali Flooring',
  url: 'https://haliflooring.co.uk',
  // Landline for calls; the WhatsApp number is a separate mobile that lands in the inbox.
  phone: '+441204358904',
  phoneDisplay: '01204 358904',
  whatsapp: 'https://wa.me/447467030479',
  whatsappDisplay: '+44 7467 030479',
  email: 'Halifloorings@gmail.com',
  address: {
    line1: 'Bolton',
    line2: 'Greater Manchester',
    postcode: 'BL1',
    country: 'United Kingdom',
  },
  hours: [
    { day: 'Mon - Sat', time: '10:00 AM - 6:00 PM' },
    { day: 'Sunday', time: 'Closed' },
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

const img = (name) => optimizedImages[name]

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
      'We surveyed the full floor, laid a fresh latex screed to bring the slab within tolerance, then installed the herringbone LVT from the centre line outwards so the pattern stayed symmetrical on both sides of the room.',
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
    slug: 'bury-home-laminate-herringbone',
    category: 'laminate',
    categoryLabel: 'Laminate',
    title: 'AC5 Herringbone Laminate for a Busy Family Home',
    location: 'Bury, BL9',
    metaTitle: 'Herringbone Laminate in Bury | Hali Flooring Project',
    metaDescription:
      '60m² of AC5 rated herringbone laminate installed over a fibreboard subfloor in a Bury family home. Hardwearing, good value and ideal for a hallway and living room.',
    excerpt:
      'Hardwearing AC5 herringbone laminate laid over fibreboard and DPM through a hallway and living room, built for everyday family life.',
    images: [flooring4, flooring2],
    specs: {
      Area: '60m²',
      Duration: '2 Days',
      Product: 'AC5 Herringbone Laminate',
      Subfloor: 'Fibreboard + DPM',
      'Area Covered': 'Hallway + living room',
      Finish: 'Herringbone, click-fit',
    },
    challenge:
      'A busy family hallway and living room needed a floor that could cope with school shoes, pets and daily mopping, with a herringbone look on a sensible budget.',
    solution:
      'We specified an AC5 wear-rated herringbone laminate over a fibreboard and DPM build-up, giving a tough, good-value floor with the look of real timber.',
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

// Every service shares one shape. `intro` opens the page, `detail` is the
// second paragraph further down (never the same words), `tagline` is the short
// line on the home page cards and `listBlurb` the longer one on /services.
// Copy is deliberately generic: no claims about specific jobs, brands or
// equipment, so nothing here needs backing up with a photo or a certificate.
// `faqs` is optional; the small pages simply leave it out.
export const services = {
  lvt: {
    slug: 'lvt',
    name: 'Luxury Vinyl Tile',
    navLabel: 'LVT',
    metaTitle: 'Luxury Vinyl Tile (LVT) Flooring | Supply & Fit North West | Hali Flooring',
    metaDescription:
      'Luxury Vinyl Tile supplied and fitted across the North West. Wood, stone and tile effects in plank, herringbone, chevron and parquet patterns. Free home survey and no-obligation quote.',
    heroHeading: 'LUXURY VINYL TILE',
    intro:
      'Luxury Vinyl Tile is one of the most popular floors in UK homes, and it is easy to see why: it is warm underfoot, water-resistant, quiet and tough enough for family life. With wood, stone and tile effects in plank, herringbone, chevron and parquet patterns, there is an LVT to suit almost any room.',
    detail:
      'LVT works beautifully in kitchens, bathrooms, hallways and open-plan living areas. It wipes clean in seconds, feels comfortable to walk on and suits underfloor heating. We supply and fit it, and we can take care of lifting the old floor and getting the subfloor ready so the new one goes down flat.',
    tagline: 'Wood, stone & tile effects in countless patterns.',
    listBlurb:
      'Water-resistant, easy-care vinyl tiles and planks in herringbone, chevron, parquet and more, for kitchens, hallways and living areas.',
    icon: 'M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z',
    images: [img('svc-lvt-1'), img('svc-lvt-2')],
    sellingPoint:
      'Plank, tile, herringbone, chevron, parquet, bordered: the choice of patterns and shapes in LVT is huge. Tell us the look you want and we will show you what is available.',
    faqNote: 'The questions we hear most before people choose LVT.',
    features: [
      { title: 'Endless Patterns', desc: 'Straight plank, herringbone, chevron, parquet and tile layouts, in wood, stone and concrete looks.' },
      { title: 'Water-Resistant', desc: 'A waterproof construction makes it a sensible choice for kitchens, bathrooms and utility rooms.' },
      { title: 'Warm & Quiet Underfoot', desc: 'Softer and warmer than ceramic tile, and kinder on the legs and on noise.' },
      { title: 'Underfloor Heating Friendly', desc: 'Many ranges are suitable for underfloor heating. We check the product before you order.' },
      { title: 'Easy to Clean', desc: 'A quick sweep and a damp mop is all it needs to keep looking good.' },
      { title: 'Neat Finishing', desc: 'Matching trims and thresholds so the floor meets doorways and other floors cleanly.' },
    ],
    faqs: [
      { q: 'Is LVT as good as real wood flooring?', a: 'LVT gives you a very convincing wood look with the added benefit of being water-resistant, which makes it ideal for kitchens and bathrooms. Real wood has a character of its own, so we are happy to talk through which suits your room better.' },
      { q: 'Can LVT go over underfloor heating?', a: 'Yes, as long as the product is rated for it. We check the manufacturer specification before ordering and advise on the right way to run the heating.' },
      { q: 'Does the subfloor need to be flat?', a: 'Yes. Vinyl follows the surface beneath it, so we check the floor during your survey and let you know if any levelling is needed first.' },
      { q: 'Do you remove the old flooring?', a: 'We can. Just tell us what is down at the moment and we will include removal and disposal in your quote.' },
    ],
  },
  wood: {
    slug: 'wood',
    name: 'Engineered Wood Flooring',
    navLabel: 'Engineered Wood',
    metaTitle: 'Engineered Wood Flooring | Real Oak Supply & Fit | Hali Flooring',
    metaDescription:
      'Engineered real wood flooring supplied and fitted across the North West. Oak in straight plank, herringbone and chevron, suitable for underfloor heating. Free home survey and quote.',
    heroHeading: 'ENGINEERED WOOD',
    intro:
      'Engineered wood gives you the beauty of a real timber floor with far better stability than solid boards. A real wood top layer sits on a layered core, so it copes well with changes in temperature and humidity and is a popular choice for UK homes.',
    detail:
      'Choose from natural, oiled, brushed and smoked finishes in straight plank, herringbone and chevron. Engineered wood suits living rooms, hallways, bedrooms and most kitchens, and can be used over underfloor heating when the right product is chosen. We supply, fit and finish it neatly.',
    tagline: 'Real wood beauty, built to stay stable.',
    listBlurb:
      'Real oak and other timbers on a stable layered board, in plank, herringbone and chevron, for living rooms, hallways and beyond.',
    icon: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10',
    images: [img('svc-wood-1'), img('svc-wood-2')],
    sellingPoint:
      'A real wood floor lasts for decades when it is chosen and laid properly. We help you pick the right board, finish and width for the room.',
    faqNote: 'What people usually want to know about engineered wood.',
    features: [
      { title: 'Real Wood Top Layer', desc: 'Genuine timber you can see and feel, in natural, oiled, brushed and smoked finishes.' },
      { title: 'More Stable Than Solid', desc: 'A layered core resists movement, so it copes better with heating and changing seasons.' },
      { title: 'Herringbone & Chevron', desc: 'Classic patterns as well as straight plank, in a range of widths and lengths.' },
      { title: 'Underfloor Heating Suitable', desc: 'The right engineered boards work well over underfloor heating.' },
      { title: 'Prepared Properly', desc: 'We check the subfloor and fit the right underlay or boarding before the wood goes down.' },
      { title: 'Care Advice', desc: 'Simple guidance on cleaning and maintenance so your floor keeps its good looks.' },
    ],
    faqs: [
      { q: 'What is the difference between solid and engineered wood?', a: 'Solid wood is a single piece of timber. Engineered wood has a real wood top layer bonded to a stable layered base, which makes it better suited to modern heated homes.' },
      { q: 'Is engineered wood suitable for kitchens?', a: 'Generally yes, if spills are wiped up promptly. For bathrooms and wet rooms we would normally suggest LVT or vinyl instead.' },
      { q: 'Can it be fitted over underfloor heating?', a: 'Yes, with a suitable board and the right installation method. We will confirm this when we choose your floor.' },
      { q: 'Can it be laid over concrete?', a: 'Yes, once the base is dry and flat. We will advise on any damp protection or levelling that is needed.' },
    ],
  },
  laminate: {
    slug: 'laminate',
    name: 'Laminate Flooring',
    navLabel: 'Laminate',
    metaTitle: 'Laminate Flooring | Supply & Fit North West | Hali Flooring',
    metaDescription:
      'Laminate flooring supplied and fitted across the North West. Hardwearing, great value and available in straight plank and herringbone. Free home survey and no-obligation quote.',
    heroHeading: 'LAMINATE FLOORING',
    intro:
      'Laminate is the great-value way to get a wood look that stands up to real life. Modern laminate is tougher and more realistic than ever, and comes in straight plank and herringbone styles to suit any home.',
    detail:
      'It is a natural choice for hallways, living rooms, bedrooms and children’s rooms, where you want a floor that copes with daily wear without a big price tag. Click-fit boards go down cleanly and quickly, so there is minimal mess and disruption.',
    tagline: 'Hardwearing, great-value wood looks.',
    listBlurb:
      'Tough, good-value laminate in straight plank and herringbone, quick and clean to fit in hallways, living rooms and bedrooms.',
    icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
    images: [img('svc-laminate-1')],
    sellingPoint:
      'The right wear rating for the right room is what makes laminate last. We will point you to the board that suits how you live.',
    faqNote: 'Quick answers on wear ratings, water and where laminate works best.',
    features: [
      { title: 'Hardwearing', desc: 'A tough surface that stands up to everyday family life, pets and furniture.' },
      { title: 'Plank & Herringbone', desc: 'Straight plank and herringbone styles with realistic wood finishes.' },
      { title: 'Good Value', desc: 'The look of timber at a friendly price, so you can floor more of the house.' },
      { title: 'Click-Fit Installation', desc: 'A clean, floating installation with no glue and very little mess.' },
      { title: 'Water-Resistant Options', desc: 'Moisture-resistant boards are available for busier areas of the home.' },
      { title: 'Underlay Included', desc: 'The right underlay supplied and fitted for comfort and sound reduction.' },
    ],
    faqs: [
      { q: 'What do AC ratings mean?', a: 'AC ratings show how well a laminate resists wear. Higher numbers suit busier rooms, and we will recommend a rating for each room.' },
      { q: 'Is laminate as good as engineered wood?', a: 'Engineered wood is real timber, while laminate is a great-value alternative that is very hardwearing. The best choice depends on your budget and the room.' },
      { q: 'Can laminate be used in a bathroom?', a: 'Only a water-resistant range, and with good ventilation. For bathrooms we would usually suggest vinyl or LVT.' },
      { q: 'Does the floor need to be level?', a: 'Laminate floats on top of the base, so it needs to be reasonably flat. We will tell you at the survey if anything needs doing first.' },
    ],
  },
  carpet: {
    slug: 'carpet',
    name: 'Carpets & Underlays',
    navLabel: 'Carpets & Underlays',
    metaTitle: 'Carpets & Underlays | Supply & Fit North West | Hali Flooring',
    metaDescription:
      'Quality carpets and underlays supplied and fitted across the North West. Soft saxony, wool twists and luxury cushion underlay for warmth underfoot. Free home survey and quote.',
    heroHeading: 'CARPETS & UNDERLAYS',
    intro:
      'Nothing beats carpet for warmth, comfort and a quieter home. From soft saxony to hardwearing wool twists, we will help you choose a carpet that feels great and wears well in your bedrooms, living rooms and landings.',
    detail:
      'A good underlay makes as much difference as the carpet itself, adding comfort, warmth and a longer life. We supply the carpet and underlay together, lift the old carpet and fit the new one neatly into every corner and doorway.',
    tagline: 'Soft saxony, wool twists & cushion underlay.',
    listBlurb:
      'Soft, warm carpets in saxony, twist and wool blends with a quality underlay, fitted neatly for bedrooms, lounges and landings.',
    icon: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4',
    images: [img('svc-carpet-1'), img('svc-carpet-2')],
    sellingPoint:
      'A carpet is only as good as what is beneath it and how it is fitted. We pay attention to both, so it stays flat and looks great for years.',
    faqNote: 'Choosing a carpet pile, underlay and what to expect on fitting day.',
    features: [
      { title: 'Wide Choice', desc: 'Saxony, twist, loop and wool blend carpets in a full range of colours.' },
      { title: 'Luxury Underlay', desc: 'Cushion underlay for comfort, insulation and a longer-lasting carpet.' },
      { title: 'Warm & Quiet', desc: 'Carpet reduces noise and keeps rooms cosy through the colder months.' },
      { title: 'Neat Fitting', desc: 'Properly stretched and trimmed so it lies flat to the edges and across doorways.' },
      { title: 'Old Carpet Removed', desc: 'We can lift and dispose of your existing carpet and underlay.' },
      { title: 'Honest Advice', desc: 'We will tell you if a simpler carpet will wear better and cost less.' },
    ],
    faqs: [
      { q: 'Wool or synthetic carpet?', a: 'Wool is naturally resilient and long-lasting but costs more. Synthetic carpets are budget-friendly and stain resistant. We can show you both.' },
      { q: 'What underlay should I choose?', a: 'It depends on the room and whether you have underfloor heating. We will recommend the right thickness and type for each area.' },
      { q: 'How long does fitting take?', a: 'Most rooms are fitted within a day. We will confirm timings when we survey.' },
    ],
  },
  runners: {
    slug: 'runners',
    name: 'Stair Runners',
    navLabel: 'Stair Runners',
    metaTitle: 'Bespoke Stair Runners | Supply & Fit North West | Hali Flooring',
    metaDescription:
      'Bespoke stair runners supplied and fitted across the North West. Neat whipped edges, borders and stair rods for a finish that suits your hallway. Free home survey and quote.',
    heroHeading: 'STAIR RUNNERS',
    intro:
      'A stair runner adds warmth, grip and a touch of character to your staircase, while leaving the edges of the treads on show. Choose the carpet, the border and the finish, and we will make it up and fit it neatly.',
    detail: 'We can supply stair rods too, to give the whole staircase a polished, finished look.',
    tagline: 'Bespoke runners with whipped edges & stair rods.',
    listBlurb:
      'Bespoke runners with hand-finished edges, borders and optional stair rods, made up and fitted to your staircase.',
    icon: 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6',
    images: [img('svc-runners-1'), img('svc-runners-2')],
    sellingPoint: 'A neat, well-finished runner makes the whole hallway look better.',
    features: [
      { title: 'Made to Measure', desc: 'Cut and finished to suit your staircase.' },
      { title: 'Whipped Edges & Borders', desc: 'Hand-finished edging in a choice of colours.' },
      { title: 'Stair Rods', desc: 'A choice of finishes to hold the runner securely.' },
      { title: 'Underlay Fitted', desc: 'Quality underlay for comfort and a longer life.' },
    ],
  },
  vinyl: {
    slug: 'vinyl',
    name: 'Vinyl Flooring',
    navLabel: 'Vinyl Flooring',
    metaTitle: 'Vinyl Flooring for Kitchens & Bathrooms | Supply & Fit | Hali Flooring',
    metaDescription:
      'Hardwearing, waterproof vinyl flooring supplied and fitted for kitchens, bathrooms and utility rooms across the North West. Free home survey and no-obligation quote.',
    heroHeading: 'VINYL FLOORING',
    intro:
      'Vinyl is a hardwearing, waterproof and budget-friendly floor that is perfect for kitchens, bathrooms and utility rooms. It comes in a huge range of wood, stone and tile looks and is simple to keep clean.',
    detail: 'Sheet vinyl is laid in one piece, so there are few or no joins for water to find its way through.',
    tagline: 'Waterproof & hardwearing for kitchens and bathrooms.',
    listBlurb:
      'Waterproof, hardwearing sheet vinyl in a wide choice of looks, ideal for kitchens, bathrooms and utility rooms.',
    icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
    images: [img('svc-vinyl-1'), img('svc-vinyl-2')],
    sellingPoint: 'Practical, good-looking and easy to look after.',
    features: [
      { title: 'Waterproof', desc: 'Ideal for kitchens, bathrooms and utility rooms.' },
      { title: 'Easy to Clean', desc: 'A quick wipe keeps it looking fresh.' },
      { title: 'Great Choice of Looks', desc: 'Wood, stone and tile effects in many colours.' },
      { title: 'Good Value', desc: 'A tough floor at a friendly price.' },
    ],
  },
  commercial: {
    slug: 'commercial',
    name: 'Commercial Vinyl & Safety Flooring',
    navLabel: 'Safety Flooring',
    metaTitle: 'Commercial Vinyl & Safety Flooring | Supply & Fit North West | Hali Flooring',
    metaDescription:
      'Commercial vinyl and slip-resistant safety flooring supplied and fitted across the North West for kitchens, wet rooms, care settings, offices and more. Free survey and quote.',
    heroHeading: 'SAFETY FLOORING',
    intro:
      'Commercial vinyl and safety flooring is built for busy, hygienic spaces. With slip-resistant surfaces, welded seams and neat coved edges, it suits kitchens, wet rooms, clinics, care settings, schools and offices.',
    detail: 'We can supply and fit it for both business and domestic wet rooms, and work to suit the way your premises operate.',
    tagline: 'Slip-resistant commercial vinyl for wet and busy areas.',
    listBlurb:
      'Slip-resistant commercial vinyl with welded seams and coved edges for kitchens, wet rooms, offices and care settings.',
    icon: 'M3 21h18M5 21V7l7-4 7 4v14M9 9h1m-1 4h1m-1 4h1m4-8h1m-1 4h1m-1 4h1',
    images: [img('svc-safety-1')],
    sellingPoint: 'A safe, hygienic and long-lasting floor for working spaces.',
    features: [
      { title: 'Slip-Resistant', desc: 'Safety surfaces suited to wet and busy areas.' },
      { title: 'Welded Seams', desc: 'Joins sealed for a hygienic, easy-to-clean floor.' },
      { title: 'Coved Edges', desc: 'Neat upstands where the floor meets the wall.' },
      { title: 'Business & Home', desc: 'Suitable for commercial premises and domestic wet rooms.' },
    ],
  },
  subfloor: {
    slug: 'subfloor',
    name: 'Floor Levelling & Preparation',
    navLabel: 'Floor Levelling',
    metaTitle: 'Floor Levelling & Subfloor Preparation | Hali Flooring North West',
    metaDescription:
      'Floor levelling, self-levelling screed, damp proofing and ply boarding across the North West. A flat, sound base for a floor that looks and lasts. Free home survey and quote.',
    heroHeading: 'FLOOR LEVELLING',
    intro:
      'A great floor starts with a flat, dry and sound base. We prepare uneven, damaged or damp subfloors so your new flooring goes down properly and lasts.',
    detail:
      'If your floor is already in good order we will say so, and only recommend the preparation your new floor genuinely needs. Where it is needed, we can level, board and protect the base before the finished floor is fitted.',
    tagline: 'A flat, sound base for any new floor.',
    listBlurb:
      'Self-levelling screed, damp proofing and ply boarding, so uneven or damaged floors are ready for their new covering.',
    icon: 'M5 13l4 4L19 7',
    images: [img('svc-subfloor-1')],
    sellingPoint: 'Preparation decides how well the finished floor looks and lasts. We only recommend what is needed.',
    faqNote: 'Common questions about levelling, damp and preparing floors.',
    features: [
      { title: 'Self-Levelling Screed', desc: 'Smooths out dips and uneven areas ready for the new floor.' },
      { title: 'Damp Proofing', desc: 'Damp proof membranes where moisture could affect the new floor.' },
      { title: 'Ply Boarding', desc: 'A flat, stable base over uneven or older timber floors.' },
      { title: 'Old Floor Removal', desc: 'Existing coverings lifted and the base made good.' },
      { title: 'Repairs & Making Good', desc: 'Damaged or loose areas repaired before fitting.' },
      { title: 'Honest Advice', desc: 'If your floor does not need preparation, we will tell you.' },
    ],
    faqs: [
      { q: 'Do I need to level the floor before laying a new one?', a: 'Not always. We check the floor at your survey and only recommend levelling where it will make a difference to the finished result.' },
      { q: 'How long does screed take to dry?', a: 'It depends on the product and thickness. We will give you the timings for the screed we use so you know when the new floor can go down.' },
      { q: 'What is a damp proof membrane?', a: 'A protective layer that stops moisture rising from the base into your new floor.' },
      { q: 'Can you do preparation only?', a: 'Yes. If you have your own fitter, we can prepare the floor for them.' },
    ],
  },
  grass: {
    slug: 'grass',
    name: 'Artificial Grass',
    navLabel: 'Artificial Grass',
    metaTitle: 'Artificial Grass Installation | Supply & Fit North West | Hali Flooring',
    metaDescription:
      'Artificial grass supplied and fitted across the North West. Soft, UV-stable, child and pet-friendly lawns laid over a properly prepared base. Free survey and quote.',
    heroHeading: 'ARTIFICIAL GRASS',
    intro:
      'A green lawn all year round with none of the mowing. Artificial grass is soft, hardwearing and a great fit for gardens used by children and pets.',
    detail: 'We lay it over a properly prepared base so it drains well and stays neat.',
    tagline: 'Green all year, child & pet friendly.',
    listBlurb:
      'Soft, UV-stable artificial lawns for gardens, laid over a prepared base for good drainage and a neat finish.',
    icon: 'M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 00-9.78 2.096A4.001 4.001 0 003 15z',
    images: [img('svc-grass-1'), img('svc-grass-2')],
    sellingPoint: 'A tidy, low-maintenance lawn that looks good every month of the year.',
    features: [
      { title: 'Low Maintenance', desc: 'No mowing, watering or reseeding.' },
      { title: 'Child & Pet Friendly', desc: 'Soft underfoot and safe for play.' },
      { title: 'UV-Stable', desc: 'Designed to hold its colour in the sun.' },
      { title: 'Well Drained', desc: 'Laid over a prepared, free-draining base.' },
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
  { name: 'Warrington', desc: 'Town & Surrounds' },
]

export const testimonials = [
  {
    quote:
      'They measured the whole open plan carefully before turning up, so the herringbone ran perfectly from the kitchen to the dining area. No wasted boards, no guesswork. Three days, completely tidy.',
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

export const processSteps = [
  {
    step: '01',
    title: 'See It',
    desc: 'Browse samples at our showroom, or book a free home survey and we bring samples to you to see in your own lighting.',
  },
  {
    step: '02',
    title: 'Measure It',
    desc: 'We survey and measure up, then send a clear, itemised written quote with no obligation.',
  },
  {
    step: '03',
    title: 'Fit It',
    desc: 'Careful, tidy workmanship from experienced fitters, finished to a standard we are happy to put our name to.',
  },
]
