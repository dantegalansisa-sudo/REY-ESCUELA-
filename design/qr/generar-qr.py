"""Uso: python design/qr/generar-qr.py [URL] [texto-del-boton] [carpeta-salida]
(requiere: pip install segno pillow zxing-cpp)

Branded QR for REY Escuela de Chofer: rounded navy modules, gold-centred eyes, crown logo in the middle,
plus a print-ready card. Every output is decoded with zxing to prove it scans."""
import base64, io, os, sys
import segno
import zxingcpp
from PIL import Image, ImageDraw, ImageFont, ImageFilter

URL = sys.argv[1] if len(sys.argv) > 1 else 'https://reyescuelademanejo.com'
LABEL = sys.argv[2] if len(sys.argv) > 2 else 'reyescuelademanejo.com'
HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.abspath(os.path.join(HERE, '..', '..'))
OUT = sys.argv[3] if len(sys.argv) > 3 else HERE
os.makedirs(OUT, exist_ok=True)

NAVY, BLUE, GOLD, RED = (15, 27, 45), (30, 91, 216), (232, 169, 28), (215, 38, 43)
BG = (250, 250, 247)

qr = segno.make(URL, error='h', micro=False)
matrix = [list(r) for r in qr.matrix]
N = len(matrix)
QUIET = 4
M = 64  # px per module (supersampled, downscaled at the end)
SIZE = (N + 2 * QUIET) * M

# centre logo window (in modules) — kept well under the 30 % that level H can recover
LW, LH = 9, 7
lx0, ly0 = (N - LW) // 2, (N - LH) // 2


def in_finder(r, c):
    return (r < 7 and c < 7) or (r < 7 and c >= N - 7) or (r >= N - 7 and c < 7)


def in_logo(r, c):
    return ly0 <= r < ly0 + LH and lx0 <= c < lx0 + LW


def lerp(a, b, t):
    return tuple(round(a[i] + (b[i] - a[i]) * t) for i in range(3))


def draw_qr(transparent=False):
    img = Image.new('RGBA', (SIZE, SIZE), (0, 0, 0, 0) if transparent else BG + (255,))
    d = ImageDraw.Draw(img)
    pad = M * 0.04
    for r in range(N):
        for c in range(N):
            if not matrix[r][c] or in_finder(r, c) or in_logo(r, c):
                continue
            x, y = (c + QUIET) * M, (r + QUIET) * M
            # subtle diagonal navy → deep blue gradient keeps contrast high
            t = (r + c) / (2 * N)
            col = lerp(NAVY, (22, 52, 120), t)
            d.rounded_rectangle([x + pad, y + pad, x + M - pad, y + M - pad], radius=M * 0.3, fill=col)

    # finder "eyes": rounded navy ring + gold centre
    for fr, fc in [(0, 0), (0, N - 7), (N - 7, 0)]:
        x, y = (fc + QUIET) * M, (fr + QUIET) * M
        d.rounded_rectangle([x, y, x + 7 * M, y + 7 * M], radius=M * 2.1, fill=NAVY)
        d.rounded_rectangle([x + M, y + M, x + 6 * M, y + 6 * M], radius=M * 1.5, fill=BG if not transparent else (255, 255, 255))
        # royal-blue core: brand accent that stays dark enough for finder detection (gold reads as light)
        d.rounded_rectangle([x + 2 * M, y + 2 * M, x + 5 * M, y + 5 * M], radius=M * 0.95, fill=BLUE)

    # centre badge with the crown logo
    bx0, by0 = (lx0 + QUIET) * M, (ly0 + QUIET) * M
    bx1, by1 = bx0 + LW * M, by0 + LH * M
    inset = M * 0.45
    d.rounded_rectangle([bx0 + inset, by0 + inset, bx1 - inset, by1 - inset], radius=M * 1.6, fill=(254, 254, 252), outline=GOLD, width=int(M * 0.18))
    logo = Image.open(os.path.join(ROOT, 'public/images/logo.png')).convert('RGBA')
    logo = logo.crop(logo.getbbox())
    maxw, maxh = (bx1 - bx0) - 1.6 * M, (by1 - by0) - 1.6 * M
    s = min(maxw / logo.width, maxh / logo.height)
    logo = logo.resize((int(logo.width * s), int(logo.height * s)), Image.LANCZOS)
    img.alpha_composite(logo, (int((bx0 + bx1 - logo.width) / 2), int((by0 + by1 - logo.height) / 2)))
    return img


def verify(img, name):
    probe = Image.new('RGB', img.size, (255, 255, 255))
    probe.paste(img, mask=img.split()[-1] if img.mode == 'RGBA' else None)
    res = zxingcpp.read_barcodes(probe)
    ok = any(r.text == URL for r in res)
    print(f'  {name}: {"ESCANEA OK -> " + URL if ok else "NO ESCANEA"}')
    if not ok:
        raise SystemExit(1)


big = draw_qr()
qr_png = big.resize((2048, 2048), Image.LANCZOS)
qr_png.convert('RGB').save(os.path.join(OUT, 'qr-rey-escuela.png'), dpi=(300, 300))
verify(qr_png, 'qr-rey-escuela.png (2048 px)')
for px in (600, 400, 300, 240):
    verify(big.resize((px, px), Image.LANCZOS), f'prueba a {px} px')
tr = draw_qr(transparent=True).resize((2048, 2048), Image.LANCZOS)
tr.save(os.path.join(OUT, 'qr-rey-escuela-transparente.png'))
verify(tr, 'qr-rey-escuela-transparente.png')


# ---------- print card (1600 x 2200, ~13.5 x 18.6 cm at 300 dpi) ----------
def font(name, size, var):
    f = ImageFont.truetype(os.path.join(HERE, 'fonts', name), size)
    f.set_variation_by_name(var)
    return f


W, H = 1600, 2300
card = Image.new('RGBA', (W, H), BG + (255,))
d = ImageDraw.Draw(card)
# soft brand glows
glow = Image.new('RGBA', (W, H), (0, 0, 0, 0))
g = ImageDraw.Draw(glow)
g.ellipse([W - 700, -400, W + 400, 600], fill=(30, 91, 216, 40))
g.ellipse([-500, H - 700, 600, H + 400], fill=(232, 169, 28, 45))
card.alpha_composite(glow.filter(ImageFilter.GaussianBlur(140)))
d = ImageDraw.Draw(card)

logo = Image.open(os.path.join(ROOT, 'public/images/logo.png')).convert('RGBA')
logo = logo.crop(logo.getbbox())
lw = 560
logo = logo.resize((lw, int(logo.height * lw / logo.width)), Image.LANCZOS)
card.alpha_composite(logo, ((W - lw) // 2, 110))

y = 110 + logo.height + 70
script = font('caveat.ttf', 78, 'Bold')
t = '¡Tu libertad comienza aquí!'
d.text((W / 2, y), t, font=script, fill=GOLD, anchor='mt')
y += 105
title = font('archivo.ttf', 112, 'Black')
d.text((W / 2, y), 'ESCANEA Y', font=title, fill=NAVY, anchor='mt')
y += 118
d.text((W / 2, y), 'RESERVA TU CLASE', font=title, fill=BLUE, anchor='mt')
y += 175

# QR in a white rounded panel with shadow
qs = 920
panel = 50
px0, py0 = (W - qs) // 2 - panel, y
shadow = Image.new('RGBA', (W, H), (0, 0, 0, 0))
ImageDraw.Draw(shadow).rounded_rectangle([px0, py0 + 30, px0 + qs + 2 * panel, py0 + qs + 2 * panel + 30], radius=70, fill=(15, 27, 45, 70))
card.alpha_composite(shadow.filter(ImageFilter.GaussianBlur(40)))
d = ImageDraw.Draw(card)
d.rounded_rectangle([px0, py0, px0 + qs + 2 * panel, py0 + qs + 2 * panel], radius=70, fill=(254, 254, 252))
card.alpha_composite(draw_qr(transparent=True).resize((qs, qs), Image.LANCZOS), (px0 + panel, py0 + panel))
y = py0 + qs + 2 * panel + 70

pill_font = font('jakarta.ttf', 52, 'Bold')
tw = d.textlength(LABEL, font=pill_font)
pw, ph = tw + 110, 104
d.rounded_rectangle([(W - pw) / 2, y, (W + pw) / 2, y + ph], radius=ph / 2, fill=GOLD)
d.text((W / 2, y + ph / 2), LABEL, font=pill_font, fill=NAVY, anchor='mm')
y += ph + 60

info = font('jakarta.ttf', 40, 'SemiBold')
d.text((W / 2, y), 'WhatsApp +1 (829) 214-9737  ·  Calle Duvergé #41 Norte, Baní', font=info, fill=(91, 101, 119), anchor='mt')

# gold + red stripe like the logo underline
d.rectangle([0, H - 26, int(W * 0.62), H], fill=GOLD)
d.rectangle([int(W * 0.62), H - 26, W, H], fill=RED)

card = card.convert('RGB')
card.save(os.path.join(OUT, 'tarjeta-qr-rey-escuela.png'), dpi=(300, 300))
verify(card, 'tarjeta-qr-rey-escuela.png')


# ---------- vector SVG (for print shops) ----------
def svg():
    S = N + 2 * QUIET
    parts = [f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {S} {S}" width="2048" height="2048" shape-rendering="geometricPrecision">',
             f'<rect width="{S}" height="{S}" fill="#FAFAF7"/>']
    for r in range(N):
        for c in range(N):
            if matrix[r][c] and not in_finder(r, c) and not in_logo(r, c):
                col = '#%02x%02x%02x' % lerp(NAVY, (22, 52, 120), (r + c) / (2 * N))
                parts.append(f'<rect x="{c + QUIET + .04:.2f}" y="{r + QUIET + .04:.2f}" width=".92" height=".92" rx=".26" fill="{col}"/>')
    for fr, fc in [(0, 0), (0, N - 7), (N - 7, 0)]:
        x, y = fc + QUIET, fr + QUIET
        parts += [f'<rect x="{x}" y="{y}" width="7" height="7" rx="2.1" fill="#0F1B2D"/>',
                  f'<rect x="{x + 1}" y="{y + 1}" width="5" height="5" rx="1.5" fill="#FAFAF7"/>',
                  f'<rect x="{x + 2}" y="{y + 2}" width="3" height="3" rx=".95" fill="#1E5BD8"/>']
    bx, by = lx0 + QUIET, ly0 + QUIET
    parts.append(f'<rect x="{bx + .45}" y="{by + .45}" width="{LW - .9}" height="{LH - .9}" rx="1.6" fill="#FEFEFC" stroke="#E8A91C" stroke-width=".18"/>')
    lg = Image.open(os.path.join(ROOT, 'public/images/logo.png')).convert('RGBA')
    lg = lg.crop(lg.getbbox())
    lg.thumbnail((900, 900), Image.LANCZOS)
    buf = io.BytesIO(); lg.save(buf, 'PNG', optimize=True)
    mw, mh = LW - 1.6, LH - 1.6
    s = min(mw / lg.width, mh / lg.height)
    w, h = lg.width * s, lg.height * s
    parts.append(f'<image x="{bx + (LW - w) / 2:.3f}" y="{by + (LH - h) / 2:.3f}" width="{w:.3f}" height="{h:.3f}" href="data:image/png;base64,{base64.b64encode(buf.getvalue()).decode()}"/>')
    parts.append('</svg>')
    open(os.path.join(OUT, 'qr-rey-escuela.svg'), 'w', encoding='utf-8').write('\n'.join(parts))


svg()
print('  qr-rey-escuela.svg (vector)')
print(f'  QR version {qr.version}, {N}x{N} módulos, corrección H')
