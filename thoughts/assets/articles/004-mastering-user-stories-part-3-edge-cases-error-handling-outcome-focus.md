# Building Valuable Products: Edge Cases, Error Handling, and Outcome-Driven Stories

*A guide for Product People to go beyond the happy path: master anticipating challenges and focusing on outcomes to build truly impactful products*

**Date:** July 2, 2025
**Author:** Kinga Magyar

---

Continuing our "Mastering User Stories" series! Having established that user stories are about fostering shared understanding (Part 1) and armed with practical techniques for writing clear, managably-sliced stories (Part 2), now we go beyond the "happy path" to tackle crucial aspects of building truly valuable and user-friendly products.

In this third instalment, we'll explore how to anticipate the unexpected by:

- identifying edge cases,
- implementing error handling, and
- ultimately tying all our efforts back to the fundamental goal: focusing on outcomes that drive real value.

Let's dive in!

## How to identify edge cases

### Why edge cases matter

Identifying edge cases can be challenging. If we overlook them, our users might get confused when they try to do something we haven't considered. A seamless user experience requires accounting for these unusual but important scenarios.

**❌ Don't do this**

Don't try to identify all edge cases on your own or rely solely on your designer to think of everything. This approach misses the collective wisdom of your team and often results in overlooked scenarios.

**✅ Do this**

Make edge case identification a team activity. Encourage your team during refinement sessions or when you're discussing new user flows to identify scenarios where the user might not follow the ideal path. You can prompt them by asking "What if…" questions, such as "What if the user resizes the page?"

Use a checklist of common edge cases. You can create a checklist as you collect scenarios, so you don't have to come up with the same edge cases every time. You can add new items to the list as you build other features. As a starting point, here are some edge cases that are frequently overlooked:

- **Loading state:** Loading information can take time, so it's important to signal to your users that something is happening so they can wait patiently.
- **Empty screen:** There might be times when a user searches for something and no result appears. So, you should add an empty screen, communicating that no results were found.
- **Text length due to localisation:** If your product supports multiple languages, consider how a certain UI element will look in each language. For instance, German words tend to be longer than English ones, so make sure that button still looks user-friendly even with a long text.
- **Long user input:** It's not just about designing for the average user like "John Smith"; also consider edge cases like "Hubert Blaine Wolfeschlegelsteinhausenbergerdorff Sr." (an abbreviated version of the full name of a man who, at one point, held the record for the longest personal name). Ensure your product can handle data that is longer than average.
- **Case-sensitivity:** In certain fields, such as email addresses and discount codes, users might enter a mix of lower and uppercase letters. Recently, I couldn't log into an online service, because I typed my email address with an initial uppercase letter when I registered. Even though, I did the same when I wanted to log in next time, I couldn't enter. It was only after realising that the system had likely converted my email address to lowercase on their backend during registration that I could log in. If a string shouldn't be case-sensitive, then make sure to handle that for your user consistently. Don't make your user guess which one you expect.
- **Time boundaries:** Think about what happens when a time or deadline is near, such as nearing an expiration date or submitting data after time limits.

Separate edge cases into their own stories. Often, you can implement the happy case as one story, then edge cases can be separate stories, especially if your team identified many of them. This allows for better tracking and prioritisation.

Prioritise ruthlessly. It's also important to note that not all edge cases need to be implemented. If you believe that an edge case is very unlikely to happen, then don't spend time building for it. It's totally okay to handle it once several users mention it as a problem.

[Upgrade to paid button]

## How to implement error handling

### Why error handling matter

Similarly to edge cases, if we miss implementing error handling, our users will be frustrated, because they won't understand what they did wrong, and what happened in the product. Effective error handling provides clarity when things go wrong, helping users recover gracefully.

**❌ Don't do this**

Don't delegate error handling to a single team member. Don't outsource this thinking only to one person – your designer. Mapping out error scenarios requires input from multiple perspectives to be comprehensive and user-friendly.

**✅ Do this**

Collaborate with developers on technical error scenarios. Ask them, what technically could go wrong in the process. Developers have unique insights into potential failure points that might not be obvious to others.

Brainstorm user-caused errors as a team. Challenge your team to come up with error scenarios that could be caused by the user. A clickable prototype could support this thinking process, but looking at static designs while talking through the user flow also helps.

Create a comprehensive error handling checklist. Just as with edge cases, a checklist can be helpful in this scenario as well. Typical error scenarios (with their HTTP status code) include:

- An external service provider is unavailable (503);
- The server is not responding (500);
- Connectivity issue between your application and an external service due to network instability or slow response, causing a timeout before the request is fully processed (408);
- The page is not found (404);
- The user is authenticated but lacks sufficient privileges, therefore cannot access a page (403);
- The user needs to authenticate themselves to access the page (401);
- The user submits a form and receives validation errors (400) – clearly explain on the UI what you expect if you validate form fields (e.g. a phone number can only contain numbers).

Write clear, actionable error messages. Make sure that error messages clearly explain what went wrong and what the user can do to fix the issue. Avoid technical jargon in user-facing error messages.

### Why focus on outcomes, rather than outputs

Have you ever found your product team churning out features, only to wonder if they're truly making a difference? This often happens when we get too caught up in outputs instead of focusing on outcomes.

An output is a tangible deliverable your team produces. Think of it as the "stuff" you ship: a new feature, a line of code, a design, or any completed piece of work. For example, building a new search bar is an output.

An outcome, on the other hand, is a measurable change in user behaviour that happens within your product. This change should ultimately lead to increased business value. So, while the search bar itself is an output, an outcome might be an increase in users successfully finding what they're looking for, leading to more purchases. It's about the impact your work has.

What's important to remember is that your user can achieve a certain outcome in several different ways. There isn't one fixed solution. So, the ultimate goal isn't simply to build more software faster; it's to maximise the outcome and impact you get from what you choose to build.

### The risk of fixating on outputs

Since we're talking about features, it's easy to forget what value our users will realise as a result of using that functionality. But features don't automatically create value. By focusing too much on outputs, we risk neither creating user value, nor a positive business impact. Just because our feature is live, it's not guaranteed our users will find it valuable and actually use it.

**❌ Don't do this**

Avoid metrics that only track output. Avoid fixating on delivery speed, burn down charts, and how much output your team can produce at the expense of measuring the value they create.

Move away from thinking about requirements. A particular solution is not a "requirement", it's a possibility. We are discussing between product managers, designers and developers (and other roles in the product team if you have them) to come up with valuable solutions together that we decide to build. All viewpoints in the product team are useful, therefore involve your team members in the solution ideation process – and potentially already at the problem discovery phase.

**✅ Do this**

Focus on the value you create. Always ask yourself and your team, "What is the value this change/feature/implementation will deliver?" It can be value for your users, business or team. What's important is questioning whether something needs to be done. There is always more to build, than you have time, people or money for. Always. So, prioritise ruthlessly by asking the value of each backlog item you decide to work on.

Recognise different types of value. Refactoring a functionality can also serve value if, as a result, your team will be able to deliver more efficiently, even if your users don't realise immediate benefits.

Challenge new ideas with problem statements. When a "cool, new idea" surfaces during your team discussion or stakeholder meeting, always ask yourself and your team "What (user) problem are we solving by implementing this?"

Measure outcomes after shipping. Once you've built and shipped a new feature, measure if it actually proved to be valuable. How did your users' behaviour change? Are they completing an action quicker now? Are they able to achieve something they weren't before? This can be measured in qualitative ways, e.g., via in-product survey or by the number and content of support tickets that concern that topic. Also, by quantitative ways in your product analytics, looking at how many people use that new feature or if the retention or funnel completion metrics improved.

[Upgrade to paid button]

### Putting it into practice

By diligently identifying edge cases, implementing thoughtful error handling, and consistently prioritising outcomes over mere outputs, you'll elevate your user stories from simple descriptions to powerful tools for building products that truly deliver value and a seamless user experience. Don't feel you need to perfect everything at once; try making edge case identification a team activity, or ensure your next error message is clear and actionable.

In our final article of this series, Part 4, we'll bring all these principles together, offering practical steps to embed them into your team's workflow and measure the tangible improvements in your product development process.

[Subscribe button]

## References

- Mastering User Stories – Part 1 | User Stories Unpacked: The Power of Conversations — https://productkind.substack.com/p/mastering-user-stories-part-1-user
- Mastering User Stories – Part 2 | Crafting Clear User Stories: Slicing, Structure, and Succinct Titles — https://productkind.substack.com/p/mastering-user-stories-part-2
