import { login, signup } from './actions'

export default function LoginPage({
    searchParams,
}: {
    searchParams: { message: string }
}) {
    return (
        <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2 mx-auto min-h-screen">
            <form className="animate-in flex-1 flex flex-col w-full justify-center gap-2 text-foreground">
                <h1 className="text-2xl mb-4 font-bold text-center">Naim Obeid Fitness</h1>

                <label className="text-md" htmlFor="email">
                    Email
                </label>
                <input
                    className="rounded-md px-4 py-2 bg-inherit border mb-6"
                    name="email"
                    placeholder="you@example.com"
                    required
                />

                <label className="text-md" htmlFor="password">
                    Passwort
                </label>
                <input
                    className="rounded-md px-4 py-2 bg-inherit border mb-6"
                    type="password"
                    name="password"
                    placeholder="••••••••"
                    required
                />

                <button
                    formAction={login}
                    className="bg-green-700 rounded-md px-4 py-2 text-foreground mb-2 hover:bg-green-600 transition-colors"
                >
                    Einloggen
                </button>
                <button
                    formAction={signup}
                    className="border border-gray-700 rounded-md px-4 py-2 text-foreground hover:bg-gray-800 transition-colors"
                >
                    Registrieren
                </button>

                {searchParams?.message && (
                    <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center">
                        {searchParams.message}
                    </p>
                )}
            </form>
        </div>
    )
}
