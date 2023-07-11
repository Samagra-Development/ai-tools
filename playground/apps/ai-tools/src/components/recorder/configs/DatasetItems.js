export const ModelTask = [
  { value: "status-check", label: "Status Check"},
  { value: 'sts', label: 'STS' },
  { value: "translation", label: "Translation" },
  { value: "asr", label: "ASR" },
  { value: "tts", label: "TTS" },
  { value: "ocr", label: "OCR" },
  { value: "ner", label: "NER" },
  { value: "transliteration", label: "Transliteration" },
  { value: "txt-lang-detection", label: "Language Detection" },
];

export const BenchmarkModelTask = [
  { value: "translation", label: "Translation" },
  { value: "asr", label: "ASR" },
  { value: "tts", label: "TTS" },
  { value: "ocr", label: "OCR" },
  { value: "ner", label: "NER" },
  { value: "transliteration", label: "Transliteration" },
  { value: "txt-lang-detection", label: "Language Detection" },
];

export const DatasetItems = [
  { value: "parallel-corpus", label: "Parallel Dataset" },
  { value: "monolingual-corpus", label: "Monolingual Dataset" },
  { value: "asr-corpus", label: "ASR Dataset" },
  { value: "ocr-corpus", label: "OCR Dataset" },
  { value: "asr-unlabeled-corpus", label: "ASR Unlabeled Dataset" },
  { value: "tts-corpus", label: "TTS Dataset" },
  { value: "transliteration-corpus", label: "Transliteration Dataset" },
  { value: "glossary-corpus", label: "Glossary Dataset" },
];

export const DatasetReadymade = [
  { value: "parallel-corpus", label: "Parallel" },
  { value: "monolingual-corpus", label: "Monolingual" },
  { value: "asr-corpus", label: "ASR" },
  { value: "ocr-corpus", label: "OCR" },
  { value: "asr-unlabeled-corpus", label: "ASR Unlabeled" },
  { value: "transliteration", label: "Transliteration" },
];
export const Language = [
  { value: "as", label: "Assamese" },
  { value: "bn", label: "Bengali" },
  { value: "en", label: "English" },
  { value: "gu", label: "Gujarati" },
  { value: "hi", label: "Hindi" },
  { value: "kn", label: "Kannada" },
  { value: "ml", label: "Malayalam" },
  { value: "mr", label: "Marathi" },
  { value: "or", label: "Odia" },
  { value: "pa", label: "Punjabi" },
  { value: "ta", label: "Tamil" },
  { value: "te", label: "Telugu" },
  { value: "ur", label: "Urdu" },
  { value: "ne", label: "Nepali" },
  { value: "brx", label: "Bodo" },
  { value: "doi", label: "Dogri" },
  { value: "kok", label: "Konkani" },
  { value: "mai", label: "Maithili" },
  { value: "mni", label: "Manipuri" },
  { value: "sat", label: "Santali" },
  { value: "lus", label: "Lushai" },
  { value: "njz", label: "Nishi" },
  { value: "pnr", label: "Panim" },
  { value: "grt", label: "Garo" },
  { value: "ks", label: "Kashmiri" },
  { value: "sd", label: "Sindhi" },
  { value: "si", label: "Sinhalese" },
  { value: "kha", label: "Khasi" },
  { value: "sa", label: "Sanskrit" },
  { value: "bho", label: "Bhojpuri" },
  { value: "raj", label: "Rajasthani" },
  { value: "awa", label: "Awadhi" },
  { value: "hne", label: "Chhattisgarhi" },
  { value: "mag", label: "Magahi" },
  { value: "mixed", label: "Mixed" },
  { value: "unknown", label: "Unknown Language" },
];

export const FilterBy = {
  collectionMethod: [
    {
      value: "auto-aligned",
      label: "Auto Aligned",
    },
    {
      value: "algorithm-auto-aligned",
      label: "Algorithm Auto Aligned",
    },
    {
      value: "algorithm-back-translated",
      label: "Algorithm Back Translated",
    },
    {
      value: "crowd-sourced",
      label: "Crowd Sourced",
    },
    {
      value: "human-validated",
      label: "Human Validated",
    },

    {
      value: "manual-human-translated",
      label: "Manual Human Translated",
    },

    {
      value: "phone-recording",
      label: "Phone Recording",
    },

    {
      value: "web-scrapping-machine-readable",
      label: "Web Scrapping Machine Readable",
    },
    {
      value: "web-scrapping-ocr",
      label: "Web Scrapping Ocr",
    },
  ],
  
  domain: [
    {
      value: "agriculture",
      label: "Agriculture",
    },
    {
      value: "automobile",
      label: "Automobile",
    },
    {
      value: "education",
      label: "Education",
    },
    {
      value: "general",
      label: "General",
    },
    {
      value: "healthcare",
      label: "Healthcare",
    },
    {
      value: "legal",
      label: "Legal",
    },
    {
      value: "news",
      label: "News",
    },
    {
      value: "tourism",
      label: "Tourism",
    },
    {
      value:"parliamentary",
      label:"Parliamentary"
    },
    {
      value: "government-press-release",
      label: "Government Press Release",
    },
    {
      value: "financial",
      label: "Financial",
    },
    {
      value: "movies",
      label: "Movies",
    },
    {
      value: "subtitles",
      label: "Subtitles",
    },
    {
      value: "sports",
      label: "Sports",
    },
    {
      value: "technology",
      label: "Technology",
    },
    {
      value: "lifestyle",
      label: "Lifestyle",
    },
    {
      value: "entertainment",
      label: "Entertainment",
    },
    {
      value: "art-and-culture",
      label: "Art and Culture",
    },
    {
      value: "economy",
      label: "Economy",
    },
    {
      value: "history",
      label: "History",
    },
    {
      value: "philosophy",
      label: "Philosophy",
    },
    {
      value: "religion",
      label: "Religion",
    },
    {
      value: "national-security-and-defence",
      label: "National Security and Defence",
    },
    {
      value: "literature",
      label: "Literature",
    },
    {
      value: "geography",
      label: "Geography",
    },
    {
      value:"websites",
      label:"Websites"
    },
    {
      value:"science",
      label:"Science"
    },
    {
     value: "stories",
     label:"Stories"
    },
    {
      value: "wikipedia",
      label: "Wikipedia"
    }
  ],
};

export const vakyanshLanguage = [
  { label: "Hindi", value: "hi" },
  { label: "English", value: "en" },
  { label: "Tamil", value: "ta" },
  { label: "Telugu", value: "te" },
  { label: "Gujarati", value: "gu" },
  { label: "Kannada", value: "kn" },
  { label: "Marathi", value: "mr" },
  { label: "Odia", value: "or" },
  { label: "Urdu", value: "ur" },
  { label: "Bengali", value: "bn" },
  { label: "Nepali", value: "ne" },
  { label: "Sanskrit", value: "sa" },
  { label: "Maithili", value: "mai" },
  { label: "Punjabi", value: "pa" },
  { label: "Dogri", value: "doi" },
  { label: "Rajasthani", value: "raj" },
  { label: "Malayalam", value: "ml" },
  { label: "Bhojpuri", value: "bho" },
  { label: "Assamese", value: "as" },
];
export default DatasetItems;
