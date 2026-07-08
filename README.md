# Masoud Ataei — Personal Academic Website

Built with Astro + Tailwind CSS.

## راه‌اندازی (Setup)

1. ریپویی با اسم `chimera1001.github.io` در گیت‌هاب مسعود بساز.
2. این پروژه را push کن:
   ```bash
   git init
   git add .
   git commit -m "Initial site"
   git branch -M main
   git remote add origin https://github.com/chimera1001/chimera1001.github.io.git
   git push -u origin main
   ```
3. در Settings → Pages گزینه Source را روی **GitHub Actions** بگذار.
   با هر push، سایت خودکار deploy می‌شود.

## 📚 Course Materials — مهم!

فایل‌های درس‌ها را این‌طوری اضافه کن:

```
public/courses/STA457/Lecture_Notes/   ← جزوه‌ها را اینجا بگذار
public/courses/STA457/Homeworks/       ← تمرین‌ها را اینجا بگذار
public/courses/STA457/Past_Exams/      ← امتحان‌های قبلی را اینجا بگذار
```

- هر فایلی (PDF و...) که داخل این پوشه‌ها بگذاری و push کنی، **خودکار** در صفحه
  `/courses/sta457` لیست می‌شود — هیچ کدی لازم نیست عوض شود.
- اسم فایل، اسم نمایشی می‌شود (خط تیره/آندرلاین به فاصله تبدیل می‌شود):
  `Lecture_01_Introduction.pdf` → «Lecture 01 Introduction»
- **درس جدید؟** فقط یک پوشه جدید کنار STA457 بساز (مثلاً `public/courses/STA260/`)
  با همان سه زیرپوشه. خودش صفحه `/courses/sta260` را می‌سازد و کارتش هم در
  بخش Teaching صفحه اصلی ظاهر می‌شود.

## اجرای محلی

```bash
npm install
npm run dev      # http://localhost:4321
```

## نکته‌ها

- عکس پروفایل: `public/images/profile.jpg` (گذاشته شده ✓)
- ماسکوت: ۹ عکس در `public/images/mascot/` (گذاشته شده ✓ و فعال است)
- پس‌زمینه سه‌بعدی: `src/scripts/space.ts` — نسخه مستقل است؛ اگر می‌خواهی دقیقاً
  مثل سایت سپیده باشد، فایل space.ts آن پروژه را روی این کپی کن.
