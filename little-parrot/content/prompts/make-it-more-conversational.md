## Goal
- Make course material more conversational and friendlier.

## About
- ChatGPT
- Little Parrot project
- Search selected

## Prompt
I'm designing a new micro-course for Little Parrot. It's about helping a non-technical women who build digital products with Lovable (AI app builder) to gain technical literacy. The goal is that they understand how software works, so they can build with vibe coding tools (AI app builders) more efficiently.

Below you can see the learning material we developed for the course. Make the learning material (values) more conversational and friendly, make it more practical, so learners can apply what they learn while building with AI-development tools. While making these changes, keep the exact structure of the JSON.

## Learning Material
```
{
  "course": {
    "id": "7e2c2d2c-0d7b-4b1f-8c2e-3a3ab0d9a1e7",
    "cover": "/courses/vibe-coding-tech-00/cover.gif",
    "title": "Basics of Software for Vibe Coding",
    "challenges": [
      {
        "steps": [
          {
            "type": "comic",
            "content": {
              "imageUrl": "/comics/vibe-coding-tech-00/panel-00.png"
            }
          },
          {
            "type": "comic",
            "content": {
              "imageUrl": "/comics/vibe-coding-tech-00/panel-01.png"
            }
          },
          {
            "type": "comic",
            "content": {
              "imageUrl": "/comics/vibe-coding-tech-00/panel-02.png"
            }
          },
          {
            "type": "comic",
            "content": {
              "imageUrl": "/comics/vibe-coding-tech-00/panel-03.png"
            }
          },
          {
            "type": "text",
            "title": "Definition of vibe coding",
            "content": {
              "body": "**Vibe coding** is a way of creating software by describing what you want to build in natural language (e.g. in English) instead of writing code. You explain how the app should look, feel, and behave, and an AI tool translates your words into code and working features.",
              "imageUrl": "/courses/vibe-coding-tech-00/vibe.gif"
            },
            "subtitle": "What is vibe coding?"
          },
          {
            "type": "video",
            "title": "Building blocks of an application",
            "content": {
              "youtubeId": "awgGgaMmsBs"
            }
          },
          {
            "type": "text",
            "title": "Building blocks of an application",
            "content": {
              "body": "Just like a bakery has different parts for different functions, such as baking and serving customers, an application is also made up of several parts.",
              "imageUrl": "/courses/vibe-coding-tech-00/bakery.gif"
            },
            "subtitle": "Getting started."
          },
          {
            "type": "text",
            "title": "Building blocks of an application",
            "content": {
              "body": "The two most important parts of an application are the frontend and the backend.",
              "imageUrl": "/courses/vibe-coding-tech-00/server-client.png"
            },
            "subtitle": "Introducing the key players."
          },
          {
            "type": "text",
            "title": "Building blocks of an application",
            "content": {
              "body": "The **frontend** runs on the user’s device, often called the **client**. It’s the part of the application responsible for displaying the **user interface** (UI) and handling interactions.\n\nYou can think of the frontend as the customer-facing part of a bakery, like the cashier who hands you the cinnamon roll you ordered.",
              "imageUrl": "/courses/vibe-coding-tech-00/cashier.gif"
            },
            "subtitle": "I am facing you!"
          },
          {
            "type": "text",
            "title": "Building blocks of an application",
            "content": {
              "body": "The **backend** handles tasks that can’t be managed by the user’s device, for example, sending emails or storing data that can be accessed from anywhere. These programs run on computers in data centres, usually referred to as **servers**.\n\nA good metaphor is the baker who works out of sight but provides all the delicious goods for the cashier to serve.",
              "imageUrl": "/courses/vibe-coding-tech-00/baker.gif"
            },
            "subtitle": "I work behind the scenes."
          },
          {
            "type": "text",
            "title": "Building blocks of an application",
            "content": {
              "body": "Data centres are filled with computers running the backends of many applications. Companies can rent these computers, and the provider ensures they stay up and running. This is known as **cloud computing**, or **cloud** in short, since we often don’t know where the machines are located.\n\nAI coding platforms, like Lovable, handle all the server-related work for us, so we don’t need to set up remote computers ourselves.",
              "imageUrl": "/courses/vibe-coding-tech-00/cloud.gif"
            },
            "subtitle": "Up in the cloud."
          },
          {
            "type": "text",
            "title": "Building blocks of an application",
            "content": {
              "body": "For larger applications, dedicated teams manage the computers running the backends, generally referred to as the **infrastructure**, to make sure everything works as intended.",
              "imageUrl": "/courses/vibe-coding-tech-00/datacenter.gif"
            },
            "subtitle": "The backbone of reliability."
          },
          {
            "type": "text",
            "title": "Building blocks of an application",
            "content": {
              "body": "The last important part of an application is the **database**. It’s a program running on the servers that stores all the necessary information (e.g., user information, product invenory for an online shop). The backend connects to the database and can both read from and write to it.",
              "imageUrl": "/courses/vibe-coding-tech-00/database.gif"
            },
            "subtitle": "Where the facts live."
          },
          {
            "type": "quiz-question",
            "title": "Quiz: Building blocks",
            "content": {
              "options": [
                "Backend",
                "Infrastructure",
                "Frontend",
                "Database"
              ],
              "question": "Which part of an app runs on the user’s device?",
              "explanation": "The frontend is what users see, the backend handles tasks behind the scenes, and the database stores the information. The infrastructure is the set of services that keep everything running. It’s where your app actually lives and how it gets delivered to people. Together, they make your app work. The goal isn’t to memorise these terms, but to recognise them so you can talk to your AI app builder more clearly.",
              "correctAnswer": 2
            }
          },
          {
            "type": "quiz-question",
            "title": "Quiz: Building blocks",
            "content": {
              "options": [
                "The backend only",
                "The frontend displaying data from the backend",
                "The database directly",
                "The infrastructure"
              ],
              "question": "Which part of an app would handle showing a user their saved notes?",
              "explanation": "The backend retrieves the notes from the database, sends them to the frontend, and the frontend displays them to the user. All these parts working together.",
              "correctAnswer": 1
            }
          },
          {
            "type": "quiz-question",
            "title": "Quiz: Building blocks",
            "content": {
              "options": [
                "The app won’t load images or animations.",
                "The app looks fine but can’t load or save data.",
                "The app’s colours change randomly.",
                "The database will automatically repair itself."
              ],
              "question": "If the backend of an app stops working, what might users experience?",
              "explanation": "When the backend fails, the frontend still appears but can’t fetch or store data. Features like login or saving information won’t work.",
              "correctAnswer": 1
            }
          },
          {
            "type": "reflection",
            "title": "Micro-reflection",
            "content": {
              "description": "Take a moment to write down your key takeaways you've just learned.",
              "placeholder": "Type your answer here...",
              "subDescription": "This quick reflection will make it easier to adapt your learning later, no matter the tool or context."
            }
          },
          {
            "type": "challenge-end",
            "title": "You’ve learned how an app is structured! 🎉",
            "content": {
              "cta": "Next",
              "nextModule": "**Next up:** You’ll learn the design terms that help you describe how your app should look and feel.",
              "description": "Knowing the parts helps you build with confidence.",
              "subDescription": "Now that you understand how the pieces fit together, you can describe them clearly to an AI tool, and better understand its response."
            }
          }
        ],
        "title": "Building Blocks of an Application",
        "isFree": true,
        "skills": [
          "Vibe Coding",
          "Frontend",
          "Backend",
          "Infrastructure",
          "Database",
          "Cloud Computing",
          "UI"
        ],
        "description": "Get familiar with the core parts of an app so you can brief an AI builder clearly.",
        "completionTime": "7:00"
      },
      {
        "steps": [
          {
            "type": "text",
            "title": "Design words that tools understand",
            "content": {
              "body": "Good prompts need precise design language. In this challenge you’ll learn terms, like **wireframes, icons, design systems, colours, and fonts**, so you can easily describe look and feel.",
              "imageUrl": "/courses/vibe-coding-tech-00/dog-paint.gif"
            },
            "subtitle": "Describe what you visually imagine."
          },
          {
            "type": "text",
            "title": "Wireframes first",
            "content": {
              "body": "A **wireframe** is a simple sketch of a screen. It shows the **layout**, meaning where each element sits on the page, without any styling or colour.\n\nIt is worth sketching wireframes just on paper or whiteboard first to clarify your thoughts before writing prompts. It is also something that professional designers do to plan screens quickly.",
              "imageUrl": "/courses/vibe-coding-tech-00/wireframe.gif"
            },
            "subtitle": "Structure before style."
          },
          {
            "type": "text",
            "title": "Components",
            "content": {
              "body": "Design elements are the building blocks of a screen, such as buttons, text fields, cards, pop-ups, navigation bars and icons. These building blocks are often called **components**. When you name a component in your prompt, the tool has a much easier time creating the right thing.\n\nWe’ll look at some common components in this section.",
              "imageUrl": "/courses/vibe-coding-tech-00/components.gif"
            },
            "subtitle": "Elements of design language."
          },
          {
            "type": "text",
            "title": "Components",
            "content": {
              "body": "Used to trigger an action, such as Save, Submit, or Next.",
              "imageUrl": "/courses/vibe-coding-tech-00/button.png"
            },
            "subtitle": "Buttons"
          },
          {
            "type": "text",
            "title": "Components",
            "content": {
              "body": "Fields where users can type information like a name, email, or message. A field that allows multiple lines of text is called a **textarea**.",
              "imageUrl": "/courses/vibe-coding-tech-00/field.png"
            },
            "subtitle": "Input fields"
          },
          {
            "type": "text",
            "title": "Components",
            "content": {
              "body": "A container that groups related information, such as a product or article summary. Often includes an image, title, description, and action button.",
              "imageUrl": "/courses/vibe-coding-tech-00/card.png"
            },
            "subtitle": "Cards"
          },
          {
            "type": "text",
            "title": "Components",
            "content": {
              "body": "A bar at the top or side of the screen for navigating between sections of the app. Common patterns include top **nav bars** with links and side **nav drawers**.",
              "imageUrl": "/courses/vibe-coding-tech-00/navbar.png"
            },
            "subtitle": "Navigation bars"
          },
          {
            "type": "text",
            "title": "Components",
            "content": {
              "body": "A small window that appears on top of the main content to display information or prompt for action, such as alerts, confirmations, or forms.",
              "imageUrl": "/courses/vibe-coding-tech-00/modal.png"
            },
            "subtitle": "Modals"
          },
          {
            "type": "text",
            "title": "Components",
            "content": {
              "body": "A list of options that opens when you click a button or field, used when there are several choices.",
              "imageUrl": "/courses/vibe-coding-tech-00/dropdown.png"
            },
            "subtitle": "Dropdowns"
          },
          {
            "type": "text",
            "title": "Components",
            "content": {
              "body": "Small graphical representations that convey meaning or indicate actions, such as a trash can for delete or a magnifying glass for search.",
              "imageUrl": "/courses/vibe-coding-tech-00/icons.png"
            },
            "subtitle": "Icons"
          },
          {
            "type": "text",
            "title": "Components",
            "content": {
              "body": "On [this website](https://component.gallery/components/) you can explore a wide variety of common UI components used in web and mobile applications. It’s a great resource to familiarise yourself with different design elements and their variations.",
              "imageUrl": "/courses/vibe-coding-tech-00/more.gif"
            },
            "subtitle": "There are way more components!"
          },
          {
            "type": "text",
            "title": "Design systems",
            "content": {
              "body": "A **design system** is a collection of reusable components, styles, and guidelines that ensure consistency across an application. There are multiple popular ready-made ones, but most of the vibecoding tools are using [shadcn/ui](https://ui.shadcn.com/) as a base. You can check out the components you can use on [their website](https://ui.shadcn.com/docs/components)."
            },
            "subtitle": "Consistency is key."
          },
          {
            "type": "text",
            "title": "Colours",
            "content": {
              "body": "Colours in your app are usually defined with short codes, such as a **hex code** like `#fdb226` (this is a deep yellow). Most vibecoding tools also understand plain colour names, such as “dark blue” or “soft grey”, so you don’t always need the exact code.\n\nYou can search for a “colour picker” in Google to find the code for any shade you need.",
              "imageUrl": "/courses/vibe-coding-tech-00/colors.gif"
            },
            "subtitle": "Make it pop."
          },
          {
            "type": "text",
            "title": "Colours",
            "content": {
              "body": "If you want help choosing a palette, tools like [coolors](https://coolors.co/) can generate colour combinations for you.\n\nA small, consistent palette usually works well. Three to five colours are often enough when you are starting out. Colours also set the mood of your app, so choosing them with intention can make even simple screens feel more polished.",
              "imageUrl": "/courses/vibe-coding-tech-00/colors.png"
            },
            "subtitle": "Choose your vibe."
          },
          {
            "type": "text",
            "title": "Fonts",
            "content": {
              "body": "Fonts define how text looks. Common categories include **serif** (with small lines at the ends of letters, e.g. Times New Roman), and **sans-serif** (without those lines, e.g. Arial).",
              "imageUrl": "/courses/vibe-coding-tech-00/fonts.jpeg"
            },
            "subtitle": "Set the tone."
          },
          {
            "type": "text",
            "title": "Fonts",
            "content": {
              "body": "Another category is **monospace** where each letter takes up the same width, including the space around it (e.g. Courier New).",
              "imageUrl": "/courses/vibe-coding-tech-00/monospace.png"
            },
            "subtitle": "Techy and precise."
          },
          {
            "type": "text",
            "title": "Fonts",
            "content": {
              "body": "The [fonts.google.com](https://fonts.google.com/) website is full of free fonts that vibe coding tools can use. If you want help finding good font pairings, you can use [fontpair.co](https://fontpair.co/).\n\nKeep it simple: one font for headings and another for body text is usually enough.",
              "imageUrl": "/courses/vibe-coding-tech-00/fonts.gif"
            },
            "subtitle": "Find your style."
          },
          {
            "type": "quiz-question",
            "title": "Quiz: Design",
            "content": {
              "options": [
                "Dropdown",
                "Modal",
                "Card",
                "Button"
              ],
              "question": "Which component temporarily appears on the top layer of the screen to prompt the user?",
              "explanation": "A modal appears over the screen to show a message, form, or alert.",
              "correctAnswer": 1
            }
          },
          {
            "type": "quiz-question",
            "title": "Quiz: Design",
            "content": {
              "options": [
                "To pick a colour palette",
                "To generate wireframes automatically",
                "To provide reusable components and rules for consistent design",
                "To choose fonts for an app"
              ],
              "question": "What is the main role of a design system?",
              "explanation": "Design systems keep design consistent across an app through components and guidelines.",
              "correctAnswer": 2
            }
          },
          {
            "type": "quiz-question",
            "title": "Quiz: Design",
            "content": {
              "options": [
                "Serif fonts have small lines at the ends of letters; sans-serif fonts do not.",
                "Sans-serif fonts have small lines at the ends of letters; serif fonts do not.",
                "Monospace fonts have decorative elements; serif fonts do not.",
                "All font types are the same."
              ],
              "question": "What is the difference between serif and sans-serif fonts?",
              "explanation": "Serif fonts have small lines (serifs) at the ends of letters, while sans-serif fonts do not.",
              "correctAnswer": 0
            }
          },
          {
            "type": "quiz-question",
            "title": "Quiz: Design",
            "content": {
              "options": [
                "It reduces the number of screens you need",
                "It improves colour contrast automatically",
                "It shortens the prompt",
                "It helps the tool understand exactly what to generate"
              ],
              "question": "Why is naming components in your prompt helpful for vibe coding tools?",
              "explanation": "Clear component names give AI precise instructions about what to create.",
              "correctAnswer": 3
            }
          },
          {
            "type": "quiz-question",
            "title": "Quiz: Design",
            "content": {
              "options": [
                "When you need the user to trigger an action",
                "When you want to collect user input",
                "When you need a navigation bar",
                "When you want to group related content like an article preview"
              ],
              "question": "When is a card the most suitable component?",
              "explanation": "Cards group related information into a single visual container.",
              "correctAnswer": 3
            }
          },
          {
            "type": "quiz-question",
            "title": "Quiz: Design",
            "content": {
              "options": [
                "A font style",
                "A colour",
                "A design system pattern",
                "A component name"
              ],
              "question": "What does a hex code like `#fdb226` represent?",
              "explanation": "Hex codes are colour values used in digital design.",
              "correctAnswer": 1
            }
          },
          {
            "type": "reflection",
            "title": "Micro-reflection",
            "content": {
              "description": "Take a moment to write down your key takeaways you've just learned.",
              "placeholder": "Type your answer here...",
              "subDescription": "This quick reflection will make it easier to adapt your learning later, no matter the tool or context."
            }
          },
          {
            "type": "challenge-end",
            "title": "You can now describe look and layout clearly! 🎨",
            "content": {
              "cta": "Next",
              "nextModule": "**Next up:** The frontend – components, the box model, and HTML.",
              "description": "Great job! You’ve learned how to describe the look and feel of your app, and the building blocks to shape a coherent visual system, like a designer would.",
              "subDescription": "This is the language you can use with an AI app builder to create screens efficiently."
            }
          }
        ],
        "title": "Design Elements for Vibe Coders",
        "isFree": false,
        "skills": [
          "Wireframes",
          "Components",
          "Design Systems",
          "Colours",
          "Fonts"
        ],
        "description": "Get the words to describe layout and style so outputs match your intent.",
        "completionTime": "9:30"
      },
      {
        "steps": [
          {
            "type": "text",
            "title": "Frontend essentials",
            "content": {
              "body": "The **frontend** displays the UI and handles interactions. There are three languages that shape how frontends look and behave: **HTML** (structure), **CSS** (style), and **JavaScript** (behaviour).",
              "imageUrl": "/courses/vibe-coding-tech-00/html-css-js.png"
            },
            "subtitle": "The face of your app."
          },
          {
            "type": "text",
            "title": "HTML",
            "content": {
              "body": "The HTML (HyperText Markup Language) defines the structure and content of a webpage.",
              "imageUrl": "/courses/vibe-coding-tech-00/structure.gif"
            },
            "subtitle": "The backbone of UI."
          },
          {
            "type": "text",
            "title": "HTML elements",
            "content": {
              "body": "HTML uses **elements** (tags) to represent different types of content, such as headings, paragraphs , links, images, and lists. Elements are nested to create a hierarchical structure.",
              "imageUrl": "/courses/vibe-coding-tech-00/boxes.gif"
            },
            "subtitle": "Building blocks of structure."
          },
          {
            "type": "text",
            "title": "Anatomy of an HTML element",
            "content": {
              "body": "An HTML element consists of a **start tag**, **content**, and an **end tag**. For example, `<p>This is a paragraph.</p>` has a start tag `<p>`, content `This is a paragraph.`, and an end tag `</p>`.\n\nThe `p` in the tag indicates that it's a paragraph.",
              "imageUrl": "/courses/vibe-coding-tech-00/element.png"
            },
            "subtitle": "Tags, content, and structure."
          },
          {
            "type": "text",
            "title": "Types of HTML elements",
            "content": {
              "body": "There are around 140 HTML elements, each serving a specific purpose. Common ones include:\n\n- **Headings**: `<h1>` to `<h6>` for titles and subtitles.\n- **Paragraphs**: `<p>` for blocks of text.\n- **Links**: `<a>` for hyperlinks.\n- **Images**: `<img>` for displaying pictures.\n- **Lists**: `<ul>` and `<ol>` for unordered and ordered lists, and `<li>` for list items.\n- **Divisions**: `<div>` for grouping elements together.",
              "imageUrl": "/courses/vibe-coding-tech-00/html-code.png"
            },
            "subtitle": "Making it look good."
          },
          {
            "type": "text",
            "title": "HTML semantics",
            "content": {
              "body": "It is important which HTML elements you use, as they convey meaning. Not just appearance, but also accessibility and search engine optimalisation also known as SEO.\n\nScreen reader tools for the visually impaired rely on semantic HTML to interpret content correctly. Also search engines use it to understand page structure.",
              "imageUrl": "/courses/vibe-coding-tech-00/meaning.gif"
            },
            "subtitle": "Styling your app."
          },
          {
            "type": "video",
            "title": "Box model",
            "content": {
              "youtubeId": "PROSbOyXF3U"
            }
          },
          {
            "type": "text",
            "title": "Components",
            "content": {
              "body": "We learned in the previous challenge that **in design systems**, components are reusable building blocks, like buttons, cards, modals, and nav bars.\n\n**In frontend development**, the idea is the same. A component is still a self-contained piece of UI, but it can cover a wider range of things. It might be a simple button or something larger, such as a full page layout that includes several smaller parts\n\nThis means that if we want the same look and behaviour in different places around our app, we can **ask the AI to use the same component** rather than describing it from scratch each time.",
              "imageUrl": "/courses/vibe-coding-tech-00/component.gif"
            },
            "subtitle": "Reusable building blocks."
          },
          {
            "type": "quiz-question",
            "title": "Quiz: Frontend",
            "content": {
              "options": [
                "It controls backend logic",
                "It defines the structure and content of a webpage",
                "It creates animations",
                "It manages data storage"
              ],
              "question": "What does HTML do?",
              "explanation": "HTML provides the structure and content of the UI.",
              "correctAnswer": 1
            }
          },
          {
            "type": "quiz-question",
            "title": "Quiz: Frontend",
            "content": {
              "options": [
                "Because they change the colour of text",
                "Because search engines and screen readers rely on them",
                "Because they load faster than other elements",
                "Because they are easier to code"
              ],
              "question": "Why does semantic HTML structure matter?",
              "explanation": "The structure of HTML helps accessibility tools (like screen readers) and search engines understand the structure of the website.",
              "correctAnswer": 1
            }
          },
          {
            "type": "quiz-question",
            "title": "Quiz: Frontend",
            "content": {
              "options": [
                "Margin, padding, border, and content",
                "Text, colour, alignment, and size",
                "Header, body, footer, and sidebar",
                "Width, height, position, and alignment"
              ],
              "question": "What are the four parts of the box model?",
              "explanation": "All elements on a website are boxes consisting of content, padding, border, and margin.",
              "correctAnswer": 0
            }
          },
          {
            "type": "quiz-question",
            "title": "Quiz: Frontend",
            "content": {
              "options": [
                "JavaScript",
                "HTML",
                "CSS",
                "A design system"
              ],
              "question": "Which technology is responsible for enabling interactive behaviour in the browser?",
              "explanation": "JavaScript handles clicks, animations, data fetching, and other interactions.",
              "correctAnswer": 0
            }
          },
          {
            "type": "quiz-question",
            "title": "Quiz: Frontend",
            "content": {
              "options": [
                "Describe the visual style of the entire app in one component",
                "Recreate the same UI behaviour from scratch each time",
                "Reuse the same structure and behaviour without rewriting prompts",
                "Replace HTML entirely"
              ],
              "question": "Why is thinking in components helpful for vibe coding?",
              "explanation": "If you prompt for the same component, the tool can recreate the same look and behaviour without extra description.",
              "correctAnswer": 2
            }
          },
          {
            "type": "quiz-question",
            "title": "Quiz: Frontend",
            "content": {
              "options": [
                "<div>",
                "<h1>",
                "<p>",
                "<li>"
              ],
              "question": "Which element is most commonly used to group other elements together?",
              "explanation": "<div> is a generic container often used for grouping and layout.",
              "correctAnswer": 0
            }
          },
          {
            "type": "quiz-question",
            "title": "Quiz: Frontend",
            "content": {
              "options": [
                "It handles server-side database queries",
                "It controls how elements are styled and displayed",
                "It defines the meaning of each HTML element",
                "It creates reusable UI components automatically"
              ],
              "question": "What is the primary role of CSS in the frontend?",
              "explanation": "CSS handles styling such as colours, spacing, layout, and typography.",
              "correctAnswer": 1
            }
          },
          {
            "type": "challenge-end",
            "title": "Well done! Frontend nailed! 💻",
            "content": {
              "cta": "Next",
              "nextModule": "**Next up:** The backend – APIs, authentication, and functions.",
              "description": "You can now specify components, spacing, and semantics so the AI tool assembles predictable UI.",
              "subDescription": "This saves countless back-and-forths later."
            }
          }
        ],
        "title": "Frontend for Vibe Coders",
        "isFree": false,
        "skills": [
          "Components",
          "Box Model",
          "HTML Semantics"
        ],
        "description": "Learn the terms that make frontends appear the way you intend.",
        "completionTime": "10:00"
      },
      {
        "steps": [
          {
            "type": "text",
            "title": "Backend in plain English",
            "content": {
              "body": "The **backend** runs logic, talks to the database, and integrates with other services. You'll learn about **APIs**, **API keys**, **authentication**, **backend functions**, and **third-party services**.",
              "imageUrl": "/courses/vibe-coding-tech-00/backend-dev.gif"
            },
            "subtitle": "What happens after the button is clicked?"
          },
          {
            "type": "text",
            "title": "Backends",
            "content": {
              "body": "Backends come in many shapes and sizes, and can use different programming languages. AI builder tools often use Supabase as a backend. Supabase is a backend platform that gives you common features like user login, databases and storage without much setup. It is convenient because it offers plenty of functionality out of the box and is easy to set up and use.",
              "imageUrl": "/courses/vibe-coding-tech-00/supabase.png"
            },
            "subtitle": "Supabase as a backend."
          },
          {
            "type": "text",
            "title": "Backend functions",
            "content": {
              "body": "Supabase is providing **backend functions** for running tasks on the backends. They are performing a specific job, such as validate input, save to database, or send an email. When you prompt an AI app builder for any functionality like these, it will create a backend function to handle it.",
              "imageUrl": "/courses/vibe-coding-tech-00/backend-function.gif"
            },
            "subtitle": "Small, purposeful units."
          },
          {
            "type": "text",
            "title": "Third-party services",
            "content": {
              "body": "In many cases, we need features that are already solved by another company, and we can rely on their solution. This is called using **third-party services**.\n\nExamples include, sending emails or text messages, creating or reading posts on social media, or handling payments. These services usually cost money to use, but they are far cheaper than building the same functionality ourselves. Most of them also offer a free tier for low usage.",
              "imageUrl": "/courses/vibe-coding-tech-00/service.gif"
            },
            "subtitle": "Clear contracts reduce bugs."
          },
          {
            "type": "text",
            "title": "APIs",
            "content": {
              "body": "To make sure these third-party services do what we want, we need a way to communicate with them. We do this through an **Application Programming Interface**, or **API**.\n\nAn API is simply a set of instructions you can send through the internet to a third-party service. AI builders can usually work with APIs, but they sometimes make mistakes, so you may need to prompt them to double-check their work.",
              "imageUrl": "/courses/vibe-coding-tech-00/api.gif"
            },
            "subtitle": "Talking to other services."
          },
          {
            "type": "text",
            "title": "Accounts on third-party services",
            "content": {
              "body": "To use a third-party service, you usually need to create an account on their website. This account is how they identify you and track your usage. When you sign up, you may need to provide some personal details and payment information. These portals are often designed for developers, so if you feel overwhelmed, don’t hesitate to look for a tutorial to guide you through it.",
              "imageUrl": "/courses/vibe-coding-tech-00/account.gif"
            },
            "subtitle": "Getting set up."
          },
          {
            "type": "text",
            "title": "API keys",
            "content": {
              "body": "When we use APIs, we need to make sure the service can identify our application. To do this, we use **API keys**. An API key is a simple string of characters that our backend sends with every request it makes to a service.\n\nBecause it identifies our account, it is important to store it securely. AI builders usually ask for these keys in a dedicated part of their interface. Make sure you only paste your key there and never include it in a normal prompt. You can usually create and find your API keys in the account pages of the service you use.",
              "imageUrl": "/courses/vibe-coding-tech-00/api-key.gif"
            },
            "subtitle": "Secure access tokens."
          },
          {
            "type": "text",
            "title": "Authentication vs authorisation",
            "content": {
              "body": "The process in your application that signs up or signs in users is called **authentication**. The process that defines what rights and roles a user has in the application is called **authorisation**.\n\nAI builders can usually set up authentication easily because Supabase provides this out of the box. You can also prompt the tool to allow sign-in with email or social media accounts.",
              "imageUrl": "/courses/vibe-coding-tech-00/auth.gif"
            },
            "subtitle": "Who vs what."
          },
          {
            "type": "quiz-question",
            "title": "Quiz: Auth terminology",
            "content": {
              "options": [
                "Authentication verifies identity; authorisation verifies permissions.",
                "Authorisation verifies identity; authentication verifies permissions.",
                "Both mean the same thing.",
                "Neither is related to security."
              ],
              "question": "Pick the correct definition pair for authentication and authorisation.",
              "explanation": "Authentication is about verifying who your user is, while authorisation is about what the user can do.",
              "correctAnswer": 0
            }
          },
          {
            "type": "quiz-question",
            "title": "Quiz: Backend functions",
            "content": {
              "options": [
                "UI elements that display information to the user.",
                "Reusable colour palettes for an app.",
                "Small units that run tasks like validating input or saving data.",
                "Tools for managing user layouts."
              ],
              "question": "What are backend functions used for?",
              "explanation": "Backend functions perform focused tasks such as validating data or sending emails.",
              "correctAnswer": 2
            }
          },
          {
            "type": "quiz-question",
            "title": "Quiz: Using third-party services",
            "content": {
              "options": [
                "To avoid building complex functionality from scratch.",
                "To replace all backend functions in an application.",
                "To store fonts and images for the frontend.",
                "To run code directly on a user’s device."
              ],
              "question": "Why do we use third-party services?",
              "explanation": "They provide ready-made solutions for tasks like payments or messaging, which saves time and cost.",
              "correctAnswer": 0
            }
          },
          {
            "type": "quiz-question",
            "title": "Quiz: API purpose",
            "content": {
              "options": [
                "APIs define how a user interface should look.",
                "APIs store user passwords securely.",
                "APIs are used only for social media apps.",
                "APIs let applications send instructions to another service."
              ],
              "question": "What is the purpose of an API?",
              "explanation": "An API is the way one system communicates with another over the internet.",
              "correctAnswer": 3
            }
          },
          {
            "type": "quiz-question",
            "title": "Quiz: Handling API keys",
            "content": {
              "options": [
                "A password a user enters to log into your app.",
                "A secret token that identifies your application when calling a service.",
                "A design asset used in frontend layouts.",
                "A type of database table used for authentication."
              ],
              "question": "What is an API key?",
              "explanation": "An API key is sent with each request so the third-party service knows which account is making the call.",
              "correctAnswer": 1
            }
          },
          {
            "type": "challenge-end",
            "title": "Amazing work! Backend basics locked in! 🔐",
            "content": {
              "cta": "Next",
              "nextModule": "**Next up:** Databases – structure, safety, and the ‘no undo’ reality.",
              "description": "You can now describe APIs, auth, and functions so behaviour is unambiguous.",
              "subDescription": "Clear backend prompts reduce flaky logic and hidden failure modes."
            }
          }
        ],
        "title": "Backend for Vibe Coders",
        "isFree": false,
        "skills": [
          "APIs",
          "Authentication",
          "Backend Design"
        ],
        "description": "Discover how to specify behaviours, permissions, and integrations cleanly.",
        "completionTime": "10:30"
      },
      {
        "steps": [
          {
            "type": "text",
            "title": "Databases without the mystery",
            "content": {
              "body": "Databases store facts about your product, such as users, orders or posts. These are typically kept in relational databases, which are designed to store data similar to a spreadsheet, but with a fixed structure.",
              "imageUrl": "/courses/vibe-coding-tech-00/storage.gif"
            },
            "subtitle": "From ideas to structured data."
          },
          {
            "type": "text",
            "title": "Shape your data",
            "content": {
              "body": "Relational databases organise data into **tables** (entities) made up of **rows** (records) and **columns** (fields). Every column has a name and a **data type**, such as text, numbers, dates or booleans (true or false values).",
              "imageUrl": "/courses/vibe-coding-tech-00/table.gif"
            },
            "subtitle": "Names, fields"
          },
          {
            "type": "text",
            "title": "Relationships",
            "content": {
              "body": "Tables can be linked together using **relationships**. Every table has a special column called the **primary key**. It is a unique identifier for each record, often named `id`. Other tables can reference this primary key using a **foreign key** column, which creates a relationship between the two tables.\n\nFor example, an `orders` table might have a foreign key column `user_id` that links to the `id` column in the `users` table. This lets you associate each order with the user who placed it.",
              "imageUrl": "/courses/vibe-coding-tech-00/relationships.gif"
            },
            "subtitle": "Connecting the dots."
          },
          {
            "type": "text",
            "title": "SQL",
            "content": {
              "body": "**SQL** (Structured Query Language) is the language used to interact with relational databases. It allows you to define the structure of your data, insert new records, delete or update existing ones, and retrieve information based on specific criteria.\n\nYou can recognise SQL commands by keywords like `SELECT`, `INSERT`, `UPDATE`, `DELETE`, `CREATE`, `ALTER` and `DECLARE`.",
              "imageUrl": "/courses/vibe-coding-tech-00/sql.png"
            },
            "subtitle": "The language of databases."
          },
          {
            "type": "text",
            "title": "The ‘no undo’ reality",
            "content": {
              "body": "Deletes and destructive updates can be **irreversible** in a database. Therefore when an AI builder touches the database it's usually showing the SQL code it will run before executing it. This gives you a chance to review and confirm the action, reducing the risk of accidental data loss.\n\nIf you cannot (yet) read SQL, you can ask the AI app builder to explain the code in plain English before confirming.",
              "imageUrl": "/courses/vibe-coding-tech-00/check.gif"
            },
            "subtitle": "Design for mistakes to be survivable."
          },
          {
            "type": "text",
            "title": "Backups",
            "content": {
              "body": "Regular **backups** are valuable safety nets. They let you restore data to a previous state if something goes wrong. Many database platforms offer automated backup solutions, such as Supabase’s point-in-time recovery, but you often need a paid plan to access them.",
              "imageUrl": "/courses/vibe-coding-tech-00/backup.gif"
            },
            "subtitle": "Your safety net."
          },
          {
            "type": "text",
            "title": "Security",
            "content": {
              "body": "Databases often store sensitive information, so managing access properly is important. You can set different types of rules to control who can read or update data in each table or even individual rows.\n\nDatabase security is a broad topic with plenty of technical terms (such as RBAC, RLS, and ACLs). The good news is that most AI app builders include built-in security reviews that handle the essentials for you.\n\nThese checks scan your code before you publish any changes and highlight anything that might need attention. If something comes up, you can usually ask the AI to sort it out.\n\n There is no need to worry when you see security warnings. Developers deal with these all the time. Think of these tools as an extra pair of eyes that can also help you fix the issues straight away.",
              "imageUrl": "/courses/vibe-coding-tech-00/security.gif"
            },
            "subtitle": "Protect your data."
          },
          {
            "type": "quiz-question",
            "title": "Quiz: Database",
            "content": {
              "options": [
                "Tables",
                "Rows",
                "Columns",
                "All of the above"
              ],
              "question": "Which of the following are basic parts of a relational database table?",
              "explanation": "Tables contain rows and columns; all three form the structure.",
              "correctAnswer": 3
            }
          },
          {
            "type": "quiz-question",
            "title": "Quiz: Database",
            "content": {
              "options": [
                "A record’s unique identifier",
                "A list of allowed colours",
                "A type of SQL query",
                "An identifier for API access"
              ],
              "question": "What is a primary key?",
              "explanation": "A primary key uniquely identifies each record in a table.",
              "correctAnswer": 0
            }
          },
          {
            "type": "quiz-question",
            "title": "Quiz: Database",
            "content": {
              "options": [
                "To combine unrelated tables",
                "To link one table’s primary key to another table",
                "To automatically delete all data",
                "To define the layout of frontend components"
              ],
              "question": "What is the purpose of a foreign key?",
              "explanation": "A foreign key refers to another table’s primary key, connecting the two tables.",
              "correctAnswer": 1
            }
          },
          {
            "type": "quiz-question",
            "title": "Quiz: Database",
            "content": {
              "options": [
                "SQL commands cannot modify data",
                "SQL is used to read, write, update, and delete data",
                "SQL only works on the frontend",
                "SQL is a visual design tool"
              ],
              "question": "What is SQL used for?",
              "explanation": "SQL lets you define structure and interact with the data in relational databases.",
              "correctAnswer": 1
            }
          },
          {
            "type": "quiz-question",
            "title": "Quiz: Database",
            "content": {
              "options": [
                "Destructive actions may be irreversible",
                "The database always creates automatic backups",
                "SQL code cannot delete data",
                "The database always restores itself"
              ],
              "question": "Why does this micro-course emphasise reviewing SQL before running it?",
              "explanation": "SQL deletes and updates can be irreversible, so reviewing helps avoid accidental data loss.",
              "correctAnswer": 0
            }
          },
          {
            "type": "course-end",
            "title": "Congratulations! You speak “software” now! 🎊",
            "content": {
              "nextModule": "Next up: Turn one of your ideas into a tiny, testable product with an AI builder. Keep the scope small, ship early, and let real users teach you what to do next.",
              "description": "In this micro-course, you turned vague ‘vibes’ into clear, software-ready language:",
              "subDescription": "✓ You can explain frontend, backend, infrastructure, and databases in plain English (so you can brief AI tools and team-mates clearly).\n\n✓ You know core design terms like wireframes, components, colours, and fonts (so your prompts describe layout and style precisely).\n\n✓ You understand how HTML, CSS, and JavaScript work together on the frontend (so you can reason about what the AI is generating).\n\n✓ You can talk about backend concepts such as APIs, API keys, authentication, and backend functions (so you can specify behaviours and integrations safely).\n\n✓ You grasp relational database basics: tables, relationships, SQL, and backups (so your app’s data model matches your product thinking).\n\n✓ You can spot risky moments, like destructive SQL changes or exposed API keys (so you avoid common pitfalls when shipping early versions).\n\n✓ You now share a vocabulary with AI builders and developers (so collaboration feels smoother, not intimidating).\n\nSoftware tools will keep changing, but these foundations stay surprisingly stable. The more you practise describing products in this language, the more leverage you’ll get from AI.\n\nRemember: **start small, describe clearly, ship often, and learn from real users**. You’re ready to build with confidence. 💪"
            }
          }
        ],
        "title": "Databases for Vibe Coders",
        "isFree": false,
        "skills": [
          "Relational Databases",
          "Tables",
          "SQL",
          "Data Types"
        ],
        "description": "Model entities and relationships and design guardrails for irreversible actions.",
        "completionTime": "9:30"
      }
    ],
    "titleSplit": [
      "Basics of Software",
      "for Vibe Coding"
    ],
    "description": "A practical foundation in how software works, so you can guide AI more efficiently when you build digital products with vibe coding."
  }
}
```

## Answer
Here’s the revised learning-material JSON, keeping your structure exactly but making the tone more conversational, more practical, and more friendly—so a learner building with AI app-builders like Lovable feels empowered rather than intimidated: