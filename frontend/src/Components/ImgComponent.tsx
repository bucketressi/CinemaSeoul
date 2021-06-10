import React, { Dispatch, useState } from 'react';
import "../scss/component/_imgcomponent.scss";
import Jimp, { AUTO } from 'jimp';
import { type } from 'node:os';

type ImgInfoType = {
	file: File | null;
	previewURL: string | ArrayBuffer | null;
}

type Props = {
	setImgFile: Dispatch<File | undefined>
}

const ImgComponent = ({ setImgFile }: Props) => {
	const [imgInfo, setImgInfo] = useState<ImgInfoType | undefined>(undefined);

	const optimizeImg = (imageBase64: string) => {
		return Jimp.read(imageBase64, function (err, image) {
			image.resize(300, Jimp.AUTO)
				.quality(60);
			image.getBuffer(Jimp.MIME_JPEG, (error, value) => {
				setImgFile(new File([value], "output.jpg"));
			})
		});
	}

	const uploadImage = (e: any) => {
		e.preventDefault();
		if(!e.target.files[0]){
			setImgInfo({
				file : null,
				previewURL : null
			})
			return;
		}
		const reader = new FileReader();
		reader.onloadend = () => {
			setImgInfo({ // 미리보기할 파일 저장
				file: e.target.files[0],
				previewURL: reader.result
			})
			if (typeof (reader.result) == "string"){
				optimizeImg(reader.result);
			}
		};
		reader.readAsDataURL(e.target.files[0]);
	};

	return (
		<div className="img-component">
			{
				imgInfo && typeof (imgInfo.previewURL) === "string" &&
				<img src={imgInfo.previewURL} alt="이미지" />
			}
			<input type="file" accept="image/*" onChange={uploadImage} />
		</div>
	);
}

export default ImgComponent;