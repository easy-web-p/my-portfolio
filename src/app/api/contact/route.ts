import { NextRequest, NextResponse } from 'next/server';
import { contactFormSchema } from '@/lib/validation';
import { sendContactEmail } from '@/lib/email';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // 1. Zod Validation
    const validationResult = contactFormSchema.safeParse(body);
    if (!validationResult.success) {
      const errorMsg = validationResult.error.issues?.[0]?.message || 'Invalid form data';
      return NextResponse.json(
        { success: false, error: errorMsg },
        { status: 400 }
      );
    }

    // 2. Email Delivery / Handling
    const emailResult = await sendContactEmail(validationResult.data);

    if (!emailResult.success) {
      return NextResponse.json(
        { success: false, error: 'Failed to send message. Please try again later.' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Inquiry received successfully!',
        id: emailResult.messageId,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Contact API Error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error processing inquiry.' },
      { status: 500 }
    );
  }
}
