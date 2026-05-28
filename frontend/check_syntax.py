import re
import py_compile

with open('user.html', 'r', encoding='utf-8') as f:
    content = f.read()

scripts = re.findall(r'<script>(.*?)</script>', content, re.DOTALL)
if len(scripts) > 0:
    script_content = scripts[0]
    with open('temp.js', 'w', encoding='utf-8') as f:
        f.write(script_content)
    print("Script extracted to temp.js")
else:
    print("No script found")
