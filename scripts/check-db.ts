import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function checkDatabase() {
    try {
        console.log('🔍 Checking database connection...')

        // Check if we can query the database
        const userCount = await prisma.user.count()
        console.log(`✅ Database connected! Found ${userCount} users in Prisma`)

        // List users
        const users = await prisma.user.findMany({
            select: {
                id: true,
                email: true,
                name: true,
                role: true,
                createdAt: true
            }
        })

        if (users.length > 0) {
            console.log('\n📋 Users in database:')
            users.forEach(u => {
                console.log(`  - ${u.email} (${u.name || 'No name'}) - Role: ${u.role}`)
            })
        } else {
            console.log('\n⚠️  No users found in Prisma database')
        }

        // Check Supabase auth.users table directly
        console.log('\n🔍 Checking Supabase auth.users table...')
        const authUsers = await prisma.$queryRawUnsafe(`
      SELECT id, email, created_at 
      FROM auth.users 
      LIMIT 10
    `)

        console.log('Auth users:', authUsers)

    } catch (error) {
        console.error('❌ Error:', error)
    } finally {
        await prisma.$disconnect()
    }
}

checkDatabase()
