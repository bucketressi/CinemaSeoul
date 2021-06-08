import React, { Dispatch, useState } from 'react';
import "../scss/component/_imgcomponent.scss";
import Jimp, { AUTO } from 'jimp';
import { type } from 'node:os';

type ImgInfoType = {
	file: File;
	previewURL: string | ArrayBuffer | null;
}

type Props = {
	setImgFile: Dispatch<File | undefined>
}

const ImgComponent = ({ setImgFile }: Props) => {
	const [imgInfo, setImgInfo] = useState<ImgInfoType | undefined>(undefined);

	// const optimizeImg = (imageBase64: string) => {
	// 	const imageBuffer = new ArrayBuffer(imageBase64);
	// 	return Jimp.read(imageBuffer, function (err, image) {
	// 		image.resize(150, Jimp.AUTO)
	// 			.quality(60);
	// 		return image;
	// 	});
	// }

	const uploadImage = (e: any) => {
		e.preventDefault();
		setImgFile(e.target.files[0]);
		const reader = new FileReader();
		reader.onloadend = () => {
			setImgInfo({ // 미리보기할 파일 저장
				file: e.target.files[0],
				previewURL: reader.result
			})
			// if (typeof (reader.result) == "string")
			// optimizeImg(reader.result).then(res => res.getBuffer("image/jpeg", (error, value) => {
			// 	setImgFile(new File([value], "output.jpg"));
			// }));
		};
		reader.readAsDataURL(e.target.files[0]);
	};

	return (
		<div className="img-component">
			<div>포스터</div>
			{
				imgInfo && typeof (imgInfo.previewURL) === "string" && // 없으면 priview 포스터 보여주기
				<img src={imgInfo.previewURL} alt="포스터" />
			}
			<input type="file" accept="image/*" onChange={uploadImage} />
		</div>
	);
}

export default ImgComponent;