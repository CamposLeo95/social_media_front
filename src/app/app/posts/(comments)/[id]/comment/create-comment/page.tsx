"use client";
import Modal from "@/components/modal";
import { useParams } from "next/navigation";
import FormCreateComment from "./components/form-create-comment";

type SegmentParams = {
	id: string;
};

interface CommentsProps {
	params?: SegmentParams;
}

export default function CreateCommentPage(props: CommentsProps) {
	const { id } = useParams<SegmentParams>();

	const postId = Number(id) || 0;
	return (
		<div className="text-white ">
			<div className="h-screen bg-zinc-900 bg-opacity-85 absolute top-0 left-0 w-full flex justify-center mt-10  px-2 ">
				<FormCreateComment postId={postId} />
			</div>
		</div>
	);
}
