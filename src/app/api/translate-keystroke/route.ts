import { NextRequest, NextResponse } from 'next/server';
import { translateText, translateKey, detectLanguage } from '@/lib/keyboardTranslator';

/**
 * POST /api/translate-keystroke
 * 
 * Background API endpoint for Thai <-> English keystroke & text translation.
 * 
 * Body:
 * {
 *   "text": "l;ylfu",
 *   "mode": "auto" | "th2en" | "en2th",
 *   "key": "g" (optional single key)
 * }
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { text, mode = 'auto', key } = body;

    // Single key translation
    if (key && typeof key === 'string') {
      const translatedKey = translateKey(key);
      return NextResponse.json({
        success: true,
        type: 'key',
        original: key,
        translated: translatedKey,
      });
    }

    // Full text translation
    if (typeof text !== 'string') {
      return NextResponse.json(
        { success: false, error: 'Field "text" must be a string' },
        { status: 400 }
      );
    }

    const detected = detectLanguage(text);
    const translated = translateText(text, mode);

    return NextResponse.json({
      success: true,
      type: 'text',
      original: text,
      detectedLanguage: detected,
      modeUsed: mode,
      translated,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const text = searchParams.get('text') || '';
  const mode = (searchParams.get('mode') as 'auto' | 'th2en' | 'en2th') || 'auto';

  if (!text) {
    return NextResponse.json({
      status: 'online',
      service: 'Thai <-> English Background Keystroke Translator API',
      standard: 'TIS 820-2531 / US QWERTY',
      usage: 'POST /api/translate-keystroke with { text: "l;ylfu" } or GET ?text=l;ylfu',
    });
  }

  const translated = translateText(text, mode);
  const detected = detectLanguage(text);

  return NextResponse.json({
    success: true,
    original: text,
    detectedLanguage: detected,
    translated,
  });
}
