# MY Animated Components

**My Animated Components** is a collection of customizable React components built with Framer Motion for smooth animations. It provides buttons and icon buttons with different styles, sizes, and interactive animations.

---

## Features

Animated Components
Animated Components is a collection of customizable React components built with Framer Motion for smooth animations. It provides buttons, icon buttons, and other interactive UI elements with different styles, sizes, and animations.

Features
Customizable Buttons: Supports different variants (solid, outline, ghost) and colors (primary, secondary, etc.).
Icon Button: Use any custom icon inside the button for more flexibility.
Framer Motion Animations: Interactive hover and tap animations to enhance user experience.
Various UI Elements: Includes components like Accordion, Alert, Badge, Modal, Dropdown, and more.
Available Components
Button
IconButton
Accordion
Alert
Avatar
Badge
Breadcrumb
Card
Dropdown
Checkbox
FileUpload
Input
Radio
Select
Switch
Textarea
Modal
Navbar
Pagination
ProgressBar
Slider
Table
Tabs
Tooltip
Heading
Text

## props 
onClick (function): The function to call when the button is clicked.
disabled (boolean): Disables the button.
variant (string): The button style, one of solid, outline, or ghost.
color (string): The button color, one of primary, secondary, success, danger, warning, or info.
size (string): The size of the button, one of xs, sm, md, lg, or xl.
motionVariant (string): A predefined motion animation for the button (fadeIn is the default).

## Example Usage
import { Button } from 'my-animated-components';

const MyComponent = () => {
  return (
    <Button color="primary" size="md" className="my-custom-class">
      Click Me
    </Button>
  );
};

## other example 

import { IconButton } from 'my-animated-components';
import { FaBeer } from 'react-icons/fa';

const MyComponent = () => {
  return (
    <IconButton color="secondary" size="lg">
      <FaBeer />
    </IconButton>
  );
};



## Installation
To install my-animated-components in your React project, you also need to install Tailwind CSS and Framer Motion as dependencies. Run the following commands:

Install my-animated-components:
bash
Copy code
npm install my-animated-components
Install Tailwind CSS (if not already installed in your project):
bash
Copy code
npm install -D tailwindcss
Install Framer Motion (for animations):
bash
Copy code
npm install framer-motion
Add Tailwind to your CSS file (e.g., src/index.css):
css
Copy code
@tailwind base;
@tailwind components;
@tailwind utilities;
Make sure to configure Tailwind in your tailwind.config.js file if it is not already set up:
bash
Copy code
npx tailwindcss init

npm install my-animated-components
