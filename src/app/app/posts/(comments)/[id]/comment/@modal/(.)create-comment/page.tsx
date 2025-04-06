import Modal from "@/components/modal";
import FormCreateComment from "../../create-comment/components/form-create-comment";

export default function CreatePostModal() {
	return (
		// <Modal className="text-white w-full min-h-72 mt-32 md:w-[90%] lg:w-[700px]">
		<div className="fixed top-0 left-0 h-screen w-screen flex justify-center items-center">
			<div className="absolute h-full w-full bg-zinc-700 opacity-85" />
			<div className="z-10 w-[90%] flex justify-center">
				<FormCreateComment />
			</div>
		</div>
		// </Modal>
	);
}
