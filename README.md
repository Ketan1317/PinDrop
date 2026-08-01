# 📌 PinDrop

PinDrop is a modern link management platform built with **Next.js**, **NextAuth**, **MongoDB**, and **Cloudinary**. It allows users to securely save, organize, and revisit useful links with automatically generated rich previews, hashtags, and click analytics.

---

## ✨ Features

- 🔐 Authentication
  - Email & Password Login
  - Google OAuth
  - GitHub OAuth
  - Protected Routes with NextAuth

- 🔗 Smart Link Management
  - Save any website URL
  - Automatic Open Graph Metadata Scraping
  - Rich Link Preview
  - Favicon Detection
  - Featured Thumbnail Extraction

- 🏷️ Organize with Hashtags
  - Custom hashtags
  - Quick search by tags
  - Search by title

- 📈 Analytics
  - Click Tracking
  - Visit Counter

- 👤 User Profile
  - Avatar Upload
  - OAuth Profile Images
  - Provider Information
  - Personal Link Collection

- ☁️ Image Uploads
  - Cloudinary Integration

- 📱 Responsive Design
  - Mobile Friendly
  - Modern Glassmorphism UI
  - Gradient Theme

---

## 🛠 Tech Stack

### Frontend

- Next.js (App Router)
- React
- TypeScript
- Tailwind CSS
- Axios
- React Icons
- React Hot Toast

### Backend

- Next.js Route Handlers
- NextAuth
- MongoDB
- Mongoose

### Authentication

- Credentials Provider
- Google OAuth
- GitHub OAuth

### Services

- Cloudinary
- Open Graph Scraper

---

## 📂 Folder Structure

```
src/
│
├── app/
│   ├── api/
│   ├── profile/
│   ├── signin/
│   ├── signup/
│   └── Components/
│
├── Models/
│
├── Services/
│
├── app/dbConfig/
│
└── middleware.ts
```

---

## 🚀 Getting Started

### Clone Repository

```bash
git clone https://github.com/yourusername/PinDrop.git

cd PinDrop
```

### Install Dependencies

```bash
npm install
```

### Environment Variables

Create a `.env.local`

```env
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=

MONGO_DB_URL=

GOOGLE_ID=
GOOGLE_SECRET=

GITHUB_ID=
GITHUB_SECRET=

CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

---

## Run Development Server

```bash
npm run dev
```

Open

```
http://localhost:3000
```

---

## Build

```bash
npm run build
```

---

## Screenshots

Add screenshots here.

```
Home Page

Sign In

Profile

Link Cards
```

---

## Future Improvements

- Folder Support
- Collections
- Bookmark Import
- Public Profiles
- Link Sharing
- Browser Extension
- AI Tag Suggestions
- Duplicate Link Detection
- Dark/Light Themes
- Dashboard Analytics

---

## Contributing

Contributions are welcome.

Fork the repository and submit a Pull Request.

---

## License

MIT License

---

## Author

**Ketan Goyal**

GitHub:
https://github.com/Ketan1317
