# My Animated Components

A comprehensive React component library with built-in Framer Motion animations, Tailwind CSS styling, and full TypeScript support.

![npm](https://img.shields.io/npm/v/my-animated-components)
![downloads](https://img.shields.io/npm/dm/my-animated-components)

## Documentation

For detailed documentation and examples, visit the [official documentation](https://mukeshdev.vercel.app/my-animated-components).

## Support Me!

For Your Support [Visit](https://buymeacoffee.com/mrider007).

## Features

- 🎨 Customizable colors, sizes, and variants
- 🌟 Built-in animations using Framer Motion (80+ motion variants)
- 📱 Responsive design with Tailwind CSS
- 🎭 Accessible components with ARIA attributes
- 🧩 Easy to use and integrate
- 📦 Tree-shakeable with ESM support
- 🔧 Full TypeScript support with exported prop types
- ♿ Keyboard navigation support
- 🏗️ `forwardRef` on all form components
- ✅ Error/validation states on form fields

## Installation

```bash
npm install my-animated-components
```

Or using yarn:

```bash
yarn add my-animated-components
```

### Peer Dependencies

This library requires the following peer dependencies:

```bash
npm install react react-dom framer-motion tailwindcss
```

## Usage

```jsx
import { Button, Card, Modal, Input } from 'my-animated-components';

function MyComponent() {
  return (
    <Card>
      <h2>Welcome to My App</h2>
      <Input
        label="Email"
        type="email"
        placeholder="Enter your email"
        error="Invalid email"
        helperText="We'll never share your email"
      />
      <Button
        color="primary"
        motionVariant="fadeIn"
        loading={isSubmitting}
        leftIcon={<SendIcon />}
      >
        Submit
      </Button>
    </Card>
  );
}
```

## TypeScript

All prop types are exported for full IntelliSense support:

```tsx
import type { ButtonProps, InputProps, ModalProps } from 'my-animated-components';
```

## Available Components

### UI Components
- Accordion
- Alert
- Avatar
- Badge
- Breadcrumb
- Button (with loading, leftIcon, rightIcon, fullWidth)
- Card (with CardBody, CardFooter, CardHeader)
- Dropdown (with DropdownItem)
- IconButton
- Modal (with ModalBody, ModalFooter, ModalHeader)
- Navbar (with NavItem)
- Offcanvas (with OffcanvasBody, OffcanvasHeader)
- Pagination
- ProgressBar
- Skeleton
- Stepper
- Table (with TableBody, TableCell, TableHead, TableRow — striped, hoverable, bordered)
- Tabs
- Tooltip (with delay, keyboard support)

### Form Components (with `forwardRef`)
- Checkbox (with error/helperText)
- FileUpload (with maxSize validation)
- Input (with label, error, helperText)
- Radio (with error/helperText)
- Select (with placeholder, error, helperText)
- Switch (with size variants)
- Textarea (with resize, charCount, error)

### Layout
- Container
- Flex
- Grid

### Typography
- Heading
- Text

### Media
- Carousel (with autoplay, swipe, thumbnails, keyboard navigation)
- ImageEditor

### Utilities
- List (with ListItem)
- RangeSlider
- Slider

## Customization

Most components accept props for customization, including:

- `color`: Choose from 'primary', 'secondary', 'success', 'danger', 'warning', 'info'
- `size`: Usually 'xs', 'sm', 'md', 'lg', 'xl'
- `motionVariant`: Animation variant (e.g., 'fadeIn', 'slideUp', 'zoomIn', 'bounce')
- `variant`: Visual style ('solid', 'outline', 'ghost')
- `unstyled`: Bypass all default styling for full customization
- `useAnimation`: Toggle animations on/off
- `disabled`: Disable interactive components
- `error` / `helperText`: Form validation states

## Motion Variants

80+ built-in animation variants including:

`fadeIn`, `slideUp`, `slideDown`, `slideLeft`, `slideRight`, `bounce`, `rotateIn`, `flip`, `pulse`, `shake`, `zoomIn`, `zoomOut`, `scaleUp`, and many more with fast/slow variations.

```jsx
import { motionVariants } from 'my-animated-components';

// Use with any component
<Button motionVariant="bounce">Click me!</Button>
<Card motionVariant="slideUp">Content</Card>
```

## License

This project is licensed under the ISC License.