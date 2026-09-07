# MachineHub Uganda — Stage 6

## What changed
- JWT authentication for users and admins
- Password hashing with bcryptjs
- Protected user and admin API routes
- Persistent sandbox data in `backend/data.json`
- User transaction history
- Improved Flutter login/registration, activation, business-unit funding and transaction screens
- Admin API protected by an ADMIN role

## Run backend
```bash
cd backend
npm install
JWT_SECRET="replace-with-a-long-random-secret" npm start
```
The first run creates `data.json` with a demo admin:
- Phone: `+256700000000`
- Password: `ChangeMe123!`

Change/remove this demo account before any real deployment.

## Run Flutter
```bash
cd flutter
flutter pub get
flutter run
```
Android emulator API URL is `http://10.0.2.2:3000`. For a physical phone, replace it with the computer's LAN IP and keep the phone and computer on the same network.

## Sandbox only
No real mobile-money collection is implemented. The UGX 10,000 activation flow uses a demo confirmation endpoint. Before accepting public money, use a compliant merchant/payment-provider integration and complete applicable regulatory review.
