import XLSX from "xlsx";
import fs from "node:fs";
const root = new URL("../fixtures/vendor-responses/", import.meta.url);
const items = Array.from({length:30},(_,i)=>({sku:`SKU-${String(i+1).padStart(3,"0")}`,description:["3-ply RSC carton","5-ply printed carton","Die-cut mailer"][i%3],annual_qty:18000+(i%6)*7000}));
for (const name of ["apex","globalpak"]) fs.mkdirSync(new URL(`${name}/`,root),{recursive:true});
const apex = XLSX.utils.book_new(); XLSX.utils.book_append_sheet(apex,XLSX.utils.json_to_sheet(items.map((x,i)=>({...x,unit_price_inr:(6.1+(i%5)*.7).toFixed(2),moq:1000,gst:"18% excluded",freight:"included"}))),"Quote"); XLSX.writeFile(apex,new URL("apex/apex-cartons-quote.xlsx",root).pathname);
fs.writeFileSync(new URL("globalpak/globalpak-quote.csv",root),"sku,description,unit_price_usd,price_unit,gst,freight\n"+items.map((x,i)=>`${x.sku},${x.description},${((5.6+(i%5)*.67)/84.2).toFixed(3)},per piece,IGST 18%,INR 18500 order freight`).join("\n"));
fs.writeFileSync(new URL("swiftbox/vendor-message.txt",root),"₹42/kg for 5-ply, ₹38/kg for 3-ply, rest same as last year. Freight extra. GST 18%. Capacity 60000 pieces/month.");
