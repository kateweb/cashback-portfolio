// ui/Loader.js
import Image from "next/image";

const Loader = () => {
	return (
		<div className='z-10 absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center'>
			<Image src="/img/loader.svg" alt="Loader" className="w-10 h-10 loader" width={50} height={50} />
		</div>
	);
};

export default Loader;
