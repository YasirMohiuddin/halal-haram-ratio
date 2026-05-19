export type PathKey = "path1" | "path2" | "path3" | "path4" | "path5";

export interface AnswerOption {
  emoji: string;
  text: string;
  score: number;
}

export interface Question {
  id: number;
  questionText: string;
  pathQuestionText?: Partial<Record<PathKey, string>>;
  setupLines?: Partial<Record<PathKey, string>>;
  options: AnswerOption[];
  pathOptions?: Partial<Record<PathKey, AnswerOption[]>>;
  doubleWeight?: boolean;
}

export function getQuestionText(question: Question, path: PathKey): string {
  return question.pathQuestionText?.[path] ?? question.questionText;
}

export interface Archetype {
  name: string;
  emoji: string;
  minScore: number;
  maxScore: number;
  description: string;
  shareTagline: string;
}

export const QUESTIONS: Question[] = [
  {
    id: 1,
    questionText: "It's Friday. The group chat is popping off. What's the plan?",
    options: [
      { emoji: "🍖", text: "Grab food and shisha at the spot", score: 0 },
      { emoji: "🏠", text: "Someone's having people over at their place", score: 0 },
      { emoji: "🕌", text: "Jummah then lunch with the family", score: 0 },
      { emoji: "🎉", text: "Going out out - club, bar, the works", score: 0 },
      { emoji: "🛋️", text: "Staying home, not really feeling it", score: 0 },
    ],
  },
  {
    id: 2,
    questionText: "What are you actually eating?",
    pathQuestionText: {
      path3: "Be honest, what are you actually doing?",
    },
    setupLines: {
      path1: "The food situation.",
      path2: "Someone ordered pizza. The box arrives. You look at it and...",
      path3: "You're at Jummah. The khutbah is going on.",
      path4: "You're starving. You find a kebab shop outside.",
      path5: "You're hungry. You open the fridge.",
    },
    options: [
      { emoji: "🌭", text: "Ordered the pepperoni pizza... it's fine", score: 0 },
      { emoji: "🍗", text: "Got the chicken, didn't really ask if it's halal", score: 1 },
      { emoji: "📱", text: "Googled the restaurant beforehand, seems halal enough", score: 2 },
      { emoji: "🥗", text: "Went vegetarian just to be safe", score: 3 },
      { emoji: "✅", text: "Already knew this place was certified halal", score: 4 },
    ],
    pathOptions: {
      path3: [
        { emoji: "🙏", text: "Fully locked in, taking mental notes", score: 4 },
        { emoji: "💤", text: "Nodding along but checked out 10 minutes ago", score: 2 },
        { emoji: "😴", text: "Genuinely nearly fell asleep, it happens", score: 1 },
        { emoji: "📱", text: "Phone is out, just checking quickly", score: 1 },
        { emoji: "🤳", text: "On Instagram, the khutbah is just too long today", score: 0 },
      ],
      path4: [
        { emoji: "✅", text: "Already knew this place was certified halal", score: 4 },
        { emoji: "🥗", text: "Got the chips and salad, just to be safe", score: 3 },
        { emoji: "📱", text: "Googled the shop beforehand, seems halal enough", score: 2 },
        { emoji: "🍗", text: "Got the chicken wrap, didn't really ask if it's halal", score: 1 },
        { emoji: "🌯", text: "Ordered the doner, didn't ask any questions", score: 0 },
      ],
      path5: [
        { emoji: "✅", text: "Cooked something at home, completely halal, no debate", score: 4 },
        { emoji: "🥗", text: "Kept it vegetarian, couldn't be bothered to think about it", score: 3 },
        { emoji: "📱", text: "Googled the delivery place first, seems halal enough", score: 2 },
        { emoji: "🍗", text: "Ordered delivery, didn't really think about whether it was halal", score: 1 },
        { emoji: "🌯", text: "Found an old takeaway in the back. Ate it. No questions asked.", score: 0 },
      ],
    },
  },
  {
    id: 3,
    questionText: "What's in your hand?",
    pathQuestionText: {
      path3: "Your cousin suggests going out for the evening. Where do you end up?",
    },
    setupLines: {
      path1: "Someone comes around with drinks.",
      path2: "Someone comes out of the kitchen with drinks.",
      path3: "Jummah is done, family lunch was amazing.",
      path4: "The bartender comes over. What are you ordering?",
      path5: "You're chilling, you open the fridge for a drink.",
    },
    options: [
      { emoji: "🍷", text: "Wine, we're celebrating", score: 0 },
      { emoji: "🥃", text: "Shots got passed around, couldn't say no", score: 0 },
      { emoji: "🍺", text: "Just a beer, nothing crazy", score: 1 },
      { emoji: "🧃", text: "Told them I don't drink, got a juice", score: 4 },
      { emoji: "🚰", text: "Water. I don't even want to explain myself", score: 4 },
    ],
    pathOptions: {
      path3: [
        { emoji: "🕌", text: "Went back for Asr, not ready to leave that energy yet", score: 4 },
        { emoji: "🛋️", text: "Stayed home, the food coma is real", score: 3 },
        { emoji: "🏠", text: "Someone's place, low key", score: 2 },
        { emoji: "🍖", text: "Shisha spot, the usual", score: 1 },
        { emoji: "🎉", text: "Going out out, it's Friday after all", score: 0 },
      ],
    },
  },
  {
    id: 4,
    questionText: "You...",
    setupLines: {
      path1: "Someone pulls out a vape.",
      path2: "Someone pulls out a vape in the living room.",
      path3: "Your cousin's friend pulls out a vape.",
      path4: "Someone pulls out a vape.",
      path5: "Someone dropped by later. They pull out a vape.",
    },
    options: [
      { emoji: "🚬", text: "Already had my own, been smoking all night", score: 0 },
      { emoji: "🍃", text: "Only if it's the other kind, if you know what I mean", score: 0 },
      { emoji: "💨", text: "Took a few puffs, it's just a vape", score: 1 },
      { emoji: "😤", text: "Passed on it, not really my thing", score: 3 },
      { emoji: "🙅", text: "Nope, and lowkey judged everyone who did", score: 4 },
    ],
  },
  {
    id: 5,
    questionText: "They come over. What happens?",
    pathQuestionText: {
      path5: "They text you. What happens?",
    },
    setupLines: {
      path1: "Someone across the room has been eyeing you all night.",
      path2: "Someone across the room has been eyeing you all night.",
      path3: "Someone across the room has been eyeing you all evening.",
      path4: "Someone across the room has been eyeing you all night.",
      path5: "Someone you've been talking to texts you out of nowhere.",
    },
    options: [
      { emoji: "💍", text: "Already married or engaged, shut it down immediately", score: 4 },
      { emoji: "🚶", text: "Walked away, not even going there", score: 4 },
      { emoji: "🤝", text: "Had a good conversation, kept it respectful", score: 3 },
      { emoji: "👀", text: "Flirted a little but kept it halal, whatever that means", score: 2 },
      { emoji: "😅", text: "Talked to them, gave the number, what's the harm", score: 1 },
    ],
    pathOptions: {
      path5: [
        { emoji: "💍", text: "Already married or engaged, left them on read immediately", score: 4 },
        { emoji: "👻", text: "Left it on read, not even going there", score: 4 },
        { emoji: "🤝", text: "Replied, kept the conversation friendly and respectful", score: 3 },
        { emoji: "👀", text: "Flirted a little over text, just seeing what's going on", score: 2 },
        { emoji: "😅", text: "Replied immediately, gave the energy back, what's the harm", score: 1 },
      ],
    },
  },
  {
    id: 6,
    questionText: "It's 1am. You...",
    pathQuestionText: {
      path3: "You...",
    },
    setupLines: {
      path1: "Your mum calls.",
      path2: "Your mum calls.",
      path3: "Your mum calls to check in.",
      path4: "Your mum calls.",
      path5: "Your mum calls.",
    },
    options: [
      { emoji: "📵", text: "Declined, will deal with the consequences tomorrow", score: 0 },
      { emoji: "🤥", text: "Picked up, said you're at a friend's place", score: 1 },
      { emoji: "😬", text: "Picked up, gave the phone to your most religious looking friend to say salam", score: 1 },
      { emoji: "📞", text: "Picked up and told her exactly where you are", score: 4 },
      { emoji: "🤲", text: "Already home, you don't play these games", score: 4 },
    ],
    pathOptions: {
      path3: [
        { emoji: "📵", text: "Declined, will call her back later", score: 0 },
        { emoji: "🤥", text: "Picked up, said you were just heading home", score: 1 },
        { emoji: "😬", text: "Let it ring, sent a voice note saying you're fine", score: 2 },
        { emoji: "📞", text: "Picked up and told her exactly where you are", score: 4 },
        { emoji: "🤲", text: "Already called her earlier, you're not an animal", score: 4 },
      ],
      path5: [
        { emoji: "📵", text: "Declined, not in the mood to talk tonight", score: 0 },
        { emoji: "😅", text: "Picked up, she asked why you're home on a Friday. Didn't have a good answer.", score: 2 },
        { emoji: "📞", text: "Picked up, told her you're just having a quiet one", score: 4 },
        { emoji: "🗣️", text: "Picked up and ended up chatting for an hour", score: 4 },
        { emoji: "🤲", text: "You called her first, genuinely had nothing better to do", score: 4 },
      ],
    },
  },
  {
    id: 7,
    questionText: "Fajr adhan just went off. You...",
    pathQuestionText: {
      path3: "You...",
    },
    setupLines: {
      path1: "It's 4am.",
      path2: "It's 4am.",
      path3: "The sun is setting. Maghrib just came in. Everyone knows it.",
      path4: "It's 4am.",
      path5: "It's 4am.",
    },
    doubleWeight: true,
    options: [
      { emoji: "🙈", text: "Didn't even realise, still going strong", score: 0 },
      { emoji: "😬", text: "Saw the time, felt a little something, kept it moving", score: 1 },
      { emoji: "📱", text: "Opened the prayer app, closed it again", score: 2 },
      { emoji: "🤲", text: "Stopped what you were doing and prayed right there", score: 6 },
      { emoji: "🕌", text: "Went straight to the mosque, no questions asked", score: 8 },
    ],
    pathOptions: {
      path3: [
        { emoji: "🙈", text: "Pretended not to notice, the vibe was too good to break", score: 0 },
        { emoji: "😬", text: "Acknowledged it internally, kept the conversation going", score: 1 },
        { emoji: "📱", text: "Set a reminder to pray later, definitely will", score: 2 },
        { emoji: "🤲", text: "Prayed right there, didn't make a big deal of it", score: 6 },
        { emoji: "🕌", text: "Excused yourself and went to find somewhere to pray", score: 8 },
      ],
    },
  },
  {
    id: 8,
    questionText: "Be honest, how many prayers did you actually pray today?",
    setupLines: {
      path1: "It's the next day. Isha just finished.",
      path2: "It's the next day. Isha just finished.",
      path3: "It's the same evening. Isha just finished.",
      path4: "It's the next day. Isha just finished.",
      path5: "It's the next day. Isha just finished.",
    },
    doubleWeight: true,
    options: [
      { emoji: "0️⃣", text: "Zero, not even going to lie", score: 0 },
      { emoji: "1️⃣", text: "One or two, it was a rough day", score: 2 },
      { emoji: "🔢", text: "Three, I was catching up", score: 4 },
      { emoji: "4️⃣", text: "Four, missed one somewhere", score: 6 },
      { emoji: "5️⃣", text: "All five, Fajr hangover and all", score: 8 },
    ],
    pathOptions: {
      path3: [
        { emoji: "0️⃣", text: "Zero, not even going to lie", score: 0 },
        { emoji: "1️⃣", text: "One or two, it was a lot going on", score: 2 },
        { emoji: "🔢", text: "Three, I was catching up", score: 4 },
        { emoji: "4️⃣", text: "Four, missed one somewhere", score: 6 },
        { emoji: "5️⃣", text: "All five, Jummah and everything, no cap", score: 8 },
      ],
    },
  },
  {
    id: 9,
    questionText: "What do you do with it?",
    pathQuestionText: {
      path3: "How are you actually feeling about today?",
    },
    setupLines: {
      path1: "The guilt has been sitting with you all day.",
      path2: "The guilt has been sitting with you all day.",
      path3: "You're heading home.",
      path4: "The guilt has been sitting with you all day.",
      path5: "The guilt has been sitting with you all day.",
    },
    options: [
      { emoji: "🙄", text: "What guilt? I had a great time", score: 0 },
      { emoji: "😤", text: "Already planning to do it all again next weekend", score: 0 },
      { emoji: "📱", text: "Sent a few Islamic quotes in the family group chat to balance it out", score: 1 },
      { emoji: "🤲", text: "Made some extra dua, asked for forgiveness", score: 4 },
    ],
    pathOptions: {
      path3: [
        { emoji: "🎉", text: "Had the best Friday, zero regrets", score: 2 },
        { emoji: "🤷", text: "It was just a normal Friday honestly", score: 1 },
        { emoji: "😬", text: "The khutbah hit different today, feeling some type of way", score: 3 },
        { emoji: "😅", text: "Jummah was great, the evening less so", score: 2 },
        { emoji: "😇", text: "Really good, started and ended the day right", score: 4 },
      ],
    },
  },
  {
    id: 10,
    questionText: "Your Instagram grid. What does it actually look like?",
    options: [
      { emoji: "😇", text: "Quran verses, Islamic reminders, very clean", score: 4 },
      { emoji: "📸", text: "Normal life stuff, nothing too crazy", score: 2 },
      { emoji: "🎉", text: "Everything is on there, you have nothing to hide", score: 3 },
      { emoji: "🎭", text: "Modest public page, the private story is a different story", score: 1 },
      { emoji: "👻", text: "There are photos that only certain people can see", score: 1 },
    ],
  },
  {
    id: 11,
    questionText: "You open it and remember... you're actually:",
    setupLines: {
      path1: "The person from last night just texted.",
      path2: "The person from last night just texted.",
      path3: "Someone from Jummah slid into your DMs.",
      path4: "The person from last night just texted.",
      path5: "The person you've been talking to just texted again.",
    },
    options: [
      { emoji: "💍", text: "Married or engaged, immediately closed the chat", score: 4 },
      { emoji: "🙏", text: "Single and not really supposed to be doing this", score: 3 },
      { emoji: "👀", text: "Single and ready to see where this goes", score: 2 },
      { emoji: "💑", text: "Dating someone, this is awkward", score: 1 },
      { emoji: "🤫", text: "Already talking to someone else, this is getting complicated", score: 0 },
    ],
  },
  {
    id: 12,
    questionText: "Eid al-Adha is next week. Qurbani situation?",
    pathQuestionText: {
      path3: "They ask for your advice. What do you do?",
    },
    setupLines: {
      path1: "Hold on.",
      path2: "Hold on.",
      path3: "Your cousin is venting about their situationship.",
      path4: "Hold on.",
      path5: "Hold on.",
    },
    doubleWeight: true,
    options: [
      { emoji: "🐑", text: "Sorted for weeks, we don't play about Eid al-Adha", score: 8 },
      { emoji: "😇", text: "Got it organised this week, alhamdulillah", score: 6 },
      { emoji: "🤝", text: "Going in on the family qurbani, it counts", score: 4 },
      { emoji: "🤷", text: "Not doing qurbani this year if I'm honest", score: 2 },
      { emoji: "🙈", text: "Wait, Eid al-Adha is next week?", score: 1 },
    ],
    pathOptions: {
      path3: [
        { emoji: "😇", text: "Gave them the full Islamic perspective, nicely", score: 8 },
        { emoji: "📿", text: "Said make istikhara and left it at that", score: 6 },
        { emoji: "🤝", text: "Listened and supported them without judgment", score: 4 },
        { emoji: "🤷", text: "Changed the subject, not getting involved", score: 2 },
        { emoji: "😅", text: "Gave advice but lowkey you're in the same situation", score: 0 },
      ],
    },
  },
  {
    id: 13,
    questionText: "Espresso by Sabrina Carpenter comes on. You...",
    pathQuestionText: {
      path3: "You...",
    },
    setupLines: {
      path1: "It's the Day of Arafah. You're driving.",
      path2: "It's the Day of Arafah. You're driving.",
      path3: "The conversation turns to someone who isn't there. It gets a little personal.",
      path4: "It's the Day of Arafah. You're driving.",
      path5: "It's the Day of Arafah. You're driving.",
    },
    options: [
      { emoji: "🎵", text: "Turned it up, you know every word", score: 0 },
      { emoji: "😅", text: "Listened for a bit then felt bad and turned it off", score: 2 },
      { emoji: "🔄", text: "Switched to Quran, no hesitation", score: 3 },
      { emoji: "🎧", text: "Only nasheeds this month, you're committed", score: 4 },
      { emoji: "😇", text: "Haven't listened to music in three days, you're locked in", score: 4 },
    ],
    pathOptions: {
      path3: [
        { emoji: "😬", text: "Jumped in, you have opinions too", score: 0 },
        { emoji: "😅", text: "Laughed along, didn't really add much", score: 2 },
        { emoji: "🤷", text: "Stayed quiet, not your business", score: 3 },
        { emoji: "😇", text: "Changed the subject, this doesn't feel right", score: 4 },
        { emoji: "📿", text: "Actually said something, backbiting is no joke", score: 4 },
      ],
    },
  },
  {
    id: 14,
    questionText: "Everyone is talking about sadaqah. You...",
    pathQuestionText: {
      path3: "You...",
    },
    setupLines: {
      path1: "Eid al-Adha is days away.",
      path2: "Eid al-Adha is days away.",
      path3: "Your cousin says check your phone. Someone dropped a charity link in the group chat.",
      path4: "Eid al-Adha is days away.",
      path5: "Eid al-Adha is days away.",
    },
    options: [
      { emoji: "💸", text: "Sorted qurbani and gave sadaqah on top, Dhul Hijjah doesn't mess around", score: 4 },
      { emoji: "🤲", text: "Made dua for everyone, does that count", score: 2 },
      { emoji: "📱", text: "Shared a charity link on your story, that counts right", score: 1 },
      { emoji: "😅", text: "Meant to donate, kept forgetting", score: 1 },
      { emoji: "🙈", text: "Completely forgot, next year inshallah", score: 0 },
    ],
    pathOptions: {
      path3: [
        { emoji: "💸", text: "Donated immediately, it's Friday, best day to give sadaqah", score: 4 },
        { emoji: "🤲", text: "Made dua instead, does that count", score: 2 },
        { emoji: "📱", text: "Liked the post, will donate later", score: 1 },
        { emoji: "😅", text: "Meant to donate, got distracted", score: 1 },
        { emoji: "🙈", text: "Scrolled past it, not today", score: 0 },
      ],
    },
  },
  {
    id: 15,
    questionText: "You're feeling...",
    setupLines: {
      path1: "Eid al-Adha is here.",
      path2: "Eid al-Adha is here.",
      path3: "You're home. Friday is done.",
      path4: "Eid al-Adha is here.",
      path5: "Eid al-Adha is here.",
    },
    options: [
      { emoji: "😇", text: "Spiritually recharged, different person", score: 4 },
      { emoji: "😅", text: "Glad I tried, could have done better honestly", score: 3 },
      { emoji: "🙏", text: "Ready to find out my ratio", score: 2 },
      { emoji: "🎉", text: "Mostly excited about the food and the money", score: 1 },
      { emoji: "😬", text: "The same as before, not gonna lie", score: 0 },
    ],
    pathOptions: {
      path3: [
        { emoji: "😇", text: "Really good, started and ended the day right", score: 4 },
        { emoji: "😬", text: "The khutbah hit different today, feeling some type of way", score: 3 },
        { emoji: "😅", text: "Jummah was great, the evening less so", score: 3 },
        { emoji: "🎉", text: "Had the best Friday, zero regrets", score: 2 },
        { emoji: "🙏", text: "Ready to find out my ratio", score: 2 },
      ],
    },
  },
];

export const ARCHETYPES: Archetype[] = [
  {
    name: "The Cultural Muslim",
    emoji: "🎭",
    minScore: 0,
    maxScore: 10,
    description:
      "You know you're Muslim because your mum told you. You celebrate Eid for the food and the money, Ramadan for the weight loss, and that's about it. Bismillah before meals is the extent of your practice and honestly even that is 50/50.",
    shareTagline: "Bismillah before bites, nothing after.",
  },
  {
    name: "The Ramadan Muslim",
    emoji: "🌙",
    minScore: 11,
    maxScore: 18,
    description:
      "Every year without fail, a spiritual awakening hits you on the first of Ramadan. You're a completely different person for 30 days. Then Eid arrives and so does your old self. See you next year.",
    shareTagline: "Different person every Ramadan. Same person every Eid.",
  },
  {
    name: "The Selective Halal",
    emoji: "🤔",
    minScore: 19,
    maxScore: 26,
    description:
      "You don't drink, don't smoke, never missed a Jummah. But the pepperoni pizza? That's different. You have a whole justification ready if anyone asks and honestly it almost makes sense.",
    shareTagline: "No drinks, no smoke, but the pizza is different.",
  },
  {
    name: "Drinks After Jummah",
    emoji: "🕌",
    minScore: 27,
    maxScore: 34,
    description:
      "Friday is your favourite day of the week for two completely different reasons and you see absolutely no contradiction in that. Allahu Akbar then let's go.",
    shareTagline: "Allahu Akbar, then let's go.",
  },
  {
    name: "Modest Insta, Wild Private Story",
    emoji: "🎭",
    minScore: 35,
    maxScore: 42,
    description:
      "Your public page is basically a dawah account. Quran verses, aesthetic sunsets, the occasional hadith. Your close friends list is a completely different universe and you know it.",
    shareTagline: "Public: dawah account. Private: another universe.",
  },
  {
    name: "The Wallah Breaker",
    emoji: "💀",
    minScore: 43,
    maxScore: 50,
    description:
      "Nobody believes your wallahs anymore, not even when you're being completely sincere. You did this to yourself. You have nobody to blame.",
    shareTagline: "Nobody believes your wallahs anymore.",
  },
  {
    name: "The Guilt Tripper",
    emoji: "😬",
    minScore: 51,
    maxScore: 57,
    description:
      "You did everything this weekend. Every single thing. But you also prayed Fajr, made dua, and sent sadaqah on Sunday morning. In your head it balances out. It does not balance out.",
    shareTagline: "It balances out. It does not balance out.",
  },
  {
    name: "The Islamic Quote Sender",
    emoji: "📿",
    minScore: 58,
    maxScore: 64,
    description:
      "You may not be praying all five but that family group chat is getting fed daily. Subhanallah, mashallah, a beautiful reminder every morning. It counts for something surely.",
    shareTagline: "The group chat stays fed. The prayer mat stays dry.",
  },
  {
    name: "The Haram Detector",
    emoji: "🔍",
    minScore: 65,
    maxScore: 70,
    description:
      "You're not even that religious but the moment someone else does something haram you're the first one to notice. Selective piety is still piety apparently.",
    shareTagline: "First to notice everyone else's haram.",
  },
  {
    name: "The Inshallah Everything",
    emoji: "🤲",
    minScore: 71,
    maxScore: 76,
    description:
      "Inshallah you'll pray. Inshallah you'll fast. Inshallah you'll stop. It's not procrastination, it's faith.",
    shareTagline: "Inshallah you'll pray. Inshallah.",
  },
  {
    name: "The Almost Sheikh",
    emoji: "☪️",
    minScore: 77,
    maxScore: 82,
    description:
      "Five prayers, no music, halal food only, lowkey knows more Quran than they let on. The only thing stopping full sheikh status is the vape. Just the vape.",
    shareTagline: "Full sheikh status blocked by one vape.",
  },
  {
    name: "The Reformed One",
    emoji: "✨",
    minScore: 83,
    maxScore: 87,
    description:
      "You have a past. A whole past. But that's between you and Allah and you have moved on. You are not the same person you were in 2019 and you will not be taking questions.",
    shareTagline: "Not the same person as 2019. Not taking questions.",
  },
  {
    name: "The Quietly Religious",
    emoji: "🕊️",
    minScore: 88,
    maxScore: 92,
    description:
      "Never preaches, never judges, never posts about it. Just prays all five, fasts properly, gives sadaqah and goes about their day. Somehow the most intimidating person in the room.",
    shareTagline: "Prays all five. Never posts about it. Most intimidating person.",
  },
  {
    name: "The Walking Contradiction",
    emoji: "🌀",
    minScore: 93,
    maxScore: 97,
    description:
      "You genuinely cannot be placed anywhere on this spectrum and honestly neither can we. You are a mystery. Even to yourself.",
    shareTagline: "Cannot be placed on this spectrum. Even to yourself.",
  },
  {
    name: "The Sheikh",
    emoji: "👑",
    minScore: 98,
    maxScore: 100,
    description:
      "You are the person everyone calls when they need a fatwa at 2am. You have an answer for everything. You've probably already made tawbah on behalf of everyone who took this quiz.",
    shareTagline: "Available for fatwas at 2am.",
  },
];

export function getArchetype(ratio: number): Archetype {
  return (
    ARCHETYPES.find((a) => ratio >= a.minScore && ratio <= a.maxScore) ??
    ARCHETYPES[ARCHETYPES.length - 1]
  );
}

export function calculateRatio(scores: number[]): number {
  const total = scores.reduce((sum, s) => sum + s, 0);
  const raw = (total / 60) * 100;
  return Math.min(100, Math.round(raw));
}

export function getPathKey(q1AnswerIndex: number): PathKey {
  const paths: PathKey[] = ["path1", "path2", "path3", "path4", "path5"];
  return paths[q1AnswerIndex] ?? "path1";
}

export function getQuestionOptions(question: Question, path: PathKey): AnswerOption[] {
  return question.pathOptions?.[path] ?? question.options;
}

export function getSetupLine(question: Question, path: PathKey): string {
  return question.setupLines?.[path] ?? "";
}

export const NOTIFICATIONS = [
  { name: "Fatima", city: "London", percent: 34 },
  { name: "Ahmed", city: "Dubai", percent: 78 },
  { name: "Zara", city: "Toronto", percent: 52 },
  { name: "Omar", city: "Manchester", percent: 19 },
  { name: "Aisha", city: "Birmingham", percent: 63 },
  { name: "Yusuf", city: "New York", percent: 41 },
  { name: "Mariam", city: "Sydney", percent: 88 },
  { name: "Hassan", city: "Paris", percent: 27 },
  { name: "Nour", city: "Amsterdam", percent: 71 },
  { name: "Bilal", city: "Chicago", percent: 45 },
  { name: "Safiya", city: "Karachi", percent: 92 },
  { name: "Tariq", city: "Stockholm", percent: 33 },
  { name: "Layla", city: "Berlin", percent: 56 },
  { name: "Hamza", city: "Melbourne", percent: 14 },
  { name: "Rania", city: "Cairo", percent: 79 },
  { name: "Idris", city: "Houston", percent: 48 },
  { name: "Nadia", city: "Copenhagen", percent: 67 },
  { name: "Khalid", city: "Riyadh", percent: 95 },
  { name: "Hana", city: "Dublin", percent: 38 },
  { name: "Zaid", city: "Brussels", percent: 22 },
  { name: "Samira", city: "Toronto", percent: 83 },
  { name: "Faris", city: "Oslo", percent: 61 },
  { name: "Iman", city: "Cape Town", percent: 47 },
  { name: "Adil", city: "Vienna", percent: 29 },
  { name: "Sara", city: "Doha", percent: 74 },
  { name: "Malik", city: "Atlanta", percent: 55 },
  { name: "Huda", city: "Glasgow", percent: 91 },
  { name: "Karim", city: "Casablanca", percent: 36 },
  { name: "Amina", city: "Leicester", percent: 69 },
  { name: "Saad", city: "Milan", percent: 43 },
  { name: "Yasmin", city: "Vancouver", percent: 82 },
  { name: "Anas", city: "Birmingham", percent: 17 },
  { name: "Farah", city: "Kuala Lumpur", percent: 58 },
  { name: "Umar", city: "Singapore", percent: 76 },
  { name: "Dina", city: "Montreal", percent: 31 },
  { name: "Sufyan", city: "Rotterdam", percent: 64 },
  { name: "Khadija", city: "Lagos", percent: 86 },
  { name: "Ramzi", city: "Beirut", percent: 24 },
  { name: "Lina", city: "Frankfurt", percent: 53 },
  { name: "Musa", city: "Bradford", percent: 98 },
];

export function getNotificationEmoji(percent: number): string {
  if (percent >= 80) return "😇";
  if (percent >= 60) return "🤲";
  if (percent >= 40) return "😅";
  if (percent >= 20) return "😬";
  return "🔥";
}

export const LOADING_MESSAGES = [
  "Counting your wallahs... 📿",
  "Checking your Spotify history... 🎵",
  "Consulting the sheikh... 🕌",
  "Reviewing your private story... 👀",
  "Analysing your Eid al-Adha prep... 🐑",
  "Calculating your pepperoni pizza incidents... 🍕",
  "Reviewing your Fajr attendance... ⏰",
  "Cross referencing your family group chat activity... 📱",
];

// ─── Mirror screens ───────────────────────────────────────────────────────────

export interface AnswerRecord {
  questionId: number;
  optionIndex: number;
  emoji: string;
  text: string;
  score: number;
}

export interface MirrorContent {
  label: string;
  headline: string;
  subtext: string;
}

/** After these questionIndex values (0-based), interrupt with a mirror screen */
export const MIRROR_AFTER_INDICES = [2, 5, 8, 11];

export function getMirrorIndex(questionIndex: number): number {
  return MIRROR_AFTER_INDICES.indexOf(questionIndex);
}

export function getMirrorContent(
  mirrorIndex: number,
  answers: AnswerRecord[],
  path: PathKey
): MirrorContent {
  const a = (id: number) => answers.find((r) => r.questionId === id);

  // ── Mirror 1: Friday night - food (Q2) + drink (Q3) ─────────────────────
  if (mirrorIndex === 0) {
    if (path === "path3") {
      const khutbah = a(2)?.optionIndex ?? 1;
      const evening = a(3)?.optionIndex ?? 1;
      const kE = a(2)?.emoji ?? "😬";
      const eE = a(3)?.emoji ?? "🛋️";
      if (khutbah <= 1 && evening <= 1)
        return { label: "the Jummah debrief", headline: "Locked in for the khutbah. Stayed home after. A clean Friday.", subtext: "Not many make it this far." };
      if (khutbah >= 3 && evening >= 3)
        return { label: "the Jummah debrief", headline: `${kE} through the khutbah. ${eE} after. Jummah was technically attended.`, subtext: "The intention counts for something." };
      if (khutbah <= 1 && evening >= 3)
        return { label: "the Jummah debrief", headline: "Locked in for the khutbah. Then the shisha spot happened.", subtext: "Half the Friday was very good." };
      return { label: "the Jummah debrief", headline: `${kE} through the khutbah. ${eE} after. A full Friday.`, subtext: "The audit continues." };
    }

    const foodIdx = a(2)?.optionIndex ?? 2;
    const drinkIdx = a(3)?.optionIndex ?? 3;
    const fE = a(2)?.emoji ?? "🍴";
    const dE = a(3)?.emoji ?? "🧃";
    const foodHaram = foodIdx <= 1;
    const drinkHaram = drinkIdx <= 2;

    if (path === "path1") {
      if (foodHaram && drinkHaram)
        return { label: "the Friday audit", headline: `Shisha spot, ${fE}, and ${dE}.`, subtext: "The full package." };
      if (foodHaram)
        return { label: "the Friday audit", headline: `Shisha and ${fE}, but the ${dE} was halal.`, subtext: "The hierarchy of haram is noted." };
      if (drinkHaram)
        return { label: "the Friday audit", headline: `Halal food at the shisha spot. Then ${dE}.`, subtext: "Almost." };
      return { label: "the Friday audit", headline: `Shisha spot, halal food, ${dE}. Holding it together.`, subtext: "Mostly." };
    }
    if (path === "path4") {
      if (!drinkHaram)
        return { label: "the Friday audit", headline: `${dE} at the bar. The bar did not break you.`, subtext: "Respect." };
      if (!foodHaram)
        return { label: "the Friday audit", headline: `Tracked down a halal option at the bar. Then ${dE}.`, subtext: "The logic is in there somewhere." };
      return { label: "the Friday audit", headline: `Bar, ${fE}, and ${dE}.`, subtext: "At least you're consistent." };
    }
    if (foodHaram && drinkHaram)
      return { label: "the Friday audit", headline: `${fE} and ${dE}. Interesting choices.`, subtext: "We're not judging. Actually, a little." };
    if (foodHaram)
      return { label: "the Friday audit", headline: `${fE} but held it together with ${dE}.`, subtext: "The line exists somewhere." };
    if (drinkHaram)
      return { label: "the Friday audit", headline: `Halal food, then ${dE}. One step forward, one step sideways.`, subtext: "Still moving though." };
    return { label: "the Friday audit", headline: `Halal food, ${dE}. Quietly holding it together.`, subtext: "The audit starts well." };
  }

  // ── Mirror 2: The evening - vape (Q4) + stranger (Q5) + mum call (Q6) ───
  if (mirrorIndex === 1) {
    const vapeIdx = a(4)?.optionIndex ?? 3;
    const strangerIdx = a(5)?.optionIndex ?? 2;
    const mumIdx = a(6)?.optionIndex ?? 3;
    const vE = a(4)?.emoji ?? "😤";
    const sE = a(5)?.emoji ?? "🤝";

    if (mumIdx === 2) {
      if (vapeIdx <= 1)
        return { label: "reading the room", headline: `${vE} all evening, then your most religious friend held the phone for mum's call.`, subtext: "The logistics of this cannot be understated." };
      if (strangerIdx >= 3)
        return { label: "reading the room", headline: `${sE} with the stranger. Then your most religious friend took the mum call.`, subtext: "A performance in two acts." };
      return { label: "reading the room", headline: "Your mum called. Your most religious-looking friend got handed the phone.", subtext: "The genius of it." };
    }
    if (mumIdx === 0) {
      if (vapeIdx <= 1 && strangerIdx >= 3)
        return { label: "reading the room", headline: `${vE} all evening, ${sE} with the stranger, then declined mum's call.`, subtext: "The priorities were clear." };
      if (strangerIdx >= 3)
        return { label: "reading the room", headline: `${sE} with the stranger. Then declined mum's call.`, subtext: "The timing was unfortunate." };
      if (vapeIdx <= 1)
        return { label: "reading the room", headline: `${vE} all evening. Then declined mum's call.`, subtext: "Deal with the consequences tomorrow." };
      return { label: "reading the room", headline: "Your mum called. You declined.", subtext: "Consequences: tomorrow's problem." };
    }
    if (mumIdx === 1) {
      if (strangerIdx >= 3)
        return { label: "reading the room", headline: `${sE} with the stranger. Told mum you're at a friend's place. Technically true.`, subtext: "The technicalities are doing a lot of work." };
      if (vapeIdx <= 1)
        return { label: "reading the room", headline: `${vE} and then telling mum you're at a friend's place.`, subtext: "You are, technically." };
      return { label: "reading the room", headline: "Your mum called. You said you're at a friend's place.", subtext: "The truth lives nearby." };
    }
    if (mumIdx === 4)
      return { label: "reading the room", headline: "Already home by the time mum called. A clean exit.", subtext: "This is not common." };
    if (vapeIdx <= 1)
      return { label: "reading the room", headline: `${vE} all evening. Then picked up and told mum exactly where you were.`, subtext: "Transparent if nothing else." };
    return { label: "reading the room", headline: "Your mum called. You told her exactly where you were.", subtext: "The transparency points are real." };
  }

  // ── Mirror 3: The spiritual - Fajr (Q7) + prayers (Q8) + guilt (Q9) ─────
  if (mirrorIndex === 2) {
    const fajrIdx = a(7)?.optionIndex ?? 1;
    const prayersIdx = a(8)?.optionIndex ?? 1;
    const guiltIdx = a(9)?.optionIndex ?? 2;
    const counts = ["zero", "one or two", "three", "four", "all five"];
    const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
    const prayerWord = counts[prayersIdx] ?? "some";

    if (path === "path3") {
      if (fajrIdx >= 3 && prayersIdx >= 3)
        return { label: "the prayer report", headline: "Prayed on time when it came in. Four or five prayers today.", subtext: guiltIdx >= 2 ? "The reflection came naturally." : "The record is clean." };
      if (fajrIdx <= 1 && prayersIdx <= 1)
        return { label: "the prayer report", headline: "Maghrib came in. You kept going. Zero to two prayers today.", subtext: "The day went by quickly." };
      if (guiltIdx === 0)
        return { label: "the prayer report", headline: "The best Friday. Zero regrets. That's one way to score this.", subtext: "Interesting." };
      return { label: "the prayer report", headline: `${cap(prayerWord)} prayers today. The feelings are being processed.`, subtext: "That's something." };
    }

    if (fajrIdx >= 3 && prayersIdx === 4)
      return { label: "the prayer report", headline: "Five prayers. Fajr included. The commitment is showing.", subtext: guiltIdx === 3 ? "And then the dua on top. Thorough." : "The record is very clean." };
    if (fajrIdx <= 1 && prayersIdx === 0) {
      if (guiltIdx <= 1)
        return { label: "the prayer report", headline: "Fajr came and went. Zero prayers. No guilt about it.", subtext: "Next time, inshallah." };
      return { label: "the prayer report", headline: "Fajr came and went. Zero prayers. Then a dua for forgiveness.", subtext: "Skipping straight to the pardon." };
    }
    if (prayersIdx === 0 && guiltIdx === 3)
      return { label: "the prayer report", headline: "Zero prayers today. Then dua for forgiveness.", subtext: "The intention is there at least." };
    if (fajrIdx === 2)
      return { label: "the prayer report", headline: `Opened the prayer app. Closed it. ${cap(prayerWord)} prayers total.`, subtext: guiltIdx === 2 ? "The group chat got a hadith. Balance achieved, sort of." : "The app is still waiting." };
    if (guiltIdx === 2)
      return { label: "the prayer report", headline: `${cap(prayerWord)} prayers. Then a hadith to the family group chat.`, subtext: "The balance system is unconventional but it exists." };
    return { label: "the prayer report", headline: `${cap(prayerWord)} prayers today.`, subtext: "The audit continues." };
  }

  // ── Mirror 4: The feed - Instagram (Q10) + DMs (Q11) + Ramadan/Eid (Q12) ────
  if (mirrorIndex === 3) {
    const instaIdx = a(10)?.optionIndex ?? 1;
    const dmIdx = a(11)?.optionIndex ?? 2;
    const q12Idx = a(12)?.optionIndex ?? 2;
    const iE = a(10)?.emoji ?? "📸";
    const dE = a(11)?.emoji ?? "👀";
    const rE = a(12)?.emoji ?? "😅";

    if (path === "path3") {
      if (q12Idx === 4)
        return { label: "the feed check", headline: `${iE} on the grid. ${dE} in the DMs. And the situationship advice was projection.`, subtext: "Classic." };
      if (instaIdx === 0 && q12Idx <= 1)
        return { label: "the feed check", headline: "Quran verses on the grid. Gave the full Islamic perspective to your cousin.", subtext: "Consistent. We respect it." };
      if (instaIdx === 3 && q12Idx >= 3)
        return { label: "the feed check", headline: "Modest public page. Gave advice about the situationship that very much applies to you.", subtext: "We see the irony." };
      return { label: "the feed check", headline: `${iE} on the grid. ${rE} with the advice.`, subtext: "A Friday in full." };
    }

    const instaWild = instaIdx === 3 || instaIdx === 4;
    const q12Missed = q12Idx >= 3;

    if (instaIdx === 0 && dmIdx === 0 && !q12Missed)
      return { label: "the feed check", headline: "Quran verses on the grid. DMs closed. Eid al-Adha-ready.", subtext: "We have no notes." };
    if (instaWild && q12Missed && dmIdx >= 3)
      return { label: "the feed check", headline: `${iE} on the grid. ${dE} in the DMs. And ${rE} for Eid al-Adha.`, subtext: "Three revelations at once." };
    if (instaIdx === 3 && q12Missed)
      return { label: "the feed check", headline: `Modest public page, different private story. And ${rE}, not quite ready for Eid al-Adha.`, subtext: "The public doesn't know the half of it." };
    if (q12Idx === 4)
      return { label: "the feed check", headline: `Didn't realise Eid al-Adha was next week. ${iE} on the grid.`, subtext: "The preparation was minimal." };
    if (instaIdx === 0 && q12Missed)
      return { label: "the feed check", headline: `Quran verses on the grid. But ${rE}, not quite ready for Eid al-Adha.`, subtext: "The grid and the schedule are not aligned." };
    if (!q12Missed && dmIdx >= 3)
      return { label: "the feed check", headline: `${dE} in the DMs. Eid al-Adha is next week though.`, subtext: "The reset begins now." };
    return { label: "the feed check", headline: `${iE} on the grid. ${dE} in the DMs. ${rE} about Eid al-Adha.`, subtext: "The full picture is emerging." };
  }

  return { label: "checking in", headline: "Still going.", subtext: "The audit continues." };
}
