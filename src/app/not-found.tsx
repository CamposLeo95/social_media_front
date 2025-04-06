import Link from "next/link";

export default function ErrorPage() {
	return (
		<div className="flex h-screen items-center justify-center bg-zinc-900 text-white">
			<div className="text-center">
				<h1 className="text-6xl font-bold text-zinc-100">404</h1>
				<p className="mt-4 text-xl text-zinc-400">
					Oops! A página que você está procurando não foi encontrada.
				</p>
				<p className="mt-2 text-zinc-400">
					Verifique o URL ou volte para a página inicial.
				</p>
				<div className="mt-6">
					<Link
						href="/login"
						className="bg-blue-600 p-4 rounded-md hover:bg-blue-700 shadow-md"
					>
						Voltar para a Home
					</Link>
				</div>
			</div>
		</div>
	);
}
