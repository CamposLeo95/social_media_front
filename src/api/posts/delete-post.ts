export const deletePost = async (postId: string, token: string | undefined) => {
	const response = await fetch(`http://localhost:3333/posts/${postId}`, {
		method: "DELETE",
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
	if (response.ok) {
		console.log("Post deletado");
	} else {
		console.error("Erro ao deletar post:", await response.text());
	}
};
