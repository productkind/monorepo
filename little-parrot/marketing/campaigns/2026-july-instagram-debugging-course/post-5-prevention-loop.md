# Post 5: The loop that prevents most bugs

**Pillar:** the method, shown.
**Research trace:** "break a feature into testable steps" is our clearest
comprehension miss in course data, so this is the highest-leverage habit to
teach; iteration introducing new bugs is a confirmed pain; the "and" test
gives an instantly usable rule; checklist format wins saves. Repackages the
Bug Prevention Checklist toolkit item.

## Format

**Carousel, 7 slides, 1080 x 1350 (4:5 portrait).** Loop-diagram style: the
five-step loop drawn on the cover, then one step per slide, each with a tick
box, the loop repeating on the final slide.

| Slide | Visual | Text on slide |
| --- | --- | --- |
| 1 (cover) | A circular five-step loop diagram | "Most bugs are preventable. The loop: Bookmark → Prompt one feature → Test → Check the surroundings → Bookmark. Here's each step. 👇" |
| 2 | A bookmark on a version timeline | "1️⃣ Bookmark before you change anything. If the next prompt breaks something, you have a safe point to return to instead of a rescue mission." |
| 3 | A prompt with the word "and" circled | "2️⃣ One feature per prompt, and here's the test: if your prompt contains 'and' ('add voting AND notifications AND a leaderboard'), split it. Each 'and' is a separate prompt." |
| 4 | A happy path and a stumbling path through a form | "3️⃣ Test both paths: the happy path (everything goes right) and the unhappy ones (submit the form empty, tap the button twice). Bugs live on the unhappy paths." |
| 5 | A map with the changed area and its neighbours highlighted | "4️⃣ Check the neighbours: visit the pages closest to what changed. Added a vote button to the books page? Check that books still load and display. And does the new feature look like it belongs?" |
| 6 | The bookmark again, loop arrow closing | "5️⃣ Everything works? Bookmark again. That's your new safe point, and the loop starts over with the next feature." |
| 7 (CTA) | Brand card, the loop small and steady | "Bugs still happen inside this loop, but they stay small, recent, and easy to find. The full checklist is in our course Fix Bugs with Confidence: Debugging Your Lovable App, on LittleParrot.app. First challenge free 🟪 Save this 🔖" |

**Alt text (for the post):** A prevention-loop carousel for building in
Lovable: bookmark a stable version, prompt one feature at a time using the
"and" test, test happy and unhappy paths, check neighbouring pages, and
bookmark again.

## Caption (exact)

The cheapest bug is the one that never happens, and most of them are prevented by a rhythm rather than a skill: bookmark, prompt one feature, test, check the neighbours, bookmark again. 🔁

Our favourite part is the "and" test. If your prompt says "add voting and notifications and a leaderboard", that's three prompts wearing a trenchcoat. Each "and" multiplies the ways a build can go sideways, and when it does, you can't tell which part caused it. One feature at a time keeps every bug small, recent, and easy to trace.

The other underrated step: test the unhappy paths. Submit the form empty. Tap the button twice. Your users will, so better you find out first.

The full checklist comes with Fix Bugs with Confidence: Debugging Your Lovable App, on LittleParrot.app. The first challenge is free.

Save this for your next building session. 🔖

.
.
.
#vibecoding #buildwithai #womenwhobuild #lovable #debugging
