# Vendor-response test fixtures

These inputs are intentionally heterogeneous and are processed through the same vendor intake route.

- `apex/apex-cartons-quote.xlsx`: complete structured INR response
- `globalpak/globalpak-quote.csv`: USD response with vendor-level freight
- `swiftbox/rate-card-photo.png`: angled photo/OCR case
- `swiftbox/vendor-message.txt`: unstructured email-style response

Run `node scripts/generate-fixtures.mjs` after installing dependencies to regenerate the spreadsheet fixtures.
