# Frontend Bet

Frontend แยกเป็น 2 ฝั่ง:

- `site` สำหรับหน้า public ที่ `:3005`
- `admin` สำหรับหลังบ้านที่ `:3006`

## Run

```bash
bun install
bun run dev
```

หรือรันแยก:

```bash
bun run dev:site
bun run dev:admin
```

## Build

```bash
bun run build
```

## Env

- `.env.example` ใช้เป็น template สำหรับทีม
- `.env` ใช้ค่ากลางของโปรเจกต์
- `.env.development` ใช้ค่าของเครื่องตัวเอง
- `.env.production` ใช้สำหรับ production/deploy

ค่าหลักที่ต้องตั้ง:

- `VITE_SITE_ORIGIN`
- `VITE_SITE_ALLOWED_ORIGINS`
- `VITE_ADMIN_ORIGIN`
- `VITE_ADMIN_ALLOWED_ORIGINS`
- `VITE_API_BASE_URL`

## Routing

- ถ้าเข้า `site` ด้วย admin origin ระบบจะ redirect ไปฝั่ง admin
- ถ้าเข้า `admin` โดยยังไม่ login ระบบจะไป `/login`
- รองรับ custom admin subdomain ผ่าน env ไม่ได้ล็อกว่าเป็น `bo`
