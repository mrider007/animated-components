# My Animated Components

**My Animated Components** is a collection of customizable React components built with Framer Motion for smooth animations. It provides buttons, icon buttons, and other interactive UI elements with different styles, sizes, and animations.

---
## Documentation

For detailed documentation and examples, visit the [official documentation](https://mukeshdev.vercel.app/my-animated-components).

## Features

- **Customizable Buttons**: Supports different variants (solid, outline, ghost) and colors (primary, secondary, etc.).
- **Icon Button**: Use any custom icon inside the button for more flexibility.
- **Framer Motion Animations**: Interactive hover and tap animations to enhance user experience.
- **Various UI Elements**: Includes components like Accordion, Alert, Badge, Modal, Dropdown, and more.

## Available Components

- Button
- IconButton
- Accordion
- Alert
- Avatar
- Badge
- Breadcrumb
- Card
- CardBody
- CardFooter
- CardHeader
- Dropdown
- DropdownItem
- Checkbox
- FileUpload
- Input
- Radio
- Select
- Switch
- Textarea
- Container
- Flex
- Grid
- List
- ListItem
- Modal
- ModalBody
- ModalFooter
- ModalHeader
- NavItem
- Navbar
- Offcanvas
- OffcanvasBody
- OffcanvasHeader
- Pagination
- ProgressBar
- Skeleton
- Slider
- RangeSlider
- Stepper
- Table
- TableBody
- TableCell
- TableHead
- TableRow
- Tabs
- Tooltip
- Heading
- Text


---

## Props

Here are the common props for the **Button** component:

| Prop          | Type      | Description                                                   |
|---------------|-----------|---------------------------------------------------------------|
| `onClick`     | function  | The function to call when the button is clicked.              |
| `disabled`    | boolean   | Disables the button if set to true.                           |
| `variant`     | string    | The button style, one of `solid`, `outline`, or `ghost`.      |
| `color`       | string    | The button color, one of `primary`, `secondary`, `success`, `danger`, `warning`, or `info`. |
| `size`        | string    | The size of the button, one of `xs`, `sm`, `md`, `lg`, or `xl`. |
| `motionVariant` | string  | A predefined motion animation for the button (default is `fadeIn`). |

---

## Available Motion Variants

- null
- fadeIn
- zoomIn
- slideUp
- slideDown
- slideLeft
- slideRight
- bounce
- rotateIn
- stagger
- flip
- fadeOut
- zoomOut
- scaleUp
- scaleDown
- fadeInUp
- fadeInDown
- fadeInLeft
- fadeInRight
- rotateBounce
- scaleBounce
- fadeInScale
- bounceOut
- shake
- pulse
- fadeInFast
- slideUpFast
- fadeUp
- zoomInFast
- zoomOutFast
- slideDownFast
- rotateOut
- flipFast
- staggerUp
- flipIn
- fadeInSlow
- slideUpSlow
- slideDownSlow
- slideLeftSlow
- slideRightSlow
- bounceSlow
- rotateInSlow
- staggerSlow
- flipSlow
- scaleBounceSlow
- rotateOutFast
- scaleUpFast
- scaleDownFast
- bounceFast
- flipInFast
- fadeInLeftFast
- fadeInRightFast
- fadeInUpFast
- fadeInDownFast
- scaleUpSlow
- scaleDownSlow
- rotateInFast
- staggerChildren
- fadeUpSlow
- slideInFromLeft
- slideInFromRight
- slideInFromTop
- slideInFromBottom
- fadeInSlowFromTop
- fadeInSlowFromBottom
- fadeInSlowFromLeft
- fadeInSlowFromRight
- bounceIn
- zoomOutSlow
- fadeInFastFromTop
- fadeInFastFromBottom
- slideInLeftFast
- slideInRightFast
- fadeInRotate
- scaleInFast
- zoomInBig
- slideInDiagonal
- rotate360
- flipInX
- staggerChildrenFast
- pulseFast
- slideInDiagonalFast
- fadeInRightSlow
- zoomOutSlowFromCenter
- flipBounce
- slideInFromTopFast
- fadeInDiagonal
- zoomInBounce
- rotateInOut
- staggerUpFast
- fadeInRotateIn
- scaleInQuick
- slideInFromBottomSlow
- flipRotateOut
- slideLeftFast
- zoomInBigFast
- fadeInUpFastSlow
- rotateOutSlow
- staggerLeft
- rotateOutFastReverse
- scaleDownBounce
- fadeInFastFromLeft
- fadeInFastFromRight
- bounceSlowFast
- slideInFromTopFastReverse
- fadeOutFast
- flipScaleUp
- slideOutRight
- zoomOutBounce
- fadeUpReverse
- staggerUpReverse
- scaleInFromLeft
- flipOut

---

## Example Usage

### Button Example

```tsx
import { Button } from 'my-animated-components';

const MyComponent = () => {
  return (
    <Button color="primary" size="md" className="my-custom-class" motionVariant='slideUp'>
      Click Me
    </Button>
  );
};

