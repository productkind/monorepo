---
name: captions
description: Write well-performing captions for a single piece of content (educational videos, B-roll, photos, announcements, finished carousels) posted from the productkind or Little Parrot brand account, for TikTok, Instagram, LinkedIn, and YouTube Shorts, plus two founder comments (Kinga and Thomas) for Instagram and LinkedIn. Triggers include "write a caption", "captions for this video/B-roll/carousel", "post copy for TikTok/Instagram/LinkedIn/YouTube Shorts", or any caption task. For carousels, the carousel skill produces the slides; this skill writes the captions once the carousel is final.
---

# Captions workflow

Turn one piece of content (an educational video, a B-roll clip, a photo, an announcement, a finished carousel) into ready-to-paste captions for TikTok, Instagram, LinkedIn, and YouTube Shorts, posted from the brand account, plus two founder comments per platform (Instagram, LinkedIn) that Kinga and Thomas post to start real conversation under it. YouTube Shorts applies to video content only, which includes carousels run as a video slideshow.

The platform mechanics below come from `productkind/marketing/channels/platform-playbook-2026.md` (researched July 2026). If it is much later than that, re-verify the mechanics before trusting them.

The hook and attention rules come from our storytelling and copywriting playbook, `productkind/marketing/storytelling-playbook/README.md` (sources: Sam Parr, Kallaway, Mino Lee, Caleb Ralston, Paddy Galloway, Alex Garcia, Anna Corinne Howard), and from our own performance data in `productkind/marketing/storytelling-playbook/research/01-diagnosis.md`. Every hook still passes **language-rules**; that is what keeps it in our voice.

## Inputs to establish first

1. **Brand**: `little-parrot` or `productkind`. Infer from the source material and confirm in one line.
2. **The content itself**: what the video/image actually shows and says. Captions describe and extend what is really there; never claim something the clip doesn't show, and never oversell what a course or article delivers.
3. **Platforms**: default is all three (TikTok, Instagram, LinkedIn), plus YouTube Shorts when the piece is a video. Drop any that don't fit the piece.
4. **Destination**: where the post drives (a course, an article, the newsletter, nothing). This shapes the CTA and where the link lives.

## Carousel posts

When the content is a carousel from the **carousel** skill, the piece folder already exists with the approved `spec.md` and the exports; read the spec (and the source article/course) before writing.

- **Captions follow the carousel's teaser principle, without value-edging**: expand the tease in natural sentences, in the reader's search language, and give the reader one real takeaway in the caption itself. Hold the depth, the full how, and the nuance back for the article or course the post drives to, never the whole point (Ralston: withholding the takeaway to sell costs trust).
- **Covering the slides' ground again is good; pasting slide copy is not.** On Instagram the caption is the searchable surface (in-app search plus Google), and the playbook calls longer keyword-rich carousel captions an SEO asset, so re-telling the carousel's ideas in natural, searchable sentences is the play. But slide copy is short display fragments; rewrite the ideas as spoken sentences someone would search, don't paste the fragments.
- Posting formats: LinkedIn gets the PDF as a document post; Instagram and TikTok get the PNGs; YouTube Shorts (when asked) runs the slides as a video slideshow, so the carousel gets a title + description like any Short.
- On Instagram, an educational carousel supports a longer keyword-rich caption (150-300 words) as an SEO asset.
- Alt text is already in the spec; carry it into `captions.md` (adjusted if the export changed anything) rather than writing it fresh.

## Voice and checks (all platforms)

- Write captions with **productkind-tone** so every caption sounds like a person talking to a friend, not marketing copy. Founder comments follow **personal-tone-of-voice**: they go out under Kinga's and Thomas's own names. For brand and mission context, read `productkind/little-parrot-context.md` when needed.
- Apply the **language-rules** skill in full, and invoke it if it is not already loaded. It is the single source for the banned list and all shared language rules.
- Do a deliberate phrase-by-phrase banned-list pass on every caption AND every founder comment before showing the draft.
- Ground every claim in the source material; if the video shows a rough first attempt, the caption says so.

## Evaluation loop (run this every time, before showing the user)

The draft is never returned to the user until an independent critic has gated it. Self-review misses what fresh eyes catch, so the writer and the judge must be different.

1. **Draft** every deliverable following this skill: all platform captions and pinned comments with productkind-tone, both founder comments per platform with personal-tone-of-voice.
2. **Critique.** Spawn the `caption-critic` agent (Agent tool) and pass it the full drafted `captions.md` (or the drafted text), the brand, and one line on what the content actually shows. It judges language and voice (does every caption and comment sound like us, banned words, British English), judges each first line and title against this skill's hook rules, and lightly confirms the other structural rules this skill sets. Do not show the draft to the user yet.
3. **Read the verdict:**
   - **PASS** → show the user the final captions, with a short note on what the critic checked.
   - **NEEDS REVISION** → apply the critic's revision brief, then re-run the critic on the new draft. Repeat, up to **3 rounds**.
4. **After 3 rounds**, if issues remain, show the best draft and name the unresolved items honestly. Never hide them or ship around them.

The critic judges language and hook strength; this skill remains the source of truth for structure (the hook rules, CTA type, hashtags). What the user sees is the **final captions plus a short summary** of what the critic flagged and how it was resolved, not every round, unless they ask to see the drafts.

## Caption rules shared by all platforms

- **The first line is the hook, and it carries the search phrase.** Captions are keyword-indexed (Instagram in-app search plus Google for public professional accounts; TikTok search; the YouTube Shorts title), so the phrase a learner would actually type belongs in the first line or the one after it, written as a natural spoken line, never tag-speak or keyword stuffing. But a search phrase on its own is a topic label, not a hook: "How do you run an AI-built app yourself?" is the kind of generic phrasing Mino Lee says gets scrolled past because it sounds like something "two scrolls ago". Pair the search phrase with at least one hook ingredient from the list below. Recognition still beats explanation: you want the reader's first reaction to be "that's me".
- **Hook ingredients** (combine two or three; details and formulas in section 3 of the playbook):
  - **the viewer's exact situation or pain, read back to them** (Mino): "Your stakeholder saw your AI prototype and asked when it launches."
  - **a contradiction**, two true things that shouldn't both be true (Galloway): "Engineering says it's done. Your users still don't have it."
  - **a specific number, name or result** (Mino, Ralston): "Three people visited. Nobody paid."
  - **stakes on a clock** (Kallaway): "The app you built with AI goes down on Saturday."
  - **the cost of not knowing** (Galloway): "Your page can be perfect and still not show up on Google."
  - **a specific question the viewer wants answered**, never a yes/no or one with an obvious answer (Kallaway, Galloway).
  - **a named audience** (Parr): "Product managers, ..."
- **Hook don'ts:** empty teasers ("You won't believe this"), topic labels on their own ("How do you maintain an AI-built app?"), statement intros ("In this video..."), leading with the lesson in a story, and anything the content doesn't deliver.
- **How hooks meet language-rules:** a contradiction is two plain, true statements, never the banned "Not X, but Y" reversal or the two-beat setup-payoff ("Sounds simple. It isn't."). Specific and true, never oversold. No invented numbers, no strawmen ("most people think..."), no pseudo punchlines.
- **Complement the video's own hook; don't repeat it.** On video posts the viewer meets the frame-one text and the spoken line first. The caption's first line should add to that hook (a second angle, the stake, the number), not restate the first spoken sentence word for word (Galloway: complement, don't repeat). Keep the search phrase the video speaks or shows, per the TikTok rule below.
- **Line 2 confirms line 1.** It proves the hook wasn't bait by saying what the piece actually gives the viewer (Mino).
- **Carry the value the content points at.** The steps, the prompt, the checklist, the one real takeaway. That is what earns saves and sends (Garcia: shares are the strongest distribution signal). Never make the caption a promise of value the viewer only gets after clicking.
- **Name the audience in the keywords, not only the hashtags.** Search phrases and caption keywords are audience signals too, so work a women-specific phrase into the hook or caption body where it reads naturally ("AI tools for women starting a business", "for women who want to build their idea"). One natural mention does the categorisation work; don't force it into every line or let it break the spoken voice.
- **CTA: payoff-anchored, never engagement bait.** Meta demotes comment/tag/like-bait from recommendations and LinkedIn won't promote posts that ask for reactions: no "comment YES", no "tag a friend", no giveaway mechanics. Save-asks and share-asks are safe and are what distribution rewards (saves and sends drive reach), so "save this for when you build yours" or a send-to-a-friend nudge does double duty with our share-ask acquisition. Follow-asks name the payoff ("follow for [specific promise]"), never a bare "follow for more".
- **Hashtags are categorisation, not reach.** Niche and specific only, never generic (#instagood, #fyp), always placed last. **Most tags in every set are women-specific** (e.g. #womenintech #womenwhobuild #womenfounders #techforwomen): hashtags tell the algorithm who the content is for, and our audience is women. Topic/format tags (#nocode #learntobuild) fill the remaining one or two slots.

## Video hook review (video posts only)

The caption can't rescue a video that loses people at second 1: our September videos lost most viewers at 0:01 to 0:02 whatever the visuals. So when the piece is a video, check the video's own hook while writing its captions, and report what you find to the user under **Video hook notes** in `captions.md`. This doesn't block the captions; it's advice for the edit, or for the next script.

Check against the playbook's short-video guide (section 8):

- [ ] **Three hook layers** (Garcia): is there an on-screen **text hook** in frame one, a **visual hook** (an unusual angle, an action, a real face or a real screen mid-action; a "click to unpause" moment frozen just before the payoff, per Galloway), and a **spoken hook**?
- [ ] With the sound off, does frame one alone make someone want to see what happens next?
- [ ] Do the **first five spoken words** carry the gap, a number, a contradiction or a stake? (By second 2 a viewer has heard only four or five words.)
- [ ] Do seconds 3 to 6 **confirm the hook**?
- [ ] Is there a **new question or re-hook before 12 seconds**? (Garcia: 12 seconds of average watch time is "where good videos die".)
- [ ] Does the video **deliver the value before any ask**, rather than describing a problem and then pitching a course?

For each miss, suggest a concrete fix built only from what's already in the video: a frame-one text line, a reordered first sentence, or where the strongest line currently sits.

## Per-platform rules

**TikTok** (no founder comments; we run one account there)

- **Carousels post as TikTok photo mode, which has a Title field separate from the caption**: give it a short, scroll-stopping title that names the topic and its search term with a hook ingredient (a pain, a contradiction, a number or a stake, not a cute line), e.g. "Why your vibe coded app doesn't look how you pictured 👀" or "Your page can be perfect and still not show up on Google 👀", and include it as a **Title** line in the deliverable. Video posts have no separate title field; there the caption's first line is the hook.
- 150-300 characters total; only the first ~80-100 show before "more", so hook + keyword go there.
- TikTok search indexes voiceovers and on-screen text as well as captions, so pick the search phrase that is actually spoken or shown in the video and put that same phrase in the caption.
- 3-5 hashtags: 1 broad women-in-tech community tag + 2-3 niche, most of them women-specific.
- A genuine question in the caption invites comments; use one when it is natural, never as bait.
- "Follow for more [topic] tips" and "part 2 tomorrow" CTAs are fine here (TikTok encourages them). Links go in the bio or a pinned comment, not the caption; if the post drives somewhere, draft the pinned comment too.

**Instagram** (Reels for video/B-roll)

- The Reels tab shows only ~55-60 characters, the feed ~125, and the opening doubles as the Google snippet: hook + search phrase inside the first 55 characters.
- For educational content a keyword-rich caption of roughly 100-200 words is an SEO asset: expand the idea in natural sentences, then CTA + share-ask, then 3-5 niche hashtags (hard cap 5), most of them women-specific.
- Reels distribution runs on sends and full watch-through, so a send-to-a-friend or save nudge fits naturally.
- **Publish as a Collab post with Kinga's personal account** (invited via "Tag people > Invite collaborator" on the brand's upload): one post appears natively on both profiles with pooled likes and comments, so one caption serves both. Write it so it reads naturally from either profile. Never upload the same content separately on the second account: since April 2026 Instagram suppresses duplicates, with no exemption for accounts you own; it is Collab or a material re-edit (new hook, new voiceover), nothing in between.
- Include **alt text** for the visual.

**YouTube Shorts** (video content only; no founder comments, we run one channel there)

- **The title is the hook**: 20-40 characters, search phrase first (short keyword-first titles perform best on trending Shorts, and Ralston finds plain, descriptive packaging wins in search over time). Where it still fits the character budget, add one hook ingredient after the search phrase (a number, a stake or a contradiction). Include a women-specific keyword in the title whenever it fits ("AI for women...", "women building...").
- 2-3 hashtags, women-specific first (e.g. #womenintech #womenwhobuild) plus one topic tag, placed **right after the title on the same line**: hashtags live in the title field on a Short, so the deliverable is one title-plus-hashtags line that pastes into the title field in one go. **Title plus hashtags together must fit YouTube's 100-character title limit.** Stuffing makes YouTube ignore all of them. Skip #Shorts: YouTube detects Shorts by format (vertical, short length), so the tag adds nothing. This matters most on Shorts: its pull system currently shows our videos to a mostly male audience, and women-specific hashtags, title keywords, and spoken phrases (e.g. "for women who...") are how we tell it who the videos are for.
- **Description: 150-500 focused characters** in natural sentences that extend what the video actually shows; the 5,000-character limit is not a target.
- Subscribe asks are openly allowed and encouraged, payoff-named: "Subscribe for a new [topic] short every week" or "Subscribe, part 2 drops tomorrow". They belong verbally in the video's final seconds; echo in the description if natural.
- Links go in a pinned comment, not the description; if the post drives somewhere, draft the pinned comment too.

**LinkedIn** (from the productkind page)

- Hook + point inside the first ~140 characters (the "see more" fold). The first line follows the **linkedin-post** skill's hook rules (The First Line section): a moment with a turn, a result, a contradiction, a specific number, the cost of not knowing, or a question the reader answers about their own life. Never a topic intro or a tip promise with no stake; those posts get about half our median reach. Length: whatever the idea needs up to ~2,500 characters; LinkedIn is the one platform where substantive length outperforms, but a short post that says one thing well beats a padded one.
- No hashtags.
- Write for dwell and saves: a concrete lesson, checklist, or how-to people keep. Evergreen holds; LinkedIn resurfaces relevant posts for weeks.
- Page reach is structurally weak (~2% of followers), which is exactly why the founder comments below are not optional here.
- If the post drives to a link, put it in the post body.

## Founder comments (Instagram and LinkedIn)

Two comments per post, one from Kinga and one from Thomas, drafted with the captions and posted **within the first hour**. Early distinct commenters are the amplification trigger on LinkedIn, and early engagement velocity drives Instagram distribution.

Rules:

- **Each comment adds something the caption doesn't**: a behind-the-scenes detail, a mistake made along the way, a concrete example or tip, or a genuine question that opens replies. If a comment could sit under any post, it is too generic; rewrite it.
- **Never fake praise.** No "Love this!", no cheering for our own post. Semantic ranking treats generic or off-topic comments as pod behaviour and downweights the post, and readers can smell it. Kinga and Thomas are transparently the makers; they write as the makers ("we cut this section three times before it made sense"), not as fans.
- **Both comments follow personal-tone-of-voice**: they go out under Kinga's and Thomas's own names. Give Thomas's comment the practical or technical angle so the two don't read as the same person twice.
- **On LinkedIn**, 1-3 substantive sentences each.
- Comments go through the same banned-list pass as captions.

## Output

Write one `captions.md` into the piece's folder under `productkind/marketing/content/` (create the folder per the filing rules in `productkind/marketing/README.md` if the piece doesn't have one). Structure:

- Header: brand, source material, destination link.
- For video posts, a **Video hook notes** section (from the video hook review) near the top, so Kinga sees it before the captions.
- One section per platform: the caption ready to paste (for YouTube Shorts, one title-plus-hashtags line for the title field, then the description), alt text (Instagram/LinkedIn), hashtags included in place, plus the pinned comment (TikTok and YouTube Shorts, if any), and the two founder comments labelled **Kinga** and **Thomas**.
- A short posting checklist at the end: founder comments go up within the first hour; reply to every real commenter in that window too (it is the cheapest measured engagement lift on every platform); TikTok and YouTube Shorts links go in the pinned comment; on Instagram, invite Kinga as collaborator before publishing (never re-upload the same post on her account).

**Never hard-wrap anything that gets pasted into a platform.** Every caption, description, alt text, pinned comment and founder comment is copied straight out of this file into the composer, so a line break in the file becomes a line break in the live post. Write each paragraph as **one single line**, however long it runs, and use a blank line only where the caption itself should break into a new paragraph. Same for a hashtag set: one line each, never split across two. Wrapping is fine in the surrounding notes, the treatment and the checklist, because nobody pastes those anywhere.

Show the draft to Kinga for approval before anything is posted.
