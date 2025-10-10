import re
import os

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
FILES = [
    os.path.join(ROOT, 'src', 'pages', 'TermsOfUsePage.tsx'),
    os.path.join(ROOT, 'src', 'pages', 'PrivacyPolicyPage.tsx'),
    os.path.join(ROOT, 'src', 'pages', 'RefundPolicyPage.tsx'),
]


def extract_text_from_tsx(path: str) -> str:
    with open(path, 'r', encoding='utf-8') as f:
        s = f.read()

    s = re.sub(r"import[\s\S]*?from\s+['\"].*?['\"];?", "", s)
    s = re.sub(r"export default .*", "", s)
    s = re.sub(r"<[^>]+>", "\n", s)
    s = re.sub(r"{[^}]*}", "", s)
    s = re.sub(r"\n+", "\n", s)
    s = re.sub(r"\s+", " ", s)

    lines = [ln.strip() for ln in s.split('\n')]
    filtered = []
    for ln in lines:
        ln = ln.strip()
        if len(ln) < 3:
            continue
        if re.match(r"^[<>/].*", ln):
            continue
        if ':' in ln and len(ln.split()) < 6:
            continue
        filtered.append(ln)

    return "\n\n".join(filtered)


if __name__ == '__main__':
    for path in FILES:
        print('---', os.path.basename(path), '---')
        txt = extract_text_from_tsx(path)
        print(txt[:2000])
        print('\n\n')
