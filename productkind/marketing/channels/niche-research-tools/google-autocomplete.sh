#!/bin/zsh
# $1 = file of phrases, $2 = gl (country)
GL=${2:-gb}
while IFS= read -r q; do
  [[ -z "$q" ]] && continue
  enc=$(printf '%s' "$q" | sed 's/ /+/g')
  res=$(curl -s -m 12 "https://suggestqueries.google.com/complete/search?client=firefox&hl=en-GB&gl=$GL&q=$enc")
  sug=$(printf '%s' "$res" | python3 -c "import sys,json;d=json.load(sys.stdin);print(' | '.join(d[1]))" 2>/dev/null)
  n=$(printf '%s' "$res" | python3 -c "import sys,json;d=json.load(sys.stdin);print(len(d[1]))" 2>/dev/null)
  printf '%-40s [%s] %s\n' "$q" "${n:-ERR}" "$sug"
done < "$1"
