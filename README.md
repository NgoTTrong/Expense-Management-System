# Expense Management

1. [Install Node JS](https://nodejs.org/en/download/)
1. [Install Mini App DevTools CLI](https://mini.zalo.me/docs/dev-tools)
1. Download or clone this repository

## Setup

1. Install dependencies

   ```bash
   yarn install
   ```

1. Start dev server using [zmp-cli](https://mini.zalo.me/docs/dev-tools/)

   ```bash
   zmp start
   ```

1. Open `localhost:3000` on your browser and start coding 🔥

## Deployment

1. Create a mini app. For instruction on how to create a mini app, please refer to [Getting Started](https://mini.zalo.me/intro/getting-started). (If you use this source code for development and deployment, you can skip from `zmp init` to the end.)

1. Setup payment methods if you want to accept online payments
   ![](./docs/payment.png "Payment method")

1. Deploy your mini app to Zalo using the mini app ID created in step 1.

   ```bash
   zmp login
   zmp deploy
   ```

1. Open Zalo and scan the QR code to preview your mini app

## Usage:

The other files (such as `tailwind.config.js`, `vite.config.ts`, `tsconfig.json`, `postcss.config.js`) are configurations for libraries used in your application. Visit the library's documentation to learn how to use them.

## Recipes

### Changing Header bar

Just change the `app.title` and `app/statusBarColor` property in `app-config.json` to set default name and default primary color of app:

```json
{
  "app": {
    "title": "ZaUI Shop",
    "statusBarColor": "#EF1724"
  }
}
```

Because the default navigation bar does not support custom a ReactNode title, we must use a custom header. And we could change header props (such as title, leftIcon, type, etc...) reactively on each page using a custom hook named `useSetHeader` in `hooks/useSetHeader`.

Moreover, we can change the color of the status bar on devices by using the SDK API `changeStatusBarColor`.

```tsx
setHeader({
  customTitle: searchBar,
  type: "secondary",
});
changeStatusBarColor("secondary");
```

In the 'Changing color theme' category, you can see a custom header with a search bar.

### Changing your's logo

Visit [Zalo Mini App](https://mini.zalo.me/) and go to your mini app's settings to change the logo.

### Changing color theme

- Using Zalo Mini App Studio
  - At the top left of the IDE, click the Configuration button. Then, at "Primary Color," you can select a primary color theme.
    > You can also set other fields here)
- Not using Zalo Mini App Studio

  - Solution 1:

    - Set all template fields (including the primary color theme field) in `app-config.json`(see more details for template fields in `zmp-config.json`):
      ```json
      {
        "template": {
          "primaryColor": "#625ff7",
          "searchBar": false,
          "shippingFee": "500000",
          "oaIDtoOpenChat": "4318657068771012646"
        }
      }
      ```

  - Solution 2:

    - Set the primary color theme by setting the variable in `src/css/app.scss`:

      ```scss
      :root {
        --zmp-primary-color: #ef1724;
        --zmp-primary-color-rgb: 239, 23, 36;
      }
      ```

    - Set the default color of the header bar in `app-config.json`:

      ```json
      {
        "app": {
          "statusBarColor": "#EF1724"
        }
      }
      ```
