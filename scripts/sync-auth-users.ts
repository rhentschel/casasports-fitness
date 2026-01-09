import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function syncAuthUser() {
    try {
        console.log('🔄 Syncing auth.users to Prisma User table...')

        // Get all users from auth.users
        const authUsers: any[] = await prisma.$queryRawUnsafe(`
      SELECT id, email, raw_user_meta_data, created_at 
      FROM auth.users
    `)

        console.log(`Found ${authUsers.length} users in auth.users`)

        for (const authUser of authUsers) {
            const { id, email, raw_user_meta_data } = authUser

            // Check if user exists in Prisma
            const existingUser = await prisma.user.findUnique({
                where: { id }
            })

            if (!existingUser) {
                // Create the user in Prisma
                const name = raw_user_meta_data?.full_name || email.split('@')[0]

                await prisma.user.create({
                    data: {
                        id,
                        email,
                        name,
                        role: 'MEMBER'
                    }
                })

                console.log(`✅ Created user in Prisma: ${email}`)
            } else {
                console.log(`⏭️  User already exists: ${email}`)
            }
        }

        console.log('\n✨ Sync complete!')

        // Verify
        const userCount = await prisma.user.count()
        console.log(`Total users in Prisma: ${userCount}`)

    } catch (error) {
        console.error('❌ Error:', error)
    } finally {
        await prisma.$disconnect()
    }
}

syncAuthUser()
