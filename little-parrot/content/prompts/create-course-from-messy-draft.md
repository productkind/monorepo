# Creating a full course from a messy draft
## About
- Tool: Claude Code
- Skills used: /productkind-tone /micro-course
- 2 separate contexts:
  - From messy draft to structured outline
  - From structured outline to yaml

## TLDR
0. Create a productkind-tone skill from a document that uses the language we're going for
1. Create good quality course outlines from existing courses
2. Create course outline from messy draft
3. Edit course outline
4. Create course from finalised course outline

## Process
### From messy draft to structured outline
Compact summary
  This session is being continued from a previous conversation that ran out of context. The summary below covers the earlier portion of the conversation.

     Analysis:
     Let me chronologically analyze the conversation:

     1. First request: User asked to create a course outline from a micro-course YAML file (`vibe-coding-product-management-00.yaml`) about product management for vibe coding. The file was already read before
      the conversation started.

     2. I created an outline at `vibe-coding-product-management-00-outline.md` capturing the structure, narrative arc, skills covered, and timing of the course about building valuable products.

     3. Second request: User asked to create another outline from `vibe-coding-tech-00.yaml` (Basics of Software for Vibe Coding). I read this file and created `vibe-coding-tech-00-outline.md`.

     4. Third request: User provided a messy draft at `/Users/kingamagyar/Downloads/lovable-course.md` for a Lovable micro-course. They wanted a similarly structured outline with specific requirements:
        - Include an "aha!" moment in the first challenge with a powerful hook
        - Learners should encounter practical hands-on steps as soon as possible
        - Build mindset during the course connected to practical experiences, not separately
        - Include transformation and what learners will be able to do after completing

     5. I read all three files (the messy draft and both example outlines) and created `lovable-intro-00-outline.md`.

     6. User made manual edits to the Lovable outline file, including:
        - Adding the prompt formula markdown block
        - Adding tips about small steps and Lovable building more than specified
        - Changing challenge 4 title
        - Adding the 80/20 rule about effort

     7. User then requested changes: Remove the "simple" first prompt approach. They wanted the structured prompt formula taught right away in Challenge 1 so learners get the "aha!" moment with a proper
     structured prompt.

     8. I restructured the outline:
        - Moved prompt formula from Challenge 2 to Challenge 1
        - Challenge 2 became "Iterate and Improve" focused on small steps and rebuild mindset
        - Updated Challenge 3 (removed duplicate content)
        - Updated Challenge 4 (removed duplicate rebuild mindset)
        - Updated narrative arc and running example to reflect changes

     9. Final request: User asked to apply tone of voice guidelines. I made several edits:
        - "More importantly" → "You'll also"
        - "without panic" → "calmly"
        - "experiment boldly" → "experiment freely"
        - "context rot" → plain explanation
        - Removed "(the details that matter)"
        - Rephrased 80/20 statement

     Key files:
     - `/Users/kingamagyar/Documents/productkind/monorepo/little-parrot/content/course/vibe-coding-product-management-00.yaml` (read)
     - `/Users/kingamagyar/Documents/productkind/monorepo/little-parrot/content/course/vibe-coding-product-management-00-outline.md` (created)
     - `/Users/kingamagyar/Documents/productkind/monorepo/little-parrot/content/course/vibe-coding-tech-00.yaml` (read)
     - `/Users/kingamagyar/Documents/productkind/monorepo/little-parrot/content/course/vibe-coding-tech-00-outline.md` (created)
     - `/Users/kingamagyar/Downloads/lovable-course.md` (read)
     - `/Users/kingamagyar/Documents/productkind/monorepo/little-parrot/content/course/lovable-intro-00-outline.md` (created and edited multiple times)

     Tone of voice skill was invoked but key rules include:
     - British English
     - No hyperbolic adjectives, drama words, business jargon
     - No weak intensifiers, empty fillers, pseudo punchlines
     - No em dashes, hashtags, decorative punctuation
     - Be friendly, engaging, understated, natural, mentor-like, succinct


#### All user messages:
        - "From this micro-course, create a concise and high-level course outline about the structure and narrative of this micro-course. Put the output in a markdown format in the same folder.
     /tone-of-voice"
        - "Now create an outline for this micro-course. Put the output in a markdown format in the same folder. /tone-of-voice" (for vibe-coding-tech-00)
        - "/Users/kingamagyar/Downloads/lovable-course.md This is a messy draft for a micro-course. I want you to make a similarly structured micro-course outline, as before from the full courses. Use the two
      markdown files you've just created as examples. ## Important Aspects to Follow - You don't have to follow the exact structure of the messy draft given. It's important that you craft the course outline
     in a way that engages learners and help them efficiently acquire new skills. - It's crucial to include an 'aha!' moment in the first challenge and make its hook powerful, because the learner will decide
     based on the first challenge if they want to subscribe for the micro-course. - The learner should encounter a practical and hands-on step in the micro-course as soon as possible. Build their mindset
     during the course, connecting it to practical experiences, not in a separate challenge focusing only on the mindset. - Include in the micro-course overview the transformation the learner will realise by
     the end. Include what the learner will be able to do after completing the micro-course. /tone-of-voice"
        - "I have reviewed the micro-course outline for the Lovable course and made some changes in the file to improve the content. I want you to update the Lovable course outline according to these
     instructions: The 'simple' prompt is not needed, because many learners struggle with what prompt to give to Lovable to start their project. I want to give the structured prompt right away so the learner
     will have an 'Aha!' moment with the course in the first challenge. Make these updates to the file."
        - "Apply our tone of voice and style for the Lovable course outline /tone-of-voice"

### From structured outline to yaml
   /Users/kingamagyar/Documents/productkind/monorepo/little-parrot/content/course/lovable-intro-01-course.md Amazing, now I want you to turn the course into the yaml format we use that we can just add to our database and the online course is working. /micro-course
   "timestamp":"2026-02-05T03:56:58.033Z"}

####  All user messages:
        - Initial request to create micro-course from draft with productkind-tone, output to course folder
        - "It's great, but in the first structured prompt we advise the learner to use, there are too many features listed for the Book Club Organiser. It's more effective to outline one core user flow to
     start with..."
        - Request to convert course to YAML format using /micro-course skill
        - "I've revised the yaml file and it looks promising. A couple of things I'd improve: 1. Add comic steps... 2. Change the person who builds the app to Dalmie... 3. Add a video step..."
        - "I have renamed the file to lovable-intro-00.yaml I made some changes and would like to improve the course further: 1. Move the Lovable Cloud part after the second challenge... 2. In the second
     challenge, update the steps that add a new feature... 3. In the second challenge, instead of adding a new feature, teach the learner how to improve on a feature..."
        - "Add a step in the third challenge after the 'Enable Lovable Cloud' step. This step should explain that Lovable will ask the learner about modifying the database..."
        - "Mention in the same step (Approving database changes) that we have the Basics of Software for Vibe Coding micro-course..."
        - "Now, I want you to add a new step after the 'Approving database changes' step. This new step should explain that there could be an error during connecting Lovable Cloud... Also recommend the 'Fix
     Bugs with Confidence: Debugging Your Lovable App' course"
        - "In the 'Now you can add features that need data' step you suggest adding a voting feature. Before this, we would need to add Google Authentication... Explain to the learner that they need to think
     through at each step the prerequisites..."
        - "After the 'Now add voting' step, I want to briefly teach the learner how they can ensure a new feature works..."
        - "Create two steps from the 'Adding assets and design themes' step. 1. Talk about design themes... 2. Learners can attach images to reference inspiration..."
        - "After the 'Quiz: Visual edits' step, add a quiz question about the preview mode."
        - "In the 'Go Beyond the Interface' challenge, we want to mention the new Lovable feature that enables the learner to do browser testing. Add one step about it."


