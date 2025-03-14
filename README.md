# nextjs-app-starter

This repository demonstrates how to integrate **Pikku** with a [Next.js](https://nextjs.org) application. It combines the power of Next.js for frontend development with Pikku’s flexible, type-safe backend capabilities, enabling you to seamlessly connect client and server logic.

This project is based on a [Next.js](https://nextjs.org) setup created using [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

---

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Prepare the build:**
   ```bash
   npm run prebuild
   ```

3. **Start the development server:**
   ```bash
   npm run start
   ```

Visit `http://localhost:3000` to explore the app.

---

## Backend Code

All backend code is located in the `backend` directory, which is set up as a separate package for better modularity and scalability. This structure ensures a clear separation of frontend and backend logic while leveraging Pikku’s type-safe abstractions.

### Key Configuration

- **`pikku-next.ts`:**  
  This file is auto-generated by Pikku during the build process and acts as the bridge between your backend logic and the Next.js app.
  
- **`pikku.config.json`:**  
  The configuration for Pikku resides here. You can customize it to adjust the generation of SDKs, routes, and other settings.

---

## Learn More

For a detailed walkthrough of how this setup works, refer to the [Pikku documentation](https://pikku.dev/docs/overview/getting-started). The guide covers advanced configuration, customizations, and best practices for combining Pikku with Next.js.

---

Happy coding, and feel free to contribute or open an issue if you have feedback or ideas! 🎉