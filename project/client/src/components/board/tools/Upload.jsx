import React, { useState, useContext, useEffect } from 'react';
import {AuthContext} from '../../../context'

function Upload({setLoading, currentFolderId}) {
	const [photoFile, setPhotoFile] = useState(null);
	const [photos, setPhotos] = useState([])
	const { fetchWithCSRF, currentUserId } = useContext(AuthContext);

	const handleChange = (e) => {
		e.preventDefault()
		setLoading(true)
		setPhotoFile(e.target.files[0]);
	};

	useEffect(() => {
		const formData = new FormData();
		formData.append("file", photoFile);
		// console.log(photoFile)
		if(photoFile){
			postPhoto(formData);
		}
	}, [photoFile])


	const postPhoto = async (formData) => {
		console.log('CURRENT FOLDER ID', currentFolderId)
		let response = await fetchWithCSRF(`/api-photos/${currentFolderId}`, {
			method: 'POST',
			body: formData,
		});
		if (response.ok) {
			const data = await response.json()
			setPhotos([...photos, data.photo])
			setLoading(false)
		}
		console.log(response)
	};

	return (
		<div className='upload-con'>
			<form className='content__add'>
				<label htmlFor="file-upload" className="add-btn">
					+
				</label>
				<input
					id='file-upload'
					onChange={handleChange}
					type='file'
					name='file'
				></input>
				<br />
			</form>
		</div>
	);
}

export default Upload;
