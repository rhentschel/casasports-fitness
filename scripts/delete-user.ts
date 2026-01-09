import { PrismaClient } from '@prisma/client'
import { createClient } from '@supabase/supabase-js'

const prisma = new PrismaClient()

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.replace(/['"]+/g, '').trim() || ''
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY?.replace(/['"]+/g, '').trim() || ''

const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function deleteUser(email: string) {
    console.log(`Deleting user: ${email}`)

    try {
        // 1. Find user in Supabase Auth
        const { data: { users }, error: listError } = await supabase.auth.admin.listUsers()

        if (listError) {
            console.error('Error listing users:', listError)
            return
        }

        const user = users.find(u => u.email === email)

        if (!user) {
            console.log('User not found in Supabase Auth')
        } else {
            // Delete from Supabase Auth
            const { error: deleteAuthError } = await supabase.auth.admin.deleteUser(user.id)

            if (deleteAuthError) {
                console.error('Error deleting from Supabase Auth:', deleteAuthError)
            } else {
                console.log('✓ Deleted from Supabase Auth')
            }

            // Delete from Prisma
            try {
                await prisma.user.delete({
                    where: { id: user.id }
                })
                console.log('✓ Deleted from Prisma database')
            } catch (e: any) {
                if (e.code === 'P2025') {
                    console.log('User not found in Prisma database')
                } else {
                    console.error('Error deleting from Prisma:', e)
                }
            }
        }

        console.log('Done!')
    } catch (error) {
        console.error('Error:', error)
    } finally {
        await prisma.$disconnect()
    }
}

// Get email from command line
const email = process.argv[2] || 'office@rolandhentschel.de'
deleteUser(email)
