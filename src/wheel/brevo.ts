import { Prize } from './wheelData';

// TODO: switch SENDER_EMAIL to 'info@hoaxcoffee.com' once it is verified in Brevo
const SENDER_EMAIL = 'magyi.zsolt90@gmail.com';
const SENDER_NAME  = 'HOAX coffee';
const BREVO_URL    = 'https://api.brevo.com/v3/smtp/email';

// ---------------------------------------------------------------------------
// Email HTML builder
// ---------------------------------------------------------------------------

function buildHtml(prize: Prize): string {
  const darkBg   = '#0a0000';
  const cardBg   = '#1a0a0a';
  const gold     = '#FFD700';
  const muted    = 'rgba(255,255,255,0.55)';
  const dimmed   = 'rgba(255,255,255,0.28)';
  const border   = 'rgba(212,175,55,0.35)';

  let icon    = '🎉';
  let title   = 'Nyertél!';
  let subtitle = '';
  let body    = '';

  if (prize.isNoWin) {
    icon     = '😔';
    title    = 'Sajnos ezúttal nem nyertél…';
    subtitle = 'De ne csüggedj – legközelebb több szerencsét kívánunk!';
    body     = '';
  } else if (prize.isJackpot) {
    icon     = '🏆';
    title    = 'JACKPOT!';
    subtitle = 'Hihetetlen! Részt veszel a főnyeremény sorsolásán!';
    body     = `
      <p style="color:${muted};font-size:15px;margin:0 0 20px;line-height:1.6;">
        ${prize.description}
      </p>
      <p style="color:${dimmed};font-size:12px;margin:0;line-height:1.6;">
        A sorsolás időpontjáról külön értesítünk.
      </p>`;
  } else {
    subtitle = prize.description;
    const websiteBlock = prize.website
      ? `<p style="color:${dimmed};font-size:12px;margin:16px 0 0;line-height:1.6;">
           A kódot ezen a
           <a href="${prize.website}" style="color:${gold};text-decoration:underline;"
              target="_blank" rel="noreferrer">webshopon</a>
           tudod beváltani.
         </p>`
      : `<p style="color:${dimmed};font-size:12px;margin:16px 0 0;">
           A kódot az előfizetésnél tudod beváltani.
         </p>`;

    body = `
      <div style="background:rgba(255,255,255,0.05);border:1px solid ${border};
                  border-radius:12px;padding:16px 20px;margin:20px 0 0;">
        <p style="color:${dimmed};font-size:11px;text-transform:uppercase;
                  letter-spacing:0.1em;margin:0 0 8px;">Promo kód</p>
        <p style="color:${gold};font-size:22px;font-weight:700;
                  letter-spacing:0.1em;margin:0;">${prize.promoCode}</p>
      </div>
      ${websiteBlock}`;
  }

  return `<!DOCTYPE html>
<html lang="hu">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1.0">
  <title>HOAX Lucky Wheel</title>
</head>
<body style="margin:0;padding:0;background:${darkBg};
             font-family:'Helvetica Neue',Arial,sans-serif;-webkit-font-smoothing:antialiased;">

  <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
    <tr>
      <td align="center" style="padding:32px 16px;">

        <!-- Card -->
        <table width="100%" cellpadding="0" cellspacing="0" role="presentation"
               style="max-width:480px;background:${cardBg};border:1px solid ${border};
                      border-radius:16px;overflow:hidden;">
          <tr>
            <td style="padding:36px 32px 32px;text-align:center;">

              <!-- Icon -->
              <div style="font-size:52px;line-height:1;margin-bottom:16px;">${icon}</div>

              <!-- Title -->
              <h1 style="color:${gold};font-size:28px;font-weight:700;margin:0 0 10px;
                         letter-spacing:0.04em;line-height:1.2;">${title}</h1>

              <!-- Subtitle -->
              <p style="color:${muted};font-size:15px;margin:0;line-height:1.6;">
                ${subtitle}
              </p>

              <!-- Dynamic body (promo / jackpot / empty) -->
              ${body}

              <!-- Divider -->
              <hr style="border:none;border-top:1px solid rgba(255,255,255,0.08);
                         margin:28px 0 20px;">

              <!-- Disclaimer -->
              <p style="color:${dimmed};font-size:11px;margin:0;line-height:1.7;">
                Egyenként 1x lehet játszani. A kuponkódok 1x válthatók be,<br>
                2026. december 31-ig érvényesek.
              </p>

            </td>
          </tr>

          <!-- Footer strip -->
          <tr>
            <td style="background:rgba(0,0,0,0.35);padding:14px 32px;text-align:center;">
              <p style="color:rgba(255,255,255,0.2);font-size:11px;margin:0;">
                © 2025 HOAX Coffee ·
                <a href="https://hoaxcoffee.com"
                   style="color:rgba(255,255,255,0.3);text-decoration:none;">
                  hoaxcoffee.com
                </a>
              </p>
            </td>
          </tr>
        </table>
        <!-- /Card -->

      </td>
    </tr>
  </table>

</body>
</html>`;
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * Sends a prize confirmation email via Brevo.
 * Returns true on success, false on any failure (caller shows modal as fallback).
 */
export async function sendPrizeEmail(toEmail: string, prize: Prize): Promise<boolean> {
  const apiKey = process.env.REACT_APP_BREVO_API_KEY;
  if (!apiKey) {
    console.warn('[Brevo] REACT_APP_BREVO_API_KEY is not set – skipping email send.');
    return false;
  }

  const subject = prize.isNoWin
    ? 'HOAX Lucky Wheel – Sajnos ezúttal nem nyertél'
    : prize.isJackpot
    ? '🏆 JACKPOT! – HOAX Lucky Wheel'
    : `🎉 Megnyerted: ${prize.label} – HOAX Lucky Wheel`;

  try {
    const res = await fetch(BREVO_URL, {
      method:  'POST',
      headers: {
        'api-key':      apiKey,
        'Content-Type': 'application/json',
        Accept:         'application/json',
      },
      body: JSON.stringify({
        sender:      { name: SENDER_NAME, email: SENDER_EMAIL },
        to:          [{ email: toEmail }],
        subject,
        htmlContent: buildHtml(prize),
      }),
    });

    if (!res.ok) {
      const text = await res.text().catch(() => '');
      console.error(`[Brevo] Send failed (${res.status}):`, text);
      return false;
    }

    return true;
  } catch (err) {
    console.error('[Brevo] Network error:', err);
    return false;
  }
}
