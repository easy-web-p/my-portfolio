/**
 * Thai <-> English Kedmanee / US-QWERTY Keyboard Keystroke Translator
 * 
 * Provides:
 * 1. Single keystroke translation (KeyboardEvent / key character)
 * 2. String translation with automatic language detection
 * 3. Event listener / DOM helper to auto-translate keystrokes in <input> / <textarea>
 * 4. React hook helper for web apps
 */

// Mapping of US QWERTY keyboard characters to Thai Kedmanee
export const EN_TO_TH_MAP: Record<string, string> = {
  // Row 0 (Numbers & Symbols)
  '`': '_',
  '~': '%',
  '1': 'ๅ',
  '!': '+',
  '2': '/',
  '@': '๑',
  '3': '-',
  '#': '๒',
  '4': 'ภ',
  '$': '๓',
  '5': 'ถ',
  '%': '๔',
  '6': 'ุ',
  '^': 'ู',
  '7': 'ึ',
  '&': '฿',
  '8': 'ค',
  '*': '๕',
  '9': 'ต',
  '(': '๖',
  '0': 'จ',
  ')': '๗',
  '-': 'ข',
  '_': '๘',
  '=': 'ช',
  '+': '๙',

  // Row 1 (QWERTY)
  'q': 'ๆ',
  'Q': '๐',
  'w': 'ไ',
  'W': '"',
  'e': 'ำ',
  'E': 'ฎ',
  'r': 'พ',
  'R': 'ฑ',
  't': 'ะ',
  'T': 'ธ',
  'y': 'ั',
  'Y': 'ํ',
  'u': 'ี',
  'U': '๊',
  'i': 'ร',
  'I': 'ณ',
  'o': 'น',
  'O': 'ฯ',
  'p': 'ย',
  'P': 'ญ',
  '[': 'บ',
  '{': 'ฐ',
  ']': 'ล',
  '}': ',',
  '\\': 'ฃ',
  '|': 'ฅ',

  // Row 2 (ASDF)
  'a': 'ฟ',
  'A': 'ฤ',
  's': 'ห',
  'S': 'ฆ',
  'd': 'ก',
  'D': 'ฏ',
  'f': 'ด',
  'F': 'โ',
  'g': 'เ',
  'G': 'ฌ',
  'h': '้',
  'H': '็',
  'j': '่',
  'J': '๋',
  'k': 'า',
  'K': 'ษ',
  'l': 'ส',
  'L': 'ศ',
  ';': 'ว',
  ':': 'ซ',
  "'": 'ง',
  '"': '.',

  // Row 3 (ZXCV)
  'z': 'ผ',
  'Z': '(',
  'x': 'ป',
  'X': ')',
  'c': 'แ',
  'C': 'ฉ',
  'v': 'อ',
  'V': 'ฮ',
  'b': 'ิ',
  'B': 'ฺ',
  'n': 'ื',
  'N': '์',
  'm': 'ท',
  'M': '?',
  ',': 'ม',
  '<': 'ฒ',
  '.': 'ใ',
  '>': 'ฬ',
  '/': 'ฝ',
  '?': 'ฦ',
  ' ': ' ',
};

// Inverted mapping: Thai Kedmanee -> US QWERTY
export const TH_TO_EN_MAP: Record<string, string> = Object.entries(EN_TO_TH_MAP).reduce(
  (acc, [en, th]) => {
    // Avoid overwriting identical mapping if duplicate target exists
    if (!acc[th]) {
      acc[th] = en;
    }
    return acc;
  },
  {} as Record<string, string>
);

/**
 * Check if a character is within the Thai Unicode block (U+0E00 to U+0E7F)
 */
export function isThaiChar(char: string): boolean {
  if (!char) return false;
  const code = char.charCodeAt(0);
  return code >= 0x0e00 && code <= 0x0e7f;
}

/**
 * Detect predominant language in the given text
 */
export function detectLanguage(text: string): 'th' | 'en' | 'neutral' {
  let thCount = 0;
  let enCount = 0;

  for (const ch of text) {
    if (isThaiChar(ch)) {
      thCount++;
    } else if (/[a-zA-Z]/.test(ch)) {
      enCount++;
    }
  }

  if (thCount > enCount) return 'th';
  if (enCount > thCount) return 'en';
  return 'neutral';
}

/**
 * Translate a single character or keystroke.
 * Automatically converts Thai to English or English to Thai.
 */
export function translateKey(char: string): string {
  if (isThaiChar(char) || TH_TO_EN_MAP[char]) {
    return TH_TO_EN_MAP[char] || char;
  }
  if (EN_TO_TH_MAP[char]) {
    return EN_TO_TH_MAP[char];
  }
  return char;
}

/**
 * Translate an entire string between Thai and English.
 * @param text The input text to convert
 * @param mode 'auto' (detects majority language), 'th2en' (force Thai to English), or 'en2th' (force English to Thai)
 */
export function translateText(
  text: string,
  mode: 'auto' | 'th2en' | 'en2th' = 'auto'
): string {
  if (!text) return '';

  const targetMode =
    mode === 'auto'
      ? detectLanguage(text) === 'th'
        ? 'th2en'
        : 'en2th'
      : mode;

  const map = targetMode === 'th2en' ? TH_TO_EN_MAP : EN_TO_TH_MAP;

  return text
    .split('')
    .map((ch) => map[ch] ?? ch)
    .join('');
}

/**
 * Keystroke interceptor for keyboard events in DOM inputs / textareas.
 * Can be used with onKeyDown or onBeforeInput.
 * 
 * @example
 * inputElement.addEventListener('keydown', (e) => handleKeyStroke(e, inputElement));
 */
export function handleKeyStroke(
  event: KeyboardEvent,
  targetElement?: HTMLInputElement | HTMLTextAreaElement,
  options?: {
    enabled?: boolean;
    mode?: 'auto' | 'th2en' | 'en2th';
    onTranslate?: (translatedChar: string, originalChar: string) => void;
  }
): boolean {
  if (options?.enabled === false) return false;

  // Ignore navigation, modifier, and functional keys (Ctrl, Alt, Meta, Enter, Tab, etc.)
  if (
    event.ctrlKey ||
    event.altKey ||
    event.metaKey ||
    event.key.length > 1
  ) {
    return false;
  }

  const originalKey = event.key;
  const translatedChar =
    options?.mode === 'th2en'
      ? TH_TO_EN_MAP[originalKey] ?? originalKey
      : options?.mode === 'en2th'
      ? EN_TO_TH_MAP[originalKey] ?? originalKey
      : translateKey(originalKey);

  // If character was translated and differs from typed key
  if (translatedChar !== originalKey) {
    if (targetElement) {
      event.preventDefault();

      const start = targetElement.selectionStart ?? targetElement.value.length;
      const end = targetElement.selectionEnd ?? targetElement.value.length;
      const currentValue = targetElement.value;

      // Insert the translated character at cursor position
      const newValue =
        currentValue.substring(0, start) +
        translatedChar +
        currentValue.substring(end);

      targetElement.value = newValue;

      // Restore cursor position right after the inserted character
      const nextPos = start + translatedChar.length;
      targetElement.setSelectionRange(nextPos, nextPos);

      // Trigger standard input event so React / framework state updates
      targetElement.dispatchEvent(new Event('input', { bubbles: true }));
    }

    options?.onTranslate?.(translatedChar, originalKey);
    return true;
  }

  return false;
}

/**
 * Attach the keystroke translator to an input/textarea element.
 * Supports:
 * - Real-time character replacement on typing (realtime: true)
 * - Hotkey conversion of current field text (e.g. F2 or Alt+T)
 */
export function attachKeyboardTranslator(
  element: HTMLInputElement | HTMLTextAreaElement,
  options: {
    realtime?: boolean;
    mode?: 'auto' | 'th2en' | 'en2th';
    hotkey?: string; // e.g. 'F2', 'Alt+t'
  } = {}
) {
  const { realtime = true, mode = 'auto', hotkey = 'F2' } = options;

  const onKeyDown = (event: Event) => {
    const e = event as KeyboardEvent;
    // Check hotkey for retroactive text conversion
    if (hotkey && (e.key === hotkey || (hotkey === 'Alt+t' && e.altKey && e.key?.toLowerCase() === 't'))) {
      e.preventDefault();
      const current = element.value;
      element.value = translateText(current, mode);
      element.dispatchEvent(new Event('input', { bubbles: true }));
      return;
    }

    // Real-time per-character translation
    if (realtime) {
      handleKeyStroke(e, element, { mode });
    }
  };

  element.addEventListener('keydown', onKeyDown);

  // Return cleanup function
  return () => {
    element.removeEventListener('keydown', onKeyDown);
  };
}


