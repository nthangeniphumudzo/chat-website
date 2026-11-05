import type { IconName } from './components/Icon'
import type { GuideSlug } from './guide-links'

export interface Guide {
  title: string
  description: string
  eyebrow: string
  headline: string
  accent: string
  sub: string
  howHeading: string
  steps: { icon: IconName; title: string; body: string }[]
  /** Side-by-side lines for visitors weighing Ch@t against other apps. */
  compare?: { heading: string; rows: { name: string; detail: string; ours?: boolean }[] }
  safetyHeading: string
  questions: { q: string; a: string }[]
  closing: { headline: string; accent: string; sub: string }
  footnote?: string
}

/**
 * What each search landing page says. They sell what the visitor came for and
 * show how Ch@t gets them there through a SpeedDate: you write three questions,
 * people answer in their own time, and you read the answers before you match.
 *
 * Don't explain the search term back to the visitor; they already know it. Invite
 * ("find your hookup") with no guarantees, percentages or success claims, and no
 * disclaimer about them. Stay non-explicit: explicit pages can get the whole site
 * filtered by SafeSearch.
 */
export const GUIDES: Record<GuideSlug, Guide> = {
  'hookups-south-africa': {
    title: 'Find Your Hookup Tonight | Hookups in South Africa — Ch@t',
    description:
      'Find your hookup tonight on Ch@t. Ask three questions, see who answers and make your move. Free, private, with verified people in your city.',
    eyebrow: 'Hookups in South Africa',
    headline: 'Find your hookup',
    accent: 'tonight.',
    sub: 'Ask what you actually want to know. See who answers. Then make your move.',
    howHeading: 'How to find your hookup on Ch@t',
    steps: [
      {
        icon: 'message',
        title: 'Ask your three questions',
        body: 'Flirty, funny or straight to the point. You set the tone, so the people who answer already know what you’re about.',
      },
      {
        icon: 'eye',
        title: 'See who’s keen',
        body: 'People near you answer in their own time. One read and you’ll know who’s got your vibe, with no endless swiping.',
      },
      {
        icon: 'sparkles',
        title: 'Match and make plans',
        body: 'Like what you read? Match, pick up from something they’ve already told you, and take it from there. Tonight, if you’re both keen.',
      },
    ],
    safetyHeading: 'What happens on Ch@t stays private',
    questions: [
      {
        q: 'Can I find a hookup tonight?',
        a: 'Tonight is a great night to start. Ch@t is free to download, so you can have your three questions out to people in your city this evening.',
      },
      {
        q: 'What about a one-night stand or something no strings attached?',
        a: 'You write the questions, so make it clear what you’re after. Whoever answers has read them first, and you can match with the people who are on the same page.',
      },
      {
        q: 'How do I find a hookup near me?',
        a: 'Ch@t is local by design, so you meet real people in your city, not across the country. People see your city and roughly how far away you are, never your exact location.',
      },
      {
        q: 'How private is it?',
        a: 'Only phone-verified members can see you, screenshots of your chats come out blank, and your exact location is never shared. If there’s someone you’d rather avoid, block them silently. They’re never notified.',
      },
      {
        q: 'Is it better than a hookup WhatsApp group?',
        a: 'In a group you often can’t tell who’s there, and your number can be visible to everyone. On Ch@t every profile is verified and must show a real face.',
      },
      {
        q: 'Is it safe to meet up?',
        a: 'Every profile is verified, and you can report or block anyone. When you meet, start somewhere public and let a friend know where you’ll be.',
      },
      {
        q: 'Is Ch@t free?',
        a: 'Yes. Free to download and free to meet people. Premium adds extras, but you never need it to find someone.',
      },
    ],
    closing: {
      headline: 'Tonight could be',
      accent: 'the night.',
      sub: 'Ch@t is free. And someone might already be hoping you’ll say hi.',
    },
  },

  'dating-apps-south-africa': {
    title: 'Dating Apps and Sites in South Africa — Try Ch@t Free',
    description:
      'Looking for a dating app or site in South Africa? On Ch@t you read how someone answers before you match. Free, local and verified, on iOS and Android.',
    eyebrow: 'Dating apps and sites in South Africa',
    headline: 'The dating app where someone',
    accent: 'actually answers.',
    sub: 'Your person is out there. On Ch@t, you’ll hear who they are before you’ve seen a single photo.',
    howHeading: 'How online dating works on Ch@t',
    steps: [
      {
        icon: 'message',
        title: 'Ask your three questions',
        body: 'Ask what you’d really want to know about someone. There are no perfect bios to write and no photos to judge.',
      },
      {
        icon: 'message-heart',
        title: 'Read who answers',
        body: 'Singles near you answer in their own time and in their own words: the humour, the honesty, the things that never fit in a bio.',
      },
      {
        icon: 'heart-handshake',
        title: 'Match with a reason to talk',
        body: 'Match with the answers that got you. Your first conversation starts from something they’ve already told you, so it’s never a cold “hey”.',
      },
    ],
    safetyHeading: 'A safe place to start',
    questions: [
      {
        q: 'What is Ch@t?',
        a: 'Ch@t is a free South African dating app for meeting real people in your city. You ask three questions, read how people answer, and match with the ones who get you.',
      },
      {
        q: 'Is Ch@t a dating app or a dating site?',
        a: 'Ch@t is a mobile dating app, free on iOS and Android. This site is where you download it.',
      },
      {
        q: 'Will there be singles near me?',
        a: 'Ch@t is local by design, so you meet real people in your city, not across the country. Your exact location stays private: people only see your city and a rough distance.',
      },
      {
        q: 'Is Ch@t really free?',
        a: 'Yes. Free to download and free to meet people. Premium adds extras, but you never need it to find someone.',
      },
      {
        q: 'Are the profiles real?',
        a: 'Every profile is verified and must show a real face, and only phone-verified members can see you.',
      },
      {
        q: 'What if I’m not good at first messages?',
        a: 'You won’t need one. Every conversation on Ch@t starts from something they’ve already told you.',
      },
    ],
    closing: {
      headline: 'Your person is',
      accent: 'out there.',
      sub: 'Ch@t is free. And someone might already be hoping you’ll show up.',
    },
  },

  'tinder-alternative-south-africa': {
    title: 'Tinder Alternative in South Africa — Stop Swiping, Try Ch@t',
    description:
      'Tired of swiping? Ch@t is a free Tinder alternative for South Africa. Ask three questions, read who answers and match with someone worth talking to.',
    eyebrow: 'A Tinder alternative for South Africa',
    headline: 'Tired of swiping?',
    accent: 'Start with an answer.',
    sub: 'A thousand faces swiped past. A hundred “hey”s that went nowhere. There’s a better way to meet someone.',
    howHeading: 'What you do on Ch@t instead of swiping',
    steps: [
      {
        icon: 'message',
        title: 'Ask, don’t swipe',
        body: 'Write three questions you actually want answered. That’s your whole job.',
      },
      {
        icon: 'message-heart',
        title: 'Read real answers',
        body: 'People near you answer in their own words. You get a feel for how they think before you’ve seen a single photo.',
      },
      {
        icon: 'heart-handshake',
        title: 'Match with a reason',
        body: 'When you match, you already have something to talk about. Whether you want tonight or forever, you’re starting from something real.',
      },
    ],
    compare: {
      heading: 'Swiping or SpeedDate?',
      rows: [
        { name: 'On a swiping app', detail: 'You see a photo first, decide in a moment, and work out what to say afterwards.' },
        { name: 'On Ch@t', detail: 'You read their answers first, then match, and your first chat picks up from what they said.', ours: true },
      ],
    },
    safetyHeading: 'Verified people, private by default',
    questions: [
      {
        q: 'Do I have to delete Tinder to use Ch@t?',
        a: 'Not at all. Ch@t is free to download, so try it alongside whatever you’re using and see which one gets you talking.',
      },
      {
        q: 'Is Ch@t only for serious relationships?',
        a: 'No. Whether you want something tonight or something for life, you ask the questions, so you decide what you’re looking for.',
      },
      {
        q: 'Are there people near me?',
        a: 'Ch@t is local by design, so you meet real people in your city. People only see your city and a rough distance, never your exact location.',
      },
      {
        q: 'Is Ch@t free?',
        a: 'Yes. Free to download and free to meet people. Premium adds extras, but you never need it to find someone.',
      },
    ],
    closing: {
      headline: 'Put the swiping',
      accent: 'down tonight.',
      sub: 'Ch@t is free. And someone might already be ready to answer.',
    },
    footnote: 'Ch@t isn’t affiliated with Tinder. Tinder is a trademark of its owner.',
  },

  'friends-with-benefits-south-africa': {
    title: 'Find Friends With Benefits in South Africa (FWB) — Ch@t',
    description:
      'Find your friends with benefits on Ch@t. Ask three questions, see who answers and match with someone you like talking to. Free, private and local.',
    eyebrow: 'Friends with benefits in South Africa',
    headline: 'Find your',
    accent: 'friends with benefits.',
    sub: 'The best FWB starts with someone you actually enjoy talking to. Ch@t helps you find out who that is first.',
    howHeading: 'How to find your FWB on Ch@t',
    steps: [
      {
        icon: 'message',
        title: 'Ask your three questions',
        body: 'Put what you’re looking for right in your questions. Anyone who answers already knows what you’re about.',
      },
      {
        icon: 'users',
        title: 'See who you click with',
        body: 'People near you answer in their own words. The funny ones, the easy ones, the ones you’d want to see again all stand out.',
      },
      {
        icon: 'sparkles',
        title: 'Match and keep it easy',
        body: 'Match, pick up from what they told you, and set things up the way you both want them.',
      },
    ],
    safetyHeading: 'Keep it between the two of you',
    questions: [
      {
        q: 'How do I find friends with benefits near me?',
        a: 'Ch@t is local by design, so you meet real people in your city, which makes seeing each other again easy. People only see your city and a rough distance.',
      },
      {
        q: 'How do I tell someone it’s FWB I’m after?',
        a: 'Say it in your questions. You won’t need an awkward talk later, because they’ve read it before they answer.',
      },
      {
        q: 'What if I don’t want someone I know to see me?',
        a: 'Block them. It’s silent and they’re never notified. Only phone-verified members can see you at all.',
      },
      {
        q: 'Is Ch@t free?',
        a: 'Yes. Free to download and free to meet people. Premium adds extras, but you never need it to find someone.',
      },
    ],
    closing: {
      headline: 'Someone’s looking for',
      accent: 'the same thing.',
      sub: 'Ch@t is free. Ask your three questions and see who answers.',
    },
  },

  mjolo: {
    title: 'Mjolo in Mzansi: Find Someone Real on Ch@t',
    description:
      'Tired of mjolo games? On Ch@t you hear who someone is before you match. A free dating app for Mzansi, with verified people in your city.',
    eyebrow: 'Mjolo in Mzansi',
    headline: 'Mjolo doesn’t',
    accent: 'have to hurt.',
    sub: 'Less guessing, fewer games. On Ch@t you hear who someone is before you give them your heart.',
    howHeading: 'How to do mjolo differently',
    steps: [
      {
        icon: 'message',
        title: 'Ask what you really want to know',
        body: 'Write three questions, the ones you’d normally only get answers to months in.',
      },
      {
        icon: 'message-heart',
        title: 'Read who answers',
        body: 'People near you answer in their own words. You’ll hear the humour and the honesty long before you’re in too deep.',
      },
      {
        icon: 'heart-handshake',
        title: 'Match when it feels right',
        body: 'Only match with the answers that got you. Your first chat starts from something real, not another “hey”.',
      },
    ],
    safetyHeading: 'Open your heart. We’ll guard the rest.',
    questions: [
      {
        q: 'I’ve been burned before. Why try again?',
        a: 'Because your person might be out there too. On Ch@t you get to know how someone thinks before you decide, so you can take your time and go in with your eyes open.',
      },
      {
        q: 'Are the people on here real?',
        a: 'Every profile is verified and must show a real face, and you can report anyone or block them silently.',
      },
      {
        q: 'Will there be people near me?',
        a: 'Ch@t is local by design, so you meet real people in your city, not across the country. Your exact location is never shared.',
      },
      {
        q: 'Is Ch@t free?',
        a: 'Yes. Free to download and free to meet people. Premium adds extras, but you never need it to find someone.',
      },
    ],
    closing: {
      headline: 'Your next chapter',
      accent: 'could start tonight.',
      sub: 'Ch@t is free. And someone might already be hoping you’ll show up.',
    },
  },
}
