
# 🔥 Resume Roast App 💀

A fun Next.js web app that **roasts resumes with savage AI sarcasm** using GPT-4.  
Includes a **public page** for roasting + a **password-protected admin dashboard**.

## 🚀 Features
✅ Upload or paste resume text  
✅ AI generates **10 savage sentences** + a **Savage Score**  
✅ Temporary storage of resumes & roasts (resets on redeploy)  
✅ Simple admin dashboard (`/admin`) to view all submissions  

## 🛠 Tech Stack
- **Next.js** + Tailwind CSS  
- **OpenAI GPT-4 API**  
- **Temporary JSON storage (in-memory)**  
- **Vercel hosting**  

## 🔑 Environment Variables
Before deploying, set these in Vercel or `.env.local`:

```
OPENAI_API_KEY=sk-xxxxxxxxxxxx
ADMIN_PASSWORD=youradminpassword
```

## 📦 How to Deploy

1. **Upload to GitHub**
   - Fork or push this repo to your GitHub account.

2. **Deploy on Vercel**
   - Go to [vercel.com/new](https://vercel.com/new)
   - Import your GitHub repo
   - Add the above environment variables
   - Click **Deploy**

3. **Done!**
   - Public page: `https://yourapp.vercel.app`
   - Admin dashboard: `https://yourapp.vercel.app/admin`

## 🤖 How it Works
- User uploads/pastes resume → sends to `/api/roast`
- GPT-4 generates a savage 10-sentence roast
- Result is stored temporarily in server memory
- Admin can log in to view all roasts

## ⚠️ Notes
- Temporary storage **resets on each redeploy**  
- For persistent storage, connect to Supabase or a DB

---
Made with ❤️ + sarcasm. All egos bruised equally.
