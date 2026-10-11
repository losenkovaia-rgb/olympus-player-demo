const fs=require('fs'),sharp=require('sharp');
(async()=>{fs.mkdirSync(__dirname+'/icons',{recursive:true});const logo=fs.readFileSync(__dirname+'/olympus-app-icon.png').toString('base64');
for(const [kind,label,color] of [['r4','R4','#9a65f5'],['player','PLAYER','#41c38c']]){
 const svg=`<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="512" height="512" viewBox="0 0 512 512"><rect width="512" height="512" fill="#101827"/><rect x="20" y="20" width="472" height="472" rx="105" fill="none" stroke="${color}" stroke-width="18"/><image x="83" y="53" width="346" height="346" xlink:href="data:image/png;base64,${logo}"/><rect x="104" y="380" width="304" height="78" rx="30" fill="${color}"/><text x="256" y="432" text-anchor="middle" font-family="DejaVu Sans,Arial,sans-serif" font-weight="bold" font-size="48" fill="#07111c">${label}</text></svg>`;
 fs.writeFileSync(`${__dirname}/icons/${kind}.svg`,svg);
 for(const n of [180,192,512])await sharp(Buffer.from(svg)).resize(n,n).png().toFile(`${__dirname}/icons/${kind}-${n}.png`);
 const masked=await sharp(Buffer.from(svg)).resize(410,410).png().toBuffer();
 await sharp({create:{width:512,height:512,channels:4,background:'#101827'}}).composite([{input:masked,gravity:'centre'}]).png().toFile(`${__dirname}/icons/${kind}-maskable.png`);
}console.log('Built distinct emblem icons, 180/192/512 and maskable.');})();
