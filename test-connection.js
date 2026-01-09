const https = require('https');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.replace(/['"]+/g, '').trim();

console.log('Testing Supabase URL:', supabaseUrl);

if (!supabaseUrl) {
    console.error('NEXT_PUBLIC_SUPABASE_URL is missing');
    process.exit(1);
}

const req = https.get(supabaseUrl, (res) => {
    console.log('Status Code:', res.statusCode);
    res.on('data', (d) => {
        process.stdout.write(d);
    });
}).on('error', (e) => {
    console.error('Error Details:', e);
});
