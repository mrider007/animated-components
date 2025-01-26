# My Animated Components

A comprehensive React component library with built-in animations and customization options.

## Documentation

For detailed documentation and examples, visit the [official documentation](https://mukeshdev.vercel.app/my-animated-components).

## Features

- 🎨 Customizable colors and sizes
- 🌟 Built-in animations using Framer Motion
- 📱 Responsive design
- 🎭 Accessible components
- 🧩 Easy to use and integrate

## Installation

Install the package using npm:

```bash
npm install my-animated-components
```

Or using yarn:

```bash
yarn add my-animated-components
```

## Usage

Import the components you need in your React application:

```jsx
import { Button, Card, Modal } from 'my-animated-components';
```

Then use them in your components:

```jsx
function MyComponent() {
  return (
    <Card>
      <h2>Welcome to My App</h2>
      <Button color="primary" motionVariant="fadeIn">
        Click me!
      </Button>
    </Card>
  );
}
```

## Available Components

- Accordion
- Alert
- Avatar
- Badge
- Breadcrumb
- Button
- Card (with CardBody, CardFooter, CardHeader)
- Checkbox
- Container
- Dropdown
- FileUpload
- Flex
- Grid
- Heading
- IconButton
- Input
- List (with ListItem)
- Modal (with ModalBody, ModalFooter, ModalHeader)
- NavItem
- Navbar
- Offcanvas (with OffcanvasBody, OffcanvasHeader)
- Pagination
- ProgressBar
- Radio
- RangeSlider
- Select
- Skeleton
- Slider
- Stepper
- Switch
- Table (with TableBody, TableCell, TableHead, TableRow)
- Tabs
- Text
- Textarea
- Tooltip

## Customization

Most components accept props for customization, including:

- `color`: Choose from 'primary', 'secondary', 'success', 'danger', 'warning', 'info'
- `size`: Usually 'xs', 'sm', 'md', 'lg', 'xl'
- `motionVariant`: Animation variant (e.g., 'fadeIn', 'slideUp', 'zoomIn')

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.