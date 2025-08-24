console.log('NEXT_PUBLIC_SITE_URL:', JSON.stringify(process.env.NEXT_PUBLIC_SITE_URL));
console.log('Length:', process.env.NEXT_PUBLIC_SITE_URL?.length);
console.log('Char codes:', process.env.NEXT_PUBLIC_SITE_URL?.split('').map(c => c.charCodeAt(0)));