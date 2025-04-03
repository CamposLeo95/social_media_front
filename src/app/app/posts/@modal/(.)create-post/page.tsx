import Modal from "@/components/modal";
import FormCreatePost from "../../create-post/form-create-post";

export default function CreatePostModal() {
	return (
		<Modal className="text-white w-full h-72 mt-32 md:w-[90%] lg:w-[700px]">
			<FormCreatePost />
		</Modal>
	);
}
