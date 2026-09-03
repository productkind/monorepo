"""Compares each package's actual imports against its declared dependencies.

Workspace hoisting means a missing dependency resolves fine locally and only breaks once the
package is published, so nothing else in the toolchain catches this. Exits non-zero on a finding.

Known false positives: package names that appear only inside test fixture strings, and `react`
in @dungarees/core, which the react-jsx runtime needs without an explicit import.
"""

import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent / 'src'
pkgs = {}
for pj in ROOT.rglob('package.json'):
    if 'node_modules' in pj.parts: continue
    pkgs[pj.parent] = json.loads(pj.read_text())

# a file belongs to the deepest package dir containing it
def owner(f):
    cands = [d for d in pkgs if d in f.parents]
    return max(cands, key=lambda d: len(d.parts)) if cands else None

# Matches `from 'x'`, bare `import 'x'`, `import('x')` and `require('x')`.
SPECIFIER = re.compile(r"""(?:from|import|require)\s*\(?\s*['"]([^'"]+)['"]""")

imports = {d: set() for d in pkgs}
for ts in sorted([*ROOT.rglob('*.ts'), *ROOT.rglob('*.tsx')]):
    if 'node_modules' in ts.parts: continue
    o = owner(ts)
    if o is None: continue
    for m in SPECIFIER.finditer(ts.read_text()):
        spec = m.group(1)
        if spec.startswith('.') or spec.startswith('node:'): continue
        parts = spec.split('/')
        name = '/'.join(parts[:2]) if spec.startswith('@') else parts[0]
        imports[o].add(name)

BUILTIN = {'vitest', 'typescript'}
# Pulled in by the react-jsx runtime rather than by an explicit import.
IMPLICIT = {'react'}
# Only ever appear inside template literals used as fake file contents in test fixtures, which
# this scanner cannot tell apart from real import statements.
FIXTURE_ONLY = {'@org/lib-2', '@external-org/external'}
findings = 0
for d in sorted(pkgs, key=lambda p: str(p)):
    pkg = pkgs[d]
    declared = set(pkg.get('dependencies', {})) | set(pkg.get('devDependencies', {}))
    used = imports[d] - {pkg.get('name')} - FIXTURE_ONLY
    missing = used - declared
    unused = declared - used - BUILTIN - IMPLICIT
    if missing or unused:
        findings += 1
        print(f"\n{pkg.get('name')}  ({d.relative_to(ROOT)})")
        if missing: print(f"  MISSING : {', '.join(sorted(missing))}")
        if unused:  print(f"  UNUSED  : {', '.join(sorted(unused))}")

sys.exit(1 if findings else 0)
