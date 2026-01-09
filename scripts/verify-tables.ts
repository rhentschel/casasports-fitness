import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function verifyTables() {
    try {
        console.log('🔍 Verifying all tables in the public schema...')

        // List of tables from schema.prisma
        const requiredTables = [
            'User',
            'ServiceRequest',
            'Contract',
            'Booking',
            'TrainingPlan',
            'CheckIn'
        ]

        const results = []

        for (const table of requiredTables) {
            try {
                // We use $queryRaw to check if the table exists by trying a count
                // Prisma uses pluralized or exact names based on configuration, 
                // usually it's public."TableName"
                await prisma.$queryRawUnsafe(`SELECT count(*) FROM public."${table}"`)
                results.push({ table, status: '✅ Existiert' })
            } catch (e) {
                results.push({ table, status: '❌ Fehlt oder Fehler' })
            }
        }

        console.table(results)

        // Also check if any migrations are pending (double check hostinger state vs local)
        console.log('\n📊 Schema Status:')
        const tableCheck = await prisma.$queryRaw`SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'`
        console.log('Tables found in public schema:', tableCheck)

    } catch (error) {
        console.error('❌ Check failed:', error)
    } finally {
        await prisma.$disconnect()
    }
}

verifyTables()
