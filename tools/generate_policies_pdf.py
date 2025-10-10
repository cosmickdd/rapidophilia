"""
Improved PDF generator for Rapidophilia policies.

This script extracts visible text from three TSX policy pages and creates a
multi-page, professional PDF with a cover, clear headings, page breaks and
footer page numbers.
"""

from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, PageBreak
from reportlab.lib.enums import TA_JUSTIFY, TA_CENTER
from reportlab.lib import colors
from reportlab.pdfgen import canvas
import re
import os


# Paths
ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
FILES = [
    os.path.join(ROOT, 'src', 'pages', 'TermsOfUsePage.tsx'),
    os.path.join(ROOT, 'src', 'pages', 'PrivacyPolicyPage.tsx'),
    os.path.join(ROOT, 'src', 'pages', 'RefundPolicyPage.tsx'),
]

OUTPUT = os.path.join(ROOT, 'policies_combined.pdf')
PUBLIC_OUTPUT = os.path.join(ROOT, 'public', 'policies_combined.pdf')


def extract_text_from_tsx(path: str) -> str:
    with open(path, 'r', encoding='utf-8') as f:
        s = f.read()

    # Remove import/export lines
    s = re.sub(r"^\s*import[\s\S]*?;?\n", "", s, flags=re.M)
    s = re.sub(r"^\s*export default .*", "", s, flags=re.M)

    # Replace tags with newlines so inner text is separated
    s = re.sub(r"<[^>]+>", "\n", s)

    # Remove JSX expressions like {something}
    s = re.sub(r"{[^}]*}", "", s)

    # Collapse multiple newlines and trim
    s = re.sub(r"\n+", "\n", s)
    s = s.strip()

    # Split into lines and filter
    lines = [ln.strip() for ln in s.split('\n')]
    filtered = []
    for ln in lines:
        if not ln:
            continue
        if re.match(r"^[<>/].*", ln):
            continue
        if ':' in ln and len(ln.split()) < 6:
            continue
        if len(ln) < 3:
            continue
        filtered.append(ln)

    # join into paragraphs
    text = '\n\n'.join(filtered)
    return text


def _footer(canvas_obj: canvas.Canvas, doc):
    # Simple footer with page number centered
    page_num = canvas_obj.getPageNumber()
    text = f"Page {page_num}"
    canvas_obj.setFont('Helvetica', 9)
    canvas_obj.setFillColor(colors.HexColor('#6b7280'))
    canvas_obj.drawCentredString(A4[0] / 2.0, 15, text)


def build_pdf(output_path: str, sections: list):
    doc = SimpleDocTemplate(output_path, pagesize=A4, rightMargin=50, leftMargin=50, topMargin=60, bottomMargin=60)
    styles = getSampleStyleSheet()

    title_style = ParagraphStyle('Title', parent=styles['Heading1'], fontName='Helvetica-Bold', fontSize=22, alignment=TA_CENTER, spaceAfter=18, textColor=colors.HexColor('#0f172a'))
    subtitle_style = ParagraphStyle('Sub', parent=styles['Normal'], fontSize=12, alignment=TA_CENTER, textColor=colors.HexColor('#374151'))
    heading_style = ParagraphStyle('Heading', parent=styles['Heading2'], fontName='Helvetica-Bold', fontSize=14, spaceBefore=12, spaceAfter=8, textColor=colors.HexColor('#111827'))
    body_style = ParagraphStyle('Body', parent=styles['BodyText'], fontName='Helvetica', fontSize=11, leading=16, alignment=TA_JUSTIFY, textColor=colors.HexColor('#111827'))

    elems = []
    # Cover/title page
    elems.append(Paragraph('Rapidophilia — Policies', title_style))
    elems.append(Spacer(1, 6))
    elems.append(Paragraph('Combined Terms of Use · Privacy Policy · Cancellation/Refund Policy', subtitle_style))
    elems.append(Spacer(1, 18))
    elems.append(Paragraph('Last updated: April 18th, 2025', ParagraphStyle('Meta', parent=styles['Normal'], fontSize=10, alignment=TA_CENTER, textColor=colors.HexColor('#6b7280'))))
    elems.append(PageBreak())

    for i, (title, text) in enumerate(sections):
        elems.append(Paragraph(title, heading_style))
        elems.append(Spacer(1, 6))

        paras = [p.strip() for p in re.split(r"\n\s*\n", text) if p.strip()]
        for para in paras:
            para = re.sub(r"\s+", ' ', para)
            elems.append(Paragraph(para, body_style))
            elems.append(Spacer(1, 6))

        if i < len(sections) - 1:
            elems.append(PageBreak())

    doc.build(elems, onFirstPage=_footer, onLaterPages=_footer)


if __name__ == '__main__':
    sections = []
    for path in FILES:
        base = os.path.splitext(os.path.basename(path))[0]
        if 'Terms' in base:
            title = 'Terms of Use'
        elif 'Privacy' in base:
            title = 'Privacy Policy'
        else:
            title = 'Cancellation / Refund Policy'

        text = extract_text_from_tsx(path)
        sections.append((title, text))

    print('Generating PDF to', OUTPUT)
    build_pdf(OUTPUT, sections)

    # copy to public for serving
    try:
        with open(OUTPUT, 'rb') as src, open(PUBLIC_OUTPUT, 'wb') as dst:
            dst.write(src.read())
        print('Copied to public:', PUBLIC_OUTPUT)
    except Exception as e:
        print('Failed copying to public:', e)

    print('Done. PDF at', OUTPUT)
