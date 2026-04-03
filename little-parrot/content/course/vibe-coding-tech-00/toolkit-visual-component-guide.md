# Visual Component Guide
**Challenge 2: Design Elements for Vibe Coders**

When you're prompting Lovable, using the right component name gets you what you want on the first try. This guide shows you what each component looks like, what it's called, and when to use it. Lovable uses a component library called **shadcn/ui**, so the names below are the ones Lovable understands best.

### Actions

These are the components your users click to make something happen.

| Component | What it looks like | When to use it |
|-----------|-------------------|----------------|
| **Button** | A clickable rectangle with text like "Save" or "Submit". Comes in styles: **primary** (filled, colourful), **secondary** (outline), **ghost** (text only), and **destructive** (red, for delete actions). | Any time the user needs to trigger an action. |
| **Toggle** | A small button that switches between on and off (like bold/italic in a text editor). | When the user needs to turn a single option on or off, like "Show completed items". |
| **Toggle Group** | A row of toggle buttons where the user picks one or more options. Looks like a segmented bar. | When the user chooses between a few visual options, like switching between grid view and list view. |

### Getting user input

These components collect information from your users.

| Component | What it looks like | When to use it |
|-----------|-------------------|----------------|
| **Input** | A single-line text box. The user types short text like a name, email, or title. | For short text: names, emails, search queries, titles. |
| **Textarea** | A multi-line text box, taller than an input. The user types longer text like descriptions or notes. | For longer text: descriptions, comments, messages, notes. |
| **Select** | A dropdown that opens a list of options when clicked. The user picks one. | When the user chooses from a predefined list (e.g., category, country, role). |
| **Combobox** | Like a Select, but the user can also type to search through the options. | When the list of options is long and the user needs to filter (e.g., searching for a city). |
| **Checkbox** | A small square that can be ticked or unticked. Often appears in a list where multiple can be selected. | When the user can select multiple options (e.g., "Select your interests"). |
| **Radio Group** | A set of circles where only one can be selected at a time. | When the user must pick exactly one option from a small set (e.g., "Free plan" or "Pro plan"). |
| **Switch** | A small sliding toggle, like the ones on your phone's settings screen. | For on/off settings (e.g., "Enable notifications", "Dark mode"). |
| **Slider** | A horizontal bar with a draggable handle. The user slides it to choose a value within a range. | For numeric ranges (e.g., price range, volume, brightness). |
| **Date Picker** | A text field that opens a calendar when clicked. The user picks a date. | When the user needs to select a date (e.g., deadline, event date, birthday). |
| **Calendar** | A full calendar grid always visible on the page. | When dates are the main focus of the page (e.g., booking system, event planner). |
| **Input OTP** | A row of individual boxes, one for each digit. Used for entering verification codes. | For verification codes sent by email or SMS. |
| **File Upload** | A box or button where the user can drag and drop or browse to upload a file. Sometimes called **Dropzone**. | When the user needs to upload images, documents, or other files. |

### Showing content

These components display information to your users.

| Component | What it looks like | When to use it |
|-----------|-------------------|----------------|
| **Card** | A rectangular box with a subtle border or shadow, grouping related content together (image, title, description, button). | For displaying items in a collection: products, blog posts, team members, recipes. |
| **Accordion** | A list of headings that expand and collapse to reveal content underneath. Only one (or a few) sections are open at a time. | For FAQs, settings panels, or any content where users don't need to see everything at once. |
| **Tabs** | A row of labels at the top. Clicking a label shows different content below it. | When you have related sections the user switches between (e.g., "Overview", "Reviews", "Specs"). |
| **Carousel** | A horizontal slider showing one item at a time, with arrows or swipe to move between items. | For image galleries, testimonials, or featured content. |
| **Table** | Rows and columns of data, like a spreadsheet. | For structured data: pricing comparisons, order histories, user lists. |
| **Data Table** | A Table with extra features: sorting, filtering, pagination, and row selection. | When your table has lots of data and users need to search, sort, or filter it. |
| **Avatar** | A small circle showing a user's photo or their initials as a fallback. | Next to usernames, in comments, in navigation headers, in team lists. |
| **Badge** | A small coloured label, often rounded, displaying a status or category (e.g., "New", "Pro", "Pending"). | For status indicators, tags, categories, or notification counts. |
| **Separator** | A thin horizontal or vertical line. | To visually divide sections of content on a page. |
| **Skeleton** | Grey placeholder shapes that pulse while content is loading. Looks like a greyed-out version of the real content. | To show users something is loading instead of a blank screen. |
| **Chart** | A visual representation of data: bar chart, line chart, pie chart, etc. | For dashboards, analytics pages, or anywhere you display trends and numbers. |

### Feedback and status

These components tell users what's happening.

| Component | What it looks like | When to use it |
|-----------|-------------------|----------------|
| **Alert** | A coloured box with a message, usually at the top of a section. Often includes an icon (info, warning, error, success). | For important messages that stay visible: warnings, errors, tips, success confirmations. |
| **Toast** | A small notification that slides in from the corner and disappears after a few seconds. Also called **Sonner** in shadcn. | For temporary feedback after an action: "Saved!", "Item deleted", "Link copied". |
| **Alert Dialog** | A pop-up box that blocks everything else until the user responds. Has a message and buttons like "Cancel" and "Confirm". | For destructive actions that need confirmation: "Are you sure you want to delete this?" |
| **Progress** | A horizontal bar that fills up to show how far along a process is. | For upload progress, multi-step forms, onboarding completion. |
| **Spinner** | A small spinning circle. | To show something is loading or processing (e.g., after clicking a button). |

### Navigation

These components help users move around your app.

| Component | What it looks like | When to use it |
|-----------|-------------------|----------------|
| **Navigation Menu** | A row of links at the top of the page, sometimes with dropdown sub-menus. | For the main menu of your app or website. |
| **Sidebar** | A vertical panel on the left (or right) side of the screen with links, icons, and sections. Often collapsible. | For apps with many pages or sections (e.g., dashboards, admin panels). |
| **Breadcrumb** | A horizontal trail showing where the user is: Home > Products > Shoes. Each part is a clickable link. | For apps with nested pages so users can navigate back easily. |
| **Pagination** | Page numbers with Previous/Next buttons at the bottom of a list. | When your content spans multiple pages (e.g., search results, product listings). |
| **Menubar** | A horizontal bar with dropdown menus (like File, Edit, View in desktop apps). | For app-like interfaces that need many organised actions. |
| **Command** | A search-style popup (often opened with Ctrl+K or Cmd+K) that lets users type to find actions or pages quickly. | For power-user features: quick search, keyboard-driven navigation. |
| **Context Menu** | A menu that appears when the user right-clicks on something. | For additional actions on specific items (e.g., right-click a file to rename, delete, or move it). |

### Overlays and popups

These components appear on top of the main content.

| Component | What it looks like | When to use it |
|-----------|-------------------|----------------|
| **Dialog** | A centred pop-up window that dims the background. Has a title, content, and action buttons. Also called **Modal**. | For forms, confirmations, or detailed views that need focus without leaving the page. |
| **Drawer** | A panel that slides in from the bottom (mobile) or side (desktop). Also called **Sheet** in shadcn. | For mobile-friendly forms, filters, or detail views. |
| **Popover** | A small floating box that appears when the user clicks a trigger element. | For extra options, colour pickers, or small forms that don't need a full dialog. |
| **Tooltip** | A tiny text label that appears when the user hovers over (or focuses on) an element. | To explain what an icon or button does without cluttering the interface. |
| **Hover Card** | Like a tooltip, but richer: can contain images, links, and formatted text. Appears on hover. | For previewing content behind a link (e.g., hovering over a username to see their profile). |

### Layout and structure

These components organise the overall structure of your pages.

| Component | What it looks like | When to use it |
|-----------|-------------------|----------------|
| **Collapsible** | A section that can be expanded or collapsed with a click. Unlike Accordion, each Collapsible works independently. | For optional details the user can show or hide (e.g., "Advanced settings"). |
| **Resizable** | Panels that the user can drag to resize, splitting the screen into adjustable sections. | For side-by-side layouts where users control how much space each section gets. |
| **Scroll Area** | A scrollable container with custom-styled scrollbars. | For content that overflows its container (e.g., a long list in a sidebar or a chat window). |
| **Aspect Ratio** | An invisible wrapper that keeps content at a specific width-to-height ratio (e.g., 16:9). | For images and videos that need to maintain their proportions. |
