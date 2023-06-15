import React, { useRef } from "react";

interface FileUploadProps {
  file: Blob | null,
  setFile: (file: any) => void,
  children: React.ReactNode,
}

const FileUpload: React.FC<FileUploadProps> = ({
	file,
  setFile,
  children,
}) => {
  const refInput = useRef<HTMLInputElement>(null);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if(!!e.target.files?.length) setFile(e.target.files[0]);
  };

  return (
    <div className="file-upload" onClick={() => refInput.current?.click()}>
      <input
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        ref={refInput}
        onChange={onChange}
      />
      {children}
			{/* {file && <div className="file-upload__img">
				{file.name}
			</div>} */}
    </div>
  );
};

export default FileUpload;
