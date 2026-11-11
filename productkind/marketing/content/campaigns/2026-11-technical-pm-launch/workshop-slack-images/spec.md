---
status: drafted
use: workshop slides
account: little-parrot
---

# Workshop slide images: Slack messages from Animal Inc.

Five images to embed in the workshop slides, exported to `export/`. Each shows a chat window in the style of `../workshop-onboarding-image` on a transparent background, so they sit on white slides. Avatars come from the character sheets in `kim-and-tim/assets/src/characters/`.

Export with headless Chrome, opening `carousel.html?slide=N` at a 1080 × 1350 window, with `--allow-file-access-from-files` and `--default-background-color=00000000` so the background stays transparent and the characters load from `kim-and-tim`, then trim each PNG to its contents with `magick <file> -trim +repage <file>`.

## 1. The welcome (`01-welcome.png`)

- Channel name: # welcome
- Workspace: Animal Inc.
- **Owl** · HR Manager · 09:02: Welcome to the team! 🎉 You're our newest product manager. Your first job this week is getting to know the product.
- Reactions: 🎉 6, 👋 4

## 2. The bug (`02-bug-tall-order-co.png`)

- Channel name: Rhino
- Workspace: Animal Inc.
- **Rhino** · Customer Success Lead · 09:31: Our customer, Tall Order Co., tried to save a new company. The Save button kept spinning, and now the company isn't in the list. Engineering is in planning all day. Can you take a look before my 3pm call?

## 3. Giraffe, sad (`03-giraffe-sad.png`)

Visual: the sad pose from `giraffe-versions.svg`, alone on a transparent background. No text.

## 4. The PM asks Snail (`04-pm-asks-snail.png`)

- Channel name: Snail
- Workspace: Animal Inc.
- **PM** · Product Manager · 09:40: Hi Snail! How do I set up the local development environment?

## 5. Snail sends the repository (`05-snail-sends-repo.png`)

- Channel name: Snail
- Workspace: Animal Inc.
- The PM's message from image 4, faded.
- **Snail** · 🗓️ · Software Developer · 09:52: https://github.com/productkind/twenty-pm-lab

## Alt text

1. A chat channel called welcome at Animal Inc. Owl from HR writes: Welcome to the team! You're our newest product manager. Your first job this week is getting to know the product.
2. A direct message from Rhino, the customer success lead: Our customer, Tall Order Co., tried to save a new company. The Save button kept spinning, and now the company isn't in the list. Engineering is in planning all day. Can you take a look before my 3pm call?
3. Giraffe from Tall Order Co., looking sad.
4. The PM writes to Snail, a software developer: Hi Snail! How do I set up the local development environment?
5. Snail replies with only a link: https://github.com/productkind/twenty-pm-lab
