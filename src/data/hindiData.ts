import { HindiChar, MatraItem, WordItem, PhraseItem, SentenceItem, QuizQuestion, LevelInfo } from '../types';

export const LEVELS: LevelInfo[] = [
  {
    id: 1,
    title: 'The Alphabet & Sounds',
    hindiTitle: 'वर्णमाला (Swar & Vyanjan)',
    subtitle: 'Learn Hindi vowels and consonants with native audio & mnemonics',
    icon: '🔤',
    color: 'from-amber-500 to-orange-500',
    bgGradient: 'bg-gradient-to-r from-amber-500 to-orange-500',
    accentColor: 'orange',
    itemsCount: 43,
  },
  {
    id: 2,
    title: 'Matras & First Words',
    hindiTitle: 'मात्राएँ और सरल शब्द',
    subtitle: 'Discover how vowel signs attach to make 2 & 3 letter words',
    icon: '🧩',
    color: 'from-emerald-500 to-teal-600',
    bgGradient: 'bg-gradient-to-r from-emerald-500 to-teal-600',
    accentColor: 'teal',
    itemsCount: 22,
  },
  {
    id: 3,
    title: 'Everyday Vocabulary',
    hindiTitle: 'रोज़मर्रा के शब्द',
    subtitle: 'Colors, Numbers 1-10, Animals, Family & Fruits with pictures',
    icon: '🎨',
    color: 'from-blue-500 to-indigo-600',
    bgGradient: 'bg-gradient-to-r from-blue-500 to-indigo-600',
    accentColor: 'blue',
    itemsCount: 38,
  },
  {
    id: 4,
    title: 'Daily Dialogues & Greetings',
    hindiTitle: 'बोलचाल के वाक्य',
    subtitle: 'Essential conversation phrases for school, friends & family',
    icon: '💬',
    color: 'from-purple-500 to-pink-500',
    bgGradient: 'bg-gradient-to-r from-purple-500 to-pink-500',
    accentColor: 'pink',
    itemsCount: 16,
  },
  {
    id: 5,
    title: 'Sentence Puzzle Master',
    hindiTitle: 'वाक्य निर्माण (Sentence Builder)',
    subtitle: 'Arrange words into proper Hindi sentences and master grammar easily',
    icon: '🏗️',
    color: 'from-rose-500 to-red-600',
    bgGradient: 'bg-gradient-to-r from-rose-500 to-red-600',
    accentColor: 'rose',
    itemsCount: 10,
  },
  {
    id: 6,
    title: 'Super Arcade Quiz',
    hindiTitle: 'महासंग्राम क्विज़ (Arcade Challenge)',
    subtitle: 'Listen to native Hindi audio, beat the timer, earn stars and XP!',
    icon: '🏆',
    color: 'from-yellow-400 to-amber-600',
    bgGradient: 'bg-gradient-to-r from-yellow-400 to-amber-600',
    accentColor: 'amber',
    itemsCount: 20,
  },
];

// LEVEL 1: SWAR (VOWELS) & VYANJAN (CONSONANTS)
export const SWAR_LIST: HindiChar[] = [
  { id: 's1', char: 'अ', transliteration: 'a', category: 'swar', soundMnemonic: 'Like "u" in "cup"', exampleWord: 'अनार', exampleTranslit: 'Anaar', exampleMeaning: 'Pomegranate', emoji: '🍎', audioPrompt: 'अ, अनार' },
  { id: 's2', char: 'आ', transliteration: 'aa', category: 'swar', soundMnemonic: 'Long "aa" like "father"', exampleWord: 'आम', exampleTranslit: 'Aam', exampleMeaning: 'Mango', emoji: '🥭', audioPrompt: 'आ, आम' },
  { id: 's3', char: 'इ', transliteration: 'i', category: 'swar', soundMnemonic: 'Short "i" like "pin"', exampleWord: 'इमली', exampleTranslit: 'Imli', exampleMeaning: 'Tamarind', emoji: '🌿', audioPrompt: 'इ, इमली' },
  { id: 's4', char: 'ई', transliteration: 'ee', category: 'swar', soundMnemonic: 'Long "ee" like "meet"', exampleWord: 'ईख', exampleTranslit: 'Eekh', exampleMeaning: 'Sugarcane', emoji: '🎋', audioPrompt: 'ई, ईख' },
  { id: 's5', char: 'उ', transliteration: 'u', category: 'swar', soundMnemonic: 'Short "u" like "put"', exampleWord: 'उल्लू', exampleTranslit: 'Ullu', exampleMeaning: 'Owl', emoji: '🦉', audioPrompt: 'उ, उल्लू' },
  { id: 's6', char: 'ऊ', transliteration: 'oo', category: 'swar', soundMnemonic: 'Long "oo" like "moon"', exampleWord: 'ऊन', exampleTranslit: 'Oon', exampleMeaning: 'Wool', emoji: '🧶', audioPrompt: 'ऊ, ऊन' },
  { id: 's7', char: 'ऋ', transliteration: 'ri', category: 'swar', soundMnemonic: 'Like "ri" in "rhythm"', exampleWord: 'ऋषि', exampleTranslit: 'Rishi', exampleMeaning: 'Sage', emoji: '🧘', audioPrompt: 'ऋ, ऋषि' },
  { id: 's8', char: 'ए', transliteration: 'e', category: 'swar', soundMnemonic: 'Like "ay" in "say"', exampleWord: 'एक', exampleTranslit: 'Ek', exampleMeaning: 'One', emoji: '1️⃣', audioPrompt: 'ए, एक' },
  { id: 's9', char: 'ऐ', transliteration: 'ai', category: 'swar', soundMnemonic: 'Like "ai" in "aisle"', exampleWord: 'ऐनक', exampleTranslit: 'Ainak', exampleMeaning: 'Spectacles', emoji: '👓', audioPrompt: 'ऐ, ऐनक' },
  { id: 's10', char: 'ओ', transliteration: 'o', category: 'swar', soundMnemonic: 'Pure "o" like "boat"', exampleWord: 'ओखली', exampleTranslit: 'Okhli', exampleMeaning: 'Mortar', emoji: '🥣', audioPrompt: 'ओ, ओखली' },
  { id: 's11', char: 'औ', transliteration: 'au', category: 'swar', soundMnemonic: 'Like "ow" in "cow"', exampleWord: 'औरत', exampleTranslit: 'Aurat', exampleMeaning: 'Woman', emoji: '👩', audioPrompt: 'औ, औरत' },
  { id: 's12', char: 'अं', transliteration: 'ang', category: 'swar', soundMnemonic: 'Nasal "ung" in "rung"', exampleWord: 'अंगूर', exampleTranslit: 'Angoor', exampleMeaning: 'Grapes', emoji: '🍇', audioPrompt: 'अंग, अंगूर' },
  { id: 's13', char: 'अः', transliteration: 'aha', category: 'swar', soundMnemonic: 'Gentle aspiration "aha"', exampleWord: 'प्रातः', exampleTranslit: 'Praatah', exampleMeaning: 'Morning', emoji: '🌅', audioPrompt: 'अहः' },
];

export const VYANJAN_LIST: HindiChar[] = [
  { id: 'v1', char: 'क', transliteration: 'ka', category: 'vyanjan', soundMnemonic: 'Like "k" in kite', exampleWord: 'कबूतर', exampleTranslit: 'Kabootar', exampleMeaning: 'Pigeon', emoji: '🕊️', audioPrompt: 'क, कबूतर' },
  { id: 'v2', char: 'ख', transliteration: 'kha', category: 'vyanjan', soundMnemonic: 'Aspirated "kh"', exampleWord: 'खरगोश', exampleTranslit: 'Khargosh', exampleMeaning: 'Rabbit', emoji: '🐇', audioPrompt: 'ख, खरगोश' },
  { id: 'v3', char: 'ग', transliteration: 'ga', category: 'vyanjan', soundMnemonic: 'Like "g" in goat', exampleWord: 'गमला', exampleTranslit: 'Gamla', exampleMeaning: 'Flowerpot', emoji: '🪴', audioPrompt: 'ग, गमला' },
  { id: 'v4', char: 'घ', transliteration: 'gha', category: 'vyanjan', soundMnemonic: 'Aspirated "gh"', exampleWord: 'घर', exampleTranslit: 'Ghar', exampleMeaning: 'House', emoji: '🏠', audioPrompt: 'घ, घर' },
  { id: 'v5', char: 'च', transliteration: 'cha', category: 'vyanjan', soundMnemonic: 'Like "ch" in chair', exampleWord: 'चम्मच', exampleTranslit: 'Chammach', exampleMeaning: 'Spoon', emoji: '🥄', audioPrompt: 'च, चम्मच' },
  { id: 'v6', char: 'छ', transliteration: 'chha', category: 'vyanjan', soundMnemonic: 'Aspirated "chh"', exampleWord: 'छाता', exampleTranslit: 'Chhaata', exampleMeaning: 'Umbrella', emoji: '☂️', audioPrompt: 'छ, छाता' },
  { id: 'v7', char: 'ज', transliteration: 'ja', category: 'vyanjan', soundMnemonic: 'Like "j" in joy', exampleWord: 'जहाज़', exampleTranslit: 'Jahaaz', exampleMeaning: 'Ship', emoji: '🚢', audioPrompt: 'ज, जहाज़' },
  { id: 'v8', char: 'झ', transliteration: 'jha', category: 'vyanjan', soundMnemonic: 'Aspirated "jh"', exampleWord: 'झंडा', exampleTranslit: 'Jhanda', exampleMeaning: 'Flag', emoji: '🇮🇳', audioPrompt: 'झ, झंडा' },
  { id: 'v9', char: 'ट', transliteration: 'Ta', category: 'vyanjan', soundMnemonic: 'Retroflex "T" (tongue curled back)', exampleWord: 'टमाटर', exampleTranslit: 'Tamaatar', exampleMeaning: 'Tomato', emoji: '🍅', audioPrompt: 'ट, टमाटर' },
  { id: 'v10', char: 'ठ', transliteration: 'Tha', category: 'vyanjan', soundMnemonic: 'Retroflex aspirated "Th"', exampleWord: 'ठठेरा', exampleTranslit: 'Thathera', exampleMeaning: 'Coppersmith', emoji: '🔨', audioPrompt: 'ठ, ठठेरा' },
  { id: 'v11', char: 'ड', transliteration: 'Da', category: 'vyanjan', soundMnemonic: 'Retroflex "D"', exampleWord: 'डमरू', exampleTranslit: 'Damroo', exampleMeaning: 'Hand Drum', emoji: '🥁', audioPrompt: 'ड, डमरू' },
  { id: 'v12', char: 'ढ', transliteration: 'Dha', category: 'vyanjan', soundMnemonic: 'Retroflex aspirated "Dh"', exampleWord: 'ढक्कन', exampleTranslit: 'Dhakkan', exampleMeaning: 'Lid', emoji: '🫙', audioPrompt: 'ढ, ढक्कन' },
  { id: 'v13', char: 'त', transliteration: 'ta', category: 'vyanjan', soundMnemonic: 'Dental "t" (tongue behind teeth)', exampleWord: 'तितली', exampleTranslit: 'Titli', exampleMeaning: 'Butterfly', emoji: '🦋', audioPrompt: 'त, तितली' },
  { id: 'v14', char: 'थ', transliteration: 'tha', category: 'vyanjan', soundMnemonic: 'Dental aspirated "th"', exampleWord: 'थर्मस', exampleTranslit: 'Thermas', exampleMeaning: 'Flask', emoji: '🍶', audioPrompt: 'थ, थर्मस' },
  { id: 'v15', char: 'द', transliteration: 'da', category: 'vyanjan', soundMnemonic: 'Dental "d"', exampleWord: 'दवात', exampleTranslit: 'Davaat', exampleMeaning: 'Inkpot', emoji: '🖋️', audioPrompt: 'द, दवात' },
  { id: 'v16', char: 'ध', transliteration: 'dha', category: 'vyanjan', soundMnemonic: 'Dental aspirated "dh"', exampleWord: 'धनुष', exampleTranslit: 'Dhanush', exampleMeaning: 'Bow', emoji: '🏹', audioPrompt: 'ध, धनुष' },
  { id: 'v17', char: 'न', transliteration: 'na', category: 'vyanjan', soundMnemonic: 'Like "n" in nest', exampleWord: 'नल', exampleTranslit: 'Nal', exampleMeaning: 'Tap', emoji: '🚰', audioPrompt: 'न, नल' },
  { id: 'v18', char: 'प', transliteration: 'pa', category: 'vyanjan', soundMnemonic: 'Like "p" in pen', exampleWord: 'पतंग', exampleTranslit: 'Patang', exampleMeaning: 'Kite', emoji: '🪁', audioPrompt: 'प, पतंग' },
  { id: 'v19', char: 'फ', transliteration: 'pha', category: 'vyanjan', soundMnemonic: 'Aspirated "ph" or "f"', exampleWord: 'फल', exampleTranslit: 'Phal', exampleMeaning: 'Fruit', emoji: '🍎', audioPrompt: 'फ, फल' },
  { id: 'v20', char: 'ब', transliteration: 'ba', category: 'vyanjan', soundMnemonic: 'Like "b" in ball', exampleWord: 'बत्तख', exampleTranslit: 'Batthakh', exampleMeaning: 'Duck', emoji: '🦆', audioPrompt: 'ब, बत्तख' },
  { id: 'v21', char: 'भ', transliteration: 'bha', category: 'vyanjan', soundMnemonic: 'Aspirated "bh"', exampleWord: 'भालू', exampleTranslit: 'Bhaalu', exampleMeaning: 'Bear', emoji: '🐻', audioPrompt: 'भ, भालू' },
  { id: 'v22', char: 'म', transliteration: 'ma', category: 'vyanjan', soundMnemonic: 'Like "m" in mango', exampleWord: 'मछली', exampleTranslit: 'Machhli', exampleMeaning: 'Fish', emoji: '🐟', audioPrompt: 'म, मछली' },
  { id: 'v23', char: 'य', transliteration: 'ya', category: 'vyanjan', soundMnemonic: 'Like "y" in yacht', exampleWord: 'यज्ञ', exampleTranslit: 'Yagya', exampleMeaning: 'Ritual Fire', emoji: '🔥', audioPrompt: 'य, यज्ञ' },
  { id: 'v24', char: 'र', transliteration: 'ra', category: 'vyanjan', soundMnemonic: 'Light rolled "r"', exampleWord: 'रथ', exampleTranslit: 'Rath', exampleMeaning: 'Chariot', emoji: '🛞', audioPrompt: 'र, रथ' },
  { id: 'v25', char: 'ल', transliteration: 'la', category: 'vyanjan', soundMnemonic: 'Like "l" in lotus', exampleWord: 'लट्टू', exampleTranslit: 'Lattoo', exampleMeaning: 'Spinning Top', emoji: '🪀', audioPrompt: 'ल, लट्टू' },
  { id: 'v26', char: 'व', transliteration: 'va', category: 'vyanjan', soundMnemonic: 'Soft "v" or "w"', exampleWord: 'वन', exampleTranslit: 'Van', exampleMeaning: 'Forest', emoji: '🌲', audioPrompt: 'व, वन' },
  { id: 'v27', char: 'श', transliteration: 'sha', category: 'vyanjan', soundMnemonic: 'Like "sh" in shine', exampleWord: 'शलजम', exampleTranslit: 'Shaljam', exampleMeaning: 'Turnip', emoji: '🥗', audioPrompt: 'श, शलजम' },
  { id: 'v28', char: 'ष', transliteration: 'sha', category: 'vyanjan', soundMnemonic: 'Retroflex "sh"', exampleWord: 'षट्कोण', exampleTranslit: 'Shatkon', exampleMeaning: 'Hexagon', emoji: '⬡', audioPrompt: 'ष, षट्कोण' },
  { id: 'v29', char: 'स', transliteration: 'sa', category: 'vyanjan', soundMnemonic: 'Like "s" in sun', exampleWord: 'सेब', exampleTranslit: 'Seb', exampleMeaning: 'Apple', emoji: '🍎', audioPrompt: 'स, सेब' },
  { id: 'v30', char: 'ह', transliteration: 'ha', category: 'vyanjan', soundMnemonic: 'Like "h" in home', exampleWord: 'हाथी', exampleTranslit: 'Haathi', exampleMeaning: 'Elephant', emoji: '🐘', audioPrompt: 'ह, हाथी' },
];

// LEVEL 2: MATRAS & WORD BUILDING
export const MATRA_LIST: MatraItem[] = [
  { id: 'm1', matra: 'ा', name: 'Aa ki Matra', vowel: 'आ', symbol: 'T-bar', exampleWithKa: 'का', exampleTranslit: 'Kaa', meaning: 'ka + aa', sampleWord: 'कान', sampleWordTranslit: 'Kaan', sampleWordMeaning: 'Ear', emoji: '👂' },
  { id: 'm2', matra: 'ि', name: 'Chhoti I ki Matra', vowel: 'इ', symbol: 'Left hook', exampleWithKa: 'कि', exampleTranslit: 'Ki', meaning: 'ka + i', sampleWord: 'किताब', sampleWordTranslit: 'Kitaab', sampleWordMeaning: 'Book', emoji: '📖' },
  { id: 'm3', matra: 'ी', name: 'Badi Ee ki Matra', vowel: 'ई', symbol: 'Right hook', exampleWithKa: 'की', exampleTranslit: 'Kee', meaning: 'ka + ee', sampleWord: 'कील', sampleWordTranslit: 'Keel', sampleWordMeaning: 'Nail', emoji: '📌' },
  { id: 'm4', matra: 'ु', name: 'Chhota U ki Matra', vowel: 'उ', symbol: 'Bottom left curl', exampleWithKa: 'कु', exampleTranslit: 'Ku', meaning: 'ka + u', sampleWord: 'कुत्ता', sampleWordTranslit: 'Kutta', sampleWordMeaning: 'Dog', emoji: '🐶' },
  { id: 'm5', matra: 'ू', name: 'Bada Oo ki Matra', vowel: 'ऊ', symbol: 'Bottom right curl', exampleWithKa: 'कू', exampleTranslit: 'Koo', meaning: 'ka + oo', sampleWord: 'कूदना', sampleWordTranslit: 'Koodna', sampleWordMeaning: 'To Jump', emoji: '🦘' },
  { id: 'm6', matra: 'े', name: 'E ki Matra', vowel: 'ए', symbol: 'Single flag on top', exampleWithKa: 'के', exampleTranslit: 'Ke', meaning: 'ka + e', sampleWord: 'केला', sampleWordTranslit: 'Kela', sampleWordMeaning: 'Banana', emoji: '🍌' },
  { id: 'm7', matra: 'ै', name: 'Ai ki Matra', vowel: 'ऐ', symbol: 'Double flag on top', exampleWithKa: 'कै', exampleTranslit: 'Kai', meaning: 'ka + ai', sampleWord: 'कैमरा', sampleWordTranslit: 'Camera', sampleWordMeaning: 'Camera', emoji: '📷' },
  { id: 'm8', matra: 'ो', name: 'O ki Matra', vowel: 'ओ', symbol: 'T-bar + flag', exampleWithKa: 'को', exampleTranslit: 'Ko', meaning: 'ka + o', sampleWord: 'कोयल', sampleWordTranslit: 'Koyal', sampleWordMeaning: 'Cuckoo bird', emoji: '🐦' },
  { id: 'm9', matra: 'ौ', name: 'Au ki Matra', vowel: 'औ', symbol: 'T-bar + 2 flags', exampleWithKa: 'कौ', exampleTranslit: 'Kau', meaning: 'ka + au', sampleWord: 'कौआ', sampleWordTranslit: 'Kauva', sampleWordMeaning: 'Crow', emoji: '🦅' },
  { id: 'm10', matra: 'ं', name: 'Anusvara (Bindi)', vowel: 'अं', symbol: 'Top dot', exampleWithKa: 'कं', exampleTranslit: 'Kang', meaning: 'ka + nasal n', sampleWord: 'कंगन', sampleWordTranslit: 'Kangan', sampleWordMeaning: 'Bangle', emoji: '✨' },
];

export const TWO_LETTER_WORDS: WordItem[] = [
  { id: 'w1', hindi: 'घर', transliteration: 'Ghar', english: 'Home / House', category: 'two_letter', emoji: '🏠', breakdown: ['घ', 'र'] },
  { id: 'w2', hindi: 'जल', transliteration: 'Jal', english: 'Water', category: 'two_letter', emoji: '💧', breakdown: ['ज', 'ल'] },
  { id: 'w3', hindi: 'फल', transliteration: 'Phal', english: 'Fruit', category: 'two_letter', emoji: '🍎', breakdown: ['फ', 'ल'] },
  { id: 'w4', hindi: 'बस', transliteration: 'Bas', english: 'Bus', category: 'two_letter', emoji: '🚌', breakdown: ['ब', 'स'] },
  { id: 'w5', hindi: 'खत', transliteration: 'Khat', english: 'Letter', category: 'two_letter', emoji: '✉️', breakdown: ['ख', 'त'] },
  { id: 'w6', hindi: 'धन', transliteration: 'Dhan', english: 'Wealth / Money', category: 'two_letter', emoji: '💰', breakdown: ['ध', 'न'] },
  { id: 'w7', hindi: 'नल', transliteration: 'Nal', english: 'Tap', category: 'two_letter', emoji: '🚰', breakdown: ['न', 'ल'] },
  { id: 'w8', hindi: 'दस', transliteration: 'Das', english: 'Ten (10)', category: 'two_letter', emoji: '🔟', breakdown: ['द', 'स'] },
  { id: 'w9', hindi: 'कमल', transliteration: 'Kamal', english: 'Lotus', category: 'three_letter', emoji: '🪷', breakdown: ['क', 'म', 'ल'] },
  { id: 'w10', hindi: 'कलम', transliteration: 'Kalam', english: 'Pen', category: 'three_letter', emoji: '🖊️', breakdown: ['क', 'ल', 'म'] },
  { id: 'w11', hindi: 'सड़क', transliteration: 'Sadak', english: 'Road', category: 'three_letter', emoji: '🛣️', breakdown: ['स', 'ड़', 'क'] },
  { id: 'w12', hindi: 'महल', transliteration: 'Mahal', english: 'Palace', category: 'three_letter', emoji: '🏰', breakdown: ['म', 'ह', 'ल'] },
];

// LEVEL 3: VOCABULARY BY CATEGORIES
export const VOCABULARY_LIST: WordItem[] = [
  // Numbers 1-10
  { id: 'n1', hindi: 'एक (१)', transliteration: 'Ek (1)', english: 'One', category: 'numbers', emoji: '1️⃣' },
  { id: 'n2', hindi: 'दो (२)', transliteration: 'Do (2)', english: 'Two', category: 'numbers', emoji: '2️⃣' },
  { id: 'n3', hindi: 'तीन (३)', transliteration: 'Teen (3)', english: 'Three', category: 'numbers', emoji: '3️⃣' },
  { id: 'n4', hindi: 'चार (४)', transliteration: 'Chaar (4)', english: 'Four', category: 'numbers', emoji: '4️⃣' },
  { id: 'n5', hindi: 'पाँच (५)', transliteration: 'Paanch (5)', english: 'Five', category: 'numbers', emoji: '5️⃣' },
  { id: 'n6', hindi: 'छह (६)', transliteration: 'Chhah (6)', english: 'Six', category: 'numbers', emoji: '6️⃣' },
  { id: 'n7', hindi: 'सात (७)', transliteration: 'Saat (7)', english: 'Seven', category: 'numbers', emoji: '7️⃣' },
  { id: 'n8', hindi: 'आठ (८)', transliteration: 'Aath (8)', english: 'Eight', category: 'numbers', emoji: '8️⃣' },
  { id: 'n9', hindi: 'नौ (९)', transliteration: 'Nau (9)', english: 'Nine', category: 'numbers', emoji: '9️⃣' },
  { id: 'n10', hindi: 'दस (१०)', transliteration: 'Das (10)', english: 'Ten', category: 'numbers', emoji: '🔟' },

  // Colors
  { id: 'c1', hindi: 'लाल', transliteration: 'Laal', english: 'Red', category: 'colors', emoji: '🔴' },
  { id: 'c2', hindi: 'नीला', transliteration: 'Neela', english: 'Blue', category: 'colors', emoji: '🔵' },
  { id: 'c3', hindi: 'पीला', transliteration: 'Peela', english: 'Yellow', category: 'colors', emoji: '🟡' },
  { id: 'c4', hindi: 'हरा', transliteration: 'Hara', english: 'Green', category: 'colors', emoji: '🟢' },
  { id: 'c5', hindi: 'सफ़ेद', transliteration: 'Safed', english: 'White', category: 'colors', emoji: '⚪' },
  { id: 'c6', hindi: 'काला', transliteration: 'Kaala', english: 'Black', category: 'colors', emoji: '⚫' },
  { id: 'c7', hindi: 'नारंगी', transliteration: 'Naarangi', english: 'Orange', category: 'colors', emoji: '🟠' },
  { id: 'c8', hindi: 'गुलाबी', transliteration: 'Gulaabi', english: 'Pink', category: 'colors', emoji: '🌸' },

  // Animals
  { id: 'a1', hindi: 'शेर', transliteration: 'Sher', english: 'Lion', category: 'animals', emoji: '🦁' },
  { id: 'a2', hindi: 'हाथी', transliteration: 'Haathi', english: 'Elephant', category: 'animals', emoji: '🐘' },
  { id: 'a3', hindi: 'बंदर', transliteration: 'Bandar', english: 'Monkey', category: 'animals', emoji: '🐒' },
  { id: 'a4', hindi: 'गाय', transliteration: 'Gaay', english: 'Cow', category: 'animals', emoji: '🐄' },
  { id: 'a5', hindi: 'बिल्ली', transliteration: 'Billi', english: 'Cat', category: 'animals', emoji: '🐱' },
  { id: 'a6', hindi: 'कुत्ता', transliteration: 'Kutta', english: 'Dog', category: 'animals', emoji: '🐶' },
  { id: 'a7', hindi: 'घोड़ा', transliteration: 'Ghoda', english: 'Horse', category: 'animals', emoji: '🐎' },

  // Family
  { id: 'f1', hindi: 'माँ', transliteration: 'Maa', english: 'Mother', category: 'family', emoji: '🤱' },
  { id: 'f2', hindi: 'पिताजी', transliteration: 'Pitaji', english: 'Father', category: 'family', emoji: '👨' },
  { id: 'f3', hindi: 'भाई', transliteration: 'Bhai', english: 'Brother', category: 'family', emoji: '👦' },
  { id: 'f4', hindi: 'बहन', transliteration: 'Bahan', english: 'Sister', category: 'family', emoji: '👧' },
  { id: 'f5', hindi: 'दोस्त', transliteration: 'Dost', english: 'Friend', category: 'family', emoji: '🤝' },

  // Fruits
  { id: 'fr1', hindi: 'आम', transliteration: 'Aam', english: 'Mango', category: 'fruits', emoji: '🥭' },
  { id: 'fr2', hindi: 'सेब', transliteration: 'Seb', english: 'Apple', category: 'fruits', emoji: '🍎' },
  { id: 'fr3', hindi: 'केला', transliteration: 'Kela', english: 'Banana', category: 'fruits', emoji: '🍌' },
  { id: 'fr4', hindi: 'अंगूर', transliteration: 'Angoor', english: 'Grapes', category: 'fruits', emoji: '🍇' },
  { id: 'fr5', hindi: 'संतरा', transliteration: 'Santara', english: 'Orange (Fruit)', category: 'fruits', emoji: '🍊' },
];

// LEVEL 4: DAILY PHRASES & CONVERSATIONS
export const PHRASES_LIST: PhraseItem[] = [
  { id: 'p1', hindi: 'नमस्ते!', transliteration: 'Namaste!', english: 'Hello / Greetings!', category: 'greetings', tip: 'Universal respectful Indian greeting used at any time of day.' },
  { id: 'p2', hindi: 'आप कैसे हैं?', transliteration: 'Aap kaise hain?', english: 'How are you? (Polite / Respectful)', category: 'greetings', tip: '"Aap" is the respectful form of "You".' },
  { id: 'p3', hindi: 'मैं ठीक हूँ, धन्यवाद।', transliteration: 'Main theek hoon, dhanyavaad.', english: 'I am fine, thank you.', category: 'greetings' },
  { id: 'p4', hindi: 'आपका नाम क्या है?', transliteration: 'Aapka naam kya hai?', english: 'What is your name?', category: 'greetings' },
  { id: 'p5', hindi: 'मेरा नाम ... है।', transliteration: 'Mera naam ... hai.', english: 'My name is ...', category: 'greetings', tip: 'Fill in your name before "hai"!' },
  { id: 'p6', hindi: 'सुप्रभात!', transliteration: 'Suprabhat!', english: 'Good Morning!', category: 'greetings' },
  { id: 'p7', hindi: 'शुभ रात्रि!', transliteration: 'Shubh Raatri!', english: 'Good Night!', category: 'greetings' },
  { id: 'p8', hindi: 'धन्यवाद!', transliteration: 'Dhanyavaad!', english: 'Thank you very much!', category: 'daily' },
  { id: 'p9', hindi: 'कृपया मेरी मदद करें।', transliteration: 'Kripya meri madad karein.', english: 'Please help me.', category: 'classroom' },
  { id: 'p10', hindi: 'यह क्या है?', transliteration: 'Yeh kya hai?', english: 'What is this?', category: 'classroom', tip: 'Great phrase whenever you point to something in class!' },
  { id: 'p11', hindi: 'मुझे पानी पीना है।', transliteration: 'Mujhe paani peena hai.', english: 'I want to drink water.', category: 'classroom' },
  { id: 'p12', hindi: 'क्या मैं अंदर आ सकता हूँ?', transliteration: 'Kya main andar aa sakta hoon?', english: 'May I come in, teacher?', category: 'classroom' },
  { id: 'p13', hindi: 'फिर मिलेंगे!', transliteration: 'Phir milenge!', english: 'See you again / Bye!', category: 'daily' },
  { id: 'p14', hindi: 'माफ़ कीजिए।', transliteration: 'Maaf kijiye.', english: 'Excuse me / Sorry.', category: 'daily' },
  { id: 'p15', hindi: 'बहुत अच्छा!', transliteration: 'Bahut achha!', english: 'Very good! / Awesome!', category: 'feelings' },
  { id: 'p16', hindi: 'मुझे हिंदी पसंद है।', transliteration: 'Mujhe Hindi pasand hai.', english: 'I like Hindi!', category: 'feelings' },
];

// LEVEL 5: SENTENCE BUILDER PUZZLES
export const SENTENCE_PUZZLES: SentenceItem[] = [
  {
    id: 'sb1',
    hindi: 'यह एक सेब है',
    transliteration: 'Yeh ek seb hai',
    english: 'This is an apple',
    words: ['यह', 'एक', 'सेब', 'है'],
    grammarTip: 'Hindi sentence structure is Subject + Object + Verb (SOV). "Hai" (is) comes at the end.'
  },
  {
    id: 'sb2',
    hindi: 'मैं स्कूल जाता हूँ',
    transliteration: 'Main school jaata hoon',
    english: 'I go to school',
    words: ['मैं', 'स्कूल', 'जाता', 'हूँ'],
    grammarTip: '"Main" (I) always pairs with "hoon" (am) at the end.'
  },
  {
    id: 'sb3',
    hindi: 'सूरज चमक रहा है',
    transliteration: 'Sooraj chamak raha hai',
    english: 'The sun is shining',
    words: ['सूरज', 'चमक', 'रहा', 'है'],
    grammarTip: '"Raha hai" indicates continuous present action (doing right now).'
  },
  {
    id: 'sb4',
    hindi: 'भारत हमारा देश है',
    transliteration: 'Bharat hamara desh hai',
    english: 'India is our country',
    words: ['भारत', 'हमारा', 'देश', 'है'],
    grammarTip: '"Hamara" means "our", modifying the noun "desh" (country).'
  },
  {
    id: 'sb5',
    hindi: 'मुझे आम बहुत पसंद है',
    transliteration: 'Mujhe aam bahut pasand hai',
    english: 'I like mangoes very much',
    words: ['मुझे', 'आम', 'बहुत', 'पसंद', 'है'],
    grammarTip: 'Use "Mujhe ... pasand hai" to express liking anything in Hindi!'
  },
  {
    id: 'sb6',
    hindi: 'पानी ठंडा और मीठा है',
    transliteration: 'Paani thanda aur meetha hai',
    english: 'The water is cold and sweet',
    words: ['पानी', 'ठंडा', 'और', 'मीठा', 'है'],
    grammarTip: '"Aur" means "and" in Hindi.'
  },
];

// LEVEL 6: COMPREHENSIVE QUIZ QUESTIONS
export const ARCADE_QUIZZES: QuizQuestion[] = [
  {
    id: 'q1',
    type: 'audio_to_text',
    prompt: 'Listen to the sound and choose the correct Hindi letter:',
    audioText: 'क',
    correctAnswer: 'क',
    options: ['ख', 'क', 'ग', 'च'],
    explanation: '"क" (ka) is the first consonant of the Hindi alphabet.',
    emoji: '🎧'
  },
  {
    id: 'q2',
    type: 'picture_match',
    prompt: 'Which Hindi word represents this animal? 🐘',
    correctAnswer: 'हाथी (Haathi)',
    options: ['शेर (Sher)', 'हाथी (Haathi)', 'घोड़ा (Ghoda)', 'बंदर (Bandar)'],
    explanation: 'हाथी (Haathi) means Elephant in Hindi!',
    emoji: '🐘'
  },
  {
    id: 'q3',
    type: 'text_to_meaning',
    prompt: 'What does the word "घर" (Ghar) mean in English?',
    audioText: 'घर',
    correctAnswer: 'Home / House',
    options: ['Water', 'Home / House', 'Fruit', 'Pen'],
    explanation: 'घ + र = घर, which means Home or House.',
    emoji: '🏠'
  },
  {
    id: 'q4',
    type: 'audio_to_text',
    prompt: 'Listen to the word and pick the correct spelling:',
    audioText: 'किताब',
    correctAnswer: 'किताब',
    options: ['कुताब', 'किताब', 'केताब', 'कताब'],
    explanation: 'किताब (Kitaab) means book in Hindi, written with Chhoti-i matra.',
    emoji: '📖'
  },
  {
    id: 'q5',
    type: 'picture_match',
    prompt: 'What is the Hindi word for the color Red 🔴?',
    audioText: 'लाल',
    correctAnswer: 'लाल (Laal)',
    options: ['नीला (Neela)', 'पीला (Peela)', 'लाल (Laal)', 'हरा (Hara)'],
    explanation: 'लाल (Laal) means Red in Hindi.',
    emoji: '🔴'
  },
  {
    id: 'q6',
    type: 'fill_blank',
    prompt: 'Complete the sentence: "मेरा नाम राहुल _____"',
    audioText: 'मेरा नाम राहुल है',
    correctAnswer: 'है (hai)',
    options: ['है (hai)', 'हूँ (hoon)', 'हो (ho)', 'था (tha)'],
    explanation: 'Third person singular takes "है" (hai) at the end.',
    emoji: '✏️'
  },
  {
    id: 'q7',
    type: 'audio_to_text',
    prompt: 'Listen to the greeting and choose the English meaning:',
    audioText: 'धन्यवाद',
    correctAnswer: 'Thank you',
    options: ['Hello', 'Good Morning', 'Thank you', 'Goodbye'],
    explanation: 'धन्यवाद (Dhanyavaad) means "Thank you" in Hindi.',
    emoji: '🙏'
  },
  {
    id: 'q8',
    type: 'picture_match',
    prompt: 'What number is ५ in English?',
    audioText: 'पाँच',
    correctAnswer: '5 (Five - Paanch)',
    options: ['3 (Three)', '5 (Five - Paanch)', '7 (Seven)', '9 (Nine)'],
    explanation: 'Hindi numeral ५ is 5 (पाँच / Paanch).',
    emoji: '5️⃣'
  },
  {
    id: 'q9',
    type: 'audio_to_text',
    prompt: 'Listen to the word and identify the vowel sound:',
    audioText: 'आम',
    correctAnswer: 'आ (aa)',
    options: ['अ (a)', 'आ (aa)', 'इ (i)', 'ओ (o)'],
    explanation: 'आम starts with the long vowel "आ" (aa).',
    emoji: '🥭'
  },
  {
    id: 'q10',
    type: 'text_to_meaning',
    prompt: 'How do you say "Water" in pure Hindi?',
    audioText: 'जल',
    correctAnswer: 'जल (Jal)',
    options: ['फल (Phal)', 'जल (Jal)', 'नल (Nal)', 'कल (Kal)'],
    explanation: 'जल (Jal) or पानी (Paani) means Water.',
    emoji: '💧'
  }
];

export const HINDI_PRAISE = [
  'शाबाश! (Excellent!) 🌟',
  'बहुत बढ़िया! (Very Good!) 🎉',
  'शानदार! (Splendid!) 🚀',
  'कमाल कर दिया! (Amazing Job!) 🥳',
  'अद्भुत! (Wonderful!) 🏆',
];
